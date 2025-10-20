import { CycleComponentBase } from "./common/models/CycleComponentBase";
import type IInputService from "./common/services/input/i_input_service";
import { City } from "./elements/levels/city";
import type ILevel from "./elements/levels/i_level";

export class GameMachine extends CycleComponentBase {
  static score: string;
  private _currentLevel!: ILevel;
  private _inputManager: IInputService;
  constructor(ctx: CanvasRenderingContext2D, inputManager: IInputService) {
    super(ctx);
    this._inputManager = inputManager;
    this._init();
  }
  pause(): void {
    this._currentLevel.pause();
  }

  _init(): void {
    this._currentLevel = new City(this._ctx, this._inputManager);
  }

  draw(): void {
    this._currentLevel.draw();
  }

  update(): void {
    this._currentLevel.update();
    if (this._inputManager.isKeyPressed('p')) {
      this.pause();
    }
    if (this._inputManager.isKeyPressed('c')) {
      this.continue();
    }
    if (this._inputManager.isKeyPressed('r')) {
      this.restart();
    }
  }

  run(): void {
    this.update();
    this.draw();
  }

  continue(): void {
    this._currentLevel.continue();
  }
  restart(): void {
    this._currentLevel.restart();
  }

}