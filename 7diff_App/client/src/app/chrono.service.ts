import { Injectable } from "@angular/core";
import * as constants from "../../../common/constants";

@Injectable({
  providedIn: "root",
})
export class ChronoService {

  public seconds: number;
  public minutes: number;
  public display: string;
  public interval: NodeJS.Timeout;

  public constructor() {
    this.seconds = 0;
    this.minutes = 0;
    this.display = "00:00";
  }

  public startTimer(): void {
    this.resetTimer();
    this.interval = setInterval(() => {
    this.seconds++;
    if (this.seconds >= constants.SECONDS_IN_MINUTE) {
      this.seconds = 0;
      this.minutes++;
      }
    this.updateTimerDisplay();
    },                          constants.MILLISECONDS_IN_SECOND);
  }

  public updateTimerDisplay(): void {
    this.display = "";
    if (this.minutes < constants.TWO_DIGITS_TIME) {this.display += "0"; }
    this.display += this.minutes + ":";
    if (this.seconds < constants.TWO_DIGITS_TIME) {this.display += "0"; }
    this.display += this.seconds;
  }

  public stopTimer(): void {
    clearInterval(this.interval);
  }

  public resetTimer(): void {
    this.stopTimer();
    this.seconds = 0;
    this.minutes = 0;
    this.display = "00:00";
  }

  public getTime(): number {
    return this.minutes * constants.SECONDS_IN_MINUTE + this.seconds;
  }

  public getTimeDisplay(): string {
    return this.display;
  }
}
