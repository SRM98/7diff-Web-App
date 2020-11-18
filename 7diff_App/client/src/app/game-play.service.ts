import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { Game, WaitingGame } from "../../../common/communication/game";
import { Score } from "../../../common/communication/score";
import * as constants from "../../../common/constants";
import { Player } from "../../../common/player";
import { GAMES } from "../app/mock-games";
import { ChronoService } from "./chrono.service";
import { GameService } from "./game.service";
import { UsernameService } from "./username.service";
import { WebSocketService } from "./webSocket.service";

@Injectable({
  providedIn: "root",
})
export class GamePlayService {

  public arrayPopUps: Boolean[];
  public gameType: string;
  public gameURL: string;
  public game: Game;
  public playerOne: Player;
  public playerTwo: Player;
  public numberOfDifferences: number;
  public canClick: boolean;
  public highScoreSub: Subscription;
  public gameOverSubscription: Subscription;

  public constructor(private httpClient: HttpClient,
                     private gameService: GameService,
                     private webSocket: WebSocketService,
                     public chronoService: ChronoService,
                     public user: UsernameService,
                    ) {
                       this.game = GAMES[0];
                       this.arrayPopUps = [];
                       this.playerOne = {name: "tristan", numDifferencesFound: 0};
                       this.playerTwo = {name: "cromer", numDifferencesFound: 0};
                       this.canClick = true;
                       this.highScoreSub = new Subscription;
                       this.gameOverSubscription = new Subscription;
                     }

  public setGamePlay(game: Game, gameURL: string, gameType: string, playerOne: Player, playerTwo: Player): void {
    this.game = game;
    this.gameURL = gameURL;
    this.gameType = gameType;
    this.playerOne = playerOne;
    this.playerOne.numDifferencesFound = 0;
    this.playerTwo = playerTwo;
    this.playerTwo.numDifferencesFound = 0;
    this.numberOfDifferences = this.gameType === "solo" ? constants.MAX_NUMBER_OF_DIFFERENCES :
                                                         constants.NUMBER_OF_DIFFERENCES_1V1;
  }

  public playAudio(foundDifference: boolean): void {
    const audio: HTMLAudioElement  = new Audio();
    if (foundDifference) {
      this.httpClient.get(constants.SOUND_URL + "Correct").subscribe((serverResponse) => {
        audio.src = String(serverResponse); });
    } else {
      this.httpClient.get((constants.SOUND_URL + "Incorrect")).subscribe((serverResponse) => {
        audio.src = String(serverResponse); });
    }
    audio.load();
    audio.play().then().catch(() => {
      audio.pause();
    });
  }

  // tslint:disable-next-line:no-any
  public addZero(time: any): any {
      if (time < constants.TWO_DIGITS_TIME) {
         time = "0" + time;
      }

      return time;
  }

  public displaySystemMessage(alert: string): void {
      // tslint:disable-next-line:no-non-null-assertion
      const textBox: HTMLElement = document.getElementById("textBox")!;
      const message: HTMLElement = document.createElement("div");
      const date: Date = new Date();
      message.innerHTML = this.addZero(date.getHours()) + ":" +  this.addZero(date.getMinutes()) +
      ":" +  this.addZero(date.getSeconds()) + " - " + alert;
      this.updateScoreboard(alert);
      textBox.appendChild(message);
      message.className = "systemMessage";
      textBox.scrollTop = textBox.scrollHeight;

  }
  public updateScoreboard(message: string): void {
    if (message.includes("Différence")) {
    if (this.gameType === "1v1") {
        message.includes(this.playerOne.name) ? this.playerOne.numDifferencesFound++ : this.playerTwo.numDifferencesFound++;
      } else {
        this.playerOne.numDifferencesFound++;

      }
    this.isGameOver();
    }
  }

  public isGameOver(): void {
    if (this.foundAllDifferences()) {
      const winner: Player = this.playerOne.numDifferencesFound === this.numberOfDifferences ? this.playerOne : this.playerTwo;
      this.webSocket.gameOver(this.gameURL, winner.name);
    }
  }

