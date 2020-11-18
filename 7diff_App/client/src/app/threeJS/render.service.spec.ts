import { inject, TestBed } from "@angular/core/testing";
import * as THREE from "three";
import {FreeGame} from "../../../../common/communication/game";
import * as constants from "../../../../common/constants";
import { game3, game4 } from "../../app/mock-games";
import {AnimalsCreatorService} from "./animalsCreator.service";
import { ObjectsCreatorService } from "./objectsCreator.service";
import { RenderService } from "./render.service";
import { SceneCreatorService } from "./sceneCreator.service";

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-line-length

describe("RenderService", () => {
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
  it("Render Service should be created", inject([RenderService], (service: RenderService) => {
    expect(service).toBeTruthy();
  }));
  describe("Rendering scenes and params tests", () => {
  it("setDifferencesParams should set values passed in params", inject([RenderService], (service: RenderService) => {
   service.setDifferencesParams(1, true, true, true, true );
   expect(service.isGeometries).toEqual(true);
   expect(service.nbElement).toEqual(1);
   expect(service.colorDiff).toEqual(true);
   expect(service.addDiff).toEqual(true);
   expect(service.removeDiff).toEqual(true);
  }));
  it("should render the scene", inject([RenderService], (service: RenderService) => {
    service.renderer = new THREE.WebGLRenderer();
    service.camera = new THREE.PerspectiveCamera();
    service.renderGeneratedScene();
    expect(service.scene).toBeDefined();
  }));
  it("renderGeneratedScene should create a different original/modified scene", inject([RenderService], (service: RenderService) => {
    service.renderer = new THREE.WebGLRenderer();
    service.camera = new THREE.PerspectiveCamera();
    service.renderGeneratedScene();
    expect(service.originalScene !== service.modifiedScene).toBeTruthy();
  }));
});
  describe("tests for all the functions that need a container", () => {
    it("should set the renderer", inject([RenderService], (service: RenderService) => {
      service.container = document.createElement("div");
      service.setRenderer();
      expect(service.renderer).toBeDefined();
    }));
    it("should initialize with geometries", inject([RenderService], (service: RenderService) => {
      const container: HTMLDivElement = document.createElement("div");
      service.container = document.createElement("div");
      service.setDifferencesParams( 30, true, true, true, true);
      service.initialize(container);
      expect(service.container).toEqual(container);
    }));
    it("should initialize with animals", inject([RenderService], (service: RenderService) => {
      const container: HTMLDivElement = document.createElement("div");
      service.container = document.createElement("div");
      service.setDifferencesParams( 30, false, true, true, true);
      service.initialize(container);
      expect(service.container).toEqual(container);
    }));
    it("should get the aspectRatio to equal -1", inject([RenderService], (service: RenderService) => {
      service.container = document.createElement("div");
      expect(service.getAspectRatio()).toEqual(-1);
    }));
    it("should resize the parameters", inject([RenderService], (service: RenderService) => {
      service.container = document.createElement("div");
      service.setDifferencesParams( 30, true, true, true, true);
      service.renderer = new THREE.WebGLRenderer();
      service.onResize();
      expect(service.camera.aspect).toEqual(-1);
    }));
    it("should load the scenes", inject([RenderService], (service: RenderService) => {
      const container: HTMLDivElement = document.createElement("div");
      service.renderer = new THREE.WebGLRenderer();
      const game: FreeGame = game4;
      service.loadExistingScene(game, container);
      expect(service.originalScene).toBeDefined();
      expect(service.modifiedScene).toBeDefined();
    }));
  });
  describe("Receiving and sending information tests", () => {
  it("exportSceneToJSON should return a defined string tab", inject([RenderService], (service: RenderService) => {
    service.originalScene = new THREE.Scene();
    service.modifiedScene = new THREE.Scene();
    const result: string[] = service.exportSceneToJSON();
    expect(result).toBeDefined();
  }));
  it("getSceneObjects should return a defined object", inject([RenderService], (service: RenderService) => {
    service.originalScene = new THREE.Scene();
    service.originalScene.add(new THREE.Mesh());
    const result: Object[] = service.getSceneObjects(service.originalScene);
    expect(result).toBeDefined();
  }));
  it("getThumbnail should return a defined string", inject([RenderService], (service: RenderService) => {
    service.renderer = new THREE.WebGLRenderer();
    const result: string = service.getThumbnail();
    expect(result).toBeDefined();
  }));

  it("setScenes should assign modified/original scene the proper value passed in parameters", inject([RenderService], (service: RenderService) => {
    service.renderer = new THREE.WebGLRenderer();
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game3.originalScene);
    const originalScene: THREE.Scene = new THREE.Scene();
    const modifiedScene: THREE.Scene = new THREE.Scene();
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      originalScene.add( object );
    }

    children = JSON.parse(game3.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      modifiedScene.add( object );
    }
    service.setScenes(originalScene, modifiedScene);
    expect(service.originalScene.children.length).toEqual(originalScene.children.length);
    expect(service.modifiedScene.children.length).toEqual(modifiedScene.children.length);

  }));
  it("renderModifiedScene should make the modified scene's bg color equal to 1-constants.bg (geometry)", inject([RenderService], (service: RenderService) => {
    service.renderer = new THREE.WebGLRenderer({antialias: false});
    service.setDifferencesParams(20, true, true, true, true);
    service.renderModifiedScene();
    expect(service.modifiedScene.background).toEqual(new THREE.Color( 1 - constants.SKY_GEOM_COLOR));
  }));
  it("renderOriginalScene should make the original scene's bg color equal to constants.bg (geometry)", inject([RenderService], (service: RenderService) => {
    service.renderer = new THREE.WebGLRenderer({antialias: false});
    service.setDifferencesParams(120, true, true, true, true);
    service.renderOriginalScene();
    expect(service.originalScene.background).toEqual(new THREE.Color( constants.SKY_GEOM_COLOR));
  }));
  it("renderModifiedScene should make the modified scene's bg color equal to 1-constants.bg (animals)", inject([RenderService], (service: RenderService) => {
      service.renderer = new THREE.WebGLRenderer({antialias: false});
      service.setDifferencesParams(60, false, true, true, true);
      service.renderModifiedScene();
      expect(service.modifiedScene.background).toEqual(new THREE.Color( 1 - constants.SKY_ANIM_COLOR));
    }));
  it("renderOriginalScene should make the original scene's bg color equal to constants.bg (animals)", inject([RenderService], (service: RenderService) => {
      service.renderer = new THREE.WebGLRenderer({antialias: false});
      service.setDifferencesParams(160, false, true, true, true);
      service.renderOriginalScene();
      expect(service.originalScene.background).toEqual(new THREE.Color( constants.SKY_ANIM_COLOR));
    }));

  it("close should put stopRendering to true", inject([RenderService], (service: RenderService) => {
    service.close();
    expect(service.stopRendering).toBeTruthy();
  }));

  it("renderExistingScene should call renderOriginalScene and renderModifiedScene once when we render the scene once", inject([RenderService], (service: RenderService) => {
    service.stopRendering = true;
    spyOn(service, "renderOriginalScene");
    spyOn(service, "renderModifiedScene");
    service.renderExistingScene();
    expect(service.renderOriginalScene).toHaveBeenCalledTimes(1);
    expect(service.renderModifiedScene).toHaveBeenCalledTimes(1);

  }));

  it("renderExistingScene should loop when stopRendering is false", inject([RenderService], (service: RenderService) => {
    service.stopRendering = false;
    spyOn(service, "renderOriginalScene");
    spyOn(service, "renderModifiedScene");
    spyOn(service.controls, "update");
    spyOn(service, "renderExistingScene");
    service.renderExistingScene();
    expect(service.renderExistingScene).toHaveBeenCalledTimes(1);

  }));

  it("getSceneHeight shoudl return a defined number", inject([RenderService], (service: RenderService) => {
    expect(service.getSceneHeight()).toBeDefined();
  }));

  it("getSceneWidth shoudl return a defined number", inject([RenderService], (service: RenderService) => {
    expect(service.getSceneWidth()).toBeDefined();
  }));

  it("setCamera should define the camera", inject([RenderService], (service: RenderService) => {
    service.setCamera();
    expect(service.camera).not.toEqual(new THREE.PerspectiveCamera());
  }));

  it("setCamera should define the controls", inject([RenderService], (service: RenderService) => {
    service.setCamera();
    expect(service.controls).toBeDefined();
  }));

  it("renderScene should call renderer functions once", inject([RenderService], (service: RenderService) => {
    service.renderer = new THREE.WebGLRenderer({antialias: false});
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    const children: Object[] = JSON.parse(game3.originalScene);
    const originalScene: THREE.Scene = new THREE.Scene();
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      originalScene.add( object );
    }
    spyOn(service.renderer, "setSize");
    spyOn(service.renderer, "setViewport");
    spyOn(service.renderer, "setScissor");
    spyOn(service.renderer, "setScissorTest");
    spyOn(service.renderer, "render");
    service.renderScene(originalScene, 1);
    expect(service.renderer.setSize).toHaveBeenCalledTimes(1);
    expect(service.renderer.setViewport).toHaveBeenCalledTimes(1);
    expect(service.renderer.setScissor).toHaveBeenCalledTimes(1);
    expect(service.renderer.setScissorTest).toHaveBeenCalledTimes(1);
    expect(service.renderer.render).toHaveBeenCalledTimes(1);

  }));

  it("renderGeneratedScene should call renderScene twice", inject([RenderService], (service: RenderService) => {
    service.renderer = new THREE.WebGLRenderer({antialias: false});
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    const children: Object[] = JSON.parse(game3.originalScene);
    const originalScene: THREE.Scene = new THREE.Scene();
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      originalScene.add( object );
    }
    service.scene = originalScene;
    spyOn(service, "renderScene");
    service.renderGeneratedScene();
    // tslint:disable-next-line:no-magic-numbers
    expect(service.renderScene).toHaveBeenCalledTimes(2);
  }));
});
});
