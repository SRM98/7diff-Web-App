import { Injectable } from "@angular/core";
import * as THREE from "three";
import { FreeGame } from "../../../../common/communication/game";
import { DifferenceFinderService } from "./difference-finder.service";
import { RenderService } from "./render.service";
import { SceneCreatorService } from "./sceneCreator.service";

@Injectable({
  providedIn: "root",
})
export class CheatModeService {

  private readonly BLINK_TIME: number = 125;

  public originalScene: THREE.Scene;
  public modifiedScene: THREE.Scene;
  public cheatModeOriginalScene: THREE.Scene;
  public cheatModeModifiedScene: THREE.Scene;
  public indexDifferentObjects: number[];
  public isActiveCheatMode: boolean;

  public constructor(private renderService: RenderService,
                     private sceneService: SceneCreatorService,
                     private finderService: DifferenceFinderService) {
    this.originalScene = new THREE.Scene();
    this.modifiedScene = new THREE.Scene();
    this.indexDifferentObjects = [];
    this.isActiveCheatMode = false;
  }

  public initializeCheatMode(game: FreeGame): void {
    this.isActiveCheatMode = false;
    this.originalScene = new THREE.Scene();
    this.modifiedScene = new THREE.Scene();
    this.sceneService.parseScene(this.originalScene, game.originalScene);
    this.sceneService.parseScene(this.modifiedScene, game.modifiedScene);
    this.initializeDifferences();
    this.setCheatModeScenes();
  }

  public initializeDifferences(): void {
    this.indexDifferentObjects = [];
    for (let i: number = 0; i < this.originalScene.children.length; i++) {
      if (this.finderService.isADifference(this.originalScene.children[i], this.modifiedScene.children[i])) {
        this.indexDifferentObjects.push(i);
      }
    }
  }

  public toggleCheatModeActivity(): void {
    this.isActiveCheatMode = !this.isActiveCheatMode;
    this.isActiveCheatMode ? this.activateCheatMode() : this.deactivateCheatMode();
  }

  public setCheatModeScenes(): void {
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    this.cheatModeOriginalScene = loader.parse(this.originalScene.toJSON());
    this.cheatModeModifiedScene = loader.parse(this.modifiedScene.toJSON());
    for (const index of this.indexDifferentObjects) {
      this.makeInvisible(this.cheatModeOriginalScene.children[index], this.cheatModeModifiedScene.children[index]);
    }
  }

  public activateCheatMode(): void {
    // tslint:disable:no-floating-promises
    (async () => {
      this.renderService.setScenes(this.cheatModeOriginalScene, this.cheatModeModifiedScene);
      await this.delay(this.BLINK_TIME);
      this.renderService.setScenes(this.originalScene, this.modifiedScene);
      await this.delay(this.BLINK_TIME);
      if (this.isActiveCheatMode) {
        this.activateCheatMode();
      }
    })();
  }

  public deactivateCheatMode(): void {
    this.renderService.setScenes(this.originalScene, this.modifiedScene);
  }

  public async delay(ms: number): Promise<{}> {
    return new Promise( (resolve) => setTimeout(resolve, ms) );
  }

  public updateModifiedScene(modifiedScene: THREE.Scene): void {
    this.modifiedScene = modifiedScene;
    this.initializeDifferences();
    this.setCheatModeScenes();
  }

  public changeObjectVisibility(originalObject: THREE.Object3D, modifiedObject: THREE.Object3D): void {
    // @ts-ignore
    originalObject.material.visible = false;
    // @ts-ignore
    modifiedObject.material.visible = false;

  }

  public makeInvisible(originalObject: THREE.Object3D, modifiedObject: THREE.Object3D): void {
    if (originalObject.type === "Mesh") {
      this.changeObjectVisibility(originalObject, modifiedObject);
    } else if (originalObject.type === "Group") {
      for (let i: number = 0; i < originalObject.children.length; i++) {
        this.changeObjectVisibility(originalObject.children[i], modifiedObject.children[i]);
      }
    }
  }

}
