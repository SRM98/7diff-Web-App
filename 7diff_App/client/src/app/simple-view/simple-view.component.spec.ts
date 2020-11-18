import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {DebugElement} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {By} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {pointOfView} from "../../../../common/communication/game";
import {GAMES} from "../../app/mock-games";
import {GameService} from "../game.service";
import {IndexService} from "../index.service";
import {SimpleViewComponent} from "./simple-view.component";
import SpyObj = jasmine.SpyObj;
// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
// tslint:disable:no-any
// tslint:disable:no-non-null-assertion
// tslint:disable:prefer-const
describe("SimpleViewComponent", () => {
  let component: SimpleViewComponent;
  let fixture: ComponentFixture<SimpleViewComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let waitImageTobeLoaded: () => void;
  let spyGameService: SpyObj<GameService>;
  // tslint:disable-next-line:only-arrow-functions
  function trackImageOnload(): any {
    Object.defineProperty(Image.prototype, "onload", {
      get: function (): any {
        // tslint:disable-next-line:no-invalid-this
        return this._onload;
      },
  // tslint:disable-next-line:only-arrow-functions
      set: function (fn: any): any {
        waitImageTobeLoaded = fn;
      },
    });
  }
  beforeEach(async(() => {
    spyGameService = jasmine.createSpyObj("GameService", ["addSimpleGame", "getGames",
                                                          "generateId", "initScores", "setBasicGameAttributes"]);
    spyGameService.getGames.and.returnValue(of(GAMES));
    spyGameService.addSimpleGame.and.returnValue(of(GAMES));
    spyGameService.generateId.and.returnValue(of(GAMES.length));
    spyGameService.initScores.and.returnValue("lol");
    TestBed.configureTestingModule({
      declarations: [SimpleViewComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, RouterTestingModule],
      providers: [
        {provide: MatDialogRef, useValue: {}, },
        {provide: MAT_DIALOG_DATA, useValue: {name: ""}, },
        {provide: GameService, useValue: spyGameService },
        HttpClient,
        HttpHandler,
        RouterModule,
        RouterTestingModule,
        IndexService,
      ],
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleViewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css("form"));
    el = de.nativeElement;
    fixture.detectChanges();
  });
  it("should create the SimpleView Component", () => {
    expect(component).toBeTruthy();
  });
  describe("Form tests - Validation and submits", () => {
  it("When onSubmit() is called, submitted should be true", async(() => {
    component.onSubmit();
    expect(component.isFormSubmitted).toBeTruthy();
  }));
  it("Clicking on the submit button should call the onSubmit function", async(() => {
    fixture.detectChanges();
    spyOn(component, "onSubmit");
    el = fixture.debugElement.query(By.css("button")).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));
  it("Clicking on the close button should call the function onNoClick", async(() => {
    fixture.detectChanges();
    spyOn(component, "onNoClick");
    el = fixture.debugElement.query(By.css("#button-test")).nativeElement;
    el.click();
    expect(component.onNoClick).toHaveBeenCalledTimes(1);
  }));
  it (" checkImgDimensions shoud return true only seulement for 640x480", async(() => {
    expect(component.checkImgDimensions(640, 480)).toBeTruthy();
    expect(component.checkImgDimensions(0, 0)).toBeFalsy();
    expect(component.checkImgDimensions(480, 640)).toBeFalsy();
    expect(component.checkImgDimensions(99999, 99999)).toBeFalsy();
  }));
  it("The form should be invalid when all its values are null", async(() => {
    component.registerForm.controls["gameName"].setValue("");
    component.registerForm.controls["originalFile"].setValue("");
    component.registerForm.controls["modifiedFile"].setValue("");
    expect(component.registerForm.valid).toBeFalsy();
  }));
  it("The form should be invalid when - gameName is too short", async(() => {
    component.registerForm.controls["gameName"].setValue("aaa");
  }));
  it("The form should be invalid when - gameName is too long", async(() => {
    component.registerForm.controls["gameName"].setValue("aaaaaaaaaaaaaa");
  }));
});
  describe("Own validators tests", () => {
  it("Validator should be called", async() => {
    const arr1: boolean [] = [];
    arr1[0] = false;
    spyOn(component, "validatorFile").and.callThrough();
    // tslint:disable-next-line:no-console required
    console.log(component.validatorFile(arr1));
    expect(component.validatorFile).toHaveBeenCalledTimes(1);
  });
  it (" checkFormat should be called when the input is changed for the original file", async(() => {
    spyOn(component, "checkFormat").and.callThrough();
    const testChangeEvent: Event = new Event("change");
    const target: HTMLInputElement = de.nativeElement.querySelector("#originalFile") as HTMLInputElement;
    target.dispatchEvent(testChangeEvent);
    fixture.whenStable().then(() => {
      expect(component.checkFormat).toHaveBeenCalledWith(testChangeEvent, component.isOriginalFileFormatAllowed, false);
    });
  }));
  it ("Should check the type of the image given in the input", async(() => {
    const testFileBadExtension: File = new File([""], "filename", {type: "image/png"});
    const testEventBadExtension: {target: {files: [File], id: string}} = {target: {files: [testFileBadExtension],
                                                                                   id: "testFileBadExtension"}};
    const testFileBadExtensionFeedback: HTMLDivElement = document.createElement("div");
    testFileBadExtensionFeedback.setAttribute("id", "testFileBadExtensionFeedback");
    document.body.appendChild( testFileBadExtensionFeedback);
    const testBadExtensionBoolean: boolean[] = [true];
    spyOn(component, "onImageLoad").and.callThrough();
    spyOn(component, "checkImgDimensions").and.callThrough();
    component.checkFormat(testEventBadExtension as any, testBadExtensionBoolean, false);
    expect(testBadExtensionBoolean[0]).toBeFalsy();
    expect(testFileBadExtensionFeedback.innerHTML).toBe("Mauvais type de fichier.");
    expect(component.onImageLoad).toHaveBeenCalledTimes(0);
    expect(component.checkImgDimensions).toHaveBeenCalledTimes(0);
    document.body.removeChild(testFileBadExtensionFeedback);
  }));
  it ("Should check the format of the given image and call onImageLoad", async(() => {
    trackImageOnload();
    const testFileBadFormat: File = new File([""], "filename", {type: "image/bmp"});
    const testEventBadFormat: {target: {files: [File], id: string}} = {target: {files: [testFileBadFormat], id: "testFileBadFormat"}};
    const testFileBadFormatFeedback: HTMLDivElement = document.createElement("div");
    testFileBadFormatFeedback.setAttribute("id", "testFileBadFormatFeedback");
    document.body.appendChild( testFileBadFormatFeedback);
    const testBadFormatBoolean: boolean[] = [true];
    spyOn(component, "onImageLoad").and.callThrough();
    spyOn(component, "checkImgDimensions").and.callThrough();
    component.checkFormat(testEventBadFormat as any, testBadFormatBoolean, false);
    waitImageTobeLoaded();
    expect(testBadFormatBoolean[0]).toBeFalsy();
    expect(testFileBadFormatFeedback.innerHTML).toBe("Mauvaises dimensions de fichier.");
    expect(component.onImageLoad).toHaveBeenCalledTimes(1);
    expect(component.checkImgDimensions).toHaveBeenCalledTimes(1);
    document.body.removeChild(testFileBadFormatFeedback);
  }));
});
  describe("Function hasSevenDifferences tests", () => {
  it("Function should return false when given an empty string", async(() => {
    const result: boolean = component.hasSevenDifferences("");
    expect(result).toBeFalsy();
  }));
  it("Function should return false when given 2", async(() => {
    const result: boolean = component.hasSevenDifferences("2");
    expect(result).toBeFalsy();
  }));
  it("Function should return false when given 8", async(() => {
    const result: boolean = component.hasSevenDifferences("8");
    expect(result).toBeFalsy();
  }));
  it("Function should return true when given 7", async(() => {
    const result: boolean = component.hasSevenDifferences("7");
    expect(result).toBeTruthy();
  }));
});
  describe("Adding and getting list of games tests", () => {
  it("getGames should return mock data base", () => {
    component.getGames();
    expect(component.games).toEqual(GAMES);
  });
  it("createSimpleGame should create a new game with the right thumbnail when given 7", () => {
    component.createSimpleGame("7");
    expect(component.game.originalImg).toEqual(component.thumbnail);
  });
  it("createSimpleGame should create a new game with simpleview POV when given 7", () => {
    component.createSimpleGame("7");
    expect(component.game.POV).toEqual(pointOfView.simpleGamePOV);
  });
});
});
