import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FreeGame, Game, SimpleGame, WaitingGame } from "../../../common/communication/game";
import {Score} from "../../../common/communication/score";
import * as constants from "../../../common/constants";
import {IndexService} from "./index.service";
@Injectable({
  providedIn: "root",
})
export class GameService {
  public constructor( private service: IndexService) { }
  public getGames(): Observable<Game[]> {
    return this.service.getGames();
  }
  public getSimpleGame(id: number): Observable<SimpleGame> {
    return this.service.getSimpleGame(id);
  }
  public getFreeGame(id: number): Observable<FreeGame> {
    return this.service.getFreeGame(id);
  }
  public getWaitingGame(id: number): Observable<WaitingGame> {
    return this.service.getWaitingGame(id);
  }
  public updateHighScores(game: Game): Observable<Game> {
    return this.service.updateHighScores(game);
  }
  public deleteGame(game: Game): Observable<Game[]> {
    return this.service.deleteGame(game);
  }
  public addSimpleGame(game: Game): Observable<Game[]> {
    return this.service.addSimpleGame(game);
  }
  public addFreeGame(game: Game): Observable<Game[]> {
    return this.service.addFreeGame(game);
  }
  public deleteImg(game: Game): Observable<Game[]> {
    return this.service.deleteImg(game);
  }
  public addWaitingGame(game: WaitingGame): Observable<WaitingGame> {
    return this.service.addWaitingGame(game);
  }
  public deleteWaitingGame(game: WaitingGame): Observable<WaitingGame> {
    return this.service.deleteWaitingGame(game);
  }

  public getWaitingRoom(): Observable<WaitingGame[]> {
    return this.service.getWaitingRoom();
  }

  public sortScores(games: Game[]): void {
    for (const game of games) {
      this.getSortedScores(game.hsSolo).subscribe((hs) => game.hsSolo = hs);
      this.getSortedScores(game.hs1VS1).subscribe((hs) => game.hs1VS1 = hs);
    }
  }
  public generateId(games: Game[]): number {
    if (games.length !== 0) {
      let maxId: number = 0;
      for (const game of games) {
        if (game.id > maxId) {
          maxId = game.id;
        }
      }

      return ++maxId;
    } else {
      return 1;
    }
   }
  public initScores(): Score[] {
    const scores: Score[] = [];
    for (let i: number = 0; i < constants.SCORES_LENGTH; i++) {
      const unscore: Score = {
        user: constants.BASIC_USERNAME + i,
        time: Math.floor(Math.random() * (constants.MAX_SCORE - constants.MIN_SCORE) + constants.MIN_SCORE),
        timeString : "",
      };
      scores.push(unscore);
    }

    return scores;
  }
  public setBasicGameAttributes(games: Game[], game: Game, gameName: string): void {
    game.id = this.generateId(games);
    game.name = gameName;
    game.hsSolo = this.initScores();
    game.hs1VS1 = this.initScores();
  }
  public sortPOVs(games: Game[], pov: string): Game[] {
      const sortedGames: Game[] = [];
      for (const game of games) {
        if (game.POV === pov) {
          sortedGames.push(game);
        }
      }

      return sortedGames;
  }
  public getSortedScores(scores: Score[]): Observable<Score[]> {
    return this.service.sortScores(scores);
  }

  public getNewScorePosition(scores: Score[]): Observable<string> {
    return this.service.getNewScorePosition(scores);
  }

  public sendPostRequest(game: SimpleGame, gameURL: string): void {
    const info: string = JSON.stringify({value: game.id,
                                         game: game, originalImg: game.originalImg,
                                         modifiedImg: game.modifiedGameImg,
                                         URL: gameURL});
    this.service.addNewGame(info);
  }

}
