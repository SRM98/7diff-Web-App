import {pointOfView, Game, WaitingGame} from "../../../common/communication/game";
import {GAMES} from "../app/mock-games";
import {TestHelper} from "../test.helper";
import {IndexService} from "./index.service";

// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpy: any;
let basicService: IndexService;

// tslint:disable:no-any
// tslint:disable:no-magic-numbers
// tslint:disable:no-floating-promises

describe("IndexService", () => {

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get", "put", "delete", "post"]);
        basicService = new IndexService(httpClientSpy);
    });

    describe("Getting the list of games tests", () => {

    it("getGames should return mock-data base", () => {
        const expectedMessage: Game[] = GAMES;

        httpClientSpy.get.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.getGames().subscribe(
            (response: Game[]) => {
                expect(response.length).toEqual(expectedMessage.length);
            },
            fail,
        );

        // check if only one call was made
        expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
    });

    it("getSimpleGame should game 1 when given id = 1", () => {
        const expectedMessage: Game = GAMES[0];

        httpClientSpy.get.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.getSimpleGame(1).subscribe(
            (response: Game) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
    });

    it("getFreeGame should game 3 when given id = 3", () => {
        // tslint:disable-next-line:no-magic-numbers
        const expectedMessage: Game = GAMES[3];

        httpClientSpy.get.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        // tslint:disable-next-line:no-magic-numbers
        basicService.getFreeGame(3).subscribe(
            (response: Game) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
    });
});

    describe("Modifying games tests", () => {

    it("addSimpleGames should return new database", () => {
        const expectedMessage: Game[] = GAMES;

        httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.addSimpleGame(GAMES[0]).subscribe(
            (response: Game[]) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
    });

    it("modifyGame should return new database", () => {
        const expectedMessage: Game[] = GAMES;

        httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.modifyGame(GAMES[0]).subscribe(
            (response: Game[]) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
    });

    it("deleteImg should return new database", () => {
        const expectedMessage: Game[] = GAMES;

        httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.deleteImg(GAMES[0]).subscribe(
            (response: Game[]) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
    });

    it("addFreeGame should return new database", () => {
        const expectedMessage: Game[] = GAMES;

        httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.addFreeGame(GAMES[0]).subscribe(
            (response: Game[]) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
    });

    it("updateHighScores should reset the hs of 1st game when given the 1stgame", () => {
        const expectedMessage: Game = {
            id: 1,
            name: "Chat noir",
            thumbnail : "",
            hsSolo: [],
            hs1VS1: [],
            POV: pointOfView.simpleGamePOV,
        };

        httpClientSpy.put.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.updateHighScores(GAMES[0]).subscribe(
            (response: Game) => {
                expect(response.id).toEqual(expectedMessage.id);
                expect(response.name).toEqual(expectedMessage.name);
                expect(response.hsSolo).toEqual(expectedMessage.hsSolo);
                expect(response.hs1VS1).toEqual(expectedMessage.hs1VS1);
            },
            fail,
        );

        // check if only one call was made
        expect(httpClientSpy.get.calls.count()).toBe(0, "one call");
    });

    // tslint:disable-next-line:max-func-body-length
    it("delete should delete the 1st game from mock-database when given the 1st game but return waitingroom games", () => {
        const expectedMessage: Game[] = GAMES;

        httpClientSpy.delete.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.deleteGame(GAMES[0]).subscribe(
            (response: Game[]) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
        // check if only one call was made
        expect(httpClientSpy.get.calls.count()).toBe(0, "one call");
    });

    // tslint:disable-next-line:max-func-body-length
    it("getWaitingGame should return the waiting game when given a valid id", () => {
        const expectedMessage: WaitingGame = {id: 1, roomname: "room"};

        httpClientSpy.get.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.getWaitingGame(1).subscribe(
            (response: WaitingGame) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
    });

        // tslint:disable-next-line:max-func-body-length
    it("addWaitingGame should return the waiting game when given a waitinggame", () => {
        const expectedMessage: WaitingGame = {id: 1, roomname: "room"};

        httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.addWaitingGame(expectedMessage).subscribe(
            (response: WaitingGame) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
        });

            // tslint:disable-next-line:max-func-body-length
    it("deleteWaitingGame should return the waiting game when given a waitinggame", () => {
        const expectedMessage: WaitingGame = {id: 1, roomname: "room"};

        httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedMessage));

        // check the content of the mocked call
        basicService.deleteWaitingGame(expectedMessage).subscribe(
            (response: WaitingGame) => {
                expect(response).toEqual(expectedMessage);
            },
            fail,
        );
    });
});
});
