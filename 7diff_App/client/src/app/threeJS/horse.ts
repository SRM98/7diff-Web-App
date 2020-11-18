import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";

export class Horse extends Animal {

  public constructor() {
    super();
  }

  protected createModifiableMembers(): void {
    const body: Member = {
      geometryParam: animalConstants.HORSE_BODY_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.HORSE_BODY_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(body);
  }
  protected createConstantMembers(): void {
    const head: Member = {
      geometryParam: animalConstants.HORSE_HEAD_GEOMETRY,
      materialParam: animalConstants.HORSE_BASE_COLOR,
      meshPosition:  animalConstants.HORSE_HEAD_POSITION,
      meshRotation: animalConstants.HORSE_HEAD_ROTATION,
      isModifiable: false,
    };
    this.createMembers(head);
    this.createEyes();
    this.createEars();
    const mouth: Member = {
      geometryParam: animalConstants.HORSE_MOUTH_GEOMETRY,
      materialParam: animalConstants.HORSE_BASE_COLOR,
      meshPosition:  animalConstants.HORSE_MOUTH_POSITION,
      meshRotation: animalConstants.HORSE_MOUTH_ROTATION,
      isModifiable: false,
    };
    this.createMembers(mouth);
    const hair: Member = {
      geometryParam: animalConstants.HORSE_HAIR_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.HORSE_HAIR_POSITION,
      meshRotation: animalConstants.HORSE_HAIR_ROTATION,
      isModifiable: false,
    };
    this.createMembers(hair);
    this.createLegs();
  }
  private createEyes(): void {
    const leftEye: Member = {
      geometryParam: animalConstants.HORSE_EYES_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.HORSE_LEFT_EYE_POSITION,
      meshRotation: animalConstants.HORSE_EYE_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEye);
    const rightEye: Member = {
      geometryParam: animalConstants.HORSE_EYES_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.HORSE_RIGHT_EYE_POSITION,
      meshRotation: animalConstants.HORSE_EYE_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEye);
  }
  private createEars(): void {
    const leftEar: Member = {
      geometryParam: animalConstants.HORSE_EARS_GEOMETRY,
      materialParam: animalConstants.HORSE_BASE_COLOR,
      meshPosition:  animalConstants.HORSE_LEFT_EAR_POSITION,
      meshRotation: animalConstants.HORSE_EAR_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEar);
    const rightEar: Member = {
      geometryParam: animalConstants.HORSE_EARS_GEOMETRY,
      materialParam: animalConstants.HORSE_BASE_COLOR,
      meshPosition:  animalConstants.HORSE_RIGHT_EAR_POSITION,
      meshRotation: animalConstants.HORSE_EAR_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEar);
  }
  // tslint:disable-next-line: max-func-body-length
  private createLegs(): void {
    const frontLeftLeg: Member = {
      geometryParam: animalConstants.HORSE_LEGS_GEOMETRY,
      materialParam: animalConstants.HORSE_BASE_COLOR,
      meshPosition:  animalConstants.HORSE_FRONT_LEFT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(frontLeftLeg);
    const frontRightLeg: Member = {
      geometryParam: animalConstants.HORSE_LEGS_GEOMETRY,
      materialParam: animalConstants.HORSE_BASE_COLOR,
      meshPosition:  animalConstants.HORSE_FRONT_RIGHT_LEG_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(frontRightLeg);
    const backLeftLeg: Member = {
      geometryParam: animalConstants.HORSE_LEGS_GEOMETRY,
      materialParam: animalConstants.HORSE_BASE_COLOR,
      meshPosition:  animalConstants.HORSE_BACK_LEFT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(backLeftLeg);
    const backRightLeg: Member = {
      geometryParam: animalConstants.HORSE_LEGS_GEOMETRY,
      materialParam: animalConstants.HORSE_BASE_COLOR,
      meshPosition:  animalConstants.HORSE_BACK_RIGHT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(backRightLeg);
  }
}