  public updateHighScores(time: number, timeDisplay: string, winner: string): void {
    const newScore: Score = {
        user: winner,
        time: time,
        timeString: timeDisplay,
      };
    this.gameType === "solo" ? this.game.hsSolo.push(newScore) : this.game.hs1VS1.push(newScore);
    this.gameService.updateHighScores(this.game).subscribe();

  }

  public hasNewHighScore(time: number, winner: string): void {
      const scores: Score[] = this.gameType === "solo" ? this.game.hsSolo : this.game.hs1VS1;
      this.gameService.getNewScorePosition(scores).subscribe((position) => {
        if ( parseInt(position, 10) <= constants.INDEX_TOP_HS) {
          this.webSocket.newHighScore(winner + " obtient la " + position +
          "e place dans les meilleurs temps du jeu " + this.game.name + " en " + this.gameType);
        }
      });
  }

  public leaveWaitingRoom(): void {
    this.gameService.deleteWaitingGame({id: this.game.id, roomname: this.gameURL} as WaitingGame).subscribe();
    this.webSocket.sendLeftWaitingGameAlert(this.gameURL);
  }

  public joinWaitingRoom(): void {
    this.gameService.addWaitingGame({id: this.game.id, roomname: this.gameURL} as WaitingGame).subscribe();
    this.webSocket.sendWaitingGameAlert(this.gameURL);
  }
  public isGameReady(): boolean {
    return (this.playerOne.name !== "") && (this.gameType === "solo" ||
                       (this.gameType === "1v1"  && this.playerTwo.name !== ""));
  }

  public foundAllDifferences(): boolean {
    return (this.playerOne.numDifferencesFound === this.numberOfDifferences) ||
          (this.playerTwo.numDifferencesFound === this.numberOfDifferences);
  }

  public setPopUps(arrayPopUps: Boolean[]): void {
    this.arrayPopUps = arrayPopUps;
  }

  public hidePopUp(): void {
    document.body.style.cursor = "default";
    this.arrayPopUps[constants.CAN_DISPLAY_ERROR_INDEX] = false;
    this.arrayPopUps[constants.CAN_DISPLAY_LEAVE_INDEX] = false;
  }

  public displayPopUp(id: number): void {
    this.arrayPopUps[id] = true;
  }

  public subscribeToFinishGame(): void {
    this.gameOverSubscription = this.webSocket.finishGame.subscribe((value) => {
      if (value !== "leaveGame") {
        this.finishGame(value);
       } else {
          if (!this.arrayPopUps[constants.CAN_DISPLAY_LOSE_INDEX]) {
            this.displayPopUp(constants.CAN_DISPLAY_OPP_HAS_LEFT_INDEX);
          }
        }
      this.gameOverSubscription.unsubscribe();
    });
  }

  public subscribeToHighScore(): void {
    this.highScoreSub = this.webSocket.highScoreAlert.subscribe((value) => {
      this.displaySystemMessage(value);
    });

  }
  public finishGame(winner: string): void {
    this.arrayPopUps[constants.CAN_CLICK_INDEX] = false;
    this.webSocket.leaveGame(this.gameURL);
    if (this.user.getUsername() === winner) {
     this.displayPopUp(constants.CAN_DISPLAY_WIN_INDEX);
     this.updateHighScores( this.chronoService.getTime(), this.chronoService.getTimeDisplay(), winner);
     this.hasNewHighScore(this.chronoService.getTime(), winner);
     } else {
      this.displayPopUp(constants.CAN_DISPLAY_LOSE_INDEX);
     }
    this.chronoService.stopTimer();
  }

  public startGame(): void {
    if (this.isGameReady()) {
      this.chronoService.startTimer();
      this.arrayPopUps[constants.CAN_DISPLAY_COVER] = false;
      this.leaveWaitingRoom();
    }
  }

  public getPlayers(): void {
    if (this.gameType === "1v1") {
      this.arrayPopUps[constants.CAN_DISPLAY_PLAYER_TWO] = true;
      if (!this.isGameReady()) {
        this.joinWaitingRoom();
      }
    }
  }
}
