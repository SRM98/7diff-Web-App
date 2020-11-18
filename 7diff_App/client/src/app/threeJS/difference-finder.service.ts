import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
  providedIn: "root",
})
export class DifferenceFinderService {

  public isAddedObject(originalObject: THREE.Object3D, modifiedObject: THREE.Object3D ): boolean {
      // @ts-ignore
      return !originalObject.material.visible && modifiedObject.material.visible;
  }

  public isRemovedObject(originalObject: THREE.Object3D, modifiedObject: THREE.Object3D): boolean {
      // @ts-ignore
      return originalObject.material.visible && !modifiedObject.material.visible;
  }

  public isDifferentColor(originalObject: THREE.Object3D, modifiedObject: THREE.Object3D): boolean {
    // @ts-ignore
     return originalObject.material.color.r !== modifiedObject.material.color.r ||
    // @ts-ignore
    originalObject.material.color.g !== modifiedObject.material.color.g ||
     // @ts-ignore
     originalObject.material.color.b !== modifiedObject.material.color.b;
  }

  public hasDifference(originalObject: THREE.Object3D, modifiedObject: THREE.Object3D): boolean {
    return this.isAddedObject(originalObject, modifiedObject) ||
          this.isRemovedObject(originalObject, modifiedObject) ||
          this.isDifferentColor(originalObject, modifiedObject);
  }

  public isADifference(originalObject: THREE.Object3D, modifiedObject: THREE.Object3D): boolean {
    if (originalObject.type === "Mesh") {
      return this.hasDifference(originalObject, modifiedObject);
    } else if (originalObject.type === "Group") {
      let foundDifference: boolean = false;
      for (let i: number = 0; i < originalObject.children.length && !foundDifference; i++) {
        foundDifference = this.hasDifference(originalObject.children[i], modifiedObject.children[i]);
      }

      return foundDifference;
    }

    return false;
   }

}
