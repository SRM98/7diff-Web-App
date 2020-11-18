import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {MatDialogModule} from "@angular/material";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import { of, Subject } from "rxjs";
import { GameScenes } from "../../../../common/communication/game";
import * as constants from "../../../../common/constants";
import { Player } from "../../../../common/player";
import {game3, GAMES} from "../../app/mock-games";
import {ChronoService} from "../chrono.service";
import { GamePlayService } from "../game-play.service";
import {GameService} from "../game.service";
import {IndexService} from "../index.service";
import { AnimalsCreatorService } from "../threeJS/animalsCreator.service";
import {CheatModeService} from "../threeJS/cheat-mode.service";
import {ObjectsCreatorService} from "../threeJS/objectsCreator.service";
import {RenderService} from "../threeJS/render.service";
import {SceneCreatorService} from "../threeJS/sceneCreator.service";
import { ThreeDifferenceService } from "../threeJS/three-difference.service";
import {UsernameService} from "../username.service";
import SpyObj = jasmine.SpyObj;
import { WebSocketService } from "../webSocket.service";
import {FreeGameViewComponent} from "./free-game-view.component";

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
// tslint:disable:no-any
// tslint:disable:no-non-null-assertion

describe("FreeGameViewComponent", () => {
  let spyGameService: SpyObj<GameService>;
  let spyRenderService: SpyObj<RenderService>;
  let component: FreeGameViewComponent;
  let fixture: ComponentFixture<FreeGameViewComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let spywebSocket: SpyObj<WebSocketService>;
  // tslint:disable-next-line:prefer-const
  let el: HTMLElement;
  let spyChronoService: SpyObj<ChronoService>;
  let spyCheatMode: SpyObj<CheatModeService>;
  let spyUserServ: SpyObj<UsernameService>;

  // tslint:disable-next-line:max-func-body-length
  beforeEach(async(() => {

    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
    spywebSocket = jasmine.createSpyObj("WebSocketService", ["joinGame", "on", "connect", "leaveGame", "newHighScore", "differenceFound",
                                                             "noDifferencesFound", "sendLeftWaitingGameAlert", "sendWaitingGameAlert"]);
    spywebSocket.data = new Subject<string>();
    spywebSocket.waitingGameAlert = new Subject<string>();
    spywebSocket.usersInGame = new Subject<string>();
    spywebSocket.finishGame = new Subject<string>();
    spywebSocket.highScoreAlert = new Subject<string>();
    const gameScenes: GameScenes = {originalScene: game3.originalScene, modifiedScene: game3.modifiedScene};
    // @ts-ignore
    spywebSocket.updatedGame = of(JSON.stringify(gameScenes));

    // tslint:disable-next-line:max-line-length
    spyGameService = jasmine.createSpyObj("GameService", ["getGames", "updateHighScores", "deleteGame", "getSimpleGame", "deleteImg", "getGame", "getFreeGame", "positionHighScore", "sortPOVs", "addWaitingGame", "deleteWaitingGame",
                                                          "hasNewHighScore", "getSortedScores", "getNewScorePosition"]);
    spyGameService.getGames.and.returnValue(of(GAMES));
    spyGameService.getFreeGame.and.returnValue(of(game3));
    spyGameService.updateHighScores.and.returnValue(of(GAMES[0]));
    spyGameService.deleteGame.and.returnValue(of(GAMES));
    spyGameService.deleteImg.and.returnValue(of(GAMES));
    spyGameService.addWaitingGame.and.returnValue(of());
    spyGameService.deleteWaitingGame.and.returnValue(of());
    spyGameService.getSortedScores.and.returnValue(of(GAMES[0].hsSolo));
    spyGameService.getNewScorePosition.and.returnValue(of(1));

    spyChronoService = jasmine.createSpyObj("ChronoService", ["startTimer", "stopTimer", "resetTimer", "getTime", "getTimeDisplay"]);
    spyChronoService.startTimer.and.returnValue(of());
    spyChronoService.stopTimer.and.returnValue(of());
    spyChronoService.resetTimer.and.returnValue(of());
    spyChronoService.getTime.and.returnValue(70);
    spyChronoService.getTimeDisplay.and.returnValue("1:10");

    spyCheatMode = jasmine.createSpyObj("CheatModeService", ["initializeCheatMode", "toggleCheatModeActivity", "updateModifiedScene"]);
    spyCheatMode.initializeCheatMode.and.returnValue(of());
    spyCheatMode.toggleCheatModeActivity.and.returnValue(of());

    spyRenderService = jasmine.createSpyObj("RenderService", ["loadExistingScene", "close", "setScenes", "onResize"]);
    spyRenderService.loadExistingScene.and.returnValue(1);
    spyRenderService.close.and.returnValue(1);
    spyRenderService.setScenes.and.returnValue(1);
    const defwidth: number = 700;
    const test: any = document.createElement("div", );
    Object.defineProperty(test, "clientWidth", {
      value: defwidth,
      writable: false});

    spyRenderService.container = test;
    spyUserServ = jasmine.createSpyObj("UsernameService", ["getUsername"]);
    spyUserServ.getUsername.and.returnValue("tristan");

    TestBed.configureTestingModule({
      providers: [
        {provide: RenderService, useValue: spyRenderService},
        {provide: GameService, useValue: spyGameService },
        {provide: WebSocketService, useValue: spywebSocket},
        {provide: UsernameService, useValue: spyUserServ},
        IndexService,
        ObjectsCreatorService,
        SceneCreatorService,
        ThreeDifferenceService,
        {provide: CheatModeService, useValue: spyCheatMode},
        ThreeDifferenceService,
        AnimalsCreatorService,
        {provide: ChronoService, useValue: spyChronoService},
        GamePlayService,
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
      ],
      declarations: [ FreeGameViewComponent ],
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeGameViewComponent ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeGameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.gamePlayService.playerOne = {name: "tristan", numDifferencesFound: 7};
    component.gamePlayService.playerTwo = {name: "cromer", numDifferencesFound: 0};
  });

  it("should create the freeGameView Component", () => {
    expect(component).toBeTruthy();
  });

  describe("Game functionnement tests ", () => {

  it("Clicking on Ok should finish the game when its won", async (() => {
    component.gamePlayService.displayPopUp(constants.CAN_DISPLAY_WIN_INDEX);
    fixture.detectChanges();
    spyOn(component, "leaveGame");
    el = fixture.debugElement.query(By.css("#buttonOk")).nativeElement;
    el.click();
    expect(component.leaveGame).toHaveBeenCalledTimes(1);
  }));
  it("The game should end when the number of differences found is 7", async(() => {

    spyOn(component.gamePlayService, "displayPopUp");
    component.playerOne.numDifferencesFound = constants.MAX_NUMBER_OF_DIFFERENCES;
    component.gamePlayService.playerOne = {name: "tristan", numDifferencesFound: 7};
    component.gamePlayService.playerTwo = {name: "cromer", numDifferencesFound: 0};
    component.gameType = "solo";
    component.gamePlayService.finishGame("tristan");
    expect(component.gamePlayService.displayPopUp).toHaveBeenCalledTimes(1);
    expect(component.gamePlayService.displayPopUp).toHaveBeenCalledWith(constants.CAN_DISPLAY_WIN_INDEX);

  }));

  it("We should navigate to the list of games when the game is over", async(() => {
    spyOn(component.router, "navigate").and.returnValue(true);
    component.leaveGame();
    expect(component.router.navigate).toHaveBeenCalledWith(["/listOfGames"]);
  }));

  it("should leaveGame properly; call function and use router", () => {
    spyOn(component.router, "navigate").and.returnValue(true);
    component.leaveGame();
    expect(component.router.navigate).toHaveBeenCalledWith(["/listOfGames"]);
    expect(spywebSocket.leaveGame).toHaveBeenCalledTimes(1);
    expect(spyGameService.deleteWaitingGame).toHaveBeenCalledTimes(1);
  });

  it("should call each function once if one of the players found all differences", () => {
    spyOn(component.router, "navigate").and.returnValue(true);
    component.playerOne.numDifferencesFound = 7;
    component.playerTwo.numDifferencesFound = 0;
    spyOn(component.gamePlayService, "displayPopUp");
    spyOn(component.gamePlayService, "updateHighScores");
    spyOn(component.gamePlayService, "hasNewHighScore");
    component.gameType = "solo";
    component.gamePlayService.finishGame("tristan");
    expect(component.gamePlayService.displayPopUp).toHaveBeenCalledTimes(1);
    expect(spywebSocket.leaveGame).toHaveBeenCalledTimes(1);
    expect(spyChronoService.stopTimer).toHaveBeenCalledTimes(1);
    expect(component.gamePlayService.updateHighScores).toHaveBeenCalledTimes(1);
    expect(component.gamePlayService.hasNewHighScore).toHaveBeenCalledTimes(1);

  });

});

  describe("findPlayer  function tests", () => {

  it("should return the playerone", () => {
    component.gamePlayService.playerOne = {name: "tristan", numDifferencesFound: 7};
    component.gamePlayService.playerTwo = {name: "cromer", numDifferencesFound: 0};
    const player: Player = component.findPlayer();
    expect(player.name).toEqual("tristan");
  });
  it("should return the playertwo", () => {
    spyUserServ.getUsername.and.returnValue("sgtr");
    component.playerOne = {name: "tristan", numDifferencesFound: 7};
    component.playerTwo = {name: "cromer", numDifferencesFound: 0};
    const player: Player = component.findPlayer();
    expect(player.name).toEqual("cromer");
  });

});

  describe("PopupTests (win, errorMessage) ", () => {

    it("displayPopUpLeave should display resetMessage", () => {
      component.gamePlayService.displayPopUp(constants.CAN_DISPLAY_LEAVE_INDEX);
      component.popupError.changes.subscribe(() => {
      const elemnt: ElementRef = component.popupError.first;
      expect(elemnt.nativeElement.style.display).toEqual("block");
      });
    });
    it("displayPopUp Error should not display anything at the start", () => {
      // @ts-ignore
      expect(component.popupError.first).toBeUndefined();
    });
    it("displayPopUpWin should display winMessage", () => {
      component.gamePlayService.displayPopUp(constants.CAN_DISPLAY_WIN_INDEX);
      component.popupWin.changes.subscribe(() => {
        const elemnt: ElementRef = component.popupWin.first;
        expect(elemnt.nativeElement.style.display).toEqual("flex");
      });

    });
    it("displayPopUp Win should not display anything at the start", () => {
      // @ts-ignore
      expect(component.popupWin.first).toBeUndefined();
    });
    it("hidePopUp should not display both popups", () => {
      component.gamePlayService.hidePopUp();
      // @ts-ignore
      expect(component.popupError.first).toBeUndefined();
      expect(component.popupWin.first).toBeUndefined();
    });
  });

  describe("DisplaySystemMessages tests, which receives messages from the webSocket", () => {
    it("should display a system message with the right text in the textbox",  () => {
      const message: string = "Test";
      const date: Date = new Date();
      component.gamePlayService.displaySystemMessage(message);
      const dateMessage: string = component.gamePlayService.addZero(date.getHours()) + ":"
            +  component.gamePlayService.addZero(date.getMinutes()) +
        ":" +  component.gamePlayService.addZero(date.getSeconds()) + " - ";
      const displayedMessage: any = document.getElementsByClassName("systemMessage");
      expect(displayedMessage[0].innerHTML === dateMessage + message).toBeTruthy();
    });
    it("should display the right message", () => {
      const date: Date = new Date();
      component.gamePlayService.displaySystemMessage("allo");
      el = fixture.debugElement.query(By.css("#textBox")).nativeElement;
      expect(el.innerHTML).toContain("allo");
      expect(el.innerHTML).toContain(date.getHours().toString());
      expect(el.innerHTML).toContain(date.getMinutes().toString());
    });
    it("should display the right messages even if multiple", () => {
      const date: Date = new Date();
      component.gamePlayService.displaySystemMessage("Jacques");
      component.gamePlayService.displaySystemMessage("Message plus long pour verifier");
      el = fixture.debugElement.query(By.css("#textBox")).nativeElement;
      expect(el.innerHTML).not.toContain("allo");
      expect(el.innerHTML).toContain("Message plus long pour verifier");
      expect(el.innerHTML).toContain(date.getHours().toString());
      expect(el.innerHTML).toContain(date.getMinutes().toString());
    });
    it("should call the observer", () => {
      spyOn(component.gamePlayService, "displaySystemMessage");
      const test: string = "hey";
      spywebSocket.data.next(test);
      expect(component.gamePlayService.displaySystemMessage).toHaveBeenCalledTimes(1);
    });
  });
  describe("isLeftContainer  ", () => {
    it("should return true when event.x = 600", () => {
      const evt: MouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      spyOnProperty(evt, "clientX").and.returnValue(600);
      expect(component.isLeftContainer(evt)).toBeTruthy();
    });

    it("should return false when event.x = 900", () => {
      const evt: MouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      spyOnProperty(evt, "clientX").and.returnValue(900);
      expect(component.isLeftContainer(evt)).toBeFalsy();
    });

// tslint:disable-next-line:max-file-line-count
  });

  describe("onKeyPress  ", () => {
    it("should call togglecheatmode once when keyevent = t", () => {
      const evt: KeyboardEvent = new KeyboardEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      spyOnProperty(evt, "key").and.returnValue("t");
      component.onKeyPress(evt);
      expect(spyCheatMode.toggleCheatModeActivity).toHaveBeenCalledTimes(1);
    });

    it("shouldnt call togglecheatmode once when keyevent = s", () => {
      const evt: KeyboardEvent = new KeyboardEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      spyOnProperty(evt, "key").and.returnValue("s");
      component.onKeyPress(evt);
      expect(spyCheatMode.toggleCheatModeActivity).toHaveBeenCalledTimes(0);
    });
  });
  describe("displayPopUpError", () => {
    it("should make canDisplayError true", () => {
      component.displayErrorPopUp(1, 1);
      expect(component.arrayPopUps[constants.CAN_DISPLAY_ERROR_INDEX]).toBeTruthy();
    });
    it("should make the cursor not allowed", () => {
      component.displayErrorPopUp(1, 1);
      expect(document.body.style.cursor).toEqual("not-allowed");
    });
  });

  describe("getGame", () => {
    it("should define gameType", () => {
      spyOn(component.route.snapshot.paramMap, "get").and.returnValue("solo");
      component.getGame();
      expect(component.gameType).toEqual("solo");
    });
    it("should call getFreeGame once", () => {
      spyOn(component.route.snapshot.paramMap, "get").and.returnValue("solo");
      const priorCalls: number = spyGameService.getFreeGame.calls.count();
      component.getGame();
      expect(spyGameService.getFreeGame.calls.count() - priorCalls).toEqual(1);
    });
    it("should define game", () => {
      spyOn(component.route.snapshot.paramMap, "get").and.returnValue("solo");
      component.getGame();
      expect(component.game).toEqual(game3);
    });
    it("should call loadExistingScene once", () => {
      spyOn(component.route.snapshot.paramMap, "get").and.returnValue("solo");
      const priorCalls: number = spyRenderService.loadExistingScene.calls.count();
      component.getGame();
      expect(spyRenderService.loadExistingScene.calls.count() - priorCalls).toEqual(1);
    });
    it("should call initializeCheatMode once", () => {
      spyOn(component.route.snapshot.paramMap, "get").and.returnValue("solo");
      const priorCalls: number = spyCheatMode.initializeCheatMode.calls.count();
      component.getGame();
      expect(spyCheatMode.initializeCheatMode.calls.count() - priorCalls).toEqual(1);
    });
    it("should call initializeDifferenceMode once", () => {
      spyOn(component.route.snapshot.paramMap, "get").and.returnValue("solo");
      spyOn(component.freeDiffService, "initializeDifferenceMode");
      component.getGame();
      expect(component.freeDiffService.initializeDifferenceMode).toHaveBeenCalledTimes(1);
    });
    it("should call setGamePlay once", () => {
      spyOn(component.route.snapshot.paramMap, "get").and.returnValue("solo");
      spyOn(component.gamePlayService, "setGamePlay");
      component.getGame();
      expect(component.gamePlayService.setGamePlay).toHaveBeenCalledTimes(1);
    });
  });
  describe("verifyNbDiffs", () => {
    it("should call the right websocket emit", () => {
      component.playerOne.numDifferencesFound = 0;
      component.freeDiffService.differenceCounter = 1;
      component.gameType = "solo";
      component.verifyNbDiffs(1, 1);
      expect(spywebSocket.differenceFound).toHaveBeenCalledTimes(1);
    });
    it("should call displayErrorPopUp once if no difference is found", () => {
      component.playerOne.numDifferencesFound = 0;
      component.freeDiffService.differenceCounter = 0;
      spyOn(component, "displayErrorPopUp");
      component.verifyNbDiffs(1, 1);
      expect(component.displayErrorPopUp).toHaveBeenCalledTimes(1);
    });
    it("should call noDifferencesFound once if no difference is found", () => {
      component.playerOne.numDifferencesFound = 0;
      component.freeDiffService.differenceCounter = 0;
      component.verifyNbDiffs(1, 1);
      expect(spywebSocket.noDifferencesFound).toHaveBeenCalledTimes(1);
    });
    it("should call differenceFound once if a difference is found", () => {
      component.playerOne.numDifferencesFound = 0;
      component.freeDiffService.differenceCounter = 1;
      component.verifyNbDiffs(1, 1);
      expect(spywebSocket.differenceFound).toHaveBeenCalledTimes(1);
    });
  });

  describe("subscribeToGameUpdates", () => {
    it("it should call parseScene twice", () => {
      spyOn(component.sceneService, "parseScene");
      component.subscribeToGameUpdates();
      expect(component.sceneService.parseScene).toHaveBeenCalledTimes(2);
    });
    it("it should call setScenes once", () => {
      const priorCalls: number = spyRenderService.setScenes.calls.count();
      component.subscribeToGameUpdates();
      // tslint:disable-next-line:binary-expression-operand-order
      expect(spyRenderService.setScenes).toHaveBeenCalledTimes(1 + priorCalls);
    });
    it("it should call updateDifferenceMode once", () => {
      spyOn(component.freeDiffService, "updateDifferenceMode");
      component.subscribeToGameUpdates();
      expect(component.freeDiffService.updateDifferenceMode).toHaveBeenCalledTimes(1);
    });
    it("it should call setScenes once", () => {
      const priorCalls: number = spyCheatMode.updateModifiedScene.calls.count();
      component.subscribeToGameUpdates();
      // tslint:disable-next-line:binary-expression-operand-order
      expect(spyCheatMode.updateModifiedScene).toHaveBeenCalledTimes(1 + priorCalls);
    });
  });

  describe("subscribeToUsers", () => {
    it("should call splitUsernames once", () => {
      spyOn(component, "splitUsernames");
      spywebSocket.usersInGame.next("tristan, cromer");
      component.subscribeToUsers();
      expect(component.splitUsernames).toHaveBeenCalledTimes(1);
    });

    it("it should call getGames once", () => {
      spyOn(component, "getGame");
      spywebSocket.usersInGame.next("tristan, cromer");
      component.subscribeToUsers();
      expect(component.getGame).toHaveBeenCalledTimes(1);
    });
  });

  describe("splitUsernames", () => {
    it("should give playerOne the name tristan and the playerTwo the name cromer when given tristan, cromer", () => {
      component.splitUsernames("tristan,cromer");
      expect(component.playerOne.name).toEqual("tristan");
      expect(component.playerTwo.name).toEqual("cromer");
    });
    it("should give playerOne the name tristan and the playerTwo the name empty when given tristan, ", () => {
      component.splitUsernames("tristan,");
      expect(component.playerOne.name).toEqual("tristan");
      expect(component.playerTwo.name).toEqual("");
    });
  });

  describe("onResize", () => {
    it("should call onResize of renderService", () => {
      component.onResize();
      expect(spyRenderService.onResize).toHaveBeenCalledTimes(1);
    });
  });
});
