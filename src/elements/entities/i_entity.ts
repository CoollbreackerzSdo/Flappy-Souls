import type { Vector2DType } from "../../common/models/vector_2d";
import Vector2D from "../../common/models/vector_2d";
import type ICollisionService from "../../common/services/collision/i_collision_service";
import { CollisionShape } from "../../common/services/collision/i_collision_service";
import { empty, type SpriteType } from "../../components/sprites/sprite";
import { CycleElementBase } from "../cycle_element_base";
import type { ICollider } from "../i_collider";
import type { ICycleElement } from "../i_cycle_element";
import type { IPositionElement } from "../i_position_element";
import type ISpriteElement from "../i_sprite_element";

export default interface IEntity extends IPositionElement, ISpriteElement, ICycleElement, ICollider {
  position: Vector2DType
}

export abstract class EntityBase extends CycleElementBase implements IEntity {
  private _collisionService: ICollisionService;
  sprite: SpriteType;
  position: Vector2DType = Vector2D.empty();
  constructor(ctx: CanvasRenderingContext2D, collisionService: ICollisionService) {
    super(ctx);
    this.sprite = empty();
    this._collisionService = collisionService;
  }
  asCollision(vector: Vector2DType, vh: number, vw: number): boolean {
    if (this._collisionService.hasCollision(CollisionShape.create(this.position, vector, this.sprite.width, this.sprite.height, vh, vw)))
      return true;
    return false;
  }
  move(vector: Vector2DType) {
    this.position = Vector2D.sum(this.position, vector);
  }
}