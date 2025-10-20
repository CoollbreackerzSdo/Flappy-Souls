export type SpriteType = {
  image: CanvasImageSource;
  height: number;
  width: number;
}

export default class Sprite {
  static create(imageUrl: CanvasImageSource, height: number, width: number): SpriteType {
    return { image: imageUrl, width: width, height: height };
  }
}

export function empty(): SpriteType {
  return { image: new Image(), width: 0, height: 0 }
}