import { Settings } from "../../common/config/settings";
import type ICollisionService from "../../common/services/collision/i_collision_service";
import Earth from "../../common/services/gravity/earth";
import type IGravityService from "../../common/services/gravity/I_gravity_service";
import type IInputService from "../../common/services/input/i_input_service";
import { percentage } from "../../common/tools/math_extensions";
import Sprite from "../../components/sprites/sprite";
import type { ICollider } from "../i_collider";
import { EntityBase } from "./i_entity";

export default class Player extends EntityBase implements ICollider {
  private _jumpForce!: number;
  private _gravityManager!: IGravityService;
  private _mass!: number;
  private _isPause!: boolean;
  private _inputManager: IInputService;
  constructor(ctx: CanvasRenderingContext2D, inputManager: IInputService, collisionService: ICollisionService) {
    super(ctx, collisionService);
    this._inputManager = inputManager;
    this._init();
  }
  _init(): void {
    let sprite = new Image();
    sprite.src = '/images/mobs/bird/Bird1-1.png';
    this.sprite = Sprite.create(sprite, 16, 16);
    if (this.position) {
      this.position.x = percentage(Settings.width, 50);
      this.position.y = percentage(Settings.height, 50);
    }
    this._jumpForce = 18;
    this._mass = 3;
    this._gravityManager = new Earth();
  }

  draw(): void {
    this._ctx.drawImage(this.sprite.image, 0, 0, this.sprite.width, this.sprite.height, this.position.x, this.position.y, this.sprite.width, this.sprite.height);
  }

  update(): void {
    if (!this._isPause) {
      const vector = this._inputManager.getAxis((v, keys) => {
        if (keys[' ']) {
          v.y -= this._jumpForce;
        }
      });
      this._gravityManager.apply(vector, this._mass);
      this.move(vector);
    }
  }

  pause(): void {
    this._isPause = true;
  }

  continue(): void {
    this._isPause = false;
  }
  restart(): void {
    this.position.x = percentage(Settings.width, 50);
    this.position.y = percentage(Settings.height, 50);
    this._isPause = false;
  }
}