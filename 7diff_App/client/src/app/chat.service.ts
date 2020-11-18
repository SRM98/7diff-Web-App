import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {WebSocketService} from "./webSocket.service";
@Injectable()
export class ChatService {

    public messages: Subject<string>;

    public constructor(private socketService: WebSocketService) {

    }
    public sendMsg(msg: string): void {
        this.messages.next(msg);
    }
    public sendUserName(username: string): void {
        this.socketService.sendUserName(username);
    }
    public connect(): void {
        this.messages = this.socketService
        .connect()
        // tslint:disable-next-line:no-any
        .map((response: any): string => {
            return response;
        }) as Subject<string> as Subject<string>;
    }
    public disconnect(): void {
        this.socketService.disconnect();
    }

}
