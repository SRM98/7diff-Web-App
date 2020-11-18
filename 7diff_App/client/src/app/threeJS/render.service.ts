import { Injectable } from "@angular/core";
import * as THREE from "three";
import "three/examples/js/controls/OrbitControls";
import { FreeGame } from "../../../../common/communication/game";
import * as constants from "../../../../common/constants";
import {Animal} from "./animal";
import { AnimalsCreatorService } from "./animalsCreator.service";
import { CollisionService } from "./collision.service";
import "./js/controls.js";
import { ObjectsCreatorService } from "./objectsCreator.service";
import { SceneCreatorService } from "./sceneCreator.service";

@Injectable()
export class RenderService {
  public container: HTMLDivElement;
  public renderer: THREE.WebGLRenderer;
  public camera: THREE.PerspectiveCamera;
  public scene: THREE.Scene;
  public originalScene: THREE.Scene;
  public modifiedScene: THREE.Scene;
  public controls: THREE.OrbitControls;
  public stopRendering: boolean;
  public nbElement: number;
  public isGeometries: boolean;
  public addDiff: boolean;
  public removeDiff: boolean;
  public colorDiff: boolean;

  public constructor( private animalService: AnimalsCreatorService,
                      private objectService: ObjectsCreatorService,
                      private sceneService: SceneCreatorService,
                      private collisionService: CollisionService) {
    this.scene = new THREE.Scene();
    this.originalScene = new THREE.Scene();
    this.modifiedScene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera();
    this.controls = new THREE.OrbitControls(this.camera);
    this.colorDiff = false;
    this.addDiff = false;
    this.removeDiff = false;
    this.stopRendering = false;
  }
  public setDifferencesParams(nbObj: number, objGeom: boolean, colorD: boolean, addD: boolean, removeD: boolean): void {
    this.nbElement = nbObj;
    this.isGeometries = objGeom;
    this.colorDiff = colorD;
    this.addDiff = addD;
    this.removeDiff = removeD;
  }
  public getAspectRatio(): number {
    return this.container.clientHeight !== 0 ? this.container.clientWidth / this.container.clientHeight : -1;
  }
  public renderGeneratedScene(): void {
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    this.scene = this.sceneService.setOriginalScene(this.scene, this.isGeometries);
    this.renderScene(this.scene, -1);
    this.originalScene = loader.parse(this.scene.toJSON());
    this.scene = this.sceneService.setModifiedScene(this.scene, this.isGeometries);
    this.renderScene(this.scene, 1);
    this.modifiedScene = loader.parse(this.scene.toJSON());
  }
  public renderScene(scene: THREE.Scene, sceneViewPort: number): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setViewport(0, 0, window.innerWidth / constants.NB_VIEWPORT  + sceneViewPort, window.innerHeight);
    this.renderer.setScissor(0, 0, window.innerWidth / constants.NB_VIEWPORT  + sceneViewPort, window.innerHeight);
    this.renderer.setScissorTest(true);
    this.camera.aspect = window.innerWidth / constants.NB_VIEWPORT / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.render(scene, this.camera);
  }
  public onResize(): void {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  public initialize(container: HTMLDivElement): void {
    this.sceneService.resetSceneParameters();
    this.isGeometries ? this.objectService.setSceneParams(this.nbElement) : this.animalService.setSceneParams(this.nbElement);
    this.scene = this.sceneService.createScene(this.nbElement);
    this.camera = this.sceneService.camera;
    this.sceneService.createFloor(this.isGeometries);
    this.container = container;
    if (this.isGeometries) {
      let shapediff: THREE.Mesh;
      for (let i: number = 0; i < this.nbElement - constants.NB_DIFERENCES; ++i) {
        shapediff = this.objectService.generateObjects();
        this.scene.add(shapediff);
      }
    } else {
      let shapediff: Animal;
      for (let i: number = 0; i < this.nbElement - constants.NB_DIFERENCES; ++i) {
        shapediff = this.animalService.generateAnimal();
        this.scene.add(shapediff.getGroup());
      }
    }
    this.scene = this.isGeometries ? this.sceneService.distributeGeometryDiff(this.scene, this.colorDiff, this.addDiff, this.removeDiff)
      : this.sceneService.distributeAnimalDiff(this.scene, this.colorDiff, this.addDiff, this.removeDiff);
    this.setRenderer();
    this.renderGeneratedScene();
  }
  public exportSceneToJSON(): string[]  {
    return [JSON.stringify(this.getSceneObjects(this.originalScene)), JSON.stringify(this.getSceneObjects(this.modifiedScene))];
  }
  public getSceneObjects(scene: THREE.Scene): Object[] {
    const sceneInformations: Object[] = [];
    for (const child of scene.children) {
      sceneInformations.push(child);
    }

    return sceneInformations;
  }
  public getThumbnail(): string {
    return this.renderer.domElement.toDataURL();
  }
  public loadExistingScene(game: FreeGame, container: HTMLDivElement): void {
    this.stopRendering = false;
    this.container = container;
    this.originalScene = new THREE.Scene();
    this.modifiedScene = new THREE.Scene();
    this.sceneService.parseScene(this.originalScene, game.originalScene);
    this.sceneService.parseScene(this.modifiedScene, game.modifiedScene);
    this.nbElement = this.modifiedScene.children.length;
    this.setCamera();
    this.originalScene.add( this.camera );
    this.modifiedScene.add( this.camera);

    this.setRenderer();
    this.renderExistingScene();
  }
  public setCamera(): void {
      this.camera = new THREE.PerspectiveCamera( constants.CAM_FOV,
                                                 window.innerWidth / window.innerHeight,
                                                 constants.CAM_NEAR,
                                                 constants.CAM_FAR );
      this.camera.position.set(constants.CAM_POS_X, constants.CAM_POS_Y, constants.CAM_POS_Z);
      this.controls = new THREE.OrbitControls( this.camera, this.container);
      this.controls.target.setZ(this.camera.position.z - constants.CONTROLS_TARGET_BUFFER);
      this.controls.target.setY(constants.CONTROLS_TARGET_Y_POS);
      this.controls.enableZoom = false;
      this.controls.keys = { LEFT: 65, UP: 87, BOTTOM: 83, RIGHT: 68  };
      // @ts-ignore
      this.controls.mouseButtons = { LEFT: THREE.MOUSE.RIGHT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.MIDDLE };

      this.controls.keyPanSpeed = constants.CONTROLS_PAN_SPEED;
      this.controls.minPolarAngle = constants.CONTROLS_MIN_POLAR;
      this.controls.maxPolarAngle = constants.CONTROLS_MAX_POLAR;
      this.controls.update();
  }
  public getSceneWidth(): number {
    return window.innerWidth * constants.SCENE_WIDTH_RATIO;
  }
  public getSceneHeight(): number {
    return window.innerHeight * constants.SCENE_HEIGHT_RATIO;
  }

  public renderExistingScene(): void {
    if (!this.stopRendering) {
      this.collisionService.verifyMovement(this.camera, this.controls, this.originalScene, this.modifiedScene);
      this.collisionService.verifyBoundary(this.camera, this.modifiedScene.children.length, this.controls);
      requestAnimationFrame(() => this.renderExistingScene());
    }
    this.renderOriginalScene();
    this.renderModifiedScene();
  }
  public close(): void {
    this.stopRendering = true;
  }
  public renderOriginalScene(): void {
    const sceneWidth: number = this.getSceneWidth();
    const sceneHeight: number = this.getSceneHeight();
    this.originalScene.background = new THREE.Color(this.isGeometries ? constants.SKY_GEOM_COLOR : constants.SKY_ANIM_COLOR);
    this.renderer.setSize(sceneWidth, sceneHeight);
    this.renderer.setViewport(0, 0, sceneWidth / constants.NB_VIEWPORT  - 1, sceneHeight);
    this.renderer.setScissor(0, 0, sceneWidth / constants.NB_VIEWPORT  - 1, sceneHeight);
    this.renderer.setScissorTest(true);
    this.camera.aspect = sceneWidth / constants.NB_VIEWPORT / sceneHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.originalScene, this.camera);
  }
  public renderModifiedScene(): void {
    const sceneWidth: number = this.getSceneWidth();
    const sceneHeight: number = this.getSceneHeight();
    this.modifiedScene.background = new THREE.Color( 1 - (this.isGeometries ? constants.SKY_GEOM_COLOR : constants.SKY_ANIM_COLOR) );
    this.renderer.setViewport(sceneWidth / constants.NB_VIEWPORT + 1, 0, sceneWidth / constants.NB_VIEWPORT, sceneHeight);
    this.renderer.setScissor(sceneWidth / constants.NB_VIEWPORT  + 1, 0, sceneWidth / constants.NB_VIEWPORT, sceneHeight);
    this.renderer.setScissorTest(true);
    this.camera.aspect = sceneWidth / constants.NB_VIEWPORT / sceneHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.modifiedScene, this.camera);
  }
  public setRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);
  }
  public setScenes(originalScene: THREE.Scene, modifiedScene: THREE.Scene): void {
    this.originalScene = originalScene;
    this.modifiedScene = modifiedScene;
    this.originalScene.add( this.camera );
    this.modifiedScene.add( this.camera);
  }
}
