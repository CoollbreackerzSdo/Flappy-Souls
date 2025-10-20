import { Settings } from "../../common/config/settings";
import type { Vector2DType } from "../../common/models/vector_2d";
import Vector2D from "../../common/models/vector_2d";
import { getRandom } from "../../common/tools/math_extensions";
import type { SpriteType } from "../../components/sprites/sprite";
import { CycleElementBase } from "../cycle_element_base";

export default class Piped extends CycleElementBase {
  position: Vector2DType;
  sprite: SpriteType;
  private _isPause!: boolean;
  private _speed!: number;
  private _slice: Vector2DType | undefined;
  private _starPosition: Vector2DType;
  private _initialSpeed: number;
  constructor(ctx: CanvasRenderingContext2D, sprite: SpriteType, position: Vector2DType, slice: Vector2DType | undefined, speed?: number) {
    super(ctx);
    this.position = position;
    this._starPosition = Vector2D.copy(position);
    this.sprite = sprite;
    this._slice = slice;
    this._initialSpeed = speed ?? 10;
    this._init();
  }
  _init(): void {
    this._isPause = false;
    this._speed = this._initialSpeed;
  }
  restart(): void {
    this.position = Vector2D.copy(this._starPosition);
    this._speed = this._initialSpeed;
    this._isPause = false;
  }
  continue(): void {
    this._isPause = false;
  }
  pause(): void {
    this._isPause = true;
  }
  draw(): void {
    if (this._slice) {
      this._ctx.drawImage(this.sprite.image, this._slice.x, this._slice.y, this.sprite.width, this.sprite.height, this.position.x, this.position.y, this.sprite.width, this.sprite.height)
    }
  }
  update(): void {
    if (!this._isPause) {
      if (this.position.x > Settings.width || this.position.x < -40) {
        this._speed = -this._speed;
        this.position.y = getRandom(0, Settings.height);
      }
      this.position.x += this._speed;
    }
  }
}