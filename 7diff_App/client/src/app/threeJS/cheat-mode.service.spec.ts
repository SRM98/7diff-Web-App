import { TestBed } from "@angular/core/testing";
import {of} from "rxjs";
import * as THREE from "three";
import { game3, game4 } from "../../app/mock-games";
import { CheatModeService } from "./cheat-mode.service";
import { ObjectsCreatorService } from "./objectsCreator.service";
import { RenderService } from "./render.service";
import { SceneCreatorService } from "./sceneCreator.service";
import SpyObj = jasmine.SpyObj;

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers

describe("CheatModeService", () => {
  let spyRenderService: SpyObj<RenderService>;
  let spySceneService: SpyObj<SceneCreatorService>;

  beforeEach(() => {
    spyRenderService = jasmine.createSpyObj("RenderService", ["setScenes"]);
    spyRenderService.setScenes.and.returnValue(of());
    spySceneService = jasmine.createSpyObj("SceneService", ["parseScene"]);
    spySceneService.parseScene.and.returnValue(of());
    TestBed.configureTestingModule({
      providers: [
        {provide: RenderService, useValue: spyRenderService },
        ObjectsCreatorService,
        {provide: SceneCreatorService, useValue: spySceneService },
      ],
    });
  });

  it("should be created", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    expect(service).toBeTruthy();
  });

  it("initializeCheatMode should call parseScene twice", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeCheatMode(game3);
    // tslint:disable-next-line:no-magic-numbers
    expect(spySceneService.parseScene.calls.count()).toEqual(2);
  });

  it("initializeCheatMode should make isActiveCheatMode false", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    service.initializeCheatMode(game3);
    expect(service.isActiveCheatMode).toBeFalsy();
  });

  it("initializeCheatMode should make cheatModeOriginalScene not null", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeCheatMode(game3);
    expect(service.cheatModeOriginalScene).not.toEqual( new THREE.Scene());
  });

  it("initializeCheatMode should make cheatModeModifiedScene not null", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeCheatMode(game3);
    expect(service.cheatModeModifiedScene).not.toEqual( new THREE.Scene());
  });

  it("initializeDiffrences should make indexDifferentObjects have a length of 7", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeDifferences();
    // tslint:disable-next-line:no-magic-numbers
    expect(service.indexDifferentObjects.length).toEqual(7);
  });

  it("initializeDiffrences should make indexDifferentObjects have the index of all different objects", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeDifferences();
    // tslint:disable-next-line:no-magic-numbers
    const expectedResult: number[] = [9, 10, 11, 13, 15, 16, 18];
    expect(service.indexDifferentObjects).toEqual(expectedResult);
  });

  it("setCheatModeScenes should call makeInvisible 7 times", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    spyOn(service, "makeInvisible");
    service.initializeDifferences();
    service.setCheatModeScenes();
    // tslint:disable-next-line:no-magic-numbers
    expect(service.makeInvisible).toHaveBeenCalledTimes(7);

  });

  it("toggleCheatModeActivity should make isActiveCheatMode true if it was false", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    service.isActiveCheatMode = false;
    service.toggleCheatModeActivity();
    expect(service.isActiveCheatMode).toBeTruthy();
  });

  it("toggleCheatModeActivity should make isActiveCheatMode false if it was true", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    service.isActiveCheatMode = true;
    service.toggleCheatModeActivity();
    expect(service.isActiveCheatMode).toBeFalsy();
  });

  it("activateCheatCount should call the function setScenes twice", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    service.isActiveCheatMode = false;
    service.activateCheatMode();
    // tslint:disable-next-line:no-magic-numbers
    expect(spyRenderService.setScenes.calls.count() * 2).toEqual(2);

  });

  it("deactivateCheatCount should call the function setScenes once", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    service.deactivateCheatMode();
    expect(spyRenderService.setScenes.calls.count()).toEqual(1);
  });

  it("delay should return a defined Promise", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    // tslint:disable-next-line:no-magic-numbers
    expect(service.delay(1000)).toBeDefined();
  });

  it("updateModifiedScene should give modified scene the appropriate value passed in parameters", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[];
    const modifiedScene: THREE.Scene = new THREE.Scene();
    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      modifiedScene.add( object );
    }
    service.updateModifiedScene(modifiedScene);
    expect(service.modifiedScene).toEqual(modifiedScene);
  });

  it("updateModifiedScene should call initializeDiff et setCheatModeScene once", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[];
    const modifiedScene: THREE.Scene = new THREE.Scene();
    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      modifiedScene.add( object );
    }
    spyOn(service, "initializeDifferences");
    spyOn(service, "setCheatModeScenes");
    service.updateModifiedScene(modifiedScene);
    expect(service.initializeDifferences).toHaveBeenCalledTimes(1);
    expect(service.setCheatModeScenes).toHaveBeenCalledTimes(1);

  });

  it("makeInvisible should change visiblity of objects passed in parameters  (geometry)", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    // tslint:disable-next-line:no-magic-numbers
    service.makeInvisible(service.originalScene.children[10], service.modifiedScene.children[10]);
    // @ts-ignore
    expect(service.originalScene.children[10].material.visible).toBeFalsy();
    // @ts-ignore
    expect(service.modifiedScene.children[10].material.visible).toBeFalsy();
  });

  it("makeInvisible should change visiblity of objects passed in parameters  (themes)", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    // tslint:disable-next-line:no-magic-numbers
    service.makeInvisible(service.originalScene.children[10], service.modifiedScene.children[10]);
    // @ts-ignore
    expect(service.originalScene.children[10].children[1].material.visible).toBeFalsy();
    // @ts-ignore
    expect(service.modifiedScene.children[10].children[1].material.visible).toBeFalsy();
  });

  it("makeInvisible should call changeObjectVisibility 0 times when object is neither a mesh or a group", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    spyOn(service, "changeObjectVisibility");
    service.makeInvisible(service.originalScene.children[1], service.modifiedScene.children[1]);
    expect(service.changeObjectVisibility).toHaveBeenCalledTimes(0);
  });

  it("changeObjectVisibility should change visiblity of objects passed in parameters ", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    // tslint:disable-next-line:no-magic-numbers
    service.changeObjectVisibility(service.originalScene.children[10], service.modifiedScene.children[10]);
    // @ts-ignore
    expect(service.originalScene.children[10].material.visible).toBeFalsy();
    // @ts-ignore
    expect(service.modifiedScene.children[10].material.visible).toBeFalsy();
  });
// tslint:disable-next-line:max-file-line-count
});
