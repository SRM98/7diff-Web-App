import * as THREE from "three";
import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";
export class Butterfly extends Animal {

  public constructor() {
    super();
  }

  protected createModifiableMembers(): void {
    this.createWings();

  }

  protected createConstantMembers(): void {
    const body: Member = {
      geometryParam: animalConstants.BUTTERFLY_BODY_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.BUTTERFLY_BODY_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(body);
    const head: Member = {
      geometryParam: animalConstants.BUTTERFLY_HEAD_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.BUTTERFLY_HEAD_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(head);
    this.createEars();
    this.createEyes();
  }
  // tslint:disable-next-line: max-func-body-length
  private createWings(): void {
    let material: THREE.MeshPhongMaterial;
    let mesh: THREE.Mesh;
    let geometry: THREE.ExtrudeGeometry;
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: animalConstants.BUTTERFLY_WINGS_DEPTH,
    };
    const wing: THREE.Shape = new THREE.Shape();
    wing.moveTo(animalConstants.BUTTERFLY_SHAPE_POS,
                animalConstants.BUTTERFLY_SHAPE_POS );
    wing.bezierCurveTo(animalConstants.BUTTERFLY_FIRST_CURVE_CP1_X,
                       animalConstants.BUTTERFLY_FIRST_CURVE_CP1_Y,
                       animalConstants.BUTTERFLY_FIRST_CURVE_CP2_X,
                       animalConstants.BUTTERFLY_FIRST_CURVE_CP2_Y,
                       animalConstants.BUTTERFLY_FIRST_CURVE_X,
                       animalConstants.BUTTERFLY_FIRST_CURVE_Y);
    wing.bezierCurveTo(animalConstants.BUTTERFLY_SECOND_CURVE_CP1_X,
                       animalConstants.BUTTERFLY_SECOND_CURVE_CP1_Y,
                       animalConstants.BUTTERFLY_SECOND_CURVE_CP2_X,
                       animalConstants.BUTTERFLY_SECOND_CURVE_CP2_Y,
                       animalConstants.BUTTERFLY_SECOND_CURVE_X,
                       animalConstants.BUTTERFLY_SECOND_CURVE_Y);
    wing.bezierCurveTo(animalConstants.BUTTERFLY_THIRD_CURVE_CP1_X,
                       animalConstants.BUTTERFLY_THIRD_CURVE_CP1_Y,
                       animalConstants.BUTTERFLY_THIRD_CURVE_CP2_X,
                       animalConstants.BUTTERFLY_THIRD_CURVE_CP2_Y,
                       animalConstants.BUTTERFLY_THIRD_CURVE_X,
                       animalConstants.BUTTERFLY_THIRD_CURVE_Y);
    material = new THREE.MeshPhongMaterial({color: animalConstants.BUTTERFLY_WINGS_COLOR});
    geometry = new THREE.ExtrudeGeometry( wing, extrudeSettings );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(animalConstants.BUTTERFLY_RIGHT_WING_X_POS * this.scale,
                      animalConstants.BUTTERFLY_RIGHT_WING_Y_POS * this.scale,
                      animalConstants.BUTTERFLY_RIGHT_WING_Z_POS * this.scale);
    this.modifiableMeshes.push(mesh);
    material = new THREE.MeshPhongMaterial({color: animalConstants.BUTTERFLY_WINGS_COLOR});
    geometry = new THREE.ExtrudeGeometry( wing, extrudeSettings );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(animalConstants.BUTTERFLY_LEFT_WING_X_POS * this.scale,
                      animalConstants.BUTTERFLY_LEFT_WING_Y_POS * this.scale,
                      animalConstants.BUTTERFLY_LEFT_WING_Z_POS * this.scale);
    mesh.rotation.y = Math.PI;
    this.modifiableMeshes.push(mesh);
  }
  private createEars(): void {
    const leftEar: Member = {
      geometryParam: animalConstants.BUTTERFLY_EARS_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.BUTTERFLY_LEFT_EAR_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEar);
    const rightEar: Member = {
      geometryParam: animalConstants.BUTTERFLY_EARS_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.BUTTERFLY_RIGHT_EAR_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEar);
  }
  private createEyes(): void {
    const leftEye: Member = {
      geometryParam: animalConstants.BUTTERFLY_EYES_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.BUTTERFLY_LEFT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEye);
    const rightEye: Member = {
      geometryParam: animalConstants.BUTTERFLY_EYES_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.BUTTERFLY_RIGHT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEye);
  }
}
