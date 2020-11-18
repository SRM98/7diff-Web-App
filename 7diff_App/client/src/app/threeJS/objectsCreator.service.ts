import { Injectable } from "@angular/core";
import * as THREE from "three";
import * as constants from "../../../../common/constants";

@Injectable()
export class ObjectsCreatorService {
  private nbElement: number;
  private floorWidth: number;
  private mesh: THREE.Mesh;
  private boundingBoxes: THREE.Box3[];

  public constructor() {
    this.boundingBoxes = [];
  }
  public setSceneParams(nbElement: number): void {
    this.boundingBoxes = [];
    this.nbElement = nbElement;
    this.floorWidth = Math.floor(Math.sqrt(this.nbElement + constants.NB_DIFERENCES)) * constants.FLOOR_WIDTH_MULTIPLICATOR;
  }
  public getNbElements(): number {
    return this.nbElement;
  }
  private setPosition(yPosition: number): void {
    const xPosition: number = this.generateRandomPosition();
    const zPosition: number = this.generateRandomPosition();
    this.mesh.position.set(xPosition, yPosition, zPosition);
    if (this.hasCollision()) {
      this.setPosition(yPosition);
    }
    this.addBoundingBox();
  }
  public createPyramid(): THREE.Mesh {
    const scale: number = Math.random() + constants.MIN_SCALE;
    const geometry: THREE.CylinderBufferGeometry = new THREE.CylinderBufferGeometry( 1,
                                                                                     constants.BASIC_SIZE * scale,
                                                                                     constants.PYRAMID_BASE_HEIGHT * scale,
                                                                                     constants.PYRAMID_SEGMENTS );
    const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({color:  Math.random() * constants.WHITE_HEX});
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    // tslint:disable-next-line:no-magic-numbers
    this.mesh.rotation.set(0, Math.random() * 2 * Math.PI, 0);
    // tslint:disable-next-line:no-magic-numbers
    this.setPosition(constants.PYRAMID_BASE_HEIGHT / 2 * scale);

    return this.mesh;
  }
  public createCube(): THREE.Mesh {
    const scale: number = Math.random() + constants.MIN_SCALE;

    const geometry: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry( constants.BASIC_SIZE * scale,
                                                                           constants.BASIC_SIZE * scale,
                                                                           constants.BASIC_SIZE * scale);
    const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({color: Math.random() * constants.WHITE_HEX});
    this.mesh = new THREE.Mesh(geometry, material);
    // tslint:disable-next-line:no-magic-numbers
    this.setPosition(constants.BASIC_SIZE / 2 * scale);
    this.mesh.rotation.set(0, Math.random() * Math.PI, 0);
    this.mesh.castShadow = true;

    return this.mesh;
  }
  public createSphere(): THREE.Mesh {
    const scale: number = Math.random() + constants.MIN_SCALE;
    const geometry: THREE.SphereBufferGeometry = new THREE.SphereBufferGeometry( constants.BASIC_SIZE * scale,
                                                                                 constants.SPHERE_WIDTH_SEGMENTS,
                                                                                 constants.SPHERE_HEIGHT_SEGMENTS );
    const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial( {color:  Math.random() * constants.WHITE_HEX} );
    this.mesh = new THREE.Mesh(geometry, material);
    this.setPosition(constants.BASIC_SIZE * scale);
    this.mesh.castShadow = true;

    return this.mesh;
  }
  public createCone(): THREE.Mesh {
    const scale: number = Math.random() + constants.MIN_SCALE;
    const geometry: THREE.ConeBufferGeometry = new THREE.ConeBufferGeometry( constants.BASIC_SIZE * scale,
                                                                             constants.CONE_BASE_HEIGHT * scale,
                                                                             constants.CONE_RADIAL_SEGMENTS );
    const material: THREE.MeshBasicMaterial = new THREE.MeshPhongMaterial( {color:  Math.random() * constants.WHITE_HEX});
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.castShadow = true;
    // tslint:disable-next-line:no-magic-numbers
    this.setPosition(constants.CONE_BASE_HEIGHT / 2 * scale);

    return this.mesh;
  }
  public createCylinder(): THREE.Mesh {
    const scale: number = Math.random() + constants.MIN_SCALE;
    const geometry: THREE.CylinderBufferGeometry = new THREE.CylinderBufferGeometry(constants.CYLINDER_RADIUS_SEGMENT * scale,
                                                                                    constants.CYLINDER_RADIUS_SEGMENT * scale,
                                                                                    constants.CYLINDER_BASE_HEIGHT * scale,
                                                                                    constants.CYLINDER_RADIUS_SEGMENT );

    const material: THREE.MeshBasicMaterial = new THREE.MeshPhongMaterial( {color: Math.random() * constants.WHITE_HEX} );
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.castShadow = true;
    // tslint:disable-next-line:no-magic-numbers
    this.setPosition(constants.CYLINDER_BASE_HEIGHT / 2 * scale);

    return this.mesh;
  }
  private hasCollision(): boolean {
    const tempCollisionBox: THREE.Box3 = new THREE.Box3().setFromObject(this.mesh);
    let foundCollision: boolean = false;
    for (let i: number = 0; i < this.boundingBoxes.length && !foundCollision; i++) {
      foundCollision = this.boundingBoxes[i].intersectsBox(tempCollisionBox);
    }

    return foundCollision;
  }
  private addBoundingBox(): void {
    this.boundingBoxes.push(new THREE.Box3().setFromObject(this.mesh));
  }
  private generateRandomPosition(): number {
    // tslint:disable-next-line:no-magic-numbers
    return Math.random() * (this.floorWidth - constants.FLOOR_SPAWNING_BUFFER) - ((this.floorWidth - constants.FLOOR_SPAWNING_BUFFER) / 2);
  }
  public generateObjects(): THREE.Mesh {
    let elementShape: number;
    elementShape = Math.floor(Math.random() * constants.NB_SHAPES_GEOMETRY);
    switch (elementShape) {
      case constants.PYRAMID_SPAWN_ID:
        return  this.createPyramid();
      case constants.CUBE_SPAWN_ID:
        return  this.createCube();
      case constants.SPHERE_SPAWN_ID:
        return  this.createSphere();
      case constants.CONE_SPAWN_ID:
        return  this.createCone();
      default:
      case constants.CYLINDER_SPAWN_ID:
        return  this.createCylinder();
    }
  }
}
