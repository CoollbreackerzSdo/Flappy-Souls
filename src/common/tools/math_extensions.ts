export function percentage(value: number, percentile: number): number { return (value * percentile) / 100 }
export function gravity(mass: number, distance: number, gravity: number): number {
  return (gravity * mass) / Math.pow(distance, 2);
}

export const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)