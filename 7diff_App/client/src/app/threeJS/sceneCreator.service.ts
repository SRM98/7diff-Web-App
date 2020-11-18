import { Injectable } from "@angular/core";
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import * as constants from "../../../../common/constants";
import {Animal} from "./animal";
import {AnimalsCreatorService} from "./animalsCreator.service";
import {ObjectsCreatorService} from "./objectsCreator.service";

@Injectable()
export class SceneCreatorService {
  private controls: OrbitControls;
  private spotLight: THREE.SpotLight;
  private mesh: THREE.Mesh;
  private camFar: number;
  private nbElement: number;
  private spot1PosY: number;
  private spot1PosZ: number;
  private spot2PosX: number;
  private spot2PosY: number;
  private spot2PosZ: number;
  private floorWidth: number;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  // differences creation attributes
  public modifiedColors: number[];
  public originalColors: number[];
  public colorDiffGeometries: THREE.Mesh[];
  public addDiffGeometries: THREE.Mesh[];
  public removeDiffGeometries: THREE.Mesh[];
  public colorDiffAnimals: Animal[];
  public addDiffAnimals: Animal[];
  public removeDiffAnimals: Animal[];
  public nbColorDiff: number;
  public nbAddDiff: number;
  public nbRemoveDiff: number;

  public constructor(public animalService: AnimalsCreatorService, public objectService: ObjectsCreatorService) {
    this.resetSceneParameters();
  }
  public resetSceneParameters(): void {
    this.nbAddDiff = 0;
    this.nbColorDiff = 0;
    this.nbRemoveDiff = 0;
    this.modifiedColors = [];
    this.originalColors = [];
    this.colorDiffGeometries = [];
    this.addDiffGeometries = [];
    this.removeDiffGeometries = [];
    this.colorDiffAnimals = [];
    this.addDiffAnimals = [];
    this.removeDiffAnimals = [];
  }
  // tslint:disable-next-line:max-func-body-length
  public setOriginalScene(scene: THREE.Scene, isGeometries: boolean): THREE.Scene {
    if (isGeometries) {
      for (let i: number = 0; i < this.nbColorDiff; ++i) {
        // @ts-ignore because it doesn`t recognize 'material'
        this.colorDiffGeometries[i].material.color = new THREE.Color(this.originalColors[i]);
      }
      for (let i: number = 0; i < this.nbAddDiff; ++i) {
        // @ts-ignore because it doesn`t recognize '.material'
        this.addDiffGeometries[i].material.visible = false;
      }
      for (let i: number = 0; i < this.nbRemoveDiff; ++i) {
        // @ts-ignore because it doesn`t recognize '.material'
        this.removeDiffGeometries[i].material.visible = true;
      }
    } else {
      for (let i: number = 0; i < this.nbColorDiff; ++i) {
        scene.remove(this.colorDiffAnimals[i].getGroup());
        this.colorDiffAnimals[i].setNewColor(this.originalColors[i]);
        scene.add(this.colorDiffAnimals[i].getGroup());
      }
      for (let i: number = 0; i < this.nbAddDiff; ++i) {
        scene.remove(this.addDiffAnimals[i].getGroup());
        this.addDiffAnimals[i].setVisibility(false);
        scene.add(this.addDiffAnimals[i].getGroup());
      }
      for (let i: number = 0; i < this.nbRemoveDiff; ++i) {
        scene.remove(this.removeDiffAnimals[i].getGroup());
        this.removeDiffAnimals[i].setVisibility(true);
        scene.add(this.removeDiffAnimals[i].getGroup());
      }
    }

    return scene;
  }
  // tslint:disable-next-line:max-func-body-length
  public setModifiedScene(scene: THREE.Scene, isGeometries: boolean): THREE.Scene {
    if (isGeometries) {
      for (let i: number = 0; i < this.nbColorDiff; ++i) {
        // @ts-ignore because it doesn`t seem to recognize '.color'
        this.colorDiffGeometries[i].material.color.setHex(this.modifiedColors[i]);
      }
      for (let i: number = 0; i < this.nbAddDiff; ++i) {
        // @ts-ignore because it doesn`t seem to recognize '.color'
        this.addDiffGeometries[i].material.visible = true;
      }
      for (let i: number = 0; i < this.nbRemoveDiff; ++i) {
        // @ts-ignore because it doesn`t seem to recognize '.color'
        this.removeDiffGeometries[i].material.visible = false;
      }
    } else {
      for (let i: number = 0; i < this.nbColorDiff; ++i) {
        scene.remove(this.colorDiffAnimals[i].getGroup());
        this.colorDiffAnimals[i].setNewColor(this.modifiedColors[i]);
        scene.add(this.colorDiffAnimals[i].getGroup());
      }
      for (let i: number = 0; i < this.nbAddDiff; ++i) {
        scene.remove(this.addDiffAnimals[i].getGroup());
        this.addDiffAnimals[i].setVisibility(true);
        scene.add(this.addDiffAnimals[i].getGroup());
      }
      for (let i: number = 0; i < this.nbRemoveDiff; ++i) {
        scene.remove(this.removeDiffAnimals[i].getGroup());
        this.removeDiffAnimals[i].setVisibility(false);
        scene.add(this.removeDiffAnimals[i].getGroup());
      }
    }

    return scene;
  }
  // tslint:disable-next-line:max-func-body-length
  public distributeGeometryDiff(scene: THREE.Scene, colorDiff: boolean, addDiff: boolean, remDiff: boolean): THREE.Scene {
    let diffCount: number = 0;
    let mesh: THREE.Mesh;
    while (diffCount < constants.NB_DIFERENCES) {
      mesh = this.objectService.generateObjects();
      switch (Math.floor(Math.random() * constants.NB_TYPES_DIFF)) {
        case constants.DIFF_COLOR_ID:
          if (colorDiff) {
            this.nbColorDiff++;
            this.originalColors.push(Math.random() * constants.WHITE_HEX);
            this.colorDiffGeometries.push(mesh);
            this.modifiedColors.push(Math.random() * constants.WHITE_HEX);
            diffCount++;
            scene.add(mesh);
          }
          break;
        case constants.DIFF_ADD_ID:
          if (addDiff) {
            this.nbAddDiff++;
            this.addDiffGeometries.push(mesh);
            scene.add(this.objectService.generateObjects());
            diffCount++;
            scene.add(mesh);
          }
          break;
        case constants.DIFF_REMOVE_ID:
          if (remDiff) {
            this.nbRemoveDiff++;
            this.removeDiffGeometries.push(mesh);
            diffCount++;
            scene.add(mesh);
          }
          break;
        default:
          break;
      }
    }

    return scene;
  }
  // tslint:disable-next-line:max-func-body-length
  public distributeAnimalDiff(scene: THREE.Scene, colorDiff: boolean, addDiff: boolean, remDiff: boolean): THREE.Scene {
    let diffCount: number = 0;
    let themeAnimal: Animal;
    while (diffCount < constants.NB_DIFERENCES) {
      themeAnimal = this.animalService.generateAnimal();
      switch (Math.floor(Math.random() * constants.NB_TYPES_DIFF)) {
        case constants.DIFF_COLOR_ID:
          if (colorDiff) {
            this.originalColors.push(themeAnimal.getColor());
            this.colorDiffAnimals.push(themeAnimal);
            this.modifiedColors.push(Math.random() * constants.WHITE_HEX);
            this.nbColorDiff++;
            scene.add(themeAnimal.getGroup());
            diffCount++;
          }
          break;
        case constants.DIFF_ADD_ID:
          if (addDiff) {
            this.addDiffAnimals.push(themeAnimal);
            scene.add(this.animalService.generateAnimal().getGroup());
            this.nbAddDiff++;
            scene.add(themeAnimal.getGroup());
            diffCount++;
          }
          break;
        case constants.DIFF_REMOVE_ID:
          if (remDiff) {
            this.removeDiffAnimals.push(themeAnimal);
            this.nbRemoveDiff++;
            scene.add(themeAnimal.getGroup());
            diffCount++;
          }
          break;
        default:
          break;
      }
    }

    return scene;
  }
  public setAttributesFromNbElements(nbElement: number): void {
    this.nbElement = nbElement;
    this.floorWidth = Math.floor(Math.sqrt(this.nbElement + constants.NB_DIFERENCES)) * constants.FLOOR_WIDTH_MULTIPLICATOR;
    this.camFar = this.floorWidth * constants.CAM_FAR_MULTIPLICATOR;
    // tslint:disable-next-line:no-magic-numbers
    this.spot1PosY = this.floorWidth / 2 + constants.SPOT1_Y_BUFFER;
    // tslint:disable-next-line:no-magic-numbers
    this.spot1PosZ = this.floorWidth / 2 + constants.SPOT1_Z_BUFFER;
    // tslint:disable-next-line:no-magic-numbers
    this.spot2PosX = -(this.floorWidth / 2);
    // tslint:disable-next-line:no-magic-numbers
    this.spot2PosY = this.floorWidth / 4;
    // tslint:disable-next-line:no-magic-numbers
    this.spot2PosZ = -(this.floorWidth / 2) - constants.SPOT2_Z_BUFFER;
  }
  public createFloor(isGeo: boolean): THREE.Mesh {
   const geometry: THREE.PlaneBufferGeometry = new THREE.PlaneBufferGeometry(this.floorWidth, this.floorWidth);
   const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial(
     { color: isGeo ? constants.FLOOR_GEOM_COLOR : constants.FLOOR_ANIM_COLOR});
   this.mesh = new THREE.Mesh(geometry, material);
   this.mesh.rotateX(constants.FLOOR_ANGLE);
   this.mesh.receiveShadow = true;
   this.scene.add(this.mesh);

   return this.mesh;
  }
  private createSun(radius: number, posX: number, posY: number, posz: number): void {
    const geometry: THREE.SphereBufferGeometry = new THREE.SphereBufferGeometry( radius,
                                                                                 constants.SPHERE_WIDTH_SEGMENTS,
                                                                                 constants.SPHERE_HEIGHT_SEGMENTS );
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( {color: constants.SUN_COLOR} );
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(posX, posY, posz);
    this.scene.add(this.mesh);
  }
  private createSpotLight(posX: number, posY: number, posZ: number, intensity: number): void {
    this.spotLight = new THREE.SpotLight( constants.WHITE_HEX, intensity );
    this.spotLight.position.set(posX, posY, posZ);
    // tslint:disable-next-line:no-magic-numbers
    this.spotLight.angle = Math.PI / 4;
    this.spotLight.distance = constants.SPOT_DISTANCE;
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = constants.SPOT_SHADOW_MAPSIZE;
    this.spotLight.shadow.mapSize.height = constants.SPOT_SHADOW_MAPSIZE;
    this.scene.add( this.spotLight );
  }
  public createScene(nbElement: number): THREE.Scene {
    this.setAttributesFromNbElements(nbElement);
    this.scene = new THREE.Scene();
    /* Lights */
    this.createSpotLight(constants.SPOT1_POS_X, this.spot1PosY, this.spot1PosZ, constants.SPOT_HIGH_INTENSITY);
    this.createSpotLight(this.spot2PosX, this.spot2PosY, this.spot2PosZ, constants.SPOT_LOW_INTENSITY);
    this.createSun(constants.SUN1_RADIUS, constants.SPOT1_POS_X, this.spot1PosY, this.spot1PosZ);
    this.createSun(constants.SUN2_RADIUS, this.spot2PosX, this.spot2PosY, this.spot2PosZ);
    this.scene.add( new THREE.AmbientLight( constants.AMBIENT_HEX ) );
    const directionLight: THREE.DirectionalLight = new THREE.DirectionalLight( constants.DIRECTION_HEX );
    directionLight.position.set( 1, 1, 1 );
    this.scene.add( directionLight );
    /* Camera */
    this.camera = new THREE.PerspectiveCamera( constants.CAM_FOV, window.innerWidth / window.innerHeight, constants.CAM_NEAR, this.camFar );
    this.controls = new OrbitControls( this.camera);
    this.camera.position.set( constants.CAM_POS_X, constants.CAM_POS_Y_PHOTO, constants.CAM_POS_Z_PHOTO);
    this.controls.update();
    this.scene.add( this.camera );

    return this.scene;
  }
  public parseScene(scene: THREE.Scene, sceneInfo: string): void {
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    const children: Object[] = JSON.parse(sceneInfo);
    for (const child of children) {
      // tslint:disable-next-line:no-any
      const object: any = loader.parse( child );
      scene.add( object );
    }
  }
}
