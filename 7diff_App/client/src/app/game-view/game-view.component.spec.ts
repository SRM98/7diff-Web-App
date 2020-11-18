import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {MatDialogModule} from "@angular/material";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import { of, Subject } from "rxjs";
import * as constants from "../../../../common/constants";
import {game3, GAMES} from "../../app/mock-games";
import {ChronoService} from "../chrono.service";
import SpyObj = jasmine.SpyObj;
import { GamePlayService } from "../game-play.service";
import {GameService} from "../game.service";
import {IndexService} from "../index.service";
import {UsernameService} from "../username.service";
import { WebSocketService } from "../webSocket.service";
import { GameViewComponent } from "./game-view.component";

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
// tslint:disable:no-any
// tslint:disable:no-non-null-assertion
// tslint:disable:prefer-const

describe("GameViewComponent", () => {
  let component: GameViewComponent;
  let fixture: ComponentFixture<GameViewComponent>;
  let spywebSocket: SpyObj<WebSocketService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let el: HTMLElement;
  let spyGameService: SpyObj<GameService>;
  let spyChronoService: SpyObj<ChronoService>;
  let spyUserService: SpyObj<UsernameService>;

  // tslint:disable-next-line:max-func-body-length
  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "get"]);
    httpClientSpy.post.and.returnValue(of());
    httpClientSpy.get.and.returnValue(of("hey"));
    spywebSocket = jasmine.createSpyObj("WebSocketService", ["joinGame", "connect", "leaveGame", "newHighScore", "sendWaitingGameAlert",
                                                             "sendLeftWaitingGameAlert", "noDifferencesFound", "differenceFound",
                                                             ]);
    spywebSocket.data = new Subject<string>();
    spywebSocket.waitingGameAlert = new Subject<string>();
    spywebSocket.usersInGame = new Subject<string>();
    spywebSocket.finishGame = new Subject<string>();
    spywebSocket.highScoreAlert = new Subject<string>();
    // tslint:disable-next-line:max-line-length
    spyGameService = jasmine.createSpyObj("GameService", ["getGames", "updateHighScores", "getSimpleGame", "deleteGame", "deleteImg", "getGame", "sortPOVs", "sendPostRequest", "addWaitingGame", "deleteWaitingGame", "positionHighScore", "getSortedScores", "getNewScorePosition"]);
    spyGameService.getGames.and.returnValue(of(GAMES));
    spyGameService.getSimpleGame.and.returnValue(of(game3));
    spyGameService.updateHighScores.and.returnValue(of(GAMES[0]));
    spyGameService.deleteGame.and.returnValue(of(GAMES));
    spyGameService.deleteImg.and.returnValue(of(GAMES));
    spyGameService.addWaitingGame.and.returnValue(of());
    spyGameService.deleteWaitingGame.and.returnValue(of());
    spyGameService.getSortedScores.and.returnValue(of(GAMES[0].hsSolo));
    spyGameService.getNewScorePosition.and.returnValue(of("4"));

    spyChronoService = jasmine.createSpyObj("ChronoService", ["startTimer", "stopTimer", "resetTimer", "getTime", "getTimeDisplay"]);
    spyChronoService.stopTimer.and.returnValue(of());
    spyChronoService.resetTimer.and.returnValue(of());
    // tslint:disable-next-line:no-magic-numbers
    spyChronoService.getTime.and.returnValue(70);
    spyChronoService.getTimeDisplay.and.returnValue("1:10");

    spyUserService = jasmine.createSpyObj("UsernameService", ["getUsername"]);
    spyUserService.getUsername.and.returnValue("hugo");

    TestBed.configureTestingModule({
      providers: [
        IndexService,
        {provide: UsernameService, useValue: spyUserService},
        {provide: WebSocketService, useValue: spywebSocket },
        {provide: GameService, useValue: spyGameService },
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: ChronoService, useValue: spyChronoService},
        GamePlayService,
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
      ],
      declarations: [ GameViewComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the gameView COmponent", () => {
    expect(component).toBeTruthy();
  });

  describe("Click events - tests", () => {

  it("Clicking on game Image should call clickedOriginal function", () => {
    fixture.detectChanges();
    spyOn(component, "clickedOriginal");
    el = fixture.debugElement.query(By.css("#originalImageDisplay")).nativeElement;
    el.click();
    expect(component.clickedOriginal).toHaveBeenCalledTimes(1);
  });

  it("clicking on game Image should call clickedModified", () => {
    fixture.detectChanges();
    spyOn(component, "clickedModified");
    el = fixture.debugElement.query(By.css("#modifiedImageDisplay")).nativeElement;
    el.click();
    expect(component.clickedModified).toHaveBeenCalledTimes(1);
  });

  it("clicking on image should send a httpreq, but if it doesn't, img src should undefined", () => {
    fixture.detectChanges();
    spyOn(component, "clickedModified");
    el = fixture.debugElement.query(By.css("#modifiedImageDisplay")).nativeElement;
    el.click();
    expect(component.game.modifiedGameImg).toBeUndefined();
  });

  it("clicking on Ok should end the game when its finished on winPopup",  () => {
    component.gamePlayService.displayPopUp(constants.CAN_DISPLAY_WIN_INDEX);
    fixture.detectChanges();
    spyOn(component, "leaveGame");
    el = fixture.debugElement.query(By.css("#buttonOk")).nativeElement;
    el.click();
    expect(component.leaveGame).toHaveBeenCalledTimes(1);
  });
  it("clicking on Ok should end the game when its finished on losePopup",  () => {
    component.gamePlayService.displayPopUp(constants.CAN_DISPLAY_LOSE_INDEX);
    fixture.detectChanges();
    spyOn(component, "leaveGame");
    el = fixture.debugElement.query(By.css("#buttonOk")).nativeElement;
    el.click();
    expect(component.leaveGame).toHaveBeenCalledTimes(1);
  });
  it("clicking on Ok should end the game when its finished on leavepopup",  () => {
    component.gamePlayService.displayPopUp(constants.CAN_DISPLAY_LEAVE_INDEX);
    fixture.detectChanges();
    spyOn(component, "leaveGame");
    el = fixture.debugElement.query(By.css("#buttonOk")).nativeElement;
    el.click();
    expect(component.leaveGame).toHaveBeenCalledTimes(1);
  });
  it("should call the function when passed the right parameters", () => {
    fixture.detectChanges();
    spyOn(component, "findRealPosition");
    el = fixture.debugElement.query(By.css("#originalImageDisplay")).nativeElement;
    el.click();
    expect(component.findRealPosition).toHaveBeenCalledTimes(1);
  });
});

  describe("Game Functionment - Differences, router tests", () => {

  // @ts-ignore
  it("should navigate to to the list of game when game ends", (() => {
      spyOn(component.router, "navigate").and.returnValue(true);
      component.leaveGame();
      expect(component.router.navigate).toHaveBeenCalledWith(["/listOfGames"]);

  }));

  it("should leaveGame properly; call function and use router", () => {
    spyOn(component.router, "navigate").and.returnValue(true);
    component.leaveGame();
    expect(component.router.navigate).toHaveBeenCalledWith(["/listOfGames"]);
    expect(spywebSocket.leaveGame).toHaveBeenCalledTimes(1);

  });

  it("should be able to play even if game is deleted", () => {
    // tslint:disable-next-line:no-any
    const games: any = spyGameService.getGames();
    spyGameService.deleteGame(games[0]);
    expect(games[0]).toBeUndefined();

  });

  it("should disable the clicks once game is over", () => {
    component.gamePlayService.playerOne = {name: "tristan", numDifferencesFound: 7};
    component.gamePlayService.playerTwo = {name: "cromer", numDifferencesFound: 0};
    component.gamePlayService.finishGame("tristan");
    expect(component.arrayPopUps[5]).toBeFalsy();
    spyOn(component, "findRealPosition");
    el = fixture.debugElement.query(By.css("#originalImageDisplay")).nativeElement;
    el.click();
    expect(component.findRealPosition).toHaveBeenCalledTimes(0);
  });
  it("Websocket should emit that a diff has been found when the service returns one", async(() => {
    const test: number = 1;
    httpClientSpy.post.and.returnValue(of(({fichier: "allo", diff: test})));
    component.gamePlayService.playerOne = {name: "Hugo", numDifferencesFound: 0};
    component.gamePlayService.playerTwo = {name: "cromer", numDifferencesFound: 0};
    component.arrayPopUps[5] = true;
    const rect: ClientRect = document.getElementById("originalImageDisplay")!.getBoundingClientRect();
    component.findRealPosition(1, 1, rect);
    expect(spywebSocket.differenceFound).toHaveBeenCalledTimes(1);
    expect(component.arrayPopUps[constants.CAN_DISPLAY_ERROR_INDEX]).toBeFalsy();
  }));

});

  describe("Popups Tests - Win/lose/Error", () => {
  it("displayPopUpWin should not display anything at the start", () => {
    // @ts-ignore
    expect(component.popupError.first).toBeUndefined();
  });
  it("displayPopUp should display winMessage when given game is won", () => {
    component.gamePlayService.displayPopUp(constants.CAN_DISPLAY_WIN_INDEX);
    component.popupWin.changes.subscribe(() => {
      const elemnt: ElementRef = component.popupWin.first;
      expect(elemnt.nativeElement.style.display).toEqual("flex");
    });
  });
  it("displayPopUpWin should not display anything at the start", () => {
    expect(component.popupWin.first).toBeUndefined();
  });
  it("hidePopUp should not display both popups", () => {
    component.gamePlayService.hidePopUp();
    expect(component.popupError.first).toBeUndefined();
  });
  it("hidePopUp should not display both popups", () => {
    component.gamePlayService.hidePopUp();
    expect(component.popupWin.first).toBeUndefined();
  });

  it("displayErrorPopUp should not allow to click", async(() => {
    // tslint:disable-next-line:no-non-null-assertion
    const rect: ClientRect = document.getElementById("originalImageDisplay")!.getBoundingClientRect();
    component.displayErrorPopUp(1, 1, rect);
    expect(component.arrayPopUps[5]).toBeFalsy();
  }));

  it("displayErrorPopUp should show the error popup", async(() => {
    // tslint:disable-next-line:no-non-null-assertion
    const rect: ClientRect = document.getElementById("originalImageDisplay")!.getBoundingClientRect();
    component.displayErrorPopUp(1, 1, rect);
    expect(component.arrayPopUps[constants.CAN_DISPLAY_ERROR_INDEX]).toBeTruthy();
  }));

  it("displayErrorPopUp should change the cursor", async(() => {
    // tslint:disable-next-line:no-non-null-assertion
    const rect: ClientRect = document.getElementById("originalImageDisplay")!.getBoundingClientRect();
    component.displayErrorPopUp(1, 1, rect);
    expect(document.body.style.cursor).toEqual("not-allowed");
  }));

  it("displayErrorPopUp/audio should only show for the correct player", async(() => {
    const test: number = 0;
    httpClientSpy.post.and.returnValue(of(({fichier: "allo", diff: test})));
    component.gamePlayService.playerOne = {name: "Hugo", numDifferencesFound: 0};
    component.gamePlayService.playerTwo = {name: "cromer", numDifferencesFound: 0};
    spyOn(component, "displayErrorPopUp");
    component.arrayPopUps[5] = true;
    spyOn(component.gamePlayService, "playAudio");
    const rect: ClientRect = document.getElementById("originalImageDisplay")!.getBoundingClientRect();
    component.findRealPosition(1, 1, rect);
    expect(component.displayErrorPopUp).toHaveBeenCalledTimes(1);
    expect(component.user.getUsername()).toEqual("hugo");
    expect(component.gamePlayService.playAudio).toHaveBeenCalledTimes(1);

  }));
  it("should displayOpphasleft popup when opponent has left the game", () => {
    spywebSocket.finishGame.next("leaveGame");
    expect(component.arrayPopUps[constants.CAN_DISPLAY_OPP_HAS_LEFT_INDEX]).toBeTruthy();
  });
  it("should display losePopup for the loser", () => {
    component.gamePlayService.playerOne = {name: "tristan", numDifferencesFound: 7};
    component.gamePlayService.playerTwo = {name: "cromer", numDifferencesFound: 0};
    component.gamePlayService.finishGame("cromer");
    expect(component.arrayPopUps[constants.CAN_DISPLAY_LOSE_INDEX]).toBeTruthy();
  });
  it("should display popupwin for the winner!", () => {
    component.gamePlayService.playerOne = {name: "hugo", numDifferencesFound: 4};
    component.gamePlayService.playerTwo = {name: "cromer", numDifferencesFound: 0};
    component.gamePlayService.finishGame("hugo");
    expect(component.arrayPopUps[constants.CAN_DISPLAY_WIN_INDEX]).toBeTruthy();
  });

  it("should display popupwin for the winner solo!", () => {
    component.gamePlayService.playerOne = {name: "hugo", numDifferencesFound: 7};
    component.gamePlayService.finishGame("hugo");
    expect(component.arrayPopUps[constants.CAN_DISPLAY_WIN_INDEX]).toBeTruthy();
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
    const displayedMessage: HTMLCollectionOf<Element> = document.getElementsByClassName("systemMessage");
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

  it("should notify the observer and display the highscore message", async() => {
    const date: Date = new Date();
    const test: string = "Hugo is a beast";
    spywebSocket.highScoreAlert.next(test);
    el = fixture.debugElement.query(By.css("#textBox")).nativeElement;
    expect(el.innerHTML).not.toContain("allo");
    expect(el.innerHTML).toContain("Hugo is a beast");
    expect(el.innerHTML).toContain(date.getHours().toString());
    expect(el.innerHTML).toContain(date.getMinutes().toString());

  });
  it("should notify the observer and call the finishGame method", () => {
     spyOn(component.gamePlayService, "finishGame");
     const test: string = "hugo";
     spywebSocket.finishGame.next(test);
     expect(component.gamePlayService.finishGame).toHaveBeenCalledTimes(1);
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

  describe("clickModified", () => {
    it("should call findRealPosition once", () => {
      const evt: MouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      spyOnProperty(evt, "clientX").and.returnValue(600);
      spyOnProperty(evt, "clientY").and.returnValue(600);
      spyOn(component, "findRealPosition");
      component.clickedModified(evt);
      expect(component.findRealPosition).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateImg", () => {
    it("should call get request when message is Différence trouvée", () => {
      component.updateImg("Différence trouvée");
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it("shouldnt call get request when message is Erreur didentification", () => {
      component.updateImg("Erreur d'identification");
      expect(httpClientSpy.get).toHaveBeenCalledTimes(0);
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

});
