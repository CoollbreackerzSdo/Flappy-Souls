import type { Vector2DType } from "../../models/vector_2d";
import Vector2D from "../../models/vector_2d";
import type IInputService from "./i_input_service";

export default class Keyboard implements IInputService {
  keys: Record<string, boolean>;
  constructor() {
    this.keys = {};
    document.addEventListener('keypress', e => {
      this.keys[e.key] = true;
    });
    document.addEventListener('keyup', e => {
      this.keys[e.key] = false;
    })
  }
  getAxis(expression: (vector: Vector2DType, keys: Record<string, boolean>) => void): Vector2DType {
    let vector: Vector2DType = Vector2D.empty();
    expression(vector, this.keys);
    return vector;
  }
  isKeyPressed(key: string): boolean {
    return this.keys[key];
  }
}