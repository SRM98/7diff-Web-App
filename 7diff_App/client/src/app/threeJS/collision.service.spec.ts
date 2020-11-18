import {inject, TestBed} from "@angular/core/testing";
import * as THREE from "three";
import {AnimalsCreatorService} from "./animalsCreator.service";
import { CollisionService } from "./collision.service";
import {ObjectsCreatorService} from "./objectsCreator.service";
import {RenderService} from "./render.service";
import {SceneCreatorService} from "./sceneCreator.service";

// tslint:disable:no-floating-promises
// tslint:disable:no-magic-numbers
// tslint:disable:max-line-length

describe("CollisionService", () => {
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

  it("should be created", () => {
    const service: CollisionService = TestBed.get(CollisionService);
    expect(service).toBeTruthy();
  });

  describe("testing the collision functions", () => {
    it("test basic hasCollided() to see if there is collision; should not", inject([CollisionService], (service: CollisionService) => {
      expect(service.hasCollided(new THREE.PerspectiveCamera, new THREE.Scene, new THREE.Scene)).toEqual(service.INVALID_VECTOR);
    }));
    it("test hasCollided() to see if there is collision, should collide", inject([RenderService, CollisionService], (renderer: RenderService, service: CollisionService) => {
      const container: HTMLDivElement = document.createElement("div");
      renderer.setDifferencesParams( 30, true, true, true, true);
      renderer.initialize(container);
      renderer.camera.position.set(0, 0, 0);
      renderer.originalScene.children[3].position.set(100, 0, 0);
      renderer.modifiedScene.children[3].position.set(100, 0, 0);
      expect(service.hasCollided(renderer.camera, renderer.originalScene, renderer.modifiedScene)).toEqual(new THREE.Vector3(1, 0, -1));
    }));
    it("test verifyBoundary() when camera x position is higher than PosMax", inject([RenderService, CollisionService], (renderer: RenderService, service: CollisionService) => {
      const container: HTMLDivElement = document.createElement("div");
      renderer.setDifferencesParams( 30, true, true, true, true);
      renderer.initialize(container);
      renderer.camera.position.set(30000, 100, 100);
      service.verifyBoundary(renderer.camera, 30, renderer.controls);
      expect(renderer.camera.position.x).not.toEqual(30000);
    }));
    it("test verifyBoundary() when camera x position is lesser than PosMax", inject([RenderService, CollisionService], (renderer: RenderService, service: CollisionService) => {
      const container: HTMLDivElement = document.createElement("div");
      renderer.setDifferencesParams( 30, true, true, true, true);
      renderer.initialize(container);
      renderer.camera.position.set(-30000, 100, 100);
      service.verifyBoundary(renderer.camera, 30, renderer.controls);
      expect(renderer.camera.position.x).not.toEqual(-30000);
    }));
    it("test verifyBoundary() when camera z position is higher than PosMax", inject([RenderService, CollisionService], (renderer: RenderService, service: CollisionService) => {
      const container: HTMLDivElement = document.createElement("div");
      renderer.setDifferencesParams( 30, true, true, true, true);
      renderer.initialize(container);
      renderer.camera.position.set(100, 100, 40000);
      service.verifyBoundary(renderer.camera, 30, renderer.controls);
      expect(renderer.camera.position.z).not.toEqual(40000);
    }));
    it("test verifyBoundary() when camera z position is lesser than PosMax", inject([RenderService, CollisionService], (renderer: RenderService, service: CollisionService) => {
      const container: HTMLDivElement = document.createElement("div");
      renderer.setDifferencesParams( 30, true, true, true, true);
      renderer.initialize(container);
      renderer.camera.position.set(100, 100, -40000);
      service.verifyBoundary(renderer.camera, 30, renderer.controls);
      expect(renderer.camera.position.z).not.toEqual(-40000);
    }));
    it("test verifyMovement() to see if there is collision, should be", inject([RenderService, CollisionService], (renderer: RenderService, service: CollisionService) => {
      const container: HTMLDivElement = document.createElement("div");
      renderer.setDifferencesParams( 30, true, true, true, true);
      renderer.initialize(container);
      renderer.camera.position.set(99, 0, 0);
      renderer.originalScene.children[3].position.set(100, 0, 0);
      renderer.modifiedScene.children[3].position.set(100, 0, 0);
      service.verifyMovement(renderer.camera, renderer.controls, renderer.originalScene, renderer.modifiedScene);
      expect(renderer.camera.position.x).not.toEqual(99);
    }));
    it("test verifyMovement() to see if there is collision, should not be", inject([RenderService, CollisionService], (renderer: RenderService, service: CollisionService) => {
      const container: HTMLDivElement = document.createElement("div");
      renderer.setDifferencesParams( 30, true, true, true, true);
      renderer.initialize(container);
      renderer.camera.position.set(1000, 1000, 1000);
      service.verifyMovement(renderer.camera, renderer.controls, renderer.originalScene, renderer.modifiedScene);
      expect(renderer.camera.position.x).toEqual(1000);
      expect(renderer.camera.position.y).toEqual(1000);
      expect(renderer.camera.position.z).toEqual(1000);
    }));
  });
});
