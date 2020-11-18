import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import * as io from "socket.io-client";
import { GameScenes } from "../../../common/communication/game";
import * as constants from "../../../common/constants";
import { UsernameService } from "./username.service";
import { WebSocketService } from "./webSocket.service";

// tslint:disable:no-any
// tslint:disable:no-floating-promises

describe("WebSocketService", () => {
    let webSocket: WebSocketService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let usernameService: UsernameService;

    // tslint:disable:no-any
    let spywebSocket: any;
    let socket: SocketIOClient.Socket;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
        usernameService = new UsernameService(httpClientSpy);
        webSocket = new WebSocketService(usernameService);
        spywebSocket = jasmine.createSpyObj("WebSocketService", ["joinGame", "connect", "gameOver", "leaveGame", "newHighScore"]);
        socket = io("http://" + constants.SERVER_IP + ":3000/");
        spywebSocket.socket = socket;
        webSocket.socket = socket;
         // tslint:disable-next-line:no-floating-promises
        TestBed.configureTestingModule({
            providers : [
                          {provide: WebSocketService, useValue: spywebSocket },
                          ],
            imports: [],
          }).compileComponents();
});

    it("OutMessage should be different based on the gameType, which is solo", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.noDifferencesFound("solo");
        expect(webSocket.outMessage).toEqual("Erreur d'identification");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("differences", "Erreur d'identification");

    });
    it("OutMessage should be different based on the gameType, which is 1v1", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.noDifferencesFound("1v1");
        expect(webSocket.outMessage).toEqual("Erreur d'identification par ");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("differences", "Erreur d'identification par ");

    });

    it("OutMessage on a difference should be based on gametype, which is solo", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.differenceFound("solo");
        expect(webSocket.outMessage).toEqual("Différence trouvée");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("differences", "Différence trouvée");

    });
    it("OutMessage on a difference should be based on the gameType, which is 1v1", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.differenceFound("1v1");
        expect(webSocket.outMessage).toEqual("Différence trouvée par ");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("differences", "Différence trouvée par ");

    });
    it("gameOver function should emit the right message type and message itself", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.gameOver("gameURL", "hugo");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("gameOver", "gameURL,hugo");
    });
    it("sendLeftWaitingGameAlert function should emit the right message type and message itself", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.sendLeftWaitingGameAlert("gameURL");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("waitingGameLeaveAlert", "gameURL");
    });
    it("sendWaitingGameAlert function should emit the right message type and message itself", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.sendWaitingGameAlert("gameURL");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("waitingGameJoinAlert", "gameURL");
    });
    it("updateGame function should emit the right message type and message itself", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.updateGame("game1", "game2");
        const gameScenes: GameScenes = { originalScene: "game1", modifiedScene: "game2"};
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("updateGame", JSON.stringify(gameScenes));
    });
    it("sendUserName function should emit the right message type and message itself", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.sendUserName("hugo");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("message", "hugo");
    });
    it("leaveWaitingGame function should emit the right message type and message itself", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.leaveWaitingGame("roomName");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("leaveWaitingGame", "roomName");
    });
    it("newHighScore function should emit the right message type and message itself", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.newHighScore("0923");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("highScore", "0923");
    });
    it("leaveGame function should emit the right message type and message itself", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.leaveGame("gameURL");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("leaveGame", "gameURL");
    });
    it("joinGame function should emit the right message type and message itself", () => {
        spyOn(spywebSocket.socket, "emit");
        webSocket.joinGame("roomHugio");
        expect(spywebSocket.socket.emit).toHaveBeenCalledWith("joinGame", "roomHugio");
    });

});
