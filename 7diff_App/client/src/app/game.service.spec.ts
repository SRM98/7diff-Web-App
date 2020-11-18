import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {pointOfView, Game} from "../../../common/communication/game";
import {Score} from "../../../common/communication/score";
import {game1, GAMES} from "../app/mock-games";
import {GameService} from "./game.service";
import {IndexService} from "./index.service";
import SpyObj = jasmine.SpyObj;

// tslint:disable:no-any
// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers

describe("GameService", () => {
    let spyIndexService: SpyObj<IndexService>;
    let gameService: GameService;
    let games: Game[];
    const game: Game = {
      id : 1,
      hsSolo : new Array<Score>(),
      hs1VS1 : new Array<Score>(),
      name : "Rochana",
      POV : pointOfView.simpleGamePOV,
      thumbnail: "",
    };
    games = [];
    games[0] = game;
    const gameName: string = "";
    beforeEach(async(() => {
        spyIndexService = jasmine.createSpyObj("IndexService", ["getGames", "getSimpleGame", "addSimpleGame", "updateHighScores",
                                                                "getFreeGame", "getWaitingGame",
                                                                "deleteGame", "addSimpleGame",
                                                                "addFreeGame", "deleteImg", "addWaitingGame",
                                                                "deleteWaitingGame", "addNewGame", "hasNewHighScore", "getWaitingRoom",
                                                                "sortScores", "getNewScorePosition"]);
        spyIndexService.getGames.and.returnValue(of(GAMES));
        spyIndexService.getSimpleGame.and.returnValue(of(GAMES[0]));
        spyIndexService.addSimpleGame.and.returnValue(of(GAMES[0]));
        spyIndexService.updateHighScores.and.returnValue(of(GAMES[0]));
        spyIndexService.getFreeGame.and.returnValue(of(GAMES[0]));
        spyIndexService.getWaitingGame.and.returnValue(of(GAMES[0]));
        spyIndexService.deleteGame.and.returnValue(of(GAMES[0]));
        spyIndexService.addSimpleGame.and.returnValue(of(GAMES[0]));
        spyIndexService.addFreeGame.and.returnValue(of(GAMES[0]));
        spyIndexService.deleteImg.and.returnValue(of(GAMES[0]));
        spyIndexService.addWaitingGame.and.returnValue(of(GAMES[0]));
        spyIndexService.deleteWaitingGame.and.returnValue(of(GAMES[0]));
        spyIndexService.addNewGame.and.returnValue(of());
        spyIndexService.sortScores.and.returnValue(of(GAMES[0].hsSolo));
        spyIndexService.getNewScorePosition.and.returnValue(of("1"));

        // @ts-ignore
        gameService = new GameService();
        TestBed.configureTestingModule({
                                         providers: [{provide: IndexService, useValue: spyIndexService}],
                                         imports: [RouterTestingModule],
                                       }).compileComponents();
    }));
    it("GameService should be created", () => {
        const service: GameService = TestBed.get(GameService);
        expect(service).toBeTruthy();
    });

    describe("Creating games ", () => {

    it("createSimpleGame should create a new game with proper hsSolo when given the correct amount of differences", () => {
        gameService.setBasicGameAttributes(games, game, gameName );
        // tslint:disable-next-line:no-magic-numbers
        expect(game.hsSolo.length).toEqual(3);
    });
    it("createSimpleGame should create a new game with proper hs1VS1 when given the correct amount of differences", () => {
        gameService.setBasicGameAttributes(games, game, gameName);
        // tslint:disable-next-line:no-magic-numbers
        expect(game.hs1VS1.length).toEqual(3);
    });
  });

    describe("Function that generates game IDs tests", () => {

    it("generateId should give id = 5 to game when games is full", async(() => {
       games = GAMES;
       gameService.generateId(GAMES);
       expect(game.id).toEqual(GAMES.length - 1 );
    }));
    it("generateId should give id = 1 to game when games is empty", async(() => {
      games = [];
      const result: number = gameService.generateId(games);
      expect(result).toEqual(1);
   }));
  });

    describe("Function initScores tests", () => {

    it("initScores should return a array of length 3", async(() => {
       const result: Score[] = gameService.initScores();
       // tslint:disable-next-line:no-magic-numbers
       expect(result.length).toEqual(3);
     }));
    it("initScores should return score times between 600secs and 3540secs", async(() => {
       const scores: Score[] = gameService.initScores();
       // tslint:disable-next-line:no-magic-numbers
       expect((scores[0].time >= 600) && (scores[0].time <= 3540)).toBeTruthy();
     }));
    it("initScores should return empty string times", async(() => {
       expect(gameService.initScores()[0].timeString).toEqual("");
     }));

    });

    it("sortPOVs should return an the first two games when given GAMES, and simple view", () => {
      const service: GameService = TestBed.get(GameService);
      const expectedResult: Game[] = [GAMES[0], GAMES[1]];
      const result: Game[] = service.sortPOVs(GAMES, pointOfView.simpleGamePOV);
      expect(result).toEqual(expectedResult);
    });
    it("sortPOVs should return an the last two games when given GAMES, and simple view", () => {
      const service: GameService = TestBed.get(GameService);
      // tslint:disable-next-line:no-magic-numbers
      const expectedResult: Game[] = [GAMES[2], GAMES[3]];
      const result: Game[] = service.sortPOVs(GAMES, pointOfView.freeGamePOV);
      expect(result).toEqual(expectedResult);
    });

    describe("All HTTP request", () => {
    it("getGames should call getGames once", () => {
      const service: GameService = TestBed.get(GameService);
      service.getGames();
      expect(spyIndexService.getGames).toHaveBeenCalledTimes(1);
    });

    it("getSimpleGame should call getSimpleGame once", () => {
      const service: GameService = TestBed.get(GameService);
      service.getSimpleGame(1);
      expect(spyIndexService.getSimpleGame).toHaveBeenCalledTimes(1);
    });

    it("getFreeGame should call getFreeGame once", () => {
      const service: GameService = TestBed.get(GameService);
      service.getFreeGame(1);
      expect(spyIndexService.getFreeGame).toHaveBeenCalledTimes(1);
    });

    it("getWaitingGame should call getWaitingGame once", () => {
      const service: GameService = TestBed.get(GameService);
      service.getWaitingGame(1);
      expect(spyIndexService.getWaitingGame).toHaveBeenCalledTimes(1);
    });

    it("updateHighScores should call updateHighScores once", () => {
      const service: GameService = TestBed.get(GameService);
      service.updateHighScores(GAMES[0]);
      expect(spyIndexService.updateHighScores).toHaveBeenCalledTimes(1);
    });

    it("deleteGame should call deleteGame once", () => {
      const service: GameService = TestBed.get(GameService);
      service.deleteGame(GAMES[0]);
      expect(spyIndexService.deleteGame).toHaveBeenCalledTimes(1);
    });

    it("addSimpleGame should call addSimpleGame once", () => {
      const service: GameService = TestBed.get(GameService);
      service.addSimpleGame(GAMES[0]);
      expect(spyIndexService.addSimpleGame).toHaveBeenCalledTimes(1);
    });

    it("addFreeGame should call addFreeGame once", () => {
      const service: GameService = TestBed.get(GameService);
      service.addFreeGame(GAMES[0]);
      expect(spyIndexService.addFreeGame).toHaveBeenCalledTimes(1);
    });

    it("deleteImg should call deleteImg once", () => {
      const service: GameService = TestBed.get(GameService);
      service.deleteImg(GAMES[0]);
      expect(spyIndexService.deleteImg).toHaveBeenCalledTimes(1);
    });

    it("addWaitingGame should call addWaitingGame once", () => {
      const service: GameService = TestBed.get(GameService);
      service.addWaitingGame({id: 1, roomname: "bonjour"});
      expect(spyIndexService.addWaitingGame).toHaveBeenCalledTimes(1);
    });

    it("deleteWaitingGame should call deleteWaitingGame once", () => {
      const service: GameService = TestBed.get(GameService);
      service.deleteWaitingGame({id: 1, roomname: "bonjour"});
      expect(spyIndexService.deleteWaitingGame).toHaveBeenCalledTimes(1);
    });

    it("sendPostRequest should make 1 httpClient post request ", () => {
      const service: GameService = TestBed.get(GameService);
      service.sendPostRequest(game1, "bonjour" );
      expect(spyIndexService.addNewGame).toHaveBeenCalledTimes(1);
    });

    it("getWaitingRoom should call getWaitingRoom once", () => {
      const service: GameService = TestBed.get(GameService);
      service.getWaitingRoom();
      expect(spyIndexService.getWaitingRoom).toHaveBeenCalledTimes(1);
    });

    it("getSortedScores should call sortScores once", () => {
      const service: GameService = TestBed.get(GameService);
      service.getSortedScores(GAMES[0].hsSolo);
      expect(spyIndexService.sortScores).toHaveBeenCalledTimes(1);
    });

    it("getNewScorePosition should call getNewScorePosition once", () => {
      const service: GameService = TestBed.get(GameService);
      service.getNewScorePosition(GAMES[0].hsSolo);
      expect(spyIndexService.getNewScorePosition).toHaveBeenCalledTimes(1);
    });
  });

    describe("sortScores", () => {
      it("should call getSortedScores 8 times when given a tab of games of length 4", () => {
        const service: GameService = TestBed.get(GameService);
        spyOn(service, "getSortedScores").and.returnValue(of(GAMES[0].hs1VS1));
        service.sortScores(GAMES);
        expect(service.getSortedScores).toHaveBeenCalledTimes(8);
      });
  });
});
