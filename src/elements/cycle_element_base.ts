import { CycleComponentBase } from "../common/models/CycleComponentBase";
import type { ICycleElement } from "./i_cycle_element";



export abstract class CycleElementBase extends CycleComponentBase implements ICycleElement {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }
}
