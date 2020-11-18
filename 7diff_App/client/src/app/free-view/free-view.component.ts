import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {pointOfView, FreeGame, Game} from "../../../../common/communication/game";
import * as constants from "../../../../common/constants";
import { game3 } from "../../app/mock-games";
import {GameService} from "../game.service";
import "../threeJS/js/controls.js";
import {RenderService} from "../threeJS/render.service";

export interface DialogData {
  name: string;
}
export interface ObjectType {
  value: string;
  viewValue: string;
}
export interface Modifications {
  checked: boolean;
  viewValue: string;
}
@Component({
  selector: "app-free-view",
  templateUrl: "./free-view.component.html",
  styleUrls: ["./free-view.component.css"],
})
export class FreeViewComponent implements OnInit {
  private readonly freePOV: pointOfView = pointOfView.freeGamePOV;

  public registerForm: FormGroup;
  public isFormSubmitted: boolean;

  public game: FreeGame;
  public games: Game[];

  private get container(): HTMLDivElement {
    return this.containerRef.nativeElement;
  }

  @ViewChild("container")
  private containerRef: ElementRef;

  public types: ObjectType[] = [
    {value: "geometrique", viewValue: "Formes géométriques"},
    {value: "thematique", viewValue: "Formes thématiques"},
  ];

  public modifications: Modifications[] = [
    {checked: false, viewValue: "Ajout"},
    {checked: false, viewValue: "Suppresion"},
    {checked: false, viewValue: "Changement de couleur"},
  ];

  public constructor(public dialogRef: MatDialogRef<FreeViewComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
                     private formBuilder: FormBuilder,
                     private gameService: GameService,
                     private renderService: RenderService) {
                      this.game = game3;
                      this.isFormSubmitted = false;
}

  public ngOnInit(): void {
    this.isFormSubmitted = false;
    this.registerForm = this.formBuilder.group({
      gameName : ["", [Validators.required, Validators.minLength(constants.MIN_LENGTH_GAME_NAME),
                       Validators.maxLength(constants.MAX_LENGTH_GAME_NAME)]],
      objectNumber: ["", [Validators.required, Validators.max(constants.MAX_OBJECT_NUMBER),
                          Validators.min(constants.MIN_OBJECT_NUMBER), Validators.pattern(constants.NUMBER_PATTERN)]],
      objectType: ["", [Validators.required]],
      modificationType: ["", [Validators.required]],
    });
    this.getGames();

  }

  public OnChange(event: MatCheckboxChange, item: Modifications): void {
    if (event.checked !== item.checked) {
    item.checked = !item.checked;
    }
  }

  public onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
    const nbObjects: number = this.registerForm.controls["objectNumber"].value;
    let objectType: boolean;
    objectType = (this.registerForm.controls["objectType"].value === "geometrique");
    const addModif: boolean = this.modifications[0].checked;
    const removeModif: boolean = this.modifications[1].checked;
    const colorModif: boolean = this.modifications[constants.COLOR_INDEX].checked;

    this.renderService.setDifferencesParams(nbObjects, objectType, colorModif, addModif, removeModif );

    this.dialogRef.close({name: this.data.name});
    this.createFreeGame();
    }

  }

  // tslint:disable-next-line:no-any
  public get form(): any {
    return this.registerForm.controls;
  }

  public onNoClick(): void {
    this.dialogRef.close({name: this.data.name});
  }

  public getGames(): void {
    this.gameService.getGames()
    .subscribe((games) => this.games = games);
  }

  public createFreeGame(): void {
    this.renderService.initialize(this.container);
    this.gameService.setBasicGameAttributes(this.games, this.game, this.registerForm.controls["gameName"].value);
    this.game.thumbnail = this.renderService.getThumbnail();
    const completeScene: string[] = this.renderService.exportSceneToJSON();
    this.game.originalScene = completeScene[0];
    this.game.modifiedScene = completeScene[1];
    this.game.POV = this.freePOV;
    this.gameService.addFreeGame(this.game).subscribe((games) => {
      this.games = games;
      },
    );
  }
}
