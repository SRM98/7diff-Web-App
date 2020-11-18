import {HttpClient} from "@angular/common/http";
import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators, ValidatorFn} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {pointOfView, Game, SimpleGame} from "../../../../common/communication/game";
import * as constants from "../../../../common/constants";
import { game1 } from "../../app/mock-games";
import {GameService} from "../game.service";
export interface DialogData {
  name: string;
  popUps: boolean[];
}
@Component({
  selector: "app-simple-view",
  templateUrl: "./simple-view.component.html",
  styleUrls: ["./simple-view.component.css"],
})
export class SimpleViewComponent implements OnInit {
  private readonly simplePOV: pointOfView = pointOfView.simpleGamePOV;
  private readonly NEEDED_DIFFERENCES: string = "7";
  private readonly ERROR_TYPE: string = "Mauvais type de fichier.";
  private readonly FEEDBACK_MESSAGE: string = "Feedback";
  public readonly URL: string = "http://" + constants.SERVER_IP + ":3000/api/image/image";
  public readonly IMG_WIDTH: number = constants.SIMPLEVIEW_IMG_WIDTH;
  public readonly IMG_HEIGHT: number = constants.SIMPLEVIEW_IMG_HEIGHT;
  public readonly EXTENSION: string = constants.SIMPLEVIEW_EXTENSION;
  private readonly ERROR_MESSAGE: number = 2;

  public isOriginalFileFormatAllowed: boolean[];
  public isModifiedFileFormatAllowed: boolean[];
  public registerForm: FormGroup;
  public isFormSubmitted: boolean;
  public formData: FormData;
  public game: SimpleGame;
  public games: Game[];
  // tslint:disable-next-line:no-any
  public thumbnail: any;
  // tslint:disable-next-line:no-any
  public modifiedImage: any;

  public constructor(public dialogRef: MatDialogRef<SimpleViewComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
                     private formBuilder: FormBuilder,
                     private httpClient: HttpClient,
                     private gameService: GameService) {
                      this.isOriginalFileFormatAllowed = [false];
                      this.isModifiedFileFormatAllowed = [false];
                      this.isFormSubmitted = false;
                      this.thumbnail = "";
                      this.modifiedImage = "";
                      this.formData = new FormData();
                      this.game = game1;
}
  // tslint:disable-next-line:no-any
  public get form(): any {
    return this.registerForm.controls;
  }
  // tslint:disable-next-line:no-any
  public checkFormat(inputElement: any, isFileFormatAllowed: boolean[], isModified: boolean): void {
    this.formData.append(inputElement.target.name, inputElement.target.files[0]);
    // tslint:disable-next-line:no-non-null-assertion
    const displayedMessage: HTMLElement = document.getElementById(inputElement.target.id + this.FEEDBACK_MESSAGE)!;
    if ((inputElement.target.files[0].type) !== this.EXTENSION) {
    displayedMessage.innerHTML = this.ERROR_TYPE;
    isFileFormatAllowed[0] = false;
    } else {
      const img: HTMLImageElement = new Image();
      img.onload = this.onImageLoad(img, displayedMessage, isFileFormatAllowed);
      img.src = URL.createObjectURL(inputElement.target.files[0]);
    }
    this.onFileChanged(inputElement, isModified);
}
  public onImageLoad(image: HTMLImageElement, displayedMessage: HTMLElement, isFileFormatAllowed: boolean[] ): () => void {
    return () => {
      isFileFormatAllowed[0] = this.checkImgDimensions(image.width, image.height);
      let output: string = "";
      if (!isFileFormatAllowed[0]) {
        output = "Mauvaises dimensions de fichier.";
      }
      displayedMessage.innerHTML = output;
      Object.keys(this.registerForm.controls).forEach((field) => {
        // tslint:disable-next-line:no-non-null-assertion
        this.registerForm.get(field)!.updateValueAndValidity();
      });
    };
  }
  public validatorFile(isFileFormatAllowed: boolean[]): ValidatorFn {
    return ():
      { [key: string]: boolean } | null => {
      if (isFileFormatAllowed[0]) {
        return null;
      } else {
        return {"accept": true};
      }
    };
  }
  public checkImgDimensions(width: number, height: number): boolean {
    return (width === this.IMG_WIDTH && height === this.IMG_HEIGHT);
  }
  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      gameName : ["", [Validators.required,
                       Validators.minLength(constants.MIN_LENGTH_GAME_NAME),
                       Validators.maxLength(constants.MAX_LENGTH_GAME_NAME)]],
      originalFile: ["", [Validators.required, this.validatorFile(this.isOriginalFileFormatAllowed)]],
      modifiedFile: ["", [Validators.required, this.validatorFile(this.isModifiedFileFormatAllowed)]],
    });
    this.getGames();
  }
  public onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.data.name = this.form.gameName.value;
    this.formData.append("name", this.form.gameName.value);
    this.formData.append("id", this.gameService.generateId(this.games).toString());
    this.httpClient.post(this.URL, this.formData).subscribe((serverResponse) => {
      this.createSimpleGame(serverResponse.toString());
      this.getGames();
      this.dialogRef.close({name: this.data.name});
    });
  }
  public onNoClick(): void {
    this.dialogRef.close({name: this.data.name});
  }
  public getGames(): void {
    this.gameService.getGames()
    .subscribe((games) => this.games = games);
  }
  // tslint:disable-next-line:no-any
  public onFileChanged(src: any, isModified: boolean): void {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(src.target.files[0]);
    reader.onload = (event) => {
    if (!isModified) {
      this.thumbnail = (event.target as FileReader).result;
    } else {
      this.modifiedImage = (event.target as FileReader).result;
    }
   };
}
  public createSimpleGame(diffNumber: string): void {
  if (this.hasSevenDifferences(diffNumber)) {
    this.gameService.setBasicGameAttributes(this.games, this.game, this.form.gameName.value);
    this.game.originalImg = this.thumbnail ;
    this.game.modifiedImg = this.modifiedImage;
    this.game.modifiedGameImg = this.modifiedImage;
    this.game.POV = this.simplePOV;
    this.gameService.addSimpleGame(this.game).subscribe();
 } else {
    this.displayPopUp();
  }
}
  public hasSevenDifferences(diffNumber: string ): boolean {
    return diffNumber === this.NEEDED_DIFFERENCES;
  }
  public displayPopUp(): void {
    this.data.popUps[this.ERROR_MESSAGE] = true;
  }
}
