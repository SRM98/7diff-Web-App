import { Injectable } from "@angular/core";
import * as THREE from "three";
import * as constants from "../../../../common/constants";

@Injectable({
  providedIn: "root",
})
export class CollisionService {

  public readonly INVALID_VECTOR: THREE.Vector3;
  public collisionsRays: THREE.Vector3[];
  public rayCaster: THREE.Raycaster;

  public constructor() {
    this.INVALID_VECTOR = new THREE.Vector3(0, 0, 0);
    this.rayCaster = new THREE.Raycaster();
    this.collisionsRays = [
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 1),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(1, 0, -1),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(-1, 0, -1),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(-1, 0, 1),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, -1, 0),
    ];
  }

  public verifyBoundary(camera: THREE.PerspectiveCamera, nbElements: number, controls: THREE.OrbitControls): void {
    const posX: number = camera.position.x;
    const posZ: number = camera.position.z;
    const floorSize: number = Math.floor(Math.sqrt(nbElements + constants.NB_DIFERENCES)) * constants.FLOOR_WIDTH_MULTIPLICATOR;
    // tslint:disable-next-line:no-magic-numbers
    const posMax: number = floorSize * 2;
    if (posX >= posMax) {
      camera.position.setX(camera.position.x - constants.CAM_REPOSITION_BUFFER);
      controls.target.setX(controls.target.x - constants.CAM_REPOSITION_BUFFER);
    } else if (posX <= -posMax) {
      camera.position.setX(camera.position.x + constants.CAM_REPOSITION_BUFFER);
      controls.target.setX(controls.target.x + constants.CAM_REPOSITION_BUFFER);
    } else if (posZ >= posMax) {
      camera.position.setZ(camera.position.z - constants.CAM_REPOSITION_BUFFER);
      controls.target.setZ(controls.target.z - constants.CAM_REPOSITION_BUFFER);
    } else if (posZ <= -posMax) {
      camera.position.setZ(camera.position.z + constants.CAM_REPOSITION_BUFFER);
      controls.target.setZ(controls.target.z + constants.CAM_REPOSITION_BUFFER);
    }
    controls.update();
  }
  public verifyMovement(cam: THREE.PerspectiveCamera, controls: THREE.OrbitControls, oriScene: THREE.Scene, modScene: THREE.Scene): void {
    const currentCollisionVector: THREE.Vector3 = this.hasCollided(cam, oriScene, modScene);
    if (currentCollisionVector !== this.INVALID_VECTOR) {
      cam.position.set(cam.position.x - constants.CONTROLS_ROLLBACK_SPEED * currentCollisionVector.x,
                       cam.position.y - constants.CONTROLS_ROLLBACK_SPEED * currentCollisionVector.y,
                       cam.position.z - constants.CONTROLS_ROLLBACK_SPEED * currentCollisionVector.z);
      controls.target.set(controls.target.x - constants.CONTROLS_ROLLBACK_SPEED * currentCollisionVector.x,
                          controls.target.y - constants.CONTROLS_ROLLBACK_SPEED * currentCollisionVector.y,
                          controls.target.z - constants.CONTROLS_ROLLBACK_SPEED * currentCollisionVector.z);
    }
  }

  public hasCollided(camera: THREE.PerspectiveCamera, originalScene: THREE.Scene, modifiedScene: THREE.Scene): THREE.Vector3 {
    for (const ray of this.collisionsRays) {
      this.rayCaster.set(camera.position, ray);
      if (this.hasDetectedCollision(originalScene, modifiedScene)) {
        return ray;
      }
    }

    return this.INVALID_VECTOR;
  }

  public hasDetectedCollision(originalScene: THREE.Scene, modifiedScene: THREE.Scene): boolean {
    const collisionsOriginal: THREE.Intersection[] = this.rayCaster.intersectObjects(originalScene.children, true);
    const collisionsModified: THREE.Intersection[] = this.rayCaster.intersectObjects(modifiedScene.children, true);

    return (collisionsOriginal.length > 0 && collisionsOriginal[0].distance <= constants.CONTROLS_COLLISON_DISTANCE) ||
      (collisionsModified.length > 0 && collisionsModified[0].distance <= constants.CONTROLS_COLLISON_DISTANCE);
  }
}
