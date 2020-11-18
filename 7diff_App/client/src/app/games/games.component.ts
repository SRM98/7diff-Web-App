import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import {pointOfView, Alert, Game, GameInterface, WaitingGame} from "../../../../common/communication/game";
import { ID_INDEX, POV_INDEX } from "../../../../common/constants";
import {GameService} from "../game.service";
import { UsernameService } from "../username.service";
import { WebSocketService } from "../webSocket.service";
@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.css"],
})
export class GamesComponent implements OnInit {
  private readonly POV_SIMPLE_VIEW: pointOfView = pointOfView.simpleGamePOV;
  public games: Game[];
  public username: string;
  public eventSubscription: Subscription;
  public waitingRoom: WaitingGame[];
  public simpleGamesInterface: GameInterface[];
  public freeGamesInterface: GameInterface[];

  public constructor(private gameService: GameService,
                     private user: UsernameService,
                     public webSocket: WebSocketService,
                     public router: Router) {
    this.simpleGamesInterface = [];
    this.freeGamesInterface = [];
    this.waitingRoom = [];
   }
  public ngOnInit(): void {
    this.getGames();
    this.username = this.user.getUsername();
  }
  public getGames(): void {
    this.gameService.getGames()
    .subscribe((games) => {
      this.games = games;
      this.getWaitingRoom();
      this.listenToWebSocket();
      this.gameService.sortScores(this.games);
    });
  }

  public getWaitingRoom(): void {
    this.gameService.getWaitingRoom().subscribe((waitingRoom) => {
      this.waitingRoom = waitingRoom;
      this.initializeInterface(this.games);
    });
  }

  public extractID(gameURL: string): number {

    return parseInt(gameURL.split("/")[ID_INDEX], 10);
  }

  public extractPOV(gameURL: string): string {
    return gameURL.split("/")[POV_INDEX];
  }
  public navigateToGame(game: Game): void {
    this.isWaitingGame(game.id) ? this.router.navigate([this.getWaitingGameURL(game.id)]) :
                                 this.router.navigate(["/" + game.POV + "/" + game.id + "/1v1" + "/" + this.username]);

  }

  public listenToWebSocket(): void {
    this.eventSubscription = this.webSocket.waitingGameAlert.subscribe((data) => {
      const message: Alert = JSON.parse(data) as Alert;
      const id: number = this.extractID(message.gameURL);
      const pov: string = this.extractPOV(message.gameURL);
      if (message.data === "waitingGameJoinAlert") {
        this.changeButtonsText(pov, id, "Joindre");
        this.addWaitingGame(id, message.gameURL);
      } else {
        this.changeButtonsText(pov, id, "Créer");
        this.removeWaitingGame(id);
      }
    });
  }

  public changeButtonsText(pov: string, id: number, text: string): void {
    let gameInterfaces: GameInterface[];
    gameInterfaces = pov === this.POV_SIMPLE_VIEW ? this.simpleGamesInterface : this.freeGamesInterface;
    for (const gameInterface of gameInterfaces) {
      if (gameInterface.game.id === id) {
        gameInterface.playButtonText = text;
      }
    }
  }

  public isWaitingGame(id: number): boolean {
    for (const game of this.waitingRoom) {
      if (game.id === id) {
        return true;
      }
    }

    return false;
  }

  public getWaitingGameURL(id: number): string {
    for (const game of this.waitingRoom) {
      if ( game.id === id) {
        return game.roomname;
      }
    }

    return "";
  }

  public removeWaitingGame(id: number): void {
    if (this.isWaitingGame(id)) {
      const index: number = this.waitingRoom.findIndex((game) => game.id === id);
      this.waitingRoom.splice(index, 1);
    }
  }

  public addWaitingGame(id: number, roomname: string): void {
    if (!this.isWaitingGame(id)) {
      this.waitingRoom.push({id: id, roomname: roomname});
    }
  }

  public initializeInterface(games: Game[]): void {
    for (const game of games) {
      const gameInterface: GameInterface = {game: game, playButtonText: ""};
      gameInterface.playButtonText = this.isWaitingGame(game.id) ? "Joindre" : "Créer";
      game.POV === this.POV_SIMPLE_VIEW ? this.simpleGamesInterface.push(gameInterface) : this.freeGamesInterface.push(gameInterface);
    }
  }
}
