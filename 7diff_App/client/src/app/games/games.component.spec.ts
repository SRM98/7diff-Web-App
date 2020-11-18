import {HttpClient, HttpHandler} from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { GAMES} from "../../app/mock-games";
import { ChatService } from "../chat.service";
import {GameDetailComponent} from "../game-detail/game-detail.component";
import SpyObj = jasmine.SpyObj;
import {GameService} from "../game.service";
import { HeaderComponent} from "../header/header.component";
import {UsernameService} from "../username.service";
import { WebSocketService } from "../webSocket.service";
import { GamesComponent } from "./games.component";

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
// tslint:disable:no-any
// tslint:disable:prefer-const

describe("GamesComponent", () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let spyGameService: SpyObj<GameService>;
  const joinAlert: string = JSON.stringify({data: "waitingGameJoinAlert", gameURL: "/simpleGame/1/1v1/bonjour" });
  const leaveAlert: string = JSON.stringify({data: "waitingGameLeaveAlert", gameURL: "/simpleGame/1/1v1/bonjour" });
  beforeEach(async(() => {
    spyGameService = jasmine.createSpyObj("GameService", ["getGames", "sortPOVs", "getWaitingRoom", "sortScores"]);
    spyGameService.getGames.and.returnValue(of(GAMES));
    spyGameService.sortPOVs.and.returnValue([GAMES[0], GAMES[2]]);
    spyGameService.getWaitingRoom.and.returnValue(of([{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}]));
    spyGameService.sortScores.and.returnValue(GAMES[0].hsSolo);

    TestBed.configureTestingModule({
      declarations: [ GamesComponent, HeaderComponent, GameDetailComponent ],
      providers: [UsernameService,
                  HttpClient,
                  HttpHandler,
                  ChatService,
                  WebSocketService,
                  {provide: GameService, useValue: spyGameService },
                  ],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    spyOn(component.router, "navigate").and.returnValue(true);
    expect(component).toBeTruthy();
  });
  describe("getGames", () => {
    it("should initialize the attribute games", () => {
      component.getGames();
      expect(component.games).toEqual(GAMES);
    });

    it("should call getWaitingRoom once", () => {
      spyOn(component, "getWaitingRoom");
      component.getGames();
      expect(component.getWaitingRoom).toHaveBeenCalledTimes(1);
    });

    it("should call listenToWebSocket once", () => {
      spyOn(component, "listenToWebSocket");
      component.getGames();
      expect(component.listenToWebSocket).toHaveBeenCalledTimes(1);
    });
  } );

  describe("getWaitingRoom", () => {
    it("should initialize the attribute waitingRoom", () => {
      component.getWaitingRoom();
      expect(component.waitingRoom).toEqual([{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}]);
    });
    it("should call initializeInterface once", () => {
      spyOn(component, "initializeInterface");
      component.getWaitingRoom();
      expect(component.initializeInterface).toHaveBeenCalledTimes(1);
    });
  });
  describe("extractPOV", () => {
    it("should return simpleGame when given /simpleGame/1/1v1/bonjour ", () => {
      expect(component.extractPOV("/simpleGame/1/1v1/bonjour")).toEqual("simpleGame");
    });
    it("should return freeGame when given freeGame/1/1v1/bonjour ", () => {
      expect(component.extractPOV("/freeGame/1/1v1/bonjour")).toEqual("freeGame");
    });
  });

  describe("extractID", () => {
    it("should return 1 when given /simpleGame/1/1v1/bonjour ", () => {
      expect(component.extractID("/simpleGame/1/1v1/bonjour")).toEqual(1);
    });
    it("should return 1 when given /freeGame/1/1v1/bonjour ", () => {
      expect(component.extractID("/freeGame/1/1v1/bonjour")).toEqual(1);
    });
    it("should return 10 when given /freeGame/10/1v1/bonjour ", () => {
      expect(component.extractID("/freeGame/10/1v1/bonjour")).toEqual(10);
    });
  });

  describe("navigateToGame", () => {
    it("should navigate to /simpleGame/1/1v1/bonjour when given the game with id = 1", () => {
      component.username = "salut";
      spyOn(component.router, "navigate");
      component.navigateToGame(GAMES[0]);
      expect(component.router.navigate).toHaveBeenCalledWith(["/simpleGame/1/1v1/bonjour"]);
    });
    it("should navigate to /freeGame/5/1v1/salut when given the game with id = 5", () => {
      component.username = "salut";
      spyOn(component.router, "navigate");
      component.navigateToGame(GAMES[2]);
      expect(component.router.navigate).toHaveBeenCalledWith(["/freeGame/5/1v1/salut"]);
    });
  });

  describe("listenToWebSocket", () => {
    it("should call extract id once", () => {
      // @ts-ignore
      component.webSocket.waitingGameAlert = of(joinAlert);
      spyOn(component, "extractID");
      component.listenToWebSocket();
      expect(component.extractID).toHaveBeenCalledTimes(1);
    });

    it("should call extractPOV once", () => {
      // @ts-ignore
      component.webSocket.waitingGameAlert = of(joinAlert);
      spyOn(component, "extractPOV");
      component.listenToWebSocket();
      expect(component.extractPOV).toHaveBeenCalledTimes(1);
    });

    it("should call changeButtonsText with Joindre once when data = waitingGameJoinAlert", () => {
      // @ts-ignore
      component.webSocket.waitingGameAlert = of(joinAlert);
      spyOn(component, "changeButtonsText");
      component.listenToWebSocket();
      expect(component.changeButtonsText).toHaveBeenCalledWith("simpleGame", 1, "Joindre");
    });

    it("should call addWaitingGame with id =1 and gameurl = /simpleGame/1/1v1/bonjour when data = waitingGameJoinAlert", () => {
      // @ts-ignore
      component.webSocket.waitingGameAlert = of(joinAlert);
      spyOn(component, "addWaitingGame");
      component.listenToWebSocket();
      expect(component.addWaitingGame).toHaveBeenCalledWith(1, "/simpleGame/1/1v1/bonjour");
    });

    it("should call changeButtonsText with Créer once when data = waitingGameLeaveAlert", () => {
      // @ts-ignore
      component.webSocket.waitingGameAlert = of(leaveAlert);
      spyOn(component, "changeButtonsText");
      component.listenToWebSocket();
      expect(component.changeButtonsText).toHaveBeenCalledWith("simpleGame", 1, "Créer");
    });

    it("should call removeWaitingGame with id = 1 once when data = waitingGameLeaveAlert", () => {
      // @ts-ignore
      component.webSocket.waitingGameAlert = of(leaveAlert);
      spyOn(component, "removeWaitingGame");
      component.listenToWebSocket();
      expect(component.removeWaitingGame).toHaveBeenCalledWith(1);
    });

  });

  describe("changeButtonsText", () => {
    it("should change the 1st game of simpleGamesInterface's text to Créer when given pov = simpleGame, id = 1 and text = Créer", () => {
      component.changeButtonsText("simpleGame", 1, "Créer");
      expect(component.simpleGamesInterface[0].playButtonText).toEqual("Créer");
    });
    it("should change the 1st game of freeGamesInterface's text to Joindre when given pov = freeGame, id = 5 and text = Joindre", () => {
      component.changeButtonsText("freeGame", 5, "Joindre");
      expect(component.freeGamesInterface[0].playButtonText).toEqual("Joindre");
    });
  });

  describe("isWaitingGame", () => {
    it("should return true when given id = 1", () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      expect(component.isWaitingGame(1)).toBeTruthy();
    });
    it("should return false when given id = 5", () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      expect(component.isWaitingGame(5)).toBeFalsy();
    });
  });

  describe("getWaitingameURL", () => {
    it("should return /simpleGame/1/1v1/bonjour when given id = 1", () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      expect(component.getWaitingGameURL(1)).toEqual("/simpleGame/1/1v1/bonjour");
    });
    it("should return an empty string when given id = 5", () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      expect(component.getWaitingGameURL(5)).toEqual("");
    });
  });

  describe("removeWaitingGame", () => {
    it("should remove game1 from waitingRoom when given id = 1", () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      component.removeWaitingGame(1);
      expect(component.waitingRoom).toEqual([]);
    });
    it("should shouldn't do anything when given id = 5", () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      component.removeWaitingGame(5);
      expect(component.waitingRoom).toEqual([{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}]);
    });
  });

  describe("addWaitingGame", () => {
    it("should add game to waitingRoom when given id = 5 and roomname = /freeGame/5/1v1/bonjour", () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      component.addWaitingGame(5, "/freeGame/5/1v1/bonjour");
      expect(component.waitingRoom).toEqual([{id: 1, roomname: "/simpleGame/1/1v1/bonjour"},
                                             {id: 5, roomname: "/freeGame/5/1v1/bonjour"}]);
    });

    it("shouldnt add game to waitingRoom when given id = 1" , () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      component.addWaitingGame(1, "/simpleGame/1/1v1/bonjour");
      expect(component.waitingRoom).toEqual([{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}]);
    });
  });

  describe("initializeInterface", () => {
    it("should put 2 games in simpleGamesInterface when given GAMES", () => {
      component.simpleGamesInterface = [];
      component.initializeInterface(GAMES);
      expect(component.simpleGamesInterface.length).toEqual(2);
    });
    it("should put 2 games in freeGamesInterface when given GAMES", () => {
      component.freeGamesInterface = [];
      component.initializeInterface(GAMES);
      expect(component.freeGamesInterface.length).toEqual(2);
    });
    it("should put the 1st game's button text to Joindre when given GAMES ", () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      component.simpleGamesInterface = [];
      component.simpleGamesInterface = [];
      component.initializeInterface(GAMES);
      expect(component.simpleGamesInterface[0].playButtonText).toEqual("Joindre");
    });
    it("should put the all the other games' button text to Créer when given GAMES ", () => {
      component.waitingRoom = [{id: 1, roomname: "/simpleGame/1/1v1/bonjour"}];
      component.simpleGamesInterface = [];
      component.simpleGamesInterface = [];
      component.initializeInterface(GAMES);
      expect(component.simpleGamesInterface[1].playButtonText).toEqual("Créer");
      expect(component.freeGamesInterface[0].playButtonText).toEqual("Créer");
      expect(component.freeGamesInterface[1].playButtonText).toEqual("Créer");
    });

  });
});
