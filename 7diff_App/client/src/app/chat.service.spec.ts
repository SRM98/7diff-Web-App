import { HttpClient } from "@angular/common/http";
import SpyObj = jasmine.SpyObj;
import { Subject } from "rxjs";
import { ChatService } from "./chat.service";
import { UsernameService } from "./username.service";
import { WebSocketService } from "./webSocket.service";

// tslint:disable:no-floating-promises
// tslint:disable:no-any
describe("ChatService", () => {
    let webSocket: WebSocketService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let usernameService: UsernameService;
    let chatService: ChatService;

    let spywebSocket: SpyObj<WebSocketService>;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
        usernameService = new UsernameService(httpClientSpy);
        webSocket = new WebSocketService(usernameService);
        spywebSocket = jasmine.createSpyObj("WebSocketService", ["joinGame", "disconnect",
                                                                 "sendUserName", "connect",
                                                                 "leaveGame", "newHighScore"]);

        chatService = new ChatService(spywebSocket);
    });

    describe("ChatService functions", () => {

        it("Sendusername should use the right function/service", () => {
            chatService.sendUserName("hugo");
            expect(spywebSocket.sendUserName).toHaveBeenCalledTimes(1);
        });
        it("Disconnect should use the right function/service", () => {
            chatService.disconnect();
            expect(spywebSocket.disconnect).toHaveBeenCalledTimes(1);
        });
        it("SendMsg should return the next msg", () => {
            chatService.messages = new Subject<string>();
            chatService.messages.subscribe((message: any) => {
                expect(message).toEqual("hey im testing");
            });
            chatService.sendMsg("hey im testing");
        });

    });

});
