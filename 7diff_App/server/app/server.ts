import * as http from "http";
import { inject, injectable } from "inversify";
import { AddressInfo } from "net";
import * as io from "socket.io";
import {UserDataBase} from "../app/services/UserDataBase.service";
import { Application } from "./app";
import Types from "./types";

@injectable()
export class Server {

    private readonly appPort: string|number|boolean = this.normalizePort(process.env.PORT || "3000");
    private readonly baseDix: number = 10;
    private server: http.Server;
    public webSocket: io.Server;
    private socketUser: string;
    public userNameArray: string[];
    public nbConnected: number = 0;

    public constructor(@inject(Types.Application) private application: Application,
                       @inject(Types.UserDataBase) private userData: UserDataBase,
    ) {
        this.userNameArray = [];
     }

    public init(): void {
        this.application.app.set("port", this.appPort);

        this.server = http.createServer(this.application.app);

        this.webSocket = io(this.server);
        this.webSocket.on("connection", (socket: io.Socket) => {
            this.nbConnected++;
            this.socketListens(socket);
            socket.on("disconnect", (message: string) => {
                const user: string = this.findUser(socket.id);
                this.userData.removeUserSocket(user);
                socket.broadcast.emit("message", user + " s'est déconnecté(e)");
            });
        });
        this.server.listen(this.appPort);
        this.server.on("error", (error: NodeJS.ErrnoException) => this.onError(error));
        this.server.on("listening", () => this.onListening());

    }
    // tslint:disable-next-line:max-func-body-length
    public socketListens(socket: io.Socket): void {

        socket.on("message", (message: string) => {
            this.socketUser = message;
            this.userNameArray[this.nbConnected - 1] = this.socketUser + "," + socket.id;
            this.webSocket.sockets.emit("message", this.socketUser + " s'est connecté(e)");
          });
        socket.on("joinGame", (message: string) => {
            socket.join(message);
            const users: string = this.findUsersInGame(message);
            this.webSocket.sockets.in(message).emit("users", users);
          });
        socket.on("leaveGame", (message: string) => {
            socket.leave(message);
            this.webSocket.sockets.in(message).emit("gameIsOver", "");
        });
        socket.on("highScore", (message: string) => {
            this.webSocket.sockets.emit("newHighScore", message);
        });

        socket.on("leaveWaitingGame", (message: string) => {
            this.webSocket.sockets.in(message).emit("message", "leaveWaitingGame");
        });
        socket.on("waitingGameJoinAlert", (gameURL: string) => {
            this.webSocket.emit("waitingGameAlert", JSON.stringify({data: "waitingGameJoinAlert", gameURL: gameURL}));
        });
        socket.on("waitingGameLeaveAlert", (gameURL: string) => {
            this.webSocket.emit("waitingGameAlert", JSON.stringify({data: "waitingGameLeaveAlert", gameURL: gameURL}));
        });
        this.socketRoomsListens(socket);
    }

    public socketRoomsListens(socket: io.Socket): void {

        socket.on("gameOver", (message: string) => {
            const input: string[] = message.split(",");
            this.webSocket.sockets.in(input[0]).emit("gameIsOver", input[1]);
        });
        socket.on("updateGame", (game: string) => {
            const room: string[] = Object.keys(this.webSocket.sockets.adapter.sids[socket.id]);
            this.webSocket.sockets.in(room[1]).emit("updatedGame", game);
        });
        socket.on("differences", (message: string) => {
            const room: string[] = Object.keys(this.webSocket.sockets.adapter.sids[socket.id]);
            this.webSocket.sockets.in(room[1]).emit("message", message);
        });

    }

    public findUsersInGame(message: string): string {
        const room: string[] = Object.keys(this.webSocket.sockets.adapter.rooms[message].sockets);
        let users: string = "";
        for (let i: number = 0; i <= 1; i++) {
            const user: string = this.findUser(room[i]);
            i === 0 ? users = user : users = users + "," + user;
        }

        return users;
    }
    public findUser(socketid: string): string {
        for (let i: number = 0; i < this.nbConnected; i++) {
            if (this.userNameArray[i] !== undefined) {
            const str: string = this.userNameArray[i];
            const splitted: string[] = str.split(",");
            if (splitted[1] === socketid) {
                return splitted[0];
            }
            }
        }

        return "";
    }

    private normalizePort(val: number | string): number | string | boolean {
        const port: number = (typeof val === "string") ? parseInt(val, this.baseDix) : val;
        if (isNaN(port)) {
            return val;
        } else if (port >= 0) {
            return port;
        } else {
            return false;
        }
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== "listen") { throw error; }
        const bind: string = (typeof this.appPort === "string") ? "Pipe " + this.appPort : "Port " + this.appPort;
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Se produit lorsque le serveur se met à écouter sur le port.
     */
    private  onListening(): void {
        const addr: string | AddressInfo = this.server.address();
        const bind: string = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
        // tslint:disable-next-line:no-console
        console.log(`Listening on ${bind}`);
    }
}
