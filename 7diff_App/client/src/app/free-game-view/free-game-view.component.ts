import {Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from "rxjs";
import * as THREE from "three";
import {FreeGame, GameScenes} from "../../../../common/communication/game";
import * as constants from "../../../../common/constants";
import {Player} from "../../../../common/player";
import { game3 } from "../../app/mock-games";
import {ChronoService} from "../chrono.service";
import { GamePlayService } from "../game-play.service";
import {GameService} from "../game.service";
import {CheatModeService} from "../threeJS/cheat-mode.service";
import {RenderService} from "../threeJS/render.service";
import { SceneCreatorService } from "../threeJS/sceneCreator.service";
import { ThreeDifferenceService } from "../threeJS/three-difference.service";
import {UsernameService} from "../username.service";
import { WebSocketService } from "../webSocket.service";

@Component({
  selector: "app-free-game-view",
  templateUrl: "./free-game-view.component.html",
  styleUrls: ["./free-game-view.component.css"],
})
export class FreeGameViewComponent implements OnInit, OnDestroy {

  public arrayPopUps: Boolean[];
  public playerOne: Player;
  public playerTwo: Player;
  public gameType: string;
  public game: FreeGame;
  public eventSubscription: Subscription;
  public userSubscription: Subscription;
  public gameURL: string;

  @ViewChild("container")
  private containerRef: ElementRef;

  @ViewChildren("popupWin")
  public popupWin: QueryList<ElementRef>;

  @ViewChildren("popUpLeave")
  public popUpLeave: QueryList<ElementRef>;

  @ViewChildren("popUpLose")
  public popUpLose: QueryList<ElementRef>;

  @ViewChildren("popupError")
  public popupError: QueryList<ElementRef>;

  @HostListener("window:resize", ["$event"])
  public onResize(): void {
    this.renderService.onResize();
  }

  public onClick(event: MouseEvent): void {
    this.arrayPopUps[constants.CAN_CLICK_INDEX] = false;
    if (this.container.style.pointerEvents === "none") {
      return;
    }

    this.isLeftContainer(event) ? this.freeDiffService.onMouseMoveL(event) :  this.freeDiffService.onMouseMoveR(event);

    setTimeout(() => {
      this.verifyNbDiffs(event.clientX, event.clientY);
    },         constants.TIME_TO_WAIT);
  }
  @HostListener("document:keypress", ["$event"])
  public onKeyPress(event: KeyboardEvent): void {
    if (event.key === "t") {
      this.cheatModeService.toggleCheatModeActivity();
      this.arrayPopUps[constants.CAN_DISPLAY_CHEAT_MODE] = !this.arrayPopUps[constants.CAN_DISPLAY_CHEAT_MODE];
    }
  }

  public constructor(
    private renderService: RenderService,
    private cheatModeService: CheatModeService,
    private gameService: GameService,
    private webSocket: WebSocketService,
    private chronoService: ChronoService,
    public user: UsernameService,
    public route: ActivatedRoute,
    public router: Router,
    public freeDiffService: ThreeDifferenceService,
    public gamePlayService: GamePlayService,
    public sceneService: SceneCreatorService,
    ) {
      this.playerOne = {name: user.getUsername(), numDifferencesFound : 0};
      this.playerTwo = {name: "", numDifferencesFound : 0};
      this.gameType = "";
      this.game = game3;
      this.arrayPopUps = [];
      this.arrayPopUps[constants.CAN_DISPLAY_WIN_INDEX] = false;
      this.arrayPopUps[constants.CAN_DISPLAY_LOSE_INDEX] = false;
      this.arrayPopUps[constants.CAN_DISPLAY_LEAVE_INDEX] = false;
      this.arrayPopUps[constants.CAN_DISPLAY_OPP_HAS_LEFT_INDEX] =  false;
      this.arrayPopUps[constants.CAN_DISPLAY_ERROR_INDEX] = false;
      this.arrayPopUps[constants.CAN_CLICK_INDEX] = true;
      this.arrayPopUps[constants.CAN_DISPLAY_COVER] = true;
      this.arrayPopUps[constants.CAN_DISPLAY_PLAYER_TWO] = false;
      this.arrayPopUps[constants.CAN_DISPLAY_CHEAT_MODE] = false;
      this.userSubscription = new Subscription;
      this.eventSubscription = new Subscription;
      }

  private get container(): HTMLDivElement {
    return this.containerRef.nativeElement;
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
    this.gamePlayService.setPopUps(this.arrayPopUps);
    this.gameURL = this.router.url;
    this.webSocket.joinGame(this.gameURL);
    this.manageSubscriptions();
  }

  public manageSubscriptions(): void {
    this.subscribeToMessages();
    this.subscribeToUsers();
    this.subscribeToGameUpdates();
    this.gamePlayService.subscribeToHighScore();
    this.gamePlayService.subscribeToFinishGame();
  }

  public splitUsernames(users: string): void {
    const usersArray: string[] = users.split(",");
    this.playerOne.name = usersArray[0];
    this.playerTwo.name = usersArray[1];
    if (this.playerTwo.name !== "") {
      this.userSubscription.unsubscribe();
    }
  }

  public verifyNbDiffs(posX: number, posY: number): void {
    const tempPlayer: Player = this.findPlayer();
    if (tempPlayer.numDifferencesFound === this.freeDiffService.differenceCounter) {
      this.displayErrorPopUp(posX, posY);
      this.webSocket.noDifferencesFound(this.gameType);
    } else {
      this.webSocket.differenceFound(this.gameType);
    }
  }

  public findPlayer(): Player {
    return this.user.getUsername() === this.playerOne.name ? this.playerOne : this.playerTwo;
  }

  public getGame(): void {
      // tslint:disable-next-line:no-non-null-assertion
      const id: number = +this.route.snapshot.paramMap.get("id")!;
      // tslint:disable-next-line:no-non-null-assertion
      this.gameType = this.route.snapshot.paramMap.get("type")!;
      this.gameService.getFreeGame(id)
        .subscribe(( game) => {
          this.game = game;
          this.gamePlayService.setGamePlay(this.game, this.gameURL, this.gameType, this.playerOne, this.playerTwo);
          this.gamePlayService.getPlayers();
          if (this.gamePlayService.isGameReady() ) {
            this.loadFreeGame();
          }
        });
  }
  public loadFreeGame(): void {
    this.renderService.loadExistingScene(this.game, this.container);
    this.cheatModeService.initializeCheatMode(this.game);
    this.freeDiffService.initializeDifferenceMode(this.game);
    this.gamePlayService.startGame();
  }

  public displayErrorPopUp(x: number, y: number): void {
    this.container.style.pointerEvents = "none";
    this.arrayPopUps[constants.CAN_DISPLAY_ERROR_INDEX] = true;
    document.body.style.cursor = "not-allowed";
    let elemnt: ElementRef = new ElementRef("");
    const popupSubscription: Subscription = this.popupError.changes.subscribe(() => {
      elemnt = (this.popupError.first);
      elemnt.nativeElement.style.left = (x) + "px";
      elemnt.nativeElement.style.top = (y - (this.containerRef.nativeElement.offsetTop * constants.POPUP_HEIGHT /
        constants.DIVIDE_BY_2)) + "px";
    });
    setTimeout(() => {
      popupSubscription.unsubscribe();
      this.gamePlayService.hidePopUp();
      this.container.style.pointerEvents = "auto";
      document.body.style.cursor = "default";
      this.arrayPopUps[constants.CAN_CLICK_INDEX] = true;
    },         constants.POP_UP_TIME_INTERVAL);
  }

  public leaveGame(): void {
    this.gamePlayService.hidePopUp();
    this.gamePlayService.leaveWaitingRoom();
    this.webSocket.leaveGame(this.gameURL);
    this.renderService.close();
    // tslint:disable-next-line:no-floating-promises
    this.router.navigate(["/listOfGames"]);
  }
  public isLeftContainer(event: MouseEvent): boolean {
    return (event.clientX - this.renderService.container.offsetLeft) <= this.renderService.container.clientWidth;
  }
  public subscribeToGameUpdates(): void {
    this.webSocket.updatedGame.subscribe((value) => {
      const updatedGame: GameScenes = JSON.parse(value);
      const originalScene: THREE.Scene = new THREE.Scene();
      const modifiedScene: THREE.Scene = new THREE.Scene();
      this.sceneService.parseScene(originalScene, updatedGame.originalScene);
      this.sceneService.parseScene(modifiedScene, updatedGame.modifiedScene);
      this.renderService.setScenes(originalScene, modifiedScene);
      this.freeDiffService.updateDifferenceMode(originalScene, modifiedScene);
      this.cheatModeService.updateModifiedScene(modifiedScene);
      this.arrayPopUps[constants.CAN_CLICK_INDEX] = true;
    });
  }

  public subscribeToMessages(): void {
    this.eventSubscription = this.webSocket.data.subscribe((value) => {
      value === constants.LEAVE_ALERT ? this.gamePlayService.displayPopUp(constants.CAN_DISPLAY_LEAVE_INDEX) :
                                        this.gamePlayService.displaySystemMessage(value);
   });
  }

  public subscribeToUsers(): void {
   this.userSubscription = this.webSocket.usersInGame.subscribe((users) => {
      this.splitUsernames(users);
      this.getGame();
    });
  }
}
