// tslint:disable:no-any les attributs sont des types any
// tslint:disable:no-floating-promises pour le before each
import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatToolbarModule
} from "@angular/material";
import {RouterModule } from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import { AdminComponent } from "./admin/admin.component";
import { AppComponent } from "./app.component";
import {GameDetailComponent} from "./game-detail/game-detail.component";
import {GamesComponent} from "./games/games.component";
import {HeaderComponent} from "./header/header.component";
import {InitialViewComponent} from "./initial-view/initial-view.component";
import {SimpleViewComponent} from "./simple-view/simple-view.component";
import {UsernameService} from "./username.service";
import SpyObj = jasmine.SpyObj;

describe("AppComponent", () => {
  let spyUsernameService: SpyObj<UsernameService>;
  // tslint:disable-next-line:max-func-body-length
  beforeEach(async(() => {
    spyUsernameService = jasmine.createSpyObj("UsernameService", ["getUsername", "removeUserName"]);
    spyUsernameService.removeUserName.and.returnValue(of(""));

    TestBed.configureTestingModule ({
      declarations: [
        AppComponent,
        InitialViewComponent,
        GameDetailComponent,
        GamesComponent,
        SimpleViewComponent,
        AdminComponent,
        HeaderComponent,
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatOptionModule,
        MatCardModule,
        MatSelectModule,
        MatToolbarModule,
        RouterTestingModule,
        MatDialogModule,
        RouterModule.forRoot([]),
      ],
      providers: [{provide: UsernameService, useValue: spyUsernameService} ],
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
