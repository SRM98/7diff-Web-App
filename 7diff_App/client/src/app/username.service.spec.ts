import {HttpClient} from "@angular/common/http";
import { Message } from "../../../common/communication/message";
import { USERNAMES } from "../../../server/app/mock-username";
import { TestHelper } from "../test.helper";
import { UsernameService } from "./username.service";

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let usernameService: UsernameService;

// tslint:disable:no-any
// tslint:disable:no-floating-promises

describe("UsernameService", () => {

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
        usernameService = new UsernameService(httpClientSpy);
    });

    describe("Httpclient - sending usernames tests", () => {

    it("should return expected message if username is successfully added", () => {
      const expectedMessage: Message = USERNAMES[0];
      httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedMessage));

      usernameService.postUserName({title: "username", body: "jack"}).then((mess: Message) => {
        expect(mess.body).toEqual(expectedMessage.body);
      },
      );

    });

    it("should return expected message if username is not added", () => {
      const expectedMessage: Message = USERNAMES[1];
      httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedMessage));

      usernameService.postUserName({title: "username", body: "jack"}).then((mess: Message) => {
        expect(mess.body).toEqual(expectedMessage.body);
      },
      );
    });

    it("should return expected message if username is not added", () => {
      const expectedMessage: Message = USERNAMES[0];
      httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedMessage));

      usernameService.removeUserName({title: "username", body: "jack"}).then((mess: Message) => {
        expect(mess.body).toEqual(expectedMessage.body);
      },
      );
    });
  });

    describe("Username tests - Set", () => {
    it("should set the username correctly", () => {
      const username: string = "sergiu";
      usernameService.setUsername(username);
      expect(usernameService.getUsername()).toEqual(username);

    });
  });

  });
