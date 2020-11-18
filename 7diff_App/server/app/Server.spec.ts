import {expect} from "chai";
// tslint:disable-next-line:typedef
const socketMock = require("socket.io-mock");
import { Application } from "./app";
import { GameDBController } from "./controllers/gameDB.controller";
import { HighScoreController } from "./controllers/highscore.controller";
import { ImageController } from "./controllers/image.controller";
import { InitialViewController } from "./controllers/initialView.controller";
import { SoundController } from "./controllers/sound.controller";
import { Server } from "./server";
import { FreeDiffService } from "./services/FreeGameDiff.service";
import { UserDataBase } from "./services/UserDataBase.service";
import { DifferencesService } from "./services/differences.service";
import { GameDBService } from "./services/gameDB.service";
import { HighscoreService } from "./services/highscore.service";
import { ImageService } from "./services/image.service";
import { ImageControlService } from "./services/imageControl.service";
import { SoundService } from "./services/sound.service";

describe("Server Tests", () => {
    const userDataBase: UserDataBase = new UserDataBase();
    const initialView: InitialViewController = new InitialViewController(userDataBase);
    const imageServce: ImageService = new ImageService();
    const diffService: DifferencesService = new DifferencesService(imageServce);
    const imageControlServ: ImageControlService = new ImageControlService(diffService, imageServce);
    const imageController: ImageController = new ImageController( imageServce, imageControlServ);
    const gameDBService: GameDBService = new GameDBService();
    const freeDiff: FreeDiffService = new FreeDiffService();
    const gameDBController: GameDBController = new GameDBController(gameDBService, freeDiff);
    const soundService: SoundService = new SoundService();
    const soundController: SoundController = new SoundController(soundService);
    const highscoreService: HighscoreService = new HighscoreService();
    const highscoreController: HighScoreController = new HighScoreController(highscoreService);

    const application: Application = new Application(initialView, imageController, gameDBController, soundController, highscoreController);
    let server: Server;

    // tslint:disable:typedef
    beforeEach(() => {
         server = new Server(application, userDataBase);

    });

    it("Function findUser should return the right socketID", () => {
        // tslint:disable:no-magic-numbers
        server.nbConnected = 2;
        server.userNameArray = [];
        server.userNameArray[0] = "hugo,gvygybu88";
        server.userNameArray[1] = "francois,asduhf2";
        const socketID: string = server.findUser("gvygybu88");
        const socketID2: string = server.findUser("asduhf2");
        expect(socketID).to.equal("hugo");
        expect(socketID2).to.equal("francois");
    });

    describe("Sockets tests", () => {

        it("Sockets should talk to eachother", () => {
            const socket = new socketMock();

            socket.on("message", (message: string ) => {
                expect(message).to.equal("test Socket");

            });
            socket.socketClient.emit("message", "test Socket");

        });
        it("Sockets on joingame should send 'users' message talk to eachother", () => {
            const socket = new socketMock();

            socket.on("users", (message: string ) => {
               expect(message).to.equal("test Socket");

            });
            socket.on("joinGame", (message: string ) => {
                socket.socketClient.emit("users", message);

            });
            socket.socketClient.emit("joinGame", "test Socket");

        });

        it("Sockets on differences should send 'message' message talk to eachother", () => {
            const socket = new socketMock();

            socket.on("message", (message: string ) => {
               expect(message).to.equal("test Socket");

            });
            socket.on("differences", (message: string ) => {
                socket.socketClient.emit("message", message);

            });
            socket.socketClient.emit("differences", "test Socket");

        });

        it("Sockets on leaveGame should send 'gameOver' message talk to eachother", () => {
            const socket = new socketMock();

            socket.on("gameIsOver", (message: string ) => {
               expect(message).to.equal("game is over");

            });
            socket.on("leaveGame", (message: string ) => {
                socket.socketClient.emit("gameIsOver", message);

            });
            socket.socketClient.emit("leaveGame", "game is over");

        });

        it("Sockets on highScore should send 'NewHighScore' message talk to eachother", () => {
            const socket = new socketMock();

            socket.on("newHighScore", (message: string ) => {
               expect(message).to.equal("newHS");

            });
            socket.on("highScore", (message: string ) => {
                socket.socketClient.emit("newHighScore", message);

            });
            socket.socketClient.emit("highScore", "newHS");

        });
        it("Sockets on leaveWaitingGame should send 'message' message talk to eachother", () => {
            const socket = new socketMock();

            socket.on("message", (message: string ) => {
               expect(message).to.equal("leave");

            });
            socket.on("leaveWaitingGame", (message: string ) => {
                socket.socketClient.emit("message", message);

            });
            socket.socketClient.emit("leaveWaitingGame", "leave");

        });

        it("Sockets on waitingGameJoinAlert should send 'waitingGameAlert' message talk to eachother", () => {
            const socket = new socketMock();

            socket.on("waitingGameAlert", (message: string ) => {
               expect(message).to.equal("join");

            });
            socket.on("waitingGameJoinAlert", (message: string ) => {
                socket.socketClient.emit("waitingGameAlert", message);

            });
            socket.socketClient.emit("waitingGameJoinAlert", "join");

        });

        it("Sockets on gameOver should send 'gameIsOver' message to talk to the websocket on the client", () => {
            const socket = new socketMock();

            socket.on("gameIsOver", (message: string ) => {
               expect(message).to.equal("gameover");

            });
            socket.on("gameOver", (message: string ) => {
                socket.socketClient.emit("gameIsOver", message);

            });
            socket.socketClient.emit("gameOver", "gameover");

        });
        it("Sockets on updateGame should send 'updatedGame' message to talk to the websocket on the client", () => {
            const socket = new socketMock();

            socket.on("updatedGame", (message: string ) => {
               expect(message).to.equal("gameupdateddd");

            });
            socket.on("updateGame", (message: string ) => {
                socket.socketClient.emit("updatedGame", message);

            });
            socket.socketClient.emit("updateGame", "gameupdateddd");

        });
        it("Sockets should all receive the message", () => {
            const socket = new socketMock();
            const socket2 = new socketMock();

            socket.on("message", (message: string ) => {
                expect(message).to.equal("test Socket");

            });
            socket2.on("message", (message: string ) => {
                expect(message).to.equal("test Socket");

            });
            socket.socketClient.emit("message", "test Socket");
        });
        it("Only Sockets within a room should receive the message", () => {
            const socket = new socketMock();

            socket.join("testRoom");

            socket.on("message", (message: string ) => {
                expect(message).to.equal("test Socket");

            });
            socket.broadcast.to("testRoom").emit("message", "test Socket");
        });
        it("Should add a room to `rooms` when join() is called", () => {
            const socket = new socketMock();
            const roomKey: string = "testRooooom";
            socket.join(roomKey);
            expect(socket.rooms[0]).to.equal(roomKey);
        });

    });

});
