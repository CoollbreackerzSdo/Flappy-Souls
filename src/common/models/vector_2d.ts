export type Vector2DType = {
  x: number,
  y: number
}

export default class Vector2D {
  static create(xv: number, yv: number): Vector2DType {
    return { x: xv, y: yv };
  };
  static sum(vectorA: Vector2DType, vectorB: Vector2DType): Vector2DType {
    return { x: vectorA.x + vectorB.x, y: vectorA.y + vectorB.y };
  }
  static empty = (): Vector2DType => { return { x: 0, y: 0 } }
  static copy(vector: Vector2DType): Vector2DType {
    return { x: vector.x, y: vector.y }
  }
}