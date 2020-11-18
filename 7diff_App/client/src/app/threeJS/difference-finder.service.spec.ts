import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { game3, game4 } from "../../app/mock-games";
import { DifferenceFinderService } from "./difference-finder.service";

// tslint:disable:no-floating-promises

describe("DifferenceFinderService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it("should be created", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
    expect(service).toBeTruthy();
  });

  it("isAddedObject should return true when given index = 11", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
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
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isAddedObject(originalScene.children[11], modifiedScene.children[11])).toBeTruthy();
  });

  it("isAddedObject should return false when given index = 9", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
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
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isAddedObject(originalScene.children[9], modifiedScene.children[9])).toBeFalsy();
  });

  it("isRemovedObject should return true when given index = 10", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    const originalScene: THREE.Scene = new THREE.Scene();
    const modifiedScene: THREE.Scene = new THREE.Scene();

    let children: Object[] = JSON.parse(game3.originalScene);
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
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isRemovedObject(originalScene.children[10], modifiedScene.children[10])).toBeTruthy();
  });

  it("isRemovedObject should return false when given index = 12", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
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
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isRemovedObject(originalScene.children[12], modifiedScene.children[12])).toBeFalsy();
  });

  it("isDifferentColor should return true when given index = 9", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
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
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isDifferentColor(originalScene.children[9], modifiedScene.children[9])).toBeTruthy();
  });

  it("isDifferentColor should return false when given index = 10", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
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
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isDifferentColor(originalScene.children[10], modifiedScene.children[10])).toBeFalsy();
  });

  it("hasDifference should return true when given index = 10", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
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
    // tslint:disable-next-line:no-magic-numbers
    expect(service.hasDifference(originalScene.children[10], modifiedScene.children[10])).toBeTruthy();
  });

  it("hasDifference should return false when given index = 17", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
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
    // tslint:disable-next-line:no-magic-numbers
    expect(service.hasDifference(originalScene.children[17], modifiedScene.children[17])).toBeFalsy();
  });

  it("isADifference should return true when given index = 10", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
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
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isADifference(originalScene.children[10], modifiedScene.children[10])).toBeTruthy();
  });

  it("isADifference should return false when given index = 1", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
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

    expect(service.isADifference(originalScene.children[1], modifiedScene.children[1])).toBeFalsy();
  });

  it("isADifference should return true when given index = 10 (themed games)", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    const originalScene: THREE.Scene = new THREE.Scene();
    const modifiedScene: THREE.Scene = new THREE.Scene();
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      modifiedScene.add( object );
    }
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isADifference(originalScene.children[10], modifiedScene.children[10])).toBeTruthy();
  });

  it("isADifference should return true when given index = 9 (themed games)", () => {
    const service: DifferenceFinderService = TestBed.get(DifferenceFinderService);
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    let children: Object[] = JSON.parse(game4.originalScene);
    const originalScene: THREE.Scene = new THREE.Scene();
    const modifiedScene: THREE.Scene = new THREE.Scene();
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      originalScene.add( object );
    }

    children = JSON.parse(game4.modifiedScene);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      modifiedScene.add( object );
    }
    // tslint:disable-next-line:no-magic-numbers
    expect(service.isADifference(originalScene.children[9], modifiedScene.children[9])).toBeFalsy();
  });

});
