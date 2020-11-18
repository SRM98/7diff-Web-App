import {HttpClient} from "@angular/common/http";
import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from "rxjs";
import {SimpleGame} from "../../../../common/communication/game";
import * as constants from "../../../../common/constants";
import {Player} from "../../../../common/player";
import { game1 } from "../../app/mock-games";
import {ChronoService} from "../chrono.service";
import { GamePlayService } from "../game-play.service";
import {GameService} from "../game.service";
import {UsernameService} from "../username.service";
import {WebSocketService} from "../webSocket.service";

interface Reponse {
  fichier: string;
  diff: number;
}
@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.component.html",
  styleUrls: ["./game-view.component.css"],
})
export class GameViewComponent implements OnInit, OnDestroy {

  public arrayPopUps: Boolean[];
  public playerOne: Player;
  public playerTwo: Player;
  public gameType: string;
  public gameURL: string;
  public eventSubscription: Subscription;
  public userSubscription: Subscription;
  public game: SimpleGame;

  @ViewChildren("popupError")
  public popupError: QueryList<ElementRef>;
  @ViewChildren("popupWin")
  public popupWin: QueryList<ElementRef>;
  @ViewChildren("popupLeave")
  public popUpLeave: QueryList<ElementRef>;
  @ViewChildren("originalImageDisplay")
  public originalImage: QueryList<ElementRef>;
  @ViewChildren("modifiedImageDisplay")
  public modifiedImage: QueryList<ElementRef>;
  @ViewChildren("gameView")
  public gameView: QueryList<ElementRef>;

