import { inject, TestBed } from "@angular/core/testing";
import * as THREE from "Three";
import * as constants from "../../../../common/constants";
import { game3 } from "../../app/mock-games";
import {AnimalsCreatorService} from "./animalsCreator.service";
import {Cat} from "./cat";
import { ObjectsCreatorService } from "./objectsCreator.service";
import { RenderService } from "./render.service";
import { SceneCreatorService } from "./sceneCreator.service";

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers

describe("SceneCreatorService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RenderService,
        AnimalsCreatorService,
        ObjectsCreatorService,
        SceneCreatorService,
      ],
    });
  });

  it("SceneCreator service should be created", inject([SceneCreatorService], (service: SceneCreatorService) => {
    expect(service).toBeTruthy();
  }));

  describe("Creating scenes with parameters", () => {
  it("should return a scene", inject([SceneCreatorService], (service: SceneCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    expect(service.createScene(10)).toBeDefined();
  }));
  it("should create a floor", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.scene = new THREE.Scene;
    expect(service.createFloor(true)).toBeDefined();
  }));

  // tslint:disable-next-line:max-line-length
  it("parseScene should return a valid scene when given a scene in string", inject([SceneCreatorService], (service: SceneCreatorService) => {
    const scene: THREE.Scene = new THREE.Scene();
    service.parseScene(scene, game3.originalScene);
    expect(scene.children.length).toEqual(20);
  }));
  it("should reset parameters", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.resetSceneParameters();
    expect(service.nbColorDiff).toEqual(0);
    expect(service.nbAddDiff).toEqual(0);
    expect(service.nbRemoveDiff).toEqual(0);
    expect(service.modifiedColors).toEqual([]);
    expect(service.addDiffAnimals).toEqual([]);
  }));
  it("should fill scenes differences holders with Animals", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.scene = new THREE.Scene;
    service.originalColors = [0x001100];
    service.modifiedColors = [0x110011];
    service.nbColorDiff = 1;
    service.nbRemoveDiff = 1;
    service.nbAddDiff = 1;
    service.colorDiffAnimals = [new Cat()];
    service.addDiffAnimals = [new Cat()];
    service.removeDiffAnimals = [new Cat()];
    service.setOriginalScene(service.scene, false);
    expect(service.colorDiffAnimals[0].getColor()).toEqual(0x001100);
    // @ts-ignore
    expect(service.addDiffAnimals[0].getGroup().children[1].material.visible).toBeFalsy();
    // @ts-ignore
    expect(service.removeDiffAnimals[0].getGroup().children[1].material.visible).toBeTruthy();
    service.setModifiedScene(service.scene, false);
    expect(service.colorDiffAnimals[0].getColor()).toEqual(0x110011);
    // @ts-ignore
    expect(service.addDiffAnimals[0].getGroup().children[1].material.visible).toBeTruthy();
    // @ts-ignore
    expect(service.removeDiffAnimals[0].getGroup().children[1].material.visible).toBeFalsy();
  }));
  it("should fill scenes differences holders with geometries", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.scene = new THREE.Scene;
    service.originalColors = [0x001100];
    service.nbColorDiff = 1;
    service.nbRemoveDiff = 1;
    service.nbAddDiff = 1;
    service.colorDiffGeometries = [new THREE.Mesh];
    service.addDiffGeometries = [new THREE.Mesh];
    service.removeDiffGeometries = [new THREE.Mesh];
    service.setOriginalScene(service.scene, true);
    expect(service.colorDiffGeometries.length).toEqual(1);
    // @ts-ignore
    expect(service.addDiffGeometries[0].material.visible).toBeFalsy();
    // @ts-ignore
    expect(service.removeDiffGeometries[0].material.visible).toBeTruthy();
    service.setModifiedScene(service.scene, true);
    expect(service.colorDiffGeometries.length).toEqual(1);
    // @ts-ignore
    expect(service.addDiffGeometries[0].material.visible).toBeTruthy();
    // @ts-ignore
    expect(service.removeDiffGeometries[0].material.visible).toBeFalsy();
  }));
});
  describe("Creating different scenes based on the selectedType", () => {
  it("should distribute the geometry differences", inject([SceneCreatorService], (service: SceneCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.objectService.setSceneParams(10);
    // tslint:disable-next-line:no-magic-numbers
    service.distributeGeometryDiff(service.createScene(10), true, true, true);
    expect(service.nbColorDiff + service.nbAddDiff + service.nbRemoveDiff).toEqual(constants.NB_DIFERENCES);
    expect(service.originalColors.length).toEqual(service.nbColorDiff);
    expect(service.addDiffGeometries.length).toEqual(service.nbAddDiff);
  }));
  it("should distribute only color geometry differences", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.objectService.setSceneParams(20);
    service.distributeGeometryDiff(service.createScene(20), true, false, false);
    expect(service.originalColors.length).toEqual(constants.NB_DIFERENCES);
  }));
  it("should distribute only adding geometry differences", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.objectService.setSceneParams(30);
    service.distributeGeometryDiff(service.createScene(30), false, true, false);
    expect(service.addDiffGeometries.length).toEqual(constants.NB_DIFERENCES);
  }));
  it("should distribute only adding geometry differences", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.objectService.setSceneParams(40);
    service.distributeGeometryDiff(service.createScene(40), false, false, true);
    expect(service.removeDiffGeometries.length).toEqual(constants.NB_DIFERENCES);
  }));
  it("should distribute the animal differences", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.animalService.setSceneParams(50);
    service.distributeAnimalDiff(service.createScene(50), true, true, true);
    expect(service.nbColorDiff + service.nbAddDiff + service.nbRemoveDiff).toEqual(constants.NB_DIFERENCES);
    expect(service.originalColors.length).toEqual(service.nbColorDiff);
    expect(service.addDiffAnimals.length).toEqual(service.nbAddDiff);
  }));
  it("should distribute only color animal differences", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.animalService.setSceneParams(60);
    service.distributeAnimalDiff(service.createScene(60), true, false, false);
    expect(service.originalColors.length).toEqual(constants.NB_DIFERENCES);
  }));
  it("should distribute only adding animal differences", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.animalService.setSceneParams(100);
    service.distributeAnimalDiff(service.createScene(100), false, true, false);
    expect(service.addDiffAnimals.length).toEqual(constants.NB_DIFERENCES);
  }));
  it("should distribute only removing animal differences", inject([SceneCreatorService], (service: SceneCreatorService) => {
    service.animalService.setSceneParams(200);
    service.distributeAnimalDiff(service.createScene(200), false, false, true);
    expect(service.removeDiffAnimals.length).toEqual(constants.NB_DIFERENCES);
  }));
});
});
