import { inject, TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { ObjectsCreatorService } from "./objectsCreator.service";
import { RenderService } from "./render.service";
import { SceneCreatorService } from "./sceneCreator.service";

// tslint:disable:no-floating-promises
// tslint:disable:max-line-length

describe("ObjectCreatorService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RenderService,
        ObjectsCreatorService,
        SceneCreatorService,
      ],
    });
  });

  it("ObjectCreator Service should be created", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    expect(service).toBeTruthy();
  }));

  describe("Creating shape meshes", () => {
  it("should return a pyramid mesh", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    const pyramid: THREE.Mesh = service.createPyramid();
    expect(pyramid).toBeDefined();

  }));
  it("should return a cube mesh", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    const cube: THREE.Mesh = service.createCube();
    expect(cube).toBeDefined();

  }));
  it("should return a cylinder mesh", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    const cylinder: THREE.Mesh = service.createCylinder();
    expect(cylinder).toBeDefined();

  }));
  it("should return a cone mesh", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    const cone: THREE.Mesh = service.createCone();
    expect(cone).toBeDefined();

  }));
  it("should return a sphere mesh", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    const sphere: THREE.Mesh = service.createSphere();
    expect(sphere).toBeDefined();

  }));

});

  describe("Generating multiple shapes with different parameters tests", () => {
  it("should set the nbElement to 20", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(20);
    // tslint:disable-next-line:no-magic-numbers
    expect(service.getNbElements()).toEqual(20);
  }));
  it("should generate 200 uniquely positioned cubes ", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(200);
    const xPositions: number[] = [];
    const zPositions: number[] = [];
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 200; ++i) {
      const cube: THREE.Mesh = service.createCube();
      expect(xPositions.indexOf(cube.position.x.valueOf())).toEqual(-1);
      expect(zPositions.indexOf(cube.position.z.valueOf())).toEqual(-1);
      xPositions.push(cube.position.x.valueOf());
      zPositions.push(cube.position.z.valueOf());
    }
  }));
  it("should spawn 10 cubes at different orientations, 10 times (has a very small chance of failing, testing randoms)", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(100);
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 10; ++i) {
      const orientations: number[] = [];
      // tslint:disable-next-line:no-magic-numbers
      for (let j: number = 0; j < 10; ++j) {
        const cube: THREE.Mesh = service.createCube();
        expect(orientations.indexOf(cube.rotation.y)).toEqual(-1);
        orientations.push(cube.rotation.y.valueOf());
      }
    }
  }));
  it("should spawn 10 cubes with different colors, 10 times (has a very small chance of failing, testing randoms)", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(100);
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 10; ++i) {
      let color: number;
      const colors: number[] = [];
      // tslint:disable-next-line:no-magic-numbers
      for (let j: number = 0; j < 10; ++j) {
        const cube: THREE.Mesh = service.createCube();
        // @ts-ignore because it doesn`t seem to recognize '.color'
        color = cube.material.color;
        expect(colors.indexOf(color)).toEqual(-1);
        colors.push(color);
      }
    }
  }));
  it("should spawn 10 cubes with different scales, 10 times (has a very small chance of failing, testing randoms)", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(100);
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 10; ++i) {
      const scales: number[] = [];
      // tslint:disable-next-line:no-magic-numbers
      for (let j: number = 0; j < 10; ++j) {
        const cube: THREE.Mesh = service.createCube();
        expect( scales.indexOf(cube.position.y.valueOf())).toEqual(-1);
        scales.push(cube.position.y.valueOf());
      }
    }
  }));
  it("generateObject should return 200 defined object", inject([ObjectsCreatorService], (service: ObjectsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(200);
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 200; ++i) {
      expect(service.generateObjects()).toBeDefined();
    }
  }));
});
});
