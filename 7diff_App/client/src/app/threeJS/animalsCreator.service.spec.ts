import { inject, TestBed } from "@angular/core/testing";
import {Animal} from "./animal";
import { AnimalsCreatorService } from "./animalsCreator.service";
import {Cat} from "./cat";
import { RenderService } from "./render.service";
import { SceneCreatorService } from "./sceneCreator.service";

// tslint:disable:no-floating-promises

describe("AnimalsCreatorService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RenderService,
        AnimalsCreatorService,
        SceneCreatorService,
      ],
    });
  });

  it("Service should be created", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    expect(service).toBeTruthy();
  }));
  describe("Creating animals tests", () => {

  it("should return a defined camel", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    expect(service.createCamel()).toBeDefined();
  }));
  it("should return a defined elephant", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    expect(service.createElephant()).toBeDefined();
  }));
  it("should return a defined dolphin", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    expect(service.createDolphin()).toBeDefined();
  }));
  it("should return a defined chicken", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    expect(service.createChicken()).toBeDefined();
  }));
  it("should return a defined spider", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    expect(service.createSpider()).toBeDefined();
  }));
  it("should return a defined panda", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    expect(service.createPanda()).toBeDefined();
  }));
  it("should return a defined rabbit", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    expect(service.createRabbit()).toBeDefined();
  }));
  it("should return a defined horse", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    expect(service.createHorse()).toBeDefined();
  }));
});
  describe("Spawning the right numbers and within limits tests", () => {

  it("should set the nbAnimals to 20", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(20);
    // tslint:disable-next-line:no-magic-numbers
    expect(service.getNbElements()).toEqual(20);
  }));
  it("should position 200 animals within the limits of the floor", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(200);
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 200; ++i) {
      const animal: Animal = service.generateAnimal();
      // tslint:disable-next-line:no-magic-numbers
      expect(animal.getGroup().position.x).toBeLessThan(service.getFloorDimension() / 2);
      // tslint:disable-next-line:no-magic-numbers
      expect(animal.getGroup().position.z).toBeGreaterThan(-service.getFloorDimension() / 2);
      expect(animal.getGroup().position.y).toEqual(0);
    }
  }));
  it("should spawn 200 animals at different positions", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(200);
    const xPositions: number[] = [];
    const zPositions: number[] = [];
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 200; ++i) {
      const animal: Animal = service.generateAnimal();
      expect( xPositions.indexOf(animal.getGroup().position.x.valueOf())).toEqual(-1);
      expect( zPositions.indexOf(animal.getGroup().position.z.valueOf())).toEqual(-1);
      xPositions.push(animal.getGroup().position.x.valueOf());
      zPositions.push(animal.getGroup().position.z.valueOf());
    }
  }));
  it("should spawn 10 cats at different orientations, 10 times (has a very small chance of failing, testing randoms)",
     inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(200);
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 10; ++i) {
      const orientations: number[] = [];
      // tslint:disable-next-line:no-magic-numbers
      for (let j: number = 0; j < 10; ++j) {
        const cat: Animal = service.createCat();
        expect( orientations.indexOf(cat.getGroup().rotation.y)).toEqual(-1);
        orientations.push(cat.getGroup().rotation.y.valueOf());
      }
    }
  }));
  it("should spawn 10 cats with different colors, 10 times (has a very small chance of failing, testing randoms)",
     inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(100);
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 10; ++i) {
      const colors: number[] = [];
      // tslint:disable-next-line:no-magic-numbers
      for (let j: number = 0; j < 10; ++j) {
        const cat: Cat = new Cat();
        expect( colors.indexOf(cat.getColor())).toEqual(-1);
        colors.push(cat.getColor());
      }
    }
  }));
  it("should spawn 10 cats with different scales, 10 times (has a very small chance of failing, testing randoms)",
     inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(100);
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 10; ++i) {
      const scales: number[] = [];
      // tslint:disable-next-line:no-magic-numbers
      for (let j: number = 0; j < 10; ++j) {
        const cat: Cat = new Cat();
        expect( scales.indexOf(cat.getScale())).toEqual(-1);
        scales.push(cat.getScale());
      }
    }
  }));
  it("should generate a position within the floor limits", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(20);
    expect(service.generateRandomPosition()[0]).toBeLessThan(service.getFloorDimension());
    expect(service.generateRandomPosition()[1]).toBeLessThan(service.getFloorDimension());
  }));
  it("should generate 200 valid animals", inject([AnimalsCreatorService], (service: AnimalsCreatorService) => {
    // tslint:disable-next-line:no-magic-numbers
    service.setSceneParams(200);
    // tslint:disable-next-line:no-magic-numbers
    for (let i: number = 0; i < 200; ++i) {
      expect(service.generateAnimal()).toBeDefined();
    }
  }));
});
});
