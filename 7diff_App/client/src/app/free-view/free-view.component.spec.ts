import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {DebugElement} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule, MatDialogRef, MatSelectModule, MAT_DIALOG_DATA} from "@angular/material";
import {By} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {pointOfView} from "../../../../common/communication/game";
import {GAMES} from "../../app/mock-games";
import {GameService} from "../game.service";
import {IndexService} from "../index.service";
import { AnimalsCreatorService } from "../threeJS/animalsCreator.service";
import "../threeJS/js/controls.js";
import {ObjectsCreatorService} from "../threeJS/objectsCreator.service";
import SpyObj = jasmine.SpyObj;
import {RenderService} from "../threeJS/render.service";
import {SceneCreatorService} from "../threeJS/sceneCreator.service";
import {FreeViewComponent} from "./free-view.component";

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
// tslint:disable:no-any
// tslint:disable:no-non-null-assertion

describe("FreeViewComponent", () => {
  let component: FreeViewComponent;
  let fixture: ComponentFixture<FreeViewComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let spyGameService: SpyObj<GameService>;
  // tslint:disable-next-line:max-func-body-length
  beforeEach(async(() => {
    spyGameService = jasmine.createSpyObj("GameService",
                                          [
                                            "addSimpleGame",
                                            "addFreeGame",
                                            "getGames",
                                            "generateId",
                                            "initScores",
                                            "setBasicGameAttributes",
      ]);
    spyGameService.getGames.and.returnValue(of(GAMES));
    spyGameService.addSimpleGame.and.returnValue(of(GAMES));
    spyGameService.generateId.and.returnValue(of(GAMES.length));
    spyGameService.initScores.and.returnValue("lol");
    spyGameService.addFreeGame.and.returnValue(of(GAMES));
    TestBed.configureTestingModule({
      declarations: [ FreeViewComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCheckboxModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}, },
        {provide: MAT_DIALOG_DATA, useValue: {name: ""}, },
        {provide: GameService, useValue: spyGameService },
        HttpClient,
        RenderService,
        AnimalsCreatorService,
        ObjectsCreatorService,
        HttpHandler,
        RouterTestingModule,
        RouterModule,
        ObjectsCreatorService,
        IndexService,
        SceneCreatorService,
      ],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FreeViewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css("form"));
    el = de.nativeElement;
  });
  it("should create the freeView component", () => {
    expect(component).toBeTruthy();
  });
  describe("Form validation and submit tests", () => {
  it("when onSubmit is called, on submit should be true", async(() => {
    fixture.detectChanges();
    component.onSubmit();
    expect(component.isFormSubmitted).toBeTruthy();
  }));
  it("clicking on submit should call  onSubmit", async(() => {
    fixture.detectChanges();
    spyOn(component, "onSubmit");
    el = fixture.debugElement.query(By.css("button")).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));
  it("clicking on 'annuler' should call onNoClick", async(() => {
    fixture.detectChanges();
    spyOn(component, "onNoClick");
    el = fixture.debugElement.query(By.css("#button-test")).nativeElement;
    el.click();
    expect(component.onNoClick).toHaveBeenCalledTimes(1);
  }));
  it("The form should be invalid when given empty fields", async(() => {
    fixture.detectChanges();
    component.registerForm.controls["gameName"].setValue("");
    component.registerForm.controls["objectNumber"].setValue("");
    component.registerForm.controls["objectType"].setValue("");
    component.registerForm.controls["modificationType"].setValue(false);
    expect(component.registerForm.valid).toBeFalsy();
  }));
  it("The form should be valid when given valid information", async(() => {
    fixture.detectChanges();
    component.registerForm.controls["gameName"].setValue("hugo");
    component.registerForm.controls["objectNumber"].setValue(20);
    component.registerForm.controls["objectType"].setValue("geometrique");
    component.registerForm.controls["modificationType"].setValue(true);
    expect(component.registerForm.valid).toBeTruthy();
  }));
  it("The form should be invalid - gameName too short", async(() => {
    fixture.detectChanges();
    component.registerForm.controls["gameName"].setValue("aaa");
    expect(component.registerForm.valid).toBeFalsy();
  }));
  it("The form should be invalid- gameName too long", async(() => {
    fixture.detectChanges();
    component.registerForm.controls["gameName"].setValue("aaaaaaaaaaaaaa");
    expect(component.registerForm.valid).toBeFalsy();
  }));
  it("The form should be invalid - objectNumber too big or too little", async(() => {
    fixture.detectChanges();
    component.registerForm.controls["objectNumber"].setValue(1);
    component.registerForm.controls["objectNumber"].setValue(201);
    expect(component.registerForm.valid).toBeFalsy();
  }));
  it("The form should be invalid - modificationType invalid", async(() => {
    fixture.detectChanges();
    component.registerForm.controls["modificationType"].setValue(undefined);
    expect(component.registerForm.valid).toBeFalsy();
  }));
});
  describe("Creating a freeGame tests", () => {
  it("createFreeGame should create a new game with freeView POV", () => {
    expect(component.game.POV).toEqual(pointOfView.freeGamePOV);
  });
});
});
