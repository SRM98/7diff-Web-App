import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";

export class Rabbit extends Animal {

  public constructor() {
    super();
  }

  protected createModifiableMembers(): void {
    const body: Member = {
      geometryParam: animalConstants.RABBIT_BODY_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.RABBIT_BODY_POSITION,
      meshRotation:  animalConstants.RABBIT_BODY_ROTATION,
      isModifiable: true,
    };
    this.createMembers(body);
    this.createFeet();

    this.createLegs();
  }

  protected createConstantMembers(): void {
    const head: Member = {
      geometryParam: animalConstants.RABBIT_HEAD_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.RABBIT_HEAD_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(head);
    this.createEyes();

    const nose: Member = {
      geometryParam: animalConstants.RABBIT_NOSE_GEOMETRY,
      materialParam: animalConstants.CAT_NOSE_COLOR,
      meshPosition:  animalConstants.RABBIT_NOSE_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(nose);

    this.createEars();
    this.createArms();
  }

  private createFeet(): void {

    const leftFoot: Member = {
      geometryParam: animalConstants.RABBIT_FEET_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.RABBIT_LEFT_FOOT_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(leftFoot);
    const rightFoot: Member = {
      geometryParam: animalConstants.RABBIT_FEET_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.RABBIT_RIGHT_FOOT_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(rightFoot);
  }
  private createEars(): void {
    const leftEar: Member = {
      geometryParam: animalConstants.RABBIT_EARS_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.RABBIT_LEFT_EAR_POSITION,
      meshRotation:  animalConstants.RABBIT_LEFT_EAR_ROTATION,
      isModifiable: true,
    };
    this.createMembers(leftEar);

    const rightEar: Member = {
      geometryParam: animalConstants.RABBIT_EARS_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.RABBIT_RIGHT_EAR_POSITION,
      meshRotation:  animalConstants.RABBIT_RIGHT_EAR_ROTATION,
      isModifiable: true,
    };

    this.createMembers(rightEar);
  }
  private createArms(): void {

    const leftArm: Member = {
      geometryParam: animalConstants.RABBIT_ARMS_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.RABBIT_LEFT_ARM_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(leftArm);

    const rightArm: Member = {
      geometryParam: animalConstants.RABBIT_ARMS_GEOMETRY,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.RABBIT_RIGHT_ARM_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(rightArm);
  }

  private createLegs(): void {

    const leftLeg: Member = {
      geometryParam: animalConstants.RABBIT_LEGS_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.RABBIT_LEFT_LEG_POSITION,
      meshRotation:  animalConstants.RABBIT_BODY_ROTATION,
      isModifiable: true,
    };
    this.createMembers(leftLeg);

    const rightLeg: Member = {
      geometryParam: animalConstants.RABBIT_LEGS_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.RABBIT_RIGHT_LEG_POSITION,
      meshRotation:  animalConstants.RABBIT_BODY_ROTATION,
      isModifiable: true,
    };
    this.createMembers(rightLeg);
  }
  private createEyes(): void {

    const leftEye: Member = {
      geometryParam: animalConstants.RABBIT_EYES_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.RABBIT_LEFT_EYE_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(leftEye);

    const rightEye: Member = {
      geometryParam: animalConstants.RABBIT_EYES_GEOMETRY,
      materialParam: this.textureColor,
      meshPosition:  animalConstants.RABBIT_RIGHT_EYE_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(rightEye);
  }
}
