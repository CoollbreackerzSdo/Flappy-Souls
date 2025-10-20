import type { Vector2DType } from "../../models/vector_2d";

export default interface ICollisionService {
  hasCollision(shape: CollisionShapeType): boolean;
  isAbove(rectA: RectShapeType, rectB: RectShapeType): boolean;
  isBelow(rectA: RectShapeType, rectB: RectShapeType): boolean;
}

export type CollisionShapeType = {
  vectorA: Vector2DType,
  vectorB: Vector2DType,
  vAh: number,
  vAw: number,
  vBh: number,
  vBw: number,
}

export type RectShapeType = {
  vector: Vector2DType,
  vw: number,
  vh: number,
}

export class CollisionShape {
  static create(vectorA: Vector2DType, vectorB: Vector2DType, vAh: number, vAw: number, vBh: number, vBw: number): CollisionShapeType {
    return { vectorA: vectorA, vectorB: vectorB, vAh: vAh, vAw: vAw, vBh: vBh, vBw: vBw };
  }
}

export class RectShape {
  static create(vector: Vector2DType, vh: number, vw: number): RectShapeType {
    return { vector: vector, vh: vh, vw: vw }
  }
}