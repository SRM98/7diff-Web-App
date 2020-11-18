import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";

export class Chicken extends Animal {

  public constructor() {
    super();
  }

  protected createModifiableMembers(): void {
    const body: Member = {
      geometryParam: animalConstants.CHICKEN_BODY_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.CHICKEN_BODY_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(body);
    const wings: Member = {
      geometryParam: animalConstants.CHICKEN_WINGS_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.CHICKEN_WINGS_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(wings);
  }
  protected createConstantMembers(): void {
    const head: Member = {
      geometryParam: animalConstants.CHICKEN_HEAD_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.CHICKEN_HEAD_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(head);
    const beak: Member = {
      geometryParam: animalConstants.CHICKEN_BEAK_GEOMETRY,
      materialParam: animalConstants.CHICKEN_BEAK_COLOR,
      meshPosition:  animalConstants.CHICKEN_BEAK_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(beak);
    const beard: Member = {
      geometryParam: animalConstants.CHICKEN_BEARD_GEOMETRY,
      materialParam: animalConstants.CHICKEN_BEARD_COLOR,
      meshPosition:  animalConstants.CHICKEN_BEARD_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(beard);
    this.createEyes();
    this.createLegs();
    this.createFeet();
  }

  public createLegs(): void {

    const leftLeg: Member = {
      geometryParam: animalConstants.CHICKEN_LEGS_GEOMETRY,
      materialParam: animalConstants.CHICKEN_LEGS_COLOR,
      meshPosition:  animalConstants.CHICKEN_LEFT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftLeg);
    const rightLeg: Member = {
      geometryParam: animalConstants.CHICKEN_LEGS_GEOMETRY,
      materialParam: animalConstants.CHICKEN_LEGS_COLOR,
      meshPosition:  animalConstants.CHICKEN_RIGHT_LEG_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightLeg);
  }

  public createFeet(): void {

    const leftFoot: Member = {
      geometryParam: animalConstants.CHICKEN_FEET_GEOMETRY,
      materialParam: animalConstants.CHICKEN_FEET_COLOR,
      meshPosition:  animalConstants.CHICKEN_LEFT_FOOT_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftFoot);
    const rightFoot: Member = {
      geometryParam: animalConstants.CHICKEN_FEET_GEOMETRY,
      materialParam: animalConstants.CHICKEN_FEET_COLOR,
      meshPosition:  animalConstants.CHICKEN_RIGHT_FOOT_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightFoot);
  }
  public createEyes(): void {

    const leftEye: Member = {
      geometryParam: animalConstants.CHICKEN_EYES_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.CHICKEN_LEFT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEye);
    const rightEye: Member = {
      geometryParam: animalConstants.CHICKEN_EYES_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.CHICKEN_RIGHT_EYE_POSITION,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEye);
  }
}
