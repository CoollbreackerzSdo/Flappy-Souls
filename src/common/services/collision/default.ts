import type { CollisionShapeType, RectShapeType } from "./i_collision_service";
import type ICollisionService from "./i_collision_service";

export default class Default implements ICollisionService {
  isAbove(rectA: RectShapeType, rectB: RectShapeType): boolean {
    const bottomOfA = rectA.vector.y + rectA.vh;
    const topOfB = rectB.vector.y;
    return bottomOfA <= topOfB;
  }
  isBelow(rectA: RectShapeType, rectB: RectShapeType): boolean {
    const topOfA = rectA.vector.y;
    const bottomOfB = rectB.vector.y + rectB.vh;
    return topOfA >= bottomOfB;
  }
  hasCollision(shape: CollisionShapeType): boolean {
    return !(
      ((shape.vectorA.y + shape.vAh) < (shape.vectorB.y)) ||
      (shape.vectorA.y > (shape.vectorB.y + shape.vBh)) ||
      ((shape.vectorA.x + shape.vAh) < shape.vectorB.x) ||
      (shape.vectorA.x > (shape.vectorB.x + shape.vBw))
    );
  }
}