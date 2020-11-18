import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as THREE from "three";
import { FreeGame } from "../../../../common/communication/game";
import * as constants from "../../../../common/constants";
import { GamePlayService } from "../game-play.service";
import { WebSocketService } from "../webSocket.service";
import { DifferenceFinderService } from "./difference-finder.service";
import { RenderService } from "./render.service";
import { SceneCreatorService } from "./sceneCreator.service";

export interface FreeGameDifference {
  diffTab: THREE.Object3D[];
  object: THREE.Object3D;
}

@Injectable()
export class ThreeDifferenceService {
  private readonly ADD_DIFF_OBJECT_URL: string = "http://" + constants.SERVER_IP + ":3000/api/gameDB/addDiffObject";

  public raycaster: THREE.Raycaster;
  public mouse: THREE.Vector2;
  public intersectedObject: THREE.Object3D;
  public differenceCounter: number;
  public originalObjects: THREE.Object3D[];
  public modifiedObjects: THREE.Object3D[];
  public originalScene: THREE.Scene;
  public modifiedScene: THREE.Scene;

  public constructor(private http: HttpClient,
                     private sceneService: SceneCreatorService,
                     private finderService: DifferenceFinderService,
                     private webSocketService: WebSocketService,
                     public renderService: RenderService,
                     public gamePlayService: GamePlayService, ) {

    this.originalScene = new THREE.Scene();
    this.modifiedScene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(0, 0);
    this.intersectedObject = new THREE.Object3D();
    this.differenceCounter = 0;
  }
  public initializeDifferenceMode (game: FreeGame): void {
    this.differenceCounter = 0;
    this.originalScene = new THREE.Scene();
    this.modifiedScene = new THREE.Scene();
    this.sceneService.parseScene(this.originalScene, game.originalScene);
    this.sceneService.parseScene(this.modifiedScene, game.modifiedScene);
    this.initializeDifferences();
  }
  public initializeDifferences(): void {
    this.originalObjects = [];
    this.modifiedObjects = [];

    for (let i: number = 0; i < this.originalScene.children.length; i++) {
        if (this.finderService.isADifference(this.originalScene.children[i], this.modifiedScene.children[i])) {
          this.originalObjects.push(this.originalScene.children[i]);
          this.modifiedObjects.push(this.modifiedScene.children[i]);
      }
    }
  }
  public isObjectDifferent (diffObj: FreeGameDifference): Observable<boolean> {
    return this.http.post<boolean>(this.ADD_DIFF_OBJECT_URL, diffObj);
  }
  public onMouseMoveR(event: MouseEvent): void {
    // tslint:disable-next-line:no-magic-numbers
    this.mouse.x = ( (event.clientX - this.renderService.container.offsetLeft) / (this.renderService.container.clientWidth / 2))
                    + constants.RIGHT_X_OFFSET;
    // tslint:disable-next-line:no-magic-numbers
    this.mouse.y =  - ( (event.clientY - this.renderService.container.offsetTop) / (this.renderService.container.clientHeight / 2))
                    + constants.RIGHT_Y_OFFSET;
    this.findIntersectedObject(event);
  }

  public onMouseMoveL(event: MouseEvent): void {
    // tslint:disable-next-line:no-magic-numbers
    this.mouse.x = ( (event.clientX - this.renderService.container.offsetLeft) / (this.renderService.container.clientWidth / 2))
                    + constants.LEFT_X_OFFSET;
    // tslint:disable-next-line:no-magic-numbers
    this.mouse.y =  - ( (event.clientY - this.renderService.container.offsetTop) / (this.renderService.container.clientHeight / 2))
                    + constants.RIGHT_Y_OFFSET;
    this.findIntersectedObject(event);
  }
  public treatIntersectedObject(): void {
    this.isObjectDifferent({diffTab: this.originalObjects, object: this.intersectedObject}).subscribe((isDifference) => {
      if (isDifference) {
          this.restoreDifference();
          this.differenceCounter++;
      }
      this.gamePlayService.playAudio(isDifference);
    });
  }
  public restoreDifference(): void {
    const indexTabs: number = this.findObjectIndex(this.originalObjects);
    const indexScenes: number = this.findObjectIndex(this.originalScene.children);
    this.handleAddedException(indexTabs);
    this.originalScene.children[indexScenes] = this.originalObjects[indexTabs];
    this.modifiedScene.children[indexScenes] = this.originalObjects[indexTabs];
    this.webSocketService.updateGame(JSON.stringify(this.renderService.getSceneObjects(this.originalScene)),
                                     JSON.stringify(this.renderService.getSceneObjects(this.modifiedScene)));
  }
  public findObjectIndex(objects: THREE.Object3D[]): number {
    for (let i: number = 0; i < objects.length; i++) {
      if ( objects[i].uuid === this.intersectedObject.uuid) {
        return i;
      }
  }

    return -1;
  }
  public findIntersectedObject(event: MouseEvent): void {
    this.raycaster.setFromCamera( this.mouse, this.renderService.camera );
    const intersects: THREE.Intersection[] = this.raycaster.intersectObjects( this.renderService.originalScene.children, true );
    if ( intersects.length > 0 ) {
      // @ts-ignore
      this.isGroup(intersects[0].object) ? this.intersectedObject = intersects[ 0 ].object.parent :
                                          this.intersectedObject = intersects[ 0 ].object;
      this.treatIntersectedObject();
    }
  }

  public isGroup(object: THREE.Object3D): boolean {
    // @ts-ignore
    return object.parent.type === "Group";
  }
  public isAdded(index: number): boolean {
    if (this.originalObjects[index].type === "Group") {
      let isAddedObject: boolean = false;
      for (let i: number = 0; i < this.originalObjects.length && !isAddedObject; i++) {
        isAddedObject = this.finderService.isAddedObject(this.originalObjects[index].children[i], this.modifiedObjects[index].children[i]);
      }

      return isAddedObject;
    }

    return this.finderService.isAddedObject(this.originalObjects[index], this.modifiedObjects[index]);
  }
  public handleAddedException(index: number): void {
    if (this.isAdded(index)) {
      this.originalObjects[index].visible = false;
    }
  }
  public updateDifferenceMode(originalScene: THREE.Scene, modifiedScene: THREE.Scene): void {
    this.originalScene = originalScene;
    this.modifiedScene = modifiedScene;
    this.initializeDifferences();
  }
}
