import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";

export class Elephant extends Animal {

  public constructor() {
    super();
  }
  protected createModifiableMembers(): void {
     const body: Member = {
       geometryParam: animalConstants.ELEPHANT_BODY_GEOMETRY,
       materialParam: animalConstants.ELEPHANT_COLOR,
       meshPosition:  animalConstants.ELEPHANT_BODY_POSITION,
       meshRotation:  animalConstants.NO_ROTATION,
       isModifiable: true,
     };
     this.createMembers(body);
     this.createFrontLegs();
     this.createBackLegs();
  }
  protected createConstantMembers(): void {
    const head: Member = {
      geometryParam: animalConstants.ELEPHANT_HEAD_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_HEAD_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(head);
    this.createNoses();
    const trunk: Member = {
      geometryParam: animalConstants.ELEPHANT_TRUNK_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_TRUNK_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(trunk);
    const tipNose: Member = {
      geometryParam: animalConstants.ELEPHANT_TIP_NOSE_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_TIP_NOSE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(tipNose);
    this.createEars();
    this.createTusks();
    this.createElephantEyes();
  }
  public createTusks(): void {

    const leftTusk: Member = {
      geometryParam: animalConstants.ELEPHANT_TUSKS_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.ELEPHANT_LEFT_TUSK_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftTusk);
    const rightTusk: Member = {
      geometryParam: animalConstants.ELEPHANT_TUSKS_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.ELEPHANT_RIGHT_TUSK_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightTusk);
  }
  public createElephantEyes(): void {

    const leftEye: Member = {
      geometryParam: animalConstants.ELEPHANT_EYES_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.ELEPHANT_LEFT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEye);
    const rightEye: Member = {
      geometryParam: animalConstants.ELEPHANT_EYES_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.ELEPHANT_RIGHT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEye);
  }
  public createFrontLegs(): void {

    const frontLeftLeg: Member = {
      geometryParam: animalConstants.ELEPHANT_LEGS_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_FRONT_LEFT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: true,
     };
    this.createMembers(frontLeftLeg);
    const frontRightLeg: Member = {
      geometryParam: animalConstants.ELEPHANT_LEGS_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_FRONT_RIGHT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: true,
     };
    this.createMembers(frontRightLeg);
  }
  public createEars(): void {

    const leftEar: Member = {
      geometryParam: animalConstants.ELEPHANT_EARS_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_LEFT_EAR_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEar);
    const rightEar: Member = {
      geometryParam: animalConstants.ELEPHANT_EARS_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_RIGHT_EAR_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEar);
  }
  public createNoses(): void {
    const firstNose: Member = {
      geometryParam: animalConstants.ELEPHANT_NOSE_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_FIRST_NOSE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(firstNose);
    const secondNose: Member = {
      geometryParam: animalConstants.ELEPHANT_NOSE_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_SECOND_NOSE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(secondNose);
  }
  public createBackLegs(): void {

    const backLeftLeg: Member = {
      geometryParam: animalConstants.ELEPHANT_LEGS_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_BACK_LEFT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: true,
     };
    this.createMembers(backLeftLeg);
    const backRightLeg: Member = {
      geometryParam: animalConstants.ELEPHANT_LEGS_GEOMETRY,
      materialParam: animalConstants.ELEPHANT_COLOR,
      meshPosition:  animalConstants.ELEPHANT_BACK_RIGHT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: true,
     };
    this.createMembers(backRightLeg);
  }
}
