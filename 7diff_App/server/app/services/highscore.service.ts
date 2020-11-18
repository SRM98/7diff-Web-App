import { injectable } from "inversify";
import { Score } from "../../../common/communication/score";

@injectable()
export class HighscoreService {

    private readonly TIME_SEPARATOR: string = ":";
    private readonly EMPTY_TIME_CHAR: string = "0";
    private readonly DOUBLE_DECIMAL: number = 10;
    private readonly SECONDS_PER_MINUTES: number = 60;

    public sortScores(hs: Score[]): Score[] {
        for (let i: number = 0; i < hs.length; i++) {
          for (let j: number = i; j < hs.length; j++) {
            if (hs[i].time > hs[j].time) {
              const temp: Score = hs[i];
              hs[i] = hs[j];
              hs[j] = temp;
            }
          }
        }

        this.initialiseTimeString(hs);

        return hs;
    }

    public timeToString(time: number): String {
        let result: String;
        const minutes: number = Math.floor(time / this.SECONDS_PER_MINUTES);
        const seconds: number = time - minutes * this.SECONDS_PER_MINUTES;

        result = minutes.toString() + this.TIME_SEPARATOR;
        if (seconds < this.DOUBLE_DECIMAL) {
          result += this.EMPTY_TIME_CHAR;
        }

        result += seconds.toString();

        return result;
    }

    private initialiseTimeString(hs: Score[]): void {
        for (const score of hs) {
          score.timeString = this.timeToString(score.time).toString();
        }
    }

    public getNewScorePosition(scores: Score[]): number {
      const newScore: Score = scores[scores.length - 1];
      const sortedScores: Score[] = this.sortScores(scores);

      return sortedScores.indexOf(newScore) + 1;
    }
}
