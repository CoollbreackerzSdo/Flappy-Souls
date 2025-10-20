import { Settings } from "./common/config/settings";
import Keyboard from "./common/services/input/keyboard";
import { GameMachine } from "./game_machine";

const canvas: HTMLCanvasElement | null = document.querySelector('canvas') as HTMLCanvasElement;
canvas.width = Settings.width;
canvas.height = Settings.height;
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.scale(1, 1);
const score: HTMLParagraphElement | null = document.getElementById('#score') as HTMLParagraphElement;

const keyboard = new Keyboard();

if (ctx && score) {
  const game = new GameMachine(ctx, keyboard);
  const loop = () => {
    game.run();
    score.innerHTML = `${GameMachine.score}s`;
    requestAnimationFrame(loop);
  }
  loop();
}