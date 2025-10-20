import type { IContinue } from "./IContinue";
import type { IDraw } from "./IDraw";
import type { IPause } from "./IPause";
import type { IRestart } from "./IRestart";
import type { IUpdate } from "./IUpdate";

export default interface ICycleComponent extends IPause, IContinue, IUpdate, IRestart, IDraw {
}

