import type { Vector2DType } from "../common/models/vector_2d";



export interface ICollider {
  asCollision(vector: Vector2DType, vh: number, vw: number): boolean;
}