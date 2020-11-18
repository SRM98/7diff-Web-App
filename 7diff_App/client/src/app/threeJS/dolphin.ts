import * as constants from "../../../../common/constants";
import { Animal, Member } from "./animal";
import * as animalConstants from "./animalConstants";

export class Dolphin extends Animal {

  public constructor() {
    super();
  }

  protected createModifiableMembers(): void {

    const head: Member = {
      geometryParam: animalConstants.DOLPHIN_HEAD_GEO,
      materialParam: animalConstants.DOLPHIN_COLOR,
      meshPosition:  animalConstants.DOLPHIN_HEAD_POS,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(head);
    const tail: Member = {
      geometryParam: animalConstants.DOLPHIN_BIG_TAIL_GEO,
      materialParam: animalConstants.DOLPHIN_COLOR,
      meshPosition:  animalConstants.DOLPHIN_BIG_TAIL_POS,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(tail);
    const smallTail: Member = {
      geometryParam: animalConstants.DOLPHIN_SMALL_TAIL_GEO,
      materialParam: animalConstants.DOLPHIN_COLOR,
      meshPosition:  animalConstants.DOLPHIN_SMALL_TAIL_POS,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(smallTail);
    this.createFins();
  }

  protected createConstantMembers(): void {
    const nose: Member = {
      geometryParam: animalConstants.DOLPHIN_NOSE_GEO,
      materialParam: animalConstants.DOLPHIN_COLOR,
      meshPosition:  animalConstants.DOLPHIN_NOSE_POS,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(nose);
    const leftEye: Member = {
      geometryParam: animalConstants.DOLPHIN_EYES_GEO,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.DOLPHIN_LEFT_EYE_POS,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(leftEye);
    const rightEye: Member = {
      geometryParam: animalConstants.DOLPHIN_EYES_GEO,
      materialParam: constants.WHITE_HEX,
      meshPosition:  animalConstants.DOLPHIN_RIGHT_EYE_POS,
      meshRotation:  animalConstants.NO_ROTATION,
      isModifiable: true,
    };
    this.createMembers(rightEye);
  }
  public createFins(): void {

    const leftFin: Member = {
      geometryParam: animalConstants.DOLPHIN_FIN_GEO,
      materialParam: animalConstants.DOLPHIN_COLOR,
      meshPosition:  animalConstants.DOLPHIN_LEFT_FIN_POS,
      meshRotation:  animalConstants.DOLPHIN_LEFT_FIN_ROT,
      isModifiable: true,
    };
    this.createMembers(leftFin);
    const rightFin: Member = {
      geometryParam: animalConstants.DOLPHIN_FIN_GEO,
      materialParam: animalConstants.DOLPHIN_COLOR,
      meshPosition:  animalConstants.DOLPHIN_RIGHT_FIN_POS,
      meshRotation:  animalConstants.DOLPHIN_RIGHT_FIN_ROT,
      isModifiable: true,
    };
    this.createMembers(rightFin);
    const pectoralFin: Member = {
      geometryParam: animalConstants.DOLPHIN_PECTORAL_FIN_GEO,
      materialParam: animalConstants.DOLPHIN_COLOR,
      meshPosition:  animalConstants.DOLPHIN_PECTORAL_FIN_POS,
      meshRotation:  animalConstants.DOLPHIN_PECTORAL_FIN_ROT,
      isModifiable: true,
    };
    this.createMembers(pectoralFin);
  }
}
