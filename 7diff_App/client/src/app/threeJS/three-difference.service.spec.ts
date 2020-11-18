import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import {of} from "rxjs";
import * as THREE from "three";
import { game3, game4 } from "../../app/mock-games";
import SpyObj = jasmine.SpyObj;
import { GamePlayService } from "../game-play.service";
import { IndexService } from "../index.service";
import { UsernameService } from "../username.service";
import { WebSocketService } from "../webSocket.service";
import { AnimalsCreatorService } from "./animalsCreator.service";
import { CheatModeService } from "./cheat-mode.service";
import { DifferenceFinderService } from "./difference-finder.service";
import { ObjectsCreatorService } from "./objectsCreator.service";
import { RenderService } from "./render.service";
import { SceneCreatorService } from "./sceneCreator.service";
import { ThreeDifferenceService } from "./three-difference.service";

// tslint:disable:no-floating-promises
// tslint:disable:no-any
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count

describe("ThreeDifferenceService", () => {
  let spySceneService: SpyObj<SceneCreatorService>;
  let httpClientSpy: any;
  let spyRenderService: SpyObj<RenderService>;
  let spyCheatMode: SpyObj<CheatModeService>;
  let spyWebSocket: SpyObj<WebSocketService>;
  // tslint:disable-next-line:max-func-body-length
  beforeEach(() => {
    spySceneService = jasmine.createSpyObj("SceneService", ["parseScene"]);
    spySceneService.parseScene.and.returnValue(of());

    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "get"]);
    httpClientSpy.post.and.returnValue(of());
    httpClientSpy.get.and.returnValue(of(new Object()));
    spyRenderService = jasmine.createSpyObj("RenderService", ["setScenes", "getSceneObjects"]);
    spyRenderService.setScenes.and.returnValue(of());
    // spyRenderService.getSceneObjects.and.returnValue(JSON.parse(game3.originalScene));

    spyCheatMode = jasmine.createSpyObj("CheatModeService", ["updateModifiedScene"]);
    spyCheatMode.updateModifiedScene.and.returnValue(of());

    spyWebSocket = jasmine.createSpyObj("WebSocketService", ["updateGame"]);
    spyWebSocket.updateGame.and.returnValue(of());

    TestBed.configureTestingModule({
    providers : [ {provide: HttpClient, useValue: httpClientSpy},
                  HttpHandler,
                  {provide: RenderService, useValue: spyRenderService },
                  {provide: CheatModeService, useValue: spyCheatMode},
                  ObjectsCreatorService,
                  ThreeDifferenceService,
                  {provide: SceneCreatorService, useValue: spySceneService },
                  AnimalsCreatorService,
                  DifferenceFinderService,
                  GamePlayService,
                  IndexService,
                  {provide: WebSocketService, useValue: spyWebSocket},
                  UsernameService],
              });
    });

  it("should be created", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    expect(service).toBeTruthy();
  });

  it("initializeDifferenceMode should call parseScene twice ", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    service.initializeDifferenceMode(game3);
    // tslint:disable-next-line:no-magic-numbers
    expect(spySceneService.parseScene).toHaveBeenCalledTimes(2);
  });

  it("initializeDifferenceMode should initializeDifferences once ", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    spyOn(service, "initializeDifferences");
    service.initializeDifferenceMode(game3);
    expect(service.initializeDifferences).toHaveBeenCalledTimes(1);
  });

  it("initializeDifferenceMode should set differenceCounter = 0 ", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    service.initializeDifferenceMode(game3);
    expect(service.differenceCounter).toEqual(0);
  });

  it("initializeDifferences should make originalObjects' length equal to 7 (geometry)", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeDifferences();
    expect(service.originalObjects.length).toEqual(7);
  });

  it("initializeDifferences should make originalObjects' and modifiedObjects' length equal to 7 (themes)", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeDifferences();
    // tslint:disable-next-line:no-magic-numbers
    expect(service.originalObjects.length).toEqual(7);
    // tslint:disable-next-line:no-magic-numbers
    expect(service.modifiedObjects.length).toEqual(7);
  });

  it("addDiffObject should call the post request once", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeDifferences();

    service.isObjectDifferent({diffTab: service.originalObjects, object: service.originalObjects[0]});
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it("restoreDifferences should call findObjectIndex twice", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeDifferences();
    spyOn(service, "findObjectIndex");
    spyOn(service, "handleAddedException");
    service.restoreDifference();
    // tslint:disable-next-line:no-magic-numbers
    expect(service.findObjectIndex).toHaveBeenCalledTimes(2);
  });

  it("restoreDifferences should make the modifiedScene object equal to the original object", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    service.initializeDifferences();
    service.intersectedObject = service.originalObjects[0];
    spyOn(service, "handleAddedException");
    service.restoreDifference();
    expect(service.modifiedScene.children[9]).toEqual(service.originalObjects[0]);
  });

  it("restoreDifferences should call websocket's update game once", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    service.initializeDifferences();
    service.intersectedObject = service.originalObjects[0];
    spyOn(service, "handleAddedException");
    service.restoreDifference();
    // tslint:disable-next-line:no-magic-numbers
    expect(spyWebSocket.updateGame).toHaveBeenCalledTimes(1);
  });

  it("findObjectIndex should return 0 when given the originalObject tab and intersectedObject is the first", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeDifferences();
    service.intersectedObject = service.originalObjects[0];
    expect(service.findObjectIndex(service.originalObjects)).toEqual(0);
  });

  it("findObjectIndex should return -1 when given the modified scene tab and intersectedObject is the first originalObject", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }

    service.initializeDifferences();
    service.intersectedObject = service.originalObjects[0];
    expect(service.findObjectIndex(service.modifiedScene.children)).toEqual(-1);
  });

  it("isGroup should true when given an object of the themed scene", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    const children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isGroup(service.originalScene.children[10].children[1])).toBeTruthy();
  });

  it("findIntersectedObject should call isGroup once when given a valid intersected obj and should define intersectedObject", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    const evt: MouseEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    service.initializeDifferences();

    const intersects: any = [{id: 1, object: service.originalObjects[0] }];
    spyOn(service.raycaster, "setFromCamera");
    spyOn(service.raycaster, "intersectObjects").and.returnValue(intersects);
    service.renderService.originalScene = service.originalScene;
    spyOn(service, "isGroup").and.returnValue(true);
    service.findIntersectedObject(evt);
    expect(service.isGroup).toHaveBeenCalledTimes(1);
  });

  it("findIntersectedObject should isGroup and treatIntersectedObject 0 times when given an invalid intersected obj", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {
      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }
    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {
      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    const evt: MouseEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    service.initializeDifferences();

    const intersects: any = [];
    spyOn(service.raycaster, "setFromCamera");
    spyOn(service.raycaster, "intersectObjects").and.returnValue(intersects);
    service.renderService.originalScene = service.originalScene;
    spyOn(service, "isGroup").and.returnValue(true);
    service.findIntersectedObject(evt);
    expect(service.isGroup).toHaveBeenCalledTimes(0);
  });

  it("findIntersectedObject should call isGroup once when given a valid intersected obj and should define intersectedObject", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    const evt: MouseEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    service.initializeDifferences();
    const intersects: [{id: number, object: THREE.Object3D}] = [{id: 1, object: service.originalObjects[0] }];
    spyOn(service.raycaster, "setFromCamera");
    spyOn(service.raycaster, "intersectObjects").and.returnValue(intersects);
    service.renderService.originalScene = service.originalScene;
    spyOn(service, "isGroup").and.returnValue(true);
    service.findIntersectedObject(evt);
    expect(service.isGroup).toHaveBeenCalledTimes(1);
  });

  // tslint:disable-next-line:max-func-body-length
  it("treatIntersectedObject should call restoreDifference, playAudio once when there is a difference", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    service.initializeDifferences();
    service.intersectedObject = service.originalObjects[0];
    spyOn(service, "isObjectDifferent").and.returnValue(of(true));
    spyOn(service, "restoreDifference");
    spyOn(service.gamePlayService, "playAudio");
    service.treatIntersectedObject();
    expect(service.restoreDifference).toHaveBeenCalledTimes(1);
    expect(service.gamePlayService.playAudio).toHaveBeenCalledTimes(1);
  });

  it("treatIntersectedObject should increment nbDifferences when there is a difference", () => {
    const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {

      const object: any = loader.parse( child );
      service.modifiedScene.add( object );
    }
    service.initializeDifferences();
    service.intersectedObject = service.originalObjects[0];
    service.differenceCounter = 0;
    spyOn(service, "isObjectDifferent").and.returnValue(of(true));
    spyOn(service, "restoreDifference");
    spyOn(service, "initializeDifferences");
    service.treatIntersectedObject();
    expect(service.differenceCounter).toEqual(1);
  });

    // tslint:disable-next-line:max-func-body-length
    // tslint:disable-next-line:max-line-length
  it("treatIntersectedObject should call restoreDifference, initializeDifferences, updateModifiedScene 0 times and playAudio once when there is no difference", () => {
      const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
      const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
      let children: Object[] = JSON.parse(game4.originalScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.originalScene.add( object );
      }

      children = JSON.parse(game4.modifiedScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.modifiedScene.add( object );
      }
      service.initializeDifferences();
      service.intersectedObject = service.originalObjects[0];
      spyOn(service, "isObjectDifferent").and.returnValue(of(false));
      spyOn(service, "restoreDifference");
      spyOn(service, "initializeDifferences");
      spyOn(service.gamePlayService, "playAudio");
      service.treatIntersectedObject();
      expect(service.restoreDifference).toHaveBeenCalledTimes(0);
      expect(service.initializeDifferences).toHaveBeenCalledTimes(0);
      expect(service.gamePlayService.playAudio).toHaveBeenCalledTimes(1);
      expect(spyCheatMode.updateModifiedScene).toHaveBeenCalledTimes(0);
    });

  it("treatIntersectedObject shouldnt increment nbDifferences when there is no difference", () => {
      const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
      const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
      let children: Object[] = JSON.parse(game4.originalScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.originalScene.add( object );
      }

      children = JSON.parse(game4.modifiedScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.modifiedScene.add( object );
      }
      service.initializeDifferences();
      service.intersectedObject = service.originalObjects[0];
      service.differenceCounter = 0;
      spyOn(service, "isObjectDifferent").and.returnValue(of(false));
      spyOn(service, "restoreDifference");
      spyOn(service, "initializeDifferences");
      service.treatIntersectedObject();
      expect(service.differenceCounter).toEqual(0);
    });

  it("isAdded should return true when given index = 2 (Mesh) ", () => {
      const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
      const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
      let children: Object[] = JSON.parse(game3.originalScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.originalScene.add( object );
      }

      children = JSON.parse(game3.modifiedScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.modifiedScene.add( object );
      }

      service.initializeDifferences();
      // tslint:disable-next-line:no-magic-numbers
      expect(service.isAdded(2)).toBeTruthy();

    });

  it("isAdded should return false when given index = 0 (Group) ", () => {
      const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
      const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
      let children: Object[] = JSON.parse(game4.originalScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.originalScene.add( object );
      }

      children = JSON.parse(game4.modifiedScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.modifiedScene.add( object );
      }

      service.initializeDifferences();
      expect(service.isAdded(0)).toBeFalsy();

    });

  it("handleAddedException should change object visibility when given index = 3 ", () => {
      const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
      const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
      let children: Object[] = JSON.parse(game3.originalScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.originalScene.add( object );
      }

      children = JSON.parse(game3.modifiedScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.modifiedScene.add( object );
      }

      service.initializeDifferences();
      // tslint:disable-next-line:no-magic-numbers
      service.handleAddedException(3);
      // tslint:disable-next-line:no-magic-numbers
      expect(service.originalObjects[3].visible).toBeFalsy();

    });

  it("handleAddedException should change object visibility when given index = 0 ", () => {
      const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
      const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
      let children: Object[] = JSON.parse(game4.originalScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.originalScene.add( object );
      }

      children = JSON.parse(game4.modifiedScene);
      for (const child of children) {

        const object: any = loader.parse( child );
        service.modifiedScene.add( object );
      }

      service.initializeDifferences();
      service.handleAddedException(0);
      expect(service.originalObjects[0].visible).toBeTruthy();

    });

  it("onMouseMoveR should should make mouse attributes different of 0 and call findIntersectedObject once ", () => {
      const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
      const evt: MouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      spyOnProperty(evt, "clientX").and.returnValue(1);
      spyOnProperty(evt, "clientY").and.returnValue(1);
      service.renderService.container = document.createElement("div");
      spyOnProperty(service.renderService.container, "offsetLeft").and.returnValue(1);
      spyOnProperty(service.renderService.container, "clientWidth").and.returnValue(1);
      spyOnProperty(service.renderService.container, "offsetTop").and.returnValue(1);
      spyOnProperty(service.renderService.container, "clientHeight").and.returnValue(1);
      spyOn(service, "findIntersectedObject");
      service.onMouseMoveR(evt);
      expect(service.mouse.x).not.toEqual(0);
      expect(service.mouse.y).not.toEqual(0);
      expect(service.findIntersectedObject).toHaveBeenCalledTimes(1);
    });

  it("onMouseMoveL should should make mouse attributes different of 0 and call findIntersectedObject once ", () => {
      const service: ThreeDifferenceService = TestBed.get(ThreeDifferenceService);
      const evt: MouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      spyOnProperty(evt, "clientX").and.returnValue(1);
      spyOnProperty(evt, "clientY").and.returnValue(1);
      service.renderService.container = document.createElement("div");
      spyOnProperty(service.renderService.container, "offsetLeft").and.returnValue(1);
      spyOnProperty(service.renderService.container, "clientWidth").and.returnValue(1);
      spyOnProperty(service.renderService.container, "offsetTop").and.returnValue(1);
      spyOnProperty(service.renderService.container, "clientHeight").and.returnValue(1);
      spyOn(service, "findIntersectedObject");
      service.onMouseMoveL(evt);
      expect(service.mouse.x).not.toEqual(0);
      expect(service.mouse.y).not.toEqual(0);
      expect(service.findIntersectedObject).toHaveBeenCalledTimes(1);
    });
});
// tslint:disable-next-line:max-file-line-count
