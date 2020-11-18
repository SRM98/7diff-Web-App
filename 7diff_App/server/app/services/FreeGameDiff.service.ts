import { injectable } from "inversify";
import "reflect-metadata";
import * as THREE from "three";
export interface FreeGameDifference {
  diffTab: THREE.Object3D[];
  object: THREE.Object3D;
}
@injectable()
export class FreeDiffService {
    public verifyDifference(diffObj: FreeGameDifference): boolean {
      let response: boolean = false;
      for (const objects of diffObj.diffTab) {
        // @ts-ignore because .object DOES exist
        if (diffObj.object.object.uuid === objects.object.uuid) {

          response = true;
        }
      }

      return response;
    }
}
