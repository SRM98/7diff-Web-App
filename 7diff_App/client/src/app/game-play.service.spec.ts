import { HttpClient } from "@angular/common/http";
import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of, Subject } from "rxjs";
import { Player } from "../../../common/player";
import { game1, game3, GAMES } from "../app/mock-games";
import { ChronoService } from "./chrono.service";
import { GamePlayService } from "./game-play.service";
import { GameService } from "./game.service";
import { UsernameService } from "./username.service";
import { WebSocketService } from "./webSocket.service";

// tslint:disable:no-any
// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count

describe("GamePlayService", () => {
  let httpClientSpy: any;
  let spyGameService: any;
  let spywebSocket: any;
  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    httpClientSpy.get.and.returnValue(of());

    spyGameService = jasmine.createSpyObj("GameService", ["getGames", "updateHighScores", "deleteGame", "deleteImg",
                                                          "getGame", "sortPOVs", "sortScores", "getSortedScores",
                                                          "hasNewHighScore", "addWaitingGame",
                                                          "deleteWaitingGame", "positionHighScore", "hasNewHighScore",
                                                          "getSortedScores", "getNewScorePosition"]);
    spyGameService.getGames.and.returnValue(of(GAMES));
    spyGameService.updateHighScores.and.returnValue(of(GAMES[0]));
    spyGameService.deleteGame.and.returnValue(of(GAMES));
    spyGameService.deleteImg.and.returnValue(of(GAMES));
    spyGameService.addWaitingGame.and.returnValue(of());
    spyGameService.deleteWaitingGame.and.returnValue(of());
    spywebSocket = jasmine.createSpyObj("WebSocketService", ["joinGame", "connect", "gameOver", "leaveGame",
                                                             "newHighScore", "sendWaitingGameAlert", "sendLeftWaitingGameAlert"]);
    spywebSocket.data = new Subject<string>();

    TestBed.configureTestingModule({
                                     providers : [ {provide: HttpClient, useValue: httpClientSpy},
                                                   {provide: GameService, useValue: spyGameService},
                                                   {provide: WebSocketService, useValue: spywebSocket },
                                                   UsernameService,
                                                   ChronoService,
                                                   ],
                                     imports: [RouterTestingModule],
                                   }).compileComponents();
}));

  it("should be created", () => {
    const service: GamePlayService = TestBed.get(GamePlayService);
    expect(service).toBeTruthy();
  });

  describe("playAudio", () => {
    it("playAudio should call get request once when there is a difference ", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playAudio(true);
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);

    });

    it("playAudio should call get request once when there is no difference ", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playAudio(false);
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);

    });
  });

  describe("Function addZero() tests", async() => {
    it("addZero should return the new time with the right amount of zeros",  () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      const numb: number = 1;
      const time: any = service.addZero(numb);
      expect(time).toEqual("01");

    });

    it("addZero should return the right time with the right amount of zeros", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      const numb: number = 11;
      const time: any = service.addZero(numb);
      expect(time).toEqual(11);

    });
  });

  describe("updateHighScores", () => {

    it(" should call (gameservice)updateHignScores once ", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne = {name: "tristan", numDifferencesFound: 0};
      service.playerTwo = {name: "cromer", numDifferencesFound: 7};
      service.updateHighScores(1, "00:01", "cromer");
      expect(spyGameService.updateHighScores.calls.count()).toEqual(1);
    });
    it("should add the proper new score to the scores' array ", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne = {name: "tristan", numDifferencesFound: 7};
      service.playerTwo = {name: "cromer", numDifferencesFound: 0};
      service.gameType = "solo";
      service.updateHighScores(70, "1:10", "tristan");
      expect(service.game.hsSolo[service.game.hsSolo.length - 1].user).toEqual("tristan");
      expect(service.game.hsSolo[service.game.hsSolo.length - 1].time).toEqual(70);
      expect(service.game.hsSolo[service.game.hsSolo.length - 1].timeString).toEqual("1:10");
    });
    it("should add the new score to the hsSolo array when gametype = solo ", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne = {name: "tristan", numDifferencesFound: 7};
      service.playerTwo = {name: "cromer", numDifferencesFound: 0};
      service.gameType = "solo";
      service.game = JSON.parse(JSON.stringify(game3));
      const expectedResultSolo: number = game3.hsSolo.length + 1;
      const expectedResult1VS1: number = game3.hs1VS1.length;
      service.updateHighScores(1, "00:01", "tristan");
      expect(service.game.hsSolo.length).toEqual(expectedResultSolo);
      expect(service.game.hs1VS1.length).toEqual(expectedResult1VS1);
    });
    it("should add the new score to the hs1VS1 array when gametype = 1VS1 ", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne = {name: "tristan", numDifferencesFound: 7};
      service.playerTwo = {name: "cromer", numDifferencesFound: 0};
      service.game = game1;
      service.gameType = "hs1VS1";
      const expectedResultSolo: number = game1.hsSolo.length;
      const expectedResult1VS1: number = game1.hs1VS1.length + 1;
      service.updateHighScores(1, "00:01", "tristan");
      expect(service.game.hsSolo.length).toEqual(expectedResultSolo);
      expect(service.game.hs1VS1.length).toEqual(expectedResult1VS1);
    });
  });

  describe("setGamePlay", () => {
    it("should give to the attributes the proper values passed in parameters", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      const playerOne: Player = {name: "tristan", numDifferencesFound: 7};
      const playerTwo: Player = {name: "cromer", numDifferencesFound: 0};
      service.setGamePlay(game1, "bonjour", "solo", playerOne, playerTwo);
      expect(service.game).toEqual(game1);
      expect(service.gameURL).toEqual("bonjour");
      expect(service.gameType).toEqual("solo");
      expect(service.playerOne).toEqual(playerOne);
      expect(service.playerTwo).toEqual(playerTwo);
    });
    it("should make numdiff = 7 when given gameType = solo ", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      const playerOne: Player = {name: "tristan", numDifferencesFound: 7};
      const playerTwo: Player = {name: "cromer", numDifferencesFound: 0};
      service.setGamePlay(game1, "bonjour", "solo", playerOne, playerTwo);
      expect(service.numberOfDifferences).toEqual(7);
    });
    it("should make numdiff = 4 when given gameType = 1v1", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      const playerOne: Player = {name: "tristan", numDifferencesFound: 7};
      const playerTwo: Player = {name: "cromer", numDifferencesFound: 0};
      service.setGamePlay(game1, "bonjour", "1v1", playerOne, playerTwo);
      expect(service.numberOfDifferences).toEqual(4);
    });
  });

  describe("function updateScoreBoard", () => {
    it("should increase player one's differences counter", () => {

    const service: GamePlayService = TestBed.get(GamePlayService);
    service.playerOne = {name: "tristan", numDifferencesFound: 0};
    service.playerTwo = {name: "cromer", numDifferencesFound: 0};
    service.gameType = "1v1";
    service.updateScoreboard("Différence trouvée par tristan");
    expect(service.playerOne.numDifferencesFound).toEqual(1);
    });
    it("should increase player two's differences counter", () => {

      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne = {name: "tristan", numDifferencesFound: 0};
      service.playerTwo = {name: "cromer", numDifferencesFound: 0};
      service.gameType = "1v1";
      service.updateScoreboard("Différence trouvée par cromer");
      expect(service.playerTwo.numDifferencesFound).toEqual(1);
      expect(service.playerOne.numDifferencesFound).toEqual(0);
      });

    it("should not increase any player's differences counter if error is found", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne = {name: "tristan", numDifferencesFound: 0};
      service.playerTwo = {name: "cromer", numDifferencesFound: 0};
      service.gameType = "1v1";
      service.updateScoreboard("Erreur d'identification trouvée par cromer");
      expect(service.playerOne.numDifferencesFound).toEqual(0);
      expect(service.playerTwo.numDifferencesFound).toEqual(0);
    });
    it("should increase solo player's difference counter", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne = {name: "tristan", numDifferencesFound: 0};
      service.playerTwo = {name: "cromer", numDifferencesFound: 0};
      service.gameType = "solo";
      service.updateScoreboard("Différence trouvée");
      expect(service.playerOne.numDifferencesFound).toEqual(1);
    });

  });

  describe("function isGameOver", () => {
  it("should not end game if number of differences isnt 4 -1v1", () => {
    const service: GamePlayService = TestBed.get(GamePlayService);
    service.playerOne = {name: "tristan", numDifferencesFound: 3};
    service.playerTwo = {name: "cromer", numDifferencesFound: 2};
    service.gameType = "1v1";
    service.numberOfDifferences = 4;
    service.isGameOver();
    expect(spywebSocket.gameOver).toHaveBeenCalledTimes(0);
  });

  it("should end game if number of differences is 4 -1 v1", () => {
    const service: GamePlayService = TestBed.get(GamePlayService);
    service.playerOne = {name: "tristan", numDifferencesFound: 4};
    service.playerTwo = {name: "cromer", numDifferencesFound: 3};
    service.gameType = "1v1";
    service.numberOfDifferences = 4;
    service.isGameOver();
    expect(spywebSocket.gameOver).toHaveBeenCalledTimes(1);
  });
  it("should end game if number of differences is 7 -solo", () => {
    const service: GamePlayService = TestBed.get(GamePlayService);
    service.playerOne = {name: "tristan", numDifferencesFound: 7};
    service.gameType = "solo";
    service.numberOfDifferences = 7;
    service.isGameOver();
    expect(spywebSocket.gameOver).toHaveBeenCalledTimes(1);
  });
  it("should end game if number of differences isn't 7 -solo", () => {
    const service: GamePlayService = TestBed.get(GamePlayService);
    service.playerOne = {name: "tristan", numDifferencesFound: 6};
    service.playerTwo = {name: "cromer", numDifferencesFound: 0};
    service.gameType = "solo";
    service.numberOfDifferences = 7;
    service.isGameOver();
    expect(spywebSocket.gameOver).toHaveBeenCalledTimes(0);
  });
});

  describe("isGameReady", () => {
    it("should return false when playerOne name is null", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne.name = "";
      expect(service.isGameReady()).toBeFalsy();
    });
    it("should return true when playerOne name isnt null and the gametype is solo", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne.name = "tristan";
      service.gameType = "solo";
      expect(service.isGameReady()).toBeTruthy();
    });
    it("should return false when playerTwo name is null and the gametype is 1v1", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne.name = "tristan";
      service.playerTwo.name = "";
      service.gameType = "1v1";
      expect(service.isGameReady()).toBeFalsy();
    });
    it("should return false when playerTwo name isnt null and the gametype is 1v1", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.playerOne.name = "tristan";
      service.playerTwo.name = "cromer";
      service.gameType = "1v1";
      expect(service.isGameReady()).toBeTruthy();
    });
  });

  describe("isGameOver", () => {
    it("should make the winner the 1st player when the 1st player found all differences", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.gameURL = "bonjour";
      service.numberOfDifferences = 4;
      service.playerOne.name = "tristan";
      service.playerOne.numDifferencesFound = 4;
      service.playerTwo.name = "cromer";
      service.playerTwo.numDifferencesFound = 0;
      service.isGameOver();
      expect(spywebSocket.gameOver).toHaveBeenCalledWith("bonjour", "tristan" );
    });
    it("should make the winner the 2nd player when the 2nd player found all differences", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.gameURL = "bonjour";
      service.numberOfDifferences = 4;
      service.playerOne.name = "tristan";
      service.playerOne.numDifferencesFound = 0;
      service.playerTwo.name = "cromer";
      service.playerTwo.numDifferencesFound = 4;
      service.isGameOver();
      expect(spywebSocket.gameOver).toHaveBeenCalledWith("bonjour", "cromer" );
    });
  });

  describe("startGame", () => {
    it("should not display scenecover when the game is ready", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      spyOn(service, "isGameReady").and.returnValue(true);
      service.startGame();
      expect(service.arrayPopUps[6]).toEqual(false);
    });
    it("should start the timer when the game is ready", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      spyOn(service, "isGameReady").and.returnValue(true);
      spyOn(service.chronoService, "startTimer");
      service.startGame();
      expect(service.chronoService.startTimer).toHaveBeenCalledTimes(1);
    });
    it("shouldn't start the timer when the game is not ready", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      spyOn(service, "isGameReady").and.returnValue(false);
      spyOn(service.chronoService, "startTimer");
      service.startGame();
      expect(service.chronoService.startTimer).toHaveBeenCalledTimes(0);
    });

    it("should leave the waiting room when the game is ready to start ( tests that multiple 1v1 games take place ", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      spyOn(service, "isGameReady").and.returnValue(true);
      spyOn(service, "leaveWaitingRoom");
      service.startGame();
      expect(service.leaveWaitingRoom).toHaveBeenCalledTimes(1);
    });

  });

  describe("getPlayers", () => {
    it("should not display the 2nd player when gametype = solo", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.gameType = "solo";
      service.getPlayers();
      expect(service.arrayPopUps[7]).toBeFalsy();
    });
    it("should display the 2nd player when gametype = 1v1", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.gameType = "1v1";
      service.getPlayers();
      expect(service.arrayPopUps[7]).toBeTruthy();
    });
    it("should call joinWaitingRoom if the game isn't ready - 1v1", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      spyOn(service, "joinWaitingRoom");
      spyOn(service, "isGameReady").and.returnValue(false);
      service.gameType = "1v1";
      service.getPlayers();
      expect(service.joinWaitingRoom).toHaveBeenCalledTimes(1);
    });
    it("shouldnt call joinWaitingRoom if the game is ready - 1v1", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      spyOn(service, "joinWaitingRoom");
      spyOn(service, "isGameReady").and.returnValue(true);
      service.gameType = "1v1";
      service.getPlayers();
      expect(service.joinWaitingRoom).toHaveBeenCalledTimes(0);
    });
  });

  describe("joinWaitingRoom", () => {
    it("should call addWaitingGame once", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.joinWaitingRoom();
      expect(spyGameService.addWaitingGame).toHaveBeenCalledTimes(1);
    });
    it("should call sendWaitingGameAlert once", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      service.joinWaitingRoom();
      expect(spywebSocket.sendWaitingGameAlert).toHaveBeenCalledTimes(1);
    });
  });

  describe("hasNewHighScore", () => {
    it("should call newHighScore once when the returned position is 1", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      spyGameService.getNewScorePosition.and.returnValue(of("1"));
      service.hasNewHighScore(100, "tristan");
      expect(spywebSocket.newHighScore).toHaveBeenCalledTimes(1);
    });
    it("should call newHighScore once when the returned position is 4", () => {
      const service: GamePlayService = TestBed.get(GamePlayService);
      spyGameService.getNewScorePosition.and.returnValue(of("4"));
      service.hasNewHighScore(100, "tristan");
      expect(spywebSocket.newHighScore).toHaveBeenCalledTimes(0);
    });
  });
});
