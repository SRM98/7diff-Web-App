import { Injectable } from "@angular/core";
import {Observable} from "rxjs/Observable";
// tslint:disable-next-line:import-blacklist
import * as RX from "rxjs/Rx";
import {Subject} from "rxjs/Subject";
import * as io from "socket.io-client";
import { GameScenes } from "../../../common/communication/game";
import * as constants from "../../../common/constants";
import { UsernameService } from "./username.service";

@Injectable()
export class WebSocketService {

    public socket: SocketIOClient.Socket;
    public data: Subject<string>;
    public waitingGameAlert: Subject<string>;
    public finishGame: Subject<string>;
    public highScoreAlert: Subject<string>;
    public username: string;
    public outMessage: string;
    public usersInGame: Subject<string>;
    public updatedGame: Subject<string>;

    public constructor(private user: UsernameService) {
        this.username = user.getUsername();
        this.outMessage = "";
        this.data = new Subject<string>();
        this.waitingGameAlert = new Subject<string>();
        this.finishGame = new Subject<string>();
        this.highScoreAlert = new Subject<string>();
        this.usersInGame = new Subject<string>();
        this.updatedGame = new Subject<string>();
    }

    public connect(): RX.Subject<MessageEvent> {
        this.socket = io("http://" + constants.SERVER_IP + ":3000/");
        const observable: Observable<string> = new Observable((observers) => {
            // tslint:disable-next-line:no-any
            this.socket.on("message", (data: any) => {
                observers.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        this.socketListens();

        // tslint:disable-next-line:deprecation
        return RX.Subject.create(observable);
    }

    public disconnect(): void {
       this.socket.disconnect();
    }
    public socketListens(): void {
        this.socket.on("message", (data: string) => {
            this.data.next(data);
        });
        this.socket.on("users", (data: string) => {
            this.usersInGame.next(data);
        });
        this.socket.on("waitingGameAlert", (data: string) => {
            this.waitingGameAlert.next(data);
        });
        this.socket.on("gameIsOver", (data: string) => {
            if (data.length !== 0) {
            this.finishGame.next(data);
            } else {
                this.finishGame.next("leaveGame");

            }
        });
        this.socket.on("newHighScore", (data: string) => {
            this.highScoreAlert.next(data);
        });
        this.socket.on("updatedGame", (data: string) => {
            this.updatedGame.next(data);
        });

    }

    public joinGame(roomName: string): void {
        this.socket.emit("joinGame", roomName);
    }
    public noDifferencesFound(gameType: string): void {
        this.username = this.user.getUsername();
        gameType === "solo" ?  this.outMessage = "Erreur d'identification" :
                               this.outMessage = "Erreur d'identification par " + this.username;
        this.socket.emit("differences", this.outMessage);
    }
    public differenceFound(gameType: string ): void {
        this.username = this.user.getUsername();
        gameType === "solo" ?  this.outMessage = "Différence trouvée" :
                               this.outMessage = "Différence trouvée par " + this.username;
        this.socket.emit("differences", this.outMessage);
    }
    public leaveGame(roomName: string): void {
        this.socket.emit("leaveGame", roomName);

    }
    public newHighScore(highscore: string ): void {
        this.socket.emit("highScore", highscore);
    }

    public leaveWaitingGame(roomName: string ): void {
        this.socket.emit("leaveWaitingGame", roomName);
    }
    public sendUserName(username: string): void {
        this.socket.emit("message", username);

    }

    public sendWaitingGameAlert(gameURL: string): void {
        this.socket.emit("waitingGameJoinAlert", gameURL);
    }
    public gameOver(gameURL: string, winner: string): void {
        this.socket.emit("gameOver", gameURL + "," + winner);
    }

    public sendLeftWaitingGameAlert(gameURL: string): void {
        this.socket.emit("waitingGameLeaveAlert", gameURL);
    }

    public updateGame(originalScene: string, modifiedScene: string): void {
        const gameScenes: GameScenes = { originalScene: originalScene, modifiedScene: modifiedScene};
        this.socket.emit("updateGame", JSON.stringify(gameScenes) );
    }

}
