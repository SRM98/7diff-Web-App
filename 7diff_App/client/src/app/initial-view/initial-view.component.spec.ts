import {HttpClient, HttpHandler} from "@angular/common/http";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AbstractControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Router, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import { of } from "rxjs";
import { USERNAMES } from "../../../../server/app/mock-username";
import SpyObj = jasmine.SpyObj;
import { ChatService } from "../chat.service";
import {IndexService} from "../index.service";
import { UsernameService } from "../username.service";
import { WebSocketService } from "../webSocket.service";
import {InitialViewComponent} from "./initial-view.component";

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
// tslint:disable:no-any
// tslint:disable:prefer-const

describe("InitialViewComponent nameForm test", () => {
  let component: InitialViewComponent;
  let fixture: ComponentFixture<InitialViewComponent>;
  let name: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialViewComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        RouterModule,
      ],
      providers: [
        UsernameService,
        IndexService,
        ChatService,
        WebSocketService,
        HttpClient,
        HttpHandler,
        {
          provide: Router,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    name = component.nameForm.controls["name"];
    name.setValue("");
  });

  it("should create the InitialView Component", () => {
    expect(component).toBeTruthy();
  });

  describe("Form tests - Validation and submit", () => {

  it("nameForm should not be valid when empty", () => {
    expect(component.nameForm.valid).toBeFalsy();
  });
  it("should accept John4Doe", () => {
    name.setValue("John4Doe");
    expect(name.errors).toBeFalsy();
  });
  it("should not accept 14562?? (special char)", () => {
    name.setValue("14562??");
    expect(name.errors).toBeTruthy();
  });
  it("should not accept d (too short)", () => {
    name.setValue("d");
    expect(name.errors).toBeTruthy();
  });
  it("should not accept dhdhehehah6354jfl (too long)", () => {
    name.setValue("dhdhehehah6354jfl");
    expect(name.errors).toBeTruthy();
  });
  it("should not be defined when name submitted", () => {
    expect(component.onSubmitName()).toBeUndefined();
  });
});

  describe("InitialViewComponent requests tests", () => {
    let spyUserService: SpyObj<UsernameService>;

    beforeEach(() => {
    spyUserService = jasmine.createSpyObj("UsernameService", ["postUserName"]);
    spyUserService.postUserName.and.returnValue(of(USERNAMES[0]));
    TestBed.configureTestingModule({

      providers: [
        ChatService,
        {provide: UsernameService, useValue: spyUserService },
      ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();

  });

  });
});
