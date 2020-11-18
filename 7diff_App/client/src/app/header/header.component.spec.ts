import {HttpClient, HttpHandler} from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ChatService } from "../chat.service";
import {IndexService} from "../index.service";
import {UsernameService} from "../username.service";
import { WebSocketService } from "../webSocket.service";
import { HeaderComponent } from "./header.component";

// tslint:disable:no-floating-promises

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [UsernameService,
                  IndexService,
                  HttpClient,
                  HttpHandler,
                  WebSocketService,
                  ChatService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
