import type { IDraw } from "../../common/definition/IDraw";
import type { Vector2DType } from "../../common/models/vector_2d";
import type { SpriteType } from "../../components/sprites/sprite";

export default class Grass implements IDraw {
  private _ctx: CanvasRenderingContext2D;
  position: Vector2DType;
  private _slice: Vector2DType | undefined;
  sprite: SpriteType;
  constructor(ctx: CanvasRenderingContext2D, sprite: SpriteType, position: Vector2DType, slice: Vector2DType | undefined) {
    this._ctx = ctx;
    this.position = position;
    this.sprite = sprite;
    this._slice = slice;
  }
  draw(): void {
    if (this._slice) {
      this._ctx.drawImage(this.sprite.image, this._slice.x, this._slice.y, this.sprite.width, this.sprite.height, this.position.x, this.position.y, this.sprite.width, this.sprite.height)
      return;
    }
    this._ctx.drawImage(this.sprite.image, this.position.x, this.position.y, this.sprite.width, this.sprite.height);
  }
}