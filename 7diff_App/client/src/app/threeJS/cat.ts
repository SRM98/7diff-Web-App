import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";

export class Cat extends Animal {

  public constructor() {
    super();
  }
  protected createModifiableMembers(): void {
    this.createFrontLegs();
    const backLeftLeg: Member = {
      geometryParam: animalConstants.CAT_BACK_LEGS_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.CAT_BACK_LEFT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(backLeftLeg);
    const backRightLeg: Member = {
      geometryParam: animalConstants.CAT_BACK_LEGS_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.CAT_BACK_RIGHT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(backRightLeg);
    const body: Member = {
      geometryParam: animalConstants.CAT_BODY_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.CAT_BODY_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(body);
  }
  protected createConstantMembers(): void {
    const head: Member = {
      geometryParam: animalConstants.CAT_HEAD_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.CAT_HEAD_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(head);
    this.createEyes();
    const mouth: Member = {
      geometryParam: animalConstants.CAT_MOUTH_GEOMETRY,
      materialParam: animalConstants.CAT_MOUTH_COLOR,
      meshPosition:  animalConstants.CAT_MOUTH_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
     };
    this.createMembers(mouth);
    const nose: Member = {
      geometryParam: animalConstants.CAT_NOSE_GEOMETRY,
      materialParam: animalConstants.CAT_NOSE_COLOR,
      meshPosition:  animalConstants.CAT_NOSE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
     };
    this.createMembers(nose);
    this.createEars();
    this.createTails();
  }
  public createFrontLegs(): void {
    const frontLeftLeg: Member = {
      geometryParam: animalConstants.CAT_FRONT_LEGS_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.CAT_FRONT_LEFT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(frontLeftLeg);
    const frontRightLeg: Member = {
      geometryParam: animalConstants.CAT_FRONT_LEGS_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.CAT_FRONT_RIGHT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(frontRightLeg);
  }

  public createTails(): void {

    const rootTail: Member = {
      geometryParam: animalConstants.CAT_TAILROOT_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.CAT_TAILROOT_POSITION,
      meshRotation: animalConstants.CAT_TAILROOT_ROTATION,
      isModifiable: false,
     };
    this.createMembers(rootTail);
    const tail: Member = {
      geometryParam: animalConstants.CAT_TAIL_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.CAT_TAIL_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
     };
    this.createMembers(tail);
  }

  public createEars(): void {

    const leftEar: Member = {
      geometryParam: animalConstants.CAT_EARS_GEOMETRY,
      materialParam: animalConstants.CAT_EAR_COLOR,
      meshPosition:  animalConstants.CAT_LEFT_EAR_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
     };
    this.createMembers(leftEar);
    const rightEar: Member = {
      geometryParam: animalConstants.CAT_EARS_GEOMETRY,
      materialParam: animalConstants.CAT_EAR_COLOR,
      meshPosition:  animalConstants.CAT_RIGHT_EAR_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
     };
    this.createMembers(rightEar);
  }
  public createEyes(): void {

    const leftEye: Member = {
      geometryParam: animalConstants.CAT_EYES_GEOMETRY,
      materialParam: animalConstants.CAT_EYE_COLOR,
      meshPosition:  animalConstants.CAT_LEFT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
     };
    this.createMembers(leftEye);
    const rightEye: Member = {
      geometryParam: animalConstants.CAT_EYES_GEOMETRY,
      materialParam: animalConstants.CAT_EYE_COLOR,
      meshPosition:  animalConstants.CAT_RIGHT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
     };
    this.createMembers(rightEye);
  }
}
