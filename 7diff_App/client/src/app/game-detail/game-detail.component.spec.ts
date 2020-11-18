import { HttpClient, HttpHandler } from "@angular/common/http";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {GAMES} from "../../app/mock-games";
import { UsernameService } from "../username.service";
import {GameDetailComponent} from "./game-detail.component";

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
// tslint:disable:no-any
// tslint:disable:no-non-null-assertion

describe("GameDetailComponent", () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        UsernameService,
      ],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    component.game = GAMES[0];
    fixture.detectChanges();
  });

  it("should create the gameDetail Component", () => {
    expect(component).toBeTruthy();
  });

});
