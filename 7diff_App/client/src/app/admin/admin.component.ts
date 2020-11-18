import {Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material";
import {pointOfView, Game} from "../../../../common/communication/game";
import * as constants from "../../../../common/constants";
import { game1 } from "../../app/mock-games";
import {FreeViewComponent} from "../free-view/free-view.component";
import {GameService} from "../game.service";
import {SimpleViewComponent} from "../simple-view/simple-view.component";
import "../threeJS/js/controls.js";
import {WebSocketService} from "../webSocket.service";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  private readonly POV_SIMPLE_VIEW: pointOfView = pointOfView.simpleGamePOV;
  private readonly POV_FREE_VIEW: pointOfView = pointOfView.freeGamePOV;
  private readonly CONFIRM_DELETE: number = 0;
  private readonly CONFIRM_RESET: number = 1;
  private readonly ERROR_MESSAGE: number = 2;
  public games: Game[];
  public simpleGames: Game[];
  public freeGames: Game[];
  public name: string;
  public selectedGame: Game;
  public popUpArrays: boolean[];
  public constructor(private gameService: GameService,
                     private webSocket: WebSocketService,
                     public dialog: MatDialog,
                     public dialog2: MatDialog, ) {
                        this.games = [];
                        this.simpleGames = [];
                        this.freeGames = [];
                        this.name = "";
                        this.selectedGame = game1;
                        this.popUpArrays = [];
                        this.popUpArrays[this.CONFIRM_DELETE] = false;
                        this.popUpArrays[this.CONFIRM_RESET] = false;
                        this.popUpArrays[this.ERROR_MESSAGE] = false;
  }
  public ngOnInit(): void {
    this.getGames();
  }
  public getGames(): void {
    this.gameService.getGames()
    .subscribe((games) => {
      this.games = games;
      this.gameService.sortScores(this.games);
      this.sortPOVs();
    });
  }
  public sortPOVs(): void {
    this.simpleGames = this.gameService.sortPOVs(this.games, this.POV_SIMPLE_VIEW);
    this.freeGames = this.gameService.sortPOVs(this.games, this.POV_FREE_VIEW);
  }
  public resetHighScores(): void {
    const index: number = this.games.indexOf(this.selectedGame);
    this.selectedGame.hsSolo = this.gameService.initScores();
    this.selectedGame.hs1VS1 = this.gameService.initScores();
    this.gameService.sortScores([this.selectedGame]);
    this.gameService.updateHighScores(this.selectedGame).subscribe( (resultGame) => this.games[index] = resultGame);
    this.hidePopUp(this.CONFIRM_RESET);
  }
  public deleteGame(): void {
    this.gameService.deleteGame(this.selectedGame).subscribe((games) => {
      this.games = games;
      this.getGames();
    });
    this.gameService.getWaitingGame(this.selectedGame.id).subscribe((waitingGame) => {
      this.webSocket.leaveWaitingGame(waitingGame.roomname);
    });
    this.gameService.deleteImg(this.selectedGame).subscribe((games) => this.games = games);
    this.hidePopUp(this.CONFIRM_DELETE);
  }
  public confirmAction(game: Game, popUpIndex: number): void {
    this.popUpArrays[popUpIndex] = true;
    this.selectedGame = game;
  }
  public hidePopUp(popUpIndex: number): void {
    this.popUpArrays[popUpIndex] = false;
  }
  public openSimpleView(): void {
   const dialogRef: MatDialogRef<SimpleViewComponent> =  this.dialog.open(SimpleViewComponent, {
      width: constants.SIMPLEVIEW_WINDOW_WIDTH, height: constants.SIMPLEVIEW_WINDOW_HEIGHT, disableClose: true,
      data: {
        name: this.name,
        popUps: this.popUpArrays,
      },
    });
   dialogRef.afterClosed().subscribe(() => {
      this.getGames();
    });
  }
  public openFreeView(): void {
    const dialogRef: MatDialogRef<FreeViewComponent> = this.dialog2.open(FreeViewComponent, {
      width: constants.SIMPLEVIEW_WINDOW_WIDTH, height: constants.SIMPLEVIEW_WINDOW_HEIGHT, disableClose: true,
      data: {name: "test"},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getGames();
      this.getGames();
    });
  }
}
