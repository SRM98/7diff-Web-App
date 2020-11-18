import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";

export class Camel extends Animal {

  public constructor() {
    super();
  }
  protected createModifiableMembers(): void {
    const body: Member = {
      geometryParam: animalConstants.CAMEL_BODY_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_BODY_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(body);
    const bigBump: Member = {
      geometryParam: animalConstants.CAMEL_BIG_BUMP_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_BIG_BUMP_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(bigBump);
    const smallBump: Member = {
      geometryParam: animalConstants.CAMEL_SMALL_BUMP_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_SMALL_BUMP_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(smallBump);
  }
  protected createConstantMembers(): void {
    const nose: Member = {
      geometryParam: animalConstants.CAMEL_NOSE_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_NOSE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(nose);
    const head: Member = {
      geometryParam: animalConstants.CAMEL_HEAD_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_HEAD_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(head);
    this.createNecks();
    this.createFrontLegs();
    this.createBackLegs();
    this.createEars();
    this.createEyes();
  }
  public createNecks(): void {

    const neck: Member = {
      geometryParam: animalConstants.CAMEL_NECK_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_NECK_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(neck);
    const bigNeck: Member = {
      geometryParam: animalConstants.CAMEL_BIG_NECK_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_BIG_NECK_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(bigNeck);
  }
  public createEars(): void {

    const leftEar: Member = {
      geometryParam: animalConstants.CAMEL_EARS_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_LEFT_EAR_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEar);
    const rightEar: Member = {
      geometryParam: animalConstants.CAMEL_EARS_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_RIGHT_EAR_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEar);
  }

  public createEyes(): void {
    const leftEye: Member = {
      geometryParam: animalConstants.CAMEL_EYES_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.CAMEL_LEFT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEye);
    const rightEye: Member = {
      geometryParam: animalConstants.CAMEL_EYES_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.CAMEL_RIGHT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEye);

  }
  public createBackLegs(): void {

    const backLeftLeg: Member = {
      geometryParam: animalConstants.CAMEL_LEGS_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_LEFT_BACK_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(backLeftLeg);
    const backRightLeg: Member = {
      geometryParam: animalConstants.CAMEL_LEGS_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_RIGHT_BACK_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(backRightLeg);
  }
  public createFrontLegs(): void {

    const frontLeftLeg: Member = {
      geometryParam: animalConstants.CAMEL_LEGS_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_LEFT_FRONT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(frontLeftLeg);
    const frontRightLeg: Member = {
      geometryParam: animalConstants.CAMEL_LEGS_GEOMETRY,
      materialParam: animalConstants.CAMEL_COLOR,
      meshPosition:  animalConstants.CAMEL_RIGHT_FRONT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(frontRightLeg);
  }
}