  public constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private httpClient: HttpClient,
    private chronoService: ChronoService,
    public webSocket: WebSocketService,
    public gamePlayService: GamePlayService,
    public router: Router,
    public user: UsernameService,
  ) {
    this.playerOne = {name: user.getUsername(), numDifferencesFound : 0};
    this.playerTwo = {name: "", numDifferencesFound : 0};
    this.gameType = "";
    this.gameURL = "";
    this.arrayPopUps = [];
    this.arrayPopUps[constants.CAN_DISPLAY_WIN_INDEX] = false;
    this.arrayPopUps[constants.CAN_DISPLAY_LOSE_INDEX] = false;
    this.arrayPopUps[constants.CAN_DISPLAY_LEAVE_INDEX] = false;
    this.arrayPopUps[constants.CAN_DISPLAY_OPP_HAS_LEFT_INDEX] =  false;
    this.arrayPopUps[constants.CAN_DISPLAY_ERROR_INDEX] = false;
    this.arrayPopUps[constants.CAN_CLICK_INDEX] = true;
    this.arrayPopUps[constants.CAN_DISPLAY_COVER] = true;
    this.arrayPopUps[constants.CAN_DISPLAY_PLAYER_TWO] = false;
    this.game = game1;
  }
  public ngOnDestroy(): void {
   this.userSubscription.unsubscribe();
   this.eventSubscription.unsubscribe();
   this.webSocket.leaveGame(this.gameURL);
   this.gamePlayService.gameOverSubscription.unsubscribe();
   this.gamePlayService.highScoreSub.unsubscribe();

  }
  public ngOnInit(): void {
    this.chronoService.resetTimer();
    this.gameURL = this.router.url;
    this.webSocket.joinGame(this.gameURL);
    this.getGame();
    this.manageSubscriptions();
    this.gamePlayService.setPopUps(this.arrayPopUps);
  }

  public manageSubscriptions(): void {
    this.subscribeToUsers();
    this.gamePlayService.subscribeToFinishGame();
    this.gamePlayService.subscribeToHighScore();
    this.subscribeToMessages();
  }

  public splitUsernames(users: string): void {
    const usersArray: string[] = users.split(",");
    this.playerOne.name = usersArray[0];
    this.playerTwo.name = usersArray[1];
    if (this.playerTwo.name !== "") {
      this.userSubscription.unsubscribe();
      this.getGame();
    }
  }
  public clickedOriginal(event: MouseEvent): void {
    // tslint:disable-next-line:no-non-null-assertion
    const rect: ClientRect = this.originalImage!.first.nativeElement.getBoundingClientRect();
    const x: number = event.clientX - rect.left;
    const y: number =  rect.bottom - event.clientY ;
    this.findRealPosition(x, y, rect);
  }
  public clickedModified(event: MouseEvent): void {
     // tslint:disable-next-line:no-non-null-assertion
     const rect: ClientRect = this.modifiedImage!.first.nativeElement.getBoundingClientRect();
     const x: number = event.clientX - rect.left;
     const y: number =  rect.bottom - event.clientY ;
     this.findRealPosition(x, y, rect);
  }
  public findRealPosition(x: number, y: number, rect: ClientRect): void {
    const width: number = rect.right - rect.left;
    const height: number = rect.bottom - rect.top;
    const multiplicatorX: number = constants.SIMPLEVIEW_IMG_WIDTH / width;
    const multiplicatorY: number = constants.SIMPLEVIEW_IMG_HEIGHT / height;

    const modifiedPos: string = JSON.stringify({X: Math.round(x * multiplicatorX), Y: Math.round(y * multiplicatorY),
                                                id: this.game.id});
    this.httpClient.post(constants.DIFFERENCES_URL, {value: modifiedPos, URL: this.gameURL}).subscribe((reponse: Reponse) => {
     this.game.modifiedGameImg = reponse.fichier;
     const numberOfDifferencesFound: number = reponse.diff;
     if (this.arrayPopUps[constants.CAN_CLICK_INDEX]) {
        if (numberOfDifferencesFound === 0) {
          this.displayErrorPopUp(x, y, rect);
          this.webSocket.noDifferencesFound(this.gameType);
          this.gamePlayService.playAudio(false);
        } else {
          this.webSocket.differenceFound(this.gameType);
          this.gamePlayService.playAudio(true);
      }
    }
      });
  }

  public updateImg(message: string): void {

      if (message.includes("Différence")) {
        this.httpClient.get(constants.MODGAMEIMG_URL).subscribe((reponse: Reponse) => {
      this.game.modifiedGameImg = reponse.fichier;
      });
   }
  }

  public leaveGame(): void {
    this.gamePlayService.leaveWaitingRoom();
    this.webSocket.leaveGame(this.gameURL);
    const info: string = JSON.stringify({URL: this.gameURL});
    this.httpClient.post(constants.DELETE_GAME_URL, {value: info}).subscribe();
    // tslint:disable-next-line:no-floating-promises
    this.router.navigate(["/listOfGames"]);
  }
  public getGame(): void {
    // tslint:disable-next-line:no-non-null-assertion
    const id: number = +this.route.snapshot.paramMap.get("id")!;
    // tslint:disable-next-line:no-non-null-assertion
    this.gameType = this.route.snapshot.paramMap.get("type")!;
    this.gameService.getSimpleGame(id)
        .subscribe(( game) => {
          this.game = game;
          this.gameService.sendPostRequest(this.game, this.gameURL);
          this.gamePlayService.setGamePlay(this.game, this.gameURL, this.gameType, this.playerOne, this.playerTwo);
          this.gamePlayService.getPlayers();
          this.gamePlayService.startGame();
        });
  }

  public displayErrorPopUp(x: number, y: number, rect: ClientRect): void {
    this.arrayPopUps[constants.CAN_CLICK_INDEX] = false;
    let elemnt: ElementRef = new ElementRef("");
    this.arrayPopUps[constants.CAN_DISPLAY_ERROR_INDEX] = true;
    document.body.style.cursor = "not-allowed";
    // tslint:disable-next-line:no-non-null-assertion
    const playSection: HTMLElement = this.gameView!.first.nativeElement;
    this.popupError.changes.subscribe(() => {
      elemnt = (this.popupError.first);
      elemnt.nativeElement.style.left = (rect.left + x - ((playSection.offsetWidth) * constants.POPUP_WIDTH /
     constants.DIVIDE_BY_2  ) + "px");
      elemnt.nativeElement.style.top =  (rect.bottom - y - ((playSection.offsetHeight) * constants.POPUP_HEIGHT /
    constants.DIVIDE_BY_2) + "px");
    });
    setTimeout(() => {
      this.gamePlayService.hidePopUp();
      this.arrayPopUps[constants.CAN_CLICK_INDEX] = true;
      document.body.style.cursor = "default";
    },         constants.POP_UP_TIME_INTERVAL);
  }

  public subscribeToUsers(): void {
    this.userSubscription = this.webSocket.usersInGame.subscribe((users) => {
        this.splitUsernames(users);
    });
  }

  public subscribeToMessages(): void {
    this.eventSubscription = this.webSocket.data.subscribe((value) => {
      value === constants.LEAVE_ALERT ? this.gamePlayService.displayPopUp(constants.CAN_DISPLAY_LEAVE_INDEX) :
                                        this.gamePlayService.displaySystemMessage(value);
      this.updateImg(value);
    });
  }
}
