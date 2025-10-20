// timer.ts
export class Timer {
  private _startTime: number = 0;
  private _elapsedTime: number = 0;
  private _isRunning: boolean = false;

  constructor() {
    this.reset();
  }

  start(): void {
    if (!this._isRunning) {
      this._startTime = Date.now() - this._elapsedTime;
      this._isRunning = true;
    }
  }

  stop(): void {
    if (this._isRunning) {
      this._elapsedTime = Date.now() - this._startTime;
      this._isRunning = false;
    }
  }

  reset(): void {
    this._startTime = Date.now();
    this._elapsedTime = 0;
    this._isRunning = true;
  }

  pause(): void {
    this.stop();
  }

  continue(): void {
    this.start();
  }

  get totalMilliseconds(): number {
    if (this._isRunning) {
      return Date.now() - this._startTime;
    }
    return this._elapsedTime;
  }

  get totalSeconds(): number {
    return Math.floor(this.totalMilliseconds / 1000);
  }

  get totalMinutes(): number {
    return Math.floor(this.totalMilliseconds / (60 * 1000));
  }

  get totalHours(): number {
    return Math.floor(this.totalMilliseconds / (60 * 60 * 1000));
  }

  get hours(): number {
    return Math.floor((this.totalMilliseconds / (60 * 60 * 1000)) % 24);
  }

  get minutes(): number {
    return Math.floor((this.totalMilliseconds / (60 * 1000)) % 60);
  }

  get seconds(): number {
    return Math.floor((this.totalMilliseconds / 1000) % 60);
  }

  get milliseconds(): number {
    return Math.floor(this.totalMilliseconds % 1000);
  }

  toString(format: string = "mm:ss"): string {
    const parts: Record<string, string> = {
      'hh': this.hours.toString().padStart(2, '0'),
      'mm': this.minutes.toString().padStart(2, '0'),
      'ss': this.seconds.toString().padStart(2, '0'),
      'fff': this.milliseconds.toString().padStart(3, '0')
    };

    return format.replace(/hh|mm|ss|fff/g, match => parts[match]);
  }

  toTimeString(): string {
    return this.toString("mm:ss");
  }

  static fromSeconds(seconds: number): Timer {
    const timer = new Timer();
    timer._elapsedTime = seconds * 1000;
    timer._isRunning = false;
    return timer;
  }

  static fromMinutes(minutes: number): Timer {
    return Timer.fromSeconds(minutes * 60);
  }

  get isRunning(): boolean {
    return this._isRunning;
  }
}