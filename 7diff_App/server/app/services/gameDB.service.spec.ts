import { expect } from "chai";
import { WaitingGame } from "../../../common/communication/game";
import { waitingRoom } from "../waiting-room";
import {GameDBService} from "./gameDB.service";

describe("GameDBService", () => {
    let service: GameDBService;
    beforeEach(() => {service = new GameDBService(); });

    it("findWaitingGame should return the proper game when given a valid id", () => {
        const expectedResult: WaitingGame = {id: 1, roomname: "room"};
        waitingRoom.push(expectedResult);
        const result: WaitingGame = service.findWaitingGame(1);
        expect(result).to.equal(expectedResult);
        waitingRoom.pop();
    });

    it("findWaitingGame should return a default name when given an unvalid id", () => {
        const expectedResult: WaitingGame = {id: 0, roomname: ""};
        const result: WaitingGame = service.findWaitingGame(1);
        expect(result).to.deep.equal(expectedResult);
    });
});
