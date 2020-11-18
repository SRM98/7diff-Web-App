import {expect} from "chai";
import "reflect-metadata";
import { Score } from "../../../common/communication/score";
import {HighscoreService} from "./highscore.service";

describe("highScoreService", () => {
    let service: HighscoreService;

    beforeEach(() => {
        service = new HighscoreService();
     });

    describe("sortScores", () => {
        it("sortScores should return sorted string when given an unsorted string", () => {
            const unsortedScores: Score[] = [{user: "a", time: 20, timeString: ""}, {user: "b", time: 10, timeString: ""}];
            const sortedScores: Score[] = [{user: "b", time: 10, timeString: "0:10"}, {user: "a", time: 20, timeString: "0:20"}];
            const result: Score[] = service.sortScores(unsortedScores);
            expect(result).to.deep.equal(sortedScores);
            });

        it("sortScores should prioritise oldhs over newhs when two scores are equal", () => {
            const unsortedScores: Score[] = [{user: "a", time: 20, timeString: ""}, {user: "b", time: 20, timeString: ""}];
            const sortedScores: Score[] = [{user: "a", time: 20, timeString: "0:20"}, {user: "b", time: 20, timeString: "0:20"}];
            const result: Score[] = service.sortScores(unsortedScores);
            expect(result).to.deep.equal(sortedScores);
            });
    });

    describe("Function timeToString tests", () => {
        it("timeToString should return 0:09 when 9 is given", () => {
          const entry: number = 9;
          const result: String = service.timeToString(entry);
          expect(result).to.equal("0:09");
        });

        it("timeToString should return 30 when 00:30 is given", () => {
          const entry: number = 30;
          const result: String = service.timeToString(entry);
          expect(result).to.equal("0:30");
        });

        it("timeToString should return 1:00 when 60 is given", () => {
          const entry: number = 60;
          const result: String = service.timeToString(entry);
          expect(result).to.equal("1:00");
        });

        it("timeToString should return 3:20 when 200 is given", () => {
          const entry: number = 200;
          const result: String = service.timeToString(entry);
          expect(result).to.equal("3:20");
        });
    });

    describe("getNewScorePosition", () => {
      it("shoudl return 1 when the new score is the best score", () => {
        const scores: Score[] = [{user: "a", time: 10, timeString: ""}, {user: "b", time: 20, timeString: ""},
                                 {user: "c", time: 30, timeString: ""}, {user: "d", time: 5, timeString: ""}, ];
        expect(service.getNewScorePosition(scores)).to.equal(1);
      });

      it("shoudl return 4 when the new score is the 4th best score", () => {
        const scores: Score[] = [{user: "a", time: 10, timeString: ""}, {user: "b", time: 20, timeString: ""},
                                 {user: "c", time: 30, timeString: ""}, {user: "d", time: 35, timeString: ""}, ];
        const expectedResult: number = 4;
        expect(service.getNewScorePosition(scores)).to.equal(expectedResult);
      });
  });

});
