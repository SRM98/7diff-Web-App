import * as THREE from "three";
import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";

export class Panda extends Animal {

  public constructor() {
    super();
  }
  protected createModifiableMembers(): void {
     this.createLegs();
  }
  protected createConstantMembers(): void {
     this.createNoses();
     const head: Member = {
          geometryParam: animalConstants.PANDA_HEAD_GEOMETRY,
          materialParam: constants.WHITE_HEX,
          meshPosition:  animalConstants.PANDA_HEAD_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable: false,
     };
     this.createMembers(head);
     const neck: Member = {
          geometryParam: animalConstants.PANDA_NECK_GEOMETRY,
          materialParam: constants.WHITE_HEX,
          meshPosition:  animalConstants.PANDA_NECK_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable: false,
     };
     this.createMembers(neck);
     this.createBody();
     this.createEars();
     this.createEyes();
 }
  // tslint:disable-next-line: max-func-body-length
  private createLegs(): void {
     const frontLeftLeg: Member = {
          geometryParam: animalConstants.PANDA_LEGS_GEOMETRY,
          materialParam: constants.BLACK_HEX,
          meshPosition:  animalConstants.PANDA_FRONT_LEFT_LEG_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable: true,
     };
     this.createMembers(frontLeftLeg);
     const frontRightLeg: Member = {
          geometryParam: animalConstants.PANDA_LEGS_GEOMETRY,
          materialParam: constants.BLACK_HEX,
          meshPosition:  animalConstants.PANDA_FRONT_RIGHT_LEG_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  true,
     };
     this.createMembers(frontRightLeg);
     const backLeftLeg: Member = {
          geometryParam: animalConstants.PANDA_LEGS_GEOMETRY,
          materialParam: constants.BLACK_HEX,
          meshPosition:  animalConstants.PANDA_BACK_LEFT_LEG_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  true,
     };
     this.createMembers(backLeftLeg);
     const backRightLeg: Member = {
          geometryParam: animalConstants.PANDA_LEGS_GEOMETRY,
          materialParam: constants.BLACK_HEX,
          meshPosition:  animalConstants.PANDA_BACK_RIGHT_LEG_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  true,
     };
     this.createMembers(backRightLeg);
   }

  private createNoses(): void {
     const nose: Member = {
          geometryParam: animalConstants.PANDA_NOSE_GEOMETRY,
          materialParam: constants.WHITE_HEX,
          meshPosition:  animalConstants.PANDA_NOSE_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  false,
     };
     this.createMembers(nose);
     const mediumNose: Member = {
          geometryParam: animalConstants.PANDA_MEDIUM_NOSE_GEOMETRY,
          materialParam: constants.BLACK_HEX,
          meshPosition:  animalConstants.PANDA_MEDIUM_NOSE_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  false,
     };
     this.createMembers(mediumNose);
     const smallNose: Member = {
          geometryParam: animalConstants.PANDA_SMALL_NOSE_GEOMETRY,
          materialParam: constants.BLACK_HEX,
          meshPosition:  animalConstants.PANDA_SMALL_NOSE_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  false,
         };
     this.createMembers(smallNose);
   }

  private createBody(): void {
     const smallBody: Member = {
          geometryParam: animalConstants.PANDA_BODY_GEOMETRY,
          materialParam: constants.WHITE_HEX,
          meshPosition:  animalConstants.PANDA_SMALL_BODY_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  false,
     };
     this.createMembers(smallBody);
     const mediumBody: Member = {
          geometryParam: animalConstants.PANDA_MEDIUM_BODY_GEOMETRY,
          materialParam: constants.BLACK_HEX,
          meshPosition:  animalConstants.PANDA_MEDIUM_BODY_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  false,
     };
     this.createMembers(mediumBody);
     const bigBody: Member = {
          geometryParam: animalConstants.PANDA_BIG_BODY_GEOMETRY,
          materialParam: constants.WHITE_HEX,
          meshPosition:  animalConstants.PANDA_BIG_BODY_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  false,
     };
     this.createMembers(bigBody);
   }

  private createEars(): void {
     const leftEar: Member = {
          geometryParam: animalConstants.PANDA_EARS_GEOMETRY,
          materialParam: constants.BLACK_HEX,
          meshPosition:  animalConstants.PANDA_LEFT_EAR_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  false,
     };
     this.createMembers(leftEar);
     const rightEar: Member = {
          geometryParam: animalConstants.PANDA_EARS_GEOMETRY,
          materialParam: constants.BLACK_HEX,
          meshPosition:  animalConstants.PANDA_RIGHT_EAR_POSITION,
          meshRotation:  animalConstants.NO_ROTATION,
          isModifiable:  false,
     };
     this.createMembers(rightEar);
   }
  // tslint:disable-next-line: max-func-body-length
  private createEyes(): void {
     let circleGeometry: THREE.CircleGeometry;
     let material: THREE.MeshPhongMaterial;
     let mesh: THREE.Mesh;
     circleGeometry = new THREE.CircleGeometry(animalConstants.PANDA_SMALL_EYES_RADIUS,
                                               animalConstants.PANDA_EYES_ANGLE);
     material = new THREE.MeshPhongMaterial({color: constants.WHITE_HEX});
     mesh = new THREE.Mesh(circleGeometry, material);
     mesh.position.set(animalConstants.PANDA_LEFT_EYES_X_POS * this.scale,
                       animalConstants.PANDA_EYES_Y_POS * this.scale,
                       animalConstants.PANDA_SMALL_EYES_Z_POS * this.scale);
     this.constantMeshes.push(mesh);
     circleGeometry = new THREE.CircleGeometry(animalConstants.PANDA_BIG_EYES_RADIUS,
                                               animalConstants.PANDA_EYES_ANGLE);
     material = new THREE.MeshPhongMaterial({color: constants.BLACK_HEX});
     mesh = new THREE.Mesh(circleGeometry, material);
     mesh.position.set(animalConstants.PANDA_LEFT_EYES_X_POS * this.scale,
                       animalConstants.PANDA_EYES_Y_POS * this.scale,
                       animalConstants.PANDA_BIG_EYES_Z_POS * this.scale);
     this.constantMeshes.push(mesh);
     circleGeometry = new THREE.CircleGeometry(animalConstants.PANDA_SMALL_EYES_RADIUS,
                                               animalConstants.PANDA_EYES_ANGLE);
     material = new THREE.MeshPhongMaterial({color: constants.WHITE_HEX});
     mesh = new THREE.Mesh(circleGeometry, material);
     mesh.position.set(animalConstants.PANDA_RIGHT_EYES_X_POS * this.scale,
                       animalConstants.PANDA_EYES_Y_POS * this.scale,
                       animalConstants.PANDA_SMALL_EYES_Z_POS * this.scale);
     this.constantMeshes.push(mesh);
     circleGeometry = new THREE.CircleGeometry(animalConstants.PANDA_BIG_EYES_RADIUS,
                                               animalConstants.PANDA_EYES_ANGLE);
     material = new THREE.MeshPhongMaterial({color: constants.BLACK_HEX});
     mesh = new THREE.Mesh(circleGeometry, material);
     mesh.position.set(animalConstants.PANDA_RIGHT_EYES_X_POS * this.scale,
                       animalConstants.PANDA_EYES_Y_POS * this.scale,
                       animalConstants.PANDA_BIG_EYES_Z_POS * this.scale);
     this.constantMeshes.push(mesh);
   }
}
