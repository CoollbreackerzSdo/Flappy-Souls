import type { Vector2DType } from "../../models/vector_2d";

export default interface IInputService {
  getAxis(expression: (vector: Vector2DType, keys: Record<string, boolean>) => void): Vector2DType;
  isKeyPressed(key: string): boolean;
}