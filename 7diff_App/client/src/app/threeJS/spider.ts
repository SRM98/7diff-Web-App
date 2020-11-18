import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";

export class Spider extends Animal {

  public constructor() {
    super();
  }

  protected createModifiableMembers(): void {

    const body: Member = {
      geometryParam: animalConstants.SPIDER_BODY_GEOMETRY,
      materialParam: animalConstants.SPIDER_BODY_COLOR,
      meshPosition:  animalConstants.SPIDER_BODY_POSITION,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(body);
    const head: Member = {
      geometryParam: animalConstants.SPIDER_HEAD_GEOMETRY,
      materialParam: animalConstants.SPIDER_BODY_COLOR,
      meshPosition:  animalConstants.SPIDER_HEAD_POS,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(head);
  }
  protected createConstantMembers(): void {
    const neck: Member = {
      geometryParam: animalConstants.SPIDER_NECK_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.SPIDER_NECK_POS,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(neck);

    this.createRightLegs();
    this.createLeftLegs();
    this.createEyes();
  }

  public createEyes(): void {
    const leftEye: Member = {
      geometryParam: animalConstants.SPIDER_EYES_GEOMETRY,
      materialParam: animalConstants.SPIDER_EYES_COLOR,
      meshPosition:  animalConstants.SPIDER_LEFT_EYE_POS,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(leftEye);

    const rightEye: Member = {
      geometryParam: animalConstants.SPIDER_EYES_GEOMETRY,
      materialParam: animalConstants.SPIDER_EYES_COLOR,
      meshPosition:  animalConstants.SPIDER_RIGHT_EYE_POS,
      meshRotation: animalConstants.NO_ROTATION,
      isModifiable: false,
    };
    this.createMembers(rightEye);
  }

  public createRightLegs(): void {

    const backRightLeg: Member = {
      geometryParam: animalConstants.SPIDER_LEGS_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.SPIDER_FIRST_RIGHT_LEG_POS,
      meshRotation: animalConstants.SPIDER_FIRST_RIGHT_LEG_ROT,
      isModifiable: false,
    };
    this.createMembers(backRightLeg);
    const back2ndRightLeg: Member = {
      geometryParam: animalConstants.SPIDER_LEGS_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.SPIDER_SECOND_RIGHT_LEG_POS,
      meshRotation: animalConstants.SPIDER_SECOND_RIGHT_LEG_ROT,
      isModifiable: false,
    };
    this.createMembers(back2ndRightLeg);

    const back3rdRightLeg: Member = {
      geometryParam: animalConstants.SPIDER_LEGS_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.SPIDER_THIRD_RIGHT_LEG_POS,
      meshRotation: animalConstants.SPIDER_THIRD_RIGHT_LEG_ROT,
      isModifiable: false,
    };
    this.createMembers(back3rdRightLeg);
  }
  public createLeftLegs(): void {
    const backLeftLeg: Member = {
      geometryParam: animalConstants.SPIDER_LEGS_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.SPIDER_FIRST_LEFT_LEG_POS,
      meshRotation: animalConstants.SPIDER_FIRST_LEFT_LEG_ROT,
      isModifiable: false,
    };
    this.createMembers(backLeftLeg);
    const back2ndLeftLeg: Member = {
      geometryParam: animalConstants.SPIDER_LEGS_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.SPIDER_SECOND_LEFT_LEG_POS,
      meshRotation: animalConstants.SPIDER_SECOND_LEFT_LEG_ROT,
      isModifiable: false,
    };
    this.createMembers(back2ndLeftLeg);
    const back3rdLeftLeg: Member = {
      geometryParam: animalConstants.SPIDER_LEGS_GEOMETRY,
      materialParam: constants.BLACK_HEX,
      meshPosition:  animalConstants.SPIDER_THIRD_LEFT_LEG_POS,
      meshRotation: animalConstants.SPIDER_THIRD_LEFT_LEG_ROT,
      isModifiable: false,
    };
    this.createMembers(back3rdLeftLeg);

  }
}
