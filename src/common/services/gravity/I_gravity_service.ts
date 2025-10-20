import type { Vector2DType } from "../../models/vector_2d";

export default interface IGravityService {
  apply(vector: Vector2DType, mass: number): void;
}