import type ICycleComponent from "../definition/i_cycle_component";

export abstract class CycleComponentBase implements ICycleComponent {
  _ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this._init();
  }
  abstract restart(): void;
  abstract continue(): void;
  abstract pause(): void;
  abstract _init():void;
  abstract draw(): void;
  abstract update(): void;
}