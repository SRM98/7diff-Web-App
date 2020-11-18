import {HttpClientModule} from "@angular/common/http";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MatDialogModule} from "@angular/material";
import {RouterTestingModule} from "@angular/router/testing";
import {of, Subject} from "rxjs";
import SpyObj = jasmine.SpyObj;
import {game1, GAMES} from "../../app/mock-games";
import { ChatService } from "../chat.service";
import {GameDetailComponent} from "../game-detail/game-detail.component";
import {GameService} from "../game.service";
import {HeaderComponent} from "../header/header.component";
import {IndexService} from "../index.service";
import "../threeJS/js/controls.js";
import {UsernameService} from "../username.service";
import { WebSocketService } from "../webSocket.service";
import {AdminComponent} from "./admin.component";
// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
// tslint:disable:no-any
// tslint:disable:no-non-null-assertion
describe("AdminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let spyGameService: SpyObj<GameService>;
  let spywebSocket: SpyObj<WebSocketService>;
  // tslint:disable-next-line:max-func-body-length
  beforeEach(async(() => {
    spyGameService = jasmine.createSpyObj("GameService", ["getGames", "updateHighScores", "deleteGame", "deleteImg", "getGame",
                                                          "sortPOVs", "getWaitingGame",
                                                          "sortScores", "initScores"]);
    spyGameService.getGames.and.returnValue(of(GAMES));
    spyGameService.updateHighScores.and.returnValue(of(GAMES[0]));
    spyGameService.deleteGame.and.returnValue(of(GAMES));
    spyGameService.deleteImg.and.returnValue(of(GAMES));
    spyGameService.sortPOVs.and.returnValue(GAMES);
    spyGameService.sortScores.and.returnValue(GAMES[0].hsSolo);
    spyGameService.initScores.and.returnValue(GAMES[0].hsSolo);
    spyGameService.getWaitingGame.and.returnValue(of({id: 0, roomname: ""}));
    spywebSocket = jasmine.createSpyObj("WebSocketService", ["joinGame", "connect", "leaveGame", "newHighScore", "leaveWaitingGame"]);
    spywebSocket.leaveWaitingGame.and.returnValue(of());
    spywebSocket.data = new Subject<string>();
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent,
        HeaderComponent,
        GameDetailComponent,
      ],
      providers: [
        IndexService,
        UsernameService,
        ChatService,
        {provide: GameService, useValue: spyGameService },
        {provide: WebSocketService, useValue: spywebSocket},
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
      ],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create the admin component", () => {
    expect(component).toBeTruthy();
  });
  describe("PopupTests (delete, errorMessage, reset) ", () => {
    it("deleteGame should hide the confirm delete popUp", () => {
      component.selectedGame = GAMES[0];
      component.deleteGame();
      expect(component.popUpArrays[0]).toBeFalsy();
    });
    it("confirmAction should show the confirm delete popUp when giving index = 0", () => {
      component.confirmAction(game1, 0);
      expect(component.popUpArrays[0]).toBeTruthy();
    });
    it("hidePopUp should hide errorMessage when given id = 2", () => {
      component.hidePopUp(2);
      expect(component.popUpArrays[2]).toBeFalsy();
    });
    it("hidePopUp should hide the confirm delete popup when given id = 0", () => {
      component.hidePopUp(0);
      expect(component.popUpArrays[0]).toBeFalsy();
    });
    it("hidePopUp should hide the reset confirm popup when given index = 1", () => {
      component.hidePopUp(1);
      expect(component.popUpArrays[1]).toBeFalsy();
    });
    it("confirmAction should show the confirm reset popUp when given id = 1", () => {
      component.confirmAction(GAMES[0], 1);
      expect(component.popUpArrays[1]).toBeTruthy();
    });
  });
  describe("Function confirmDelete() tests ", () => {
  it("confirmAction should set the correct value of selectedGame", () => {
    component.confirmAction(GAMES[0], 1);
    expect(component.selectedGame).toEqual(GAMES[0]);
  });

});
  describe("getGames", () => {
    it("should call getGames once", () =>  {
      component.getGames();
      expect(spyGameService.getGames.calls.count() / 2).toEqual(1);
    });
  });
  describe("sortPOVs", () => {
    it("should call sortPOVs once", () =>  {
      component.sortPOVs();
      expect(spyGameService.sortPOVs.calls.count() / 2).toEqual(2);
    });
  });
  describe("resetHighScores", () => {
    it("should call initScores twice", () =>  {
      component.confirmAction(JSON.parse(JSON.stringify(GAMES[1])), 1);
      component.resetHighScores();
      expect(spyGameService.initScores.calls.count()).toEqual(2);
    });
    it("should call  updateHS once", () =>  {
      component.confirmAction(JSON.parse(JSON.stringify(GAMES[1])), 1);
      component.resetHighScores();
      expect(spyGameService.updateHighScores.calls.count()).toEqual(1);
    });
    it("should call  hidePopUp once", () =>  {
      component.confirmAction(JSON.parse(JSON.stringify(GAMES[1])), 1);
      spyOn(component, "hidePopUp");
      component.resetHighScores();
      expect(component.hidePopUp).toHaveBeenCalledTimes(1);
    });
  });
  describe("deleteGame", () => {
    it("should call deleteGame once", () => {
      component.confirmAction(JSON.parse(JSON.stringify(GAMES[1])), 0);
      component.deleteGame();
      expect(spyGameService.deleteGame).toHaveBeenCalledTimes(1);
    });
    it("should call getWaitingGame once", () => {
      component.confirmAction(JSON.parse(JSON.stringify(GAMES[1])), 0);
      component.deleteGame();
      expect(spyGameService.getWaitingGame).toHaveBeenCalledTimes(1);
    });
    it("should call leaveWaitingGame once", () => {
      component.confirmAction(JSON.parse(JSON.stringify(GAMES[1])), 0);
      component.deleteGame();
      expect(spywebSocket.leaveWaitingGame).toHaveBeenCalledTimes(1);
    });
    it("should call deleteImg once", () => {
      component.confirmAction(JSON.parse(JSON.stringify(GAMES[1])), 0);
      component.deleteGame();
      expect(spyGameService.deleteImg).toHaveBeenCalledTimes(1);
    });
    it("should call hidePopUp once", () => {
      component.confirmAction(JSON.parse(JSON.stringify(GAMES[1])), 0);
      spyOn(component, "hidePopUp");
      component.deleteGame();
      expect(component.hidePopUp).toHaveBeenCalledTimes(1);
    });
  });
});
