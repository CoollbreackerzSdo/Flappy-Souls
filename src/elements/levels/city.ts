import { Settings } from "../../common/config/settings";
import Vector2D from "../../common/models/vector_2d";
import Default from "../../common/services/collision/default";
import type IInputService from "../../common/services/input/i_input_service";
import { percentage } from "../../common/tools/math_extensions";
import type { SpriteType } from "../../components/sprites/sprite";
import Sprite from "../../components/sprites/sprite";
import Player from "../entities/player";
import { CycleElementBase } from "../cycle_element_base";
import Piped from "../obstacles/piped";
import Grass from "../terrain/grass";
import type ILevel from "./i_level";
import type ICollisionService from "../../common/services/collision/i_collision_service";
import { RectShape, type CollisionShapeType, type RectShapeType } from "../../common/services/collision/i_collision_service";
import { Timer } from "../../common/tools/timer";
import { GameMachine } from "../../game_machine";

export class City extends CycleElementBase implements ILevel {
  private _background!: SpriteType;
  private _player!: Player;
  private _inputManager!: IInputService;
  private _terrainSprite!: SpriteType;
  private _pipes: Piped[] = [];
  private _collisionMachine!: ICollisionService;
  private _pipePassed: Set<number> = new Set();
  private _timer!: Timer;

  constructor(ctx: CanvasRenderingContext2D, inputManager: IInputService) {
    super(ctx);
    this._inputManager = inputManager;
    this._init();
    this._timer = new Timer();
    this._timer.start();
  }

  _init(): void {
    this._loadImages();
    this._initializeCollision();
    this._initializePlayer();
    this._initializePipes();
  }

  private _loadImages(): void {
    const background = new Image();
    background.src = '/images/background/Background4.png';

    const terrainImage = new Image();
    terrainImage.src = '/images/elements/piped/TileStyle1.png';

    this._background = Sprite.create(background, Settings.height, Settings.width);
    this._terrainSprite = Sprite.create(terrainImage, 16, 16);
  }

  private _initializeCollision(): void {
    this._collisionMachine = new Default();
  }

  private _initializePlayer(): void {
    this._player = new Player(this._ctx, this._inputManager, this._collisionMachine);
  }

  private _initializePipes(): void {
    const pipeImage = new Image();
    pipeImage.src = '/images/elements/piped/PipeStyle1.png';
    const pipeSprite = Sprite.create(pipeImage, 80, 32);

    const pipePositions = [
      Vector2D.create(percentage(Settings.width, 40), percentage(Settings.height, 10)),
      Vector2D.create(percentage(Settings.width, 70), percentage(Settings.height, 60)),
      Vector2D.create(percentage(Settings.width, 30), percentage(Settings.height, 80)),
      Vector2D.create(percentage(Settings.width, 90), percentage(Settings.height, 90))
    ];

    this._pipes = pipePositions.map(position =>
      new Piped(this._ctx, pipeSprite, position, Vector2D.create(0, 0))
    );
  }

  draw(): void {
    this._drawBackground();
    this._drawPlayer();
    this._drawPipes();
    this._drawGrass();
  }

  private _drawBackground(): void {
    this._ctx.drawImage(this._background.image, 0, 0, this._background.width, this._background.height);
  }

  private _drawPlayer(): void {
    this._player.draw();
  }

  private _drawPipes(): void {
    this._pipes.forEach(pipe => pipe.draw());
  }

  update(): void {
    GameMachine.score = this._timer.seconds.toString();
    this._updatePlayer();
    this._updatePipes();
    this._checkCollisions();
    this._checkBoundaries();
  }

  private _updatePlayer(): void {
    this._player.update();
  }

  private _updatePipes(): void {
    this._pipes.forEach(pipe => pipe.update());
  }

  private _checkCollisions(): void {
    const playerRect = this._createPlayerRect();

    const hasCollision = this._pipes.some(pipe => {
      const pipeRect = this._createPipeRect(pipe);
      return this._collisionMachine.hasCollision(
        this._createCollisionShape(playerRect, pipeRect)
      );
    });

    if (hasCollision) {
      this.restart();
    }
  }

  private _checkBoundaries(): void {
    const playerY = this._player.position.y;
    const minY = percentage(Settings.height, 0.1);
    const maxY = percentage(Settings.height, 90);

    if (playerY > maxY || playerY < minY) {
      this.restart();
    }
  }

  private _createPlayerRect(): RectShapeType {
    return RectShape.create(
      this._player.position,
      this._player.sprite.height,
      this._player.sprite.width
    );
  }

  private _createPipeRect(pipe: Piped): RectShapeType {
    return RectShape.create(
      pipe.position,
      pipe.sprite.height,
      pipe.sprite.width
    );
  }

  private _createCollisionShape(rectA: RectShapeType, rectB: RectShapeType): CollisionShapeType {
    return {
      vectorA: rectA.vector,
      vectorB: rectB.vector,
      vAh: rectA.vh,
      vAw: rectA.vw,
      vBh: rectB.vh,
      vBw: rectB.vw
    };
  }

  pause(): void {
    this._timer.pause();
    this._player.pause();
    this._pipes.forEach(pipe => pipe.pause());
  }

  continue(): void {
    this._timer.continue();
    this._player.continue();
    this._pipes.forEach(pipe => pipe.continue());
  }

  restart(): void {
    this._timer.reset();
    this._pipePassed.clear();
    this._player.restart();
    this._pipes.forEach(pipe => pipe.restart());
  }

  private _drawGrass(): void {
    const spriteLocation: number = 16 * 14;
    const grassBaseY = percentage(Settings.height, 90);
    const sectionHeight = percentage(Settings.height, 1);

    for (let grassP = 0; grassP < Settings.width; grassP += this._terrainSprite.width) {
      this._drawGrassColumn(grassP, spriteLocation, grassBaseY, sectionHeight);
    }
  }

  private _drawGrassColumn(grassP: number, spriteLocation: number, baseY: number, sectionHeight: number): void {
    const topGrass = new Grass(
      this._ctx,
      this._terrainSprite,
      Vector2D.create(grassP, baseY),
      Vector2D.create(spriteLocation, 16)
    );
    topGrass.draw();

    for (let index = 1; index <= 9; index++) {
      const grassMid = new Grass(
        this._ctx,
        this._terrainSprite,
        Vector2D.create(grassP, baseY + (sectionHeight * index)),
        Vector2D.create(spriteLocation, 32)
      );
      grassMid.draw();
    }
  }
}