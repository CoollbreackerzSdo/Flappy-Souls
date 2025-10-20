import type { Vector2DType } from "../../models/vector_2d";
import type IGravityService from "./I_gravity_service";

export default class Earth implements IGravityService {
  apply(vector: Vector2DType, mass: number): void {
    // vector.y += gravity(mass, Settings.height - vector.y, GRAVITY);
    if (mass == 0) {
      return;
    }
    mass += GRAVITY;
    vector.y += mass;
  }
}

export const GRAVITY: number = 0.98;