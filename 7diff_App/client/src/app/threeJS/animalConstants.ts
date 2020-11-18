// tslint:disable:no-magic-numbers
export const NO_ROTATION: number[] = [0, 0, 0];
export const CAT_BODY_GEOMETRY: number[] = [50, 100, 200];
export const CAT_BODY_POSITION: number[] = [0, 100, 0];
export const CAT_HEAD_GEOMETRY: number[] = [50, 50, 50];
export const CAT_HEAD_POSITION: number[] = [0, 140, 125];
export const CAT_EYES_GEOMETRY: number[] = [16, 8, 2];
export const CAT_LEFT_EYE_POSITION: number[] = [14, 146, 150];
export const CAT_RIGHT_EYE_POSITION: number[] = [-14, 146, 150];
export const CAT_EYE_COLOR: number = 0xA58732;
export const CAT_MOUTH_GEOMETRY: number[] = [30, 24, 10];
export const CAT_MOUTH_POSITION: number[] = [0, 130, 150];
export const CAT_MOUTH_COLOR: number = 0xE5E5E5;
export const CAT_NOSE_GEOMETRY: number[] = [5, 5, 5];
export const CAT_NOSE_POSITION: number[] = [0, 139, 155];
export const CAT_NOSE_COLOR: number = 0xA2434D;
export const CAT_EARS_GEOMETRY: number[] = [6, 6, 16];
export const CAT_LEFT_EAR_POSITION: number[] = [14, 168, 120];
export const CAT_RIGHT_EAR_POSITION: number[] = [-14, 168, 120];
export const CAT_EAR_COLOR: number = 0xF0F0F0;
export const CAT_TAILROOT_GEOMETRY: number[] = [10, 10, 50];
export const CAT_TAILROOT_POSITION: number[] = [0, 125, -120];
export const CAT_TAILROOT_ROTATION: number[] = [- Math.PI / 4, 0, 0];
export const CAT_TAIL_GEOMETRY: number[] = [10, 10, 100];
export const CAT_TAIL_POSITION: number[] = [0, 105, -190];
export const CAT_FRONT_LEGS_GEOMETRY: number[] = [20, 156, 20];
export const CAT_FRONT_LEFT_LEG_POSITION: number[] = [18, 78, 80];
export const CAT_FRONT_RIGHT_LEG_POSITION: number[] = [-18, 78, 80];
export const CAT_BACK_LEGS_GEOMETRY: number[] = [16, 120, 16];
export const CAT_BACK_LEFT_LEG_POSITION: number[] = [12, 60, -90];
export const CAT_BACK_RIGHT_LEG_POSITION: number[] = [-12, 60, -90];

export const CHICKEN_BODY_GEOMETRY: number[] = [60, 60, 100];
export const CHICKEN_BODY_POSITION: number[] = [0, 80, 0];
export const CHICKEN_WINGS_GEOMETRY: number[] = [80, 40, 80];
export const CHICKEN_WINGS_POSITION: number[] = [0,
                                                 CHICKEN_BODY_POSITION[1] + 5,
                                                 0];
export const CHICKEN_HEAD_GEOMETRY: number[] = [36, 60, 26];
export const CHICKEN_HEAD_POSITION: number[] = [0,
                                                CHICKEN_BODY_POSITION[1] + 30,
                                                CHICKEN_BODY_GEOMETRY[2] / 2 + 5];
export const CHICKEN_BEAK_COLOR: number = 0xBD8F40;
export const CHICKEN_BEAK_GEOMETRY: number[] = [34, 20, 30];
export const CHICKEN_BEAK_POSITION: number[] = [0,
                                                CHICKEN_HEAD_POSITION[1],
                                                CHICKEN_HEAD_POSITION[2] + 20];
export const CHICKEN_BEARD_COLOR: number = 0xB10000;
export const CHICKEN_BEARD_GEOMETRY: number[] = [14, 20, 10];
export const CHICKEN_BEARD_POSITION: number[] = [0,
                                                 CHICKEN_BEAK_POSITION[1] - 20,
                                                 CHICKEN_BEAK_POSITION[2]];
export const CHICKEN_EYES_GEOMETRY: number[] = [6, 6, 2];
export const CHICKEN_LEFT_EYE_POSITION: number[] = [-12,
                                                    CHICKEN_HEAD_POSITION[1] + 15,
                                                    CHICKEN_HEAD_POSITION[2] + CHICKEN_HEAD_GEOMETRY[2] / 2 + 1];
export const CHICKEN_RIGHT_EYE_POSITION: number[] = [12,
                                                     CHICKEN_HEAD_POSITION[1] + 15,
                                                     CHICKEN_HEAD_POSITION[2] + CHICKEN_HEAD_GEOMETRY[2] / 2 + 1];
export const CHICKEN_LEGS_COLOR: number = 0x9A8C47;
export const CHICKEN_LEGS_GEOMETRY: number[] = [8, 60, 8];
export const CHICKEN_LEFT_LEG_POSITION: number[] = [-22,
                                                    CHICKEN_LEGS_GEOMETRY[1] / 2,
                                                    0];
export const CHICKEN_RIGHT_LEG_POSITION: number[] = [22,
                                                     CHICKEN_LEGS_GEOMETRY[1] / 2,
                                                     0];
export const CHICKEN_FEET_COLOR: number = 0xDBC766;
export const CHICKEN_FEET_GEOMETRY: number[] = [20, 2, 14];
export const CHICKEN_LEFT_FOOT_POSITION: number[] = [-22, 1, 5];
export const CHICKEN_RIGHT_FOOT_POSITION: number[] = [22, 1, 5];

export const SPIDER_BODY_COLOR: number = 0x434343;
export const SPIDER_BODY_GEOMETRY: number[] = [60, 60, 60];
export const SPIDER_BODY_POSITION: number[] = [90, 140, 140];
export const SPIDER_NECK_GEOMETRY: number [] = [40, 40, 20];
export const SPIDER_NECK_POS: number [] = [40, 140, 140];
export const SPIDER_HEAD_GEOMETRY: number [] = [50, 50, 50];
export const SPIDER_HEAD_POS: number [] = [0, 140, 140];
export const SPIDER_LEGS_GEOMETRY: number [] = [7, 80, 10];
export const SPIDER_FIRST_RIGHT_LEG_POS: number [] = [25, 130, 120];
export const SPIDER_FIRST_RIGHT_LEG_ROT: number[] =  [( Math.PI / 6), 0, (Math.PI * 5 / 6)];
export const SPIDER_SECOND_RIGHT_LEG_POS: number[] = [40, 130, 120];
export const SPIDER_SECOND_RIGHT_LEG_ROT: number[] = [( Math.PI / 4), (Math.PI * 5  / 6), 0];
export const SPIDER_THIRD_RIGHT_LEG_POS: number[] = [50, 130, 120];
export const SPIDER_THIRD_RIGHT_LEG_ROT: number[] = [( Math.PI / 6), 0, (Math.PI * 7  / 6)];
export const SPIDER_FIRST_LEFT_LEG_POS: number[] = [30, 130, 160];
export const SPIDER_FIRST_LEFT_LEG_ROT: number[] = [Math.PI * 5 / 6, 0, Math.PI / 6];
export const SPIDER_SECOND_LEFT_LEG_POS: number[] = [45, 130, 160];
export const SPIDER_SECOND_LEFT_LEG_ROT: number[] = [Math.PI * 5 / 6, Math.PI / 4, 0];
export const SPIDER_THIRD_LEFT_LEG_POS: number[] = [55, 130, 160];
export const SPIDER_THIRD_LEFT_LEG_ROT: number[] = [Math.PI * 5 / 6, 0, Math.PI * 3 / 4];
export const SPIDER_EYES_COLOR: number = 0xFF0000;
export const SPIDER_EYES_GEOMETRY: number[] = [20, 20, 10];
export const SPIDER_LEFT_EYE_POS: number[] = [-20, 140, 130];
export const SPIDER_RIGHT_EYE_POS: number[] = [-20, 140, 150];

// camel constants
export const CAMEL_COLOR: number = 0xA5682A;
export const CAMEL_NOSE_GEOMETRY: number[] = [60, 60, 100];
export const CAMEL_NOSE_POSITION: number[] = [0, 620, 5];
export const CAMEL_HEAD_GEOMETRY: number[] = [100, 100, 100];
export const CAMEL_HEAD_POSITION: number[] = [0,
                                              620,
                                              CAMEL_NOSE_GEOMETRY[2] + CAMEL_NOSE_POSITION[2]];
export const CAMEL_NECK_GEOMETRY: number[] = [100, 100, 80];
export const CAMEL_NECK_POSITION: number[] = [0,
                                              CAMEL_HEAD_POSITION[1] - CAMEL_HEAD_GEOMETRY[2],
                                              CAMEL_HEAD_POSITION[2] + 10];
export const CAMEL_BIG_NECK_GEOMETRY: number[] = [100, 100, 240];
export const CAMEL_BIG_NECK_POSITION: number[] = [0,
                                                  CAMEL_NECK_POSITION[1] - CAMEL_HEAD_GEOMETRY[2],
                                                  CAMEL_NECK_POSITION[2] + CAMEL_NECK_GEOMETRY[2] + 20];
export const CAMEL_BODY_GEOMETRY: number[] = [200, 240, 320];
export const CAMEL_BODY_POSITION: number[] = [0,
                                              CAMEL_BIG_NECK_POSITION[1],
                                              CAMEL_BIG_NECK_POSITION[2] + CAMEL_NECK_GEOMETRY[2]];
export const CAMEL_BIG_BUMP_GEOMETRY: number[] = [100, 100, 200];
export const CAMEL_BIG_BUMP_POSITION: number[] = [0,
                                                  CAMEL_BODY_POSITION[1] + 120,
                                                  CAMEL_BODY_POSITION[2]];
export const CAMEL_SMALL_BUMP_GEOMETRY: number[] = [100, 60, 160];
export const CAMEL_SMALL_BUMP_POSITION: number[] = [0,
                                                    CAMEL_BIG_BUMP_POSITION[1] + CAMEL_BIG_BUMP_GEOMETRY[1] / 2,
                                                    CAMEL_BIG_BUMP_POSITION[2]];
export const CAMEL_LEGS_GEOMETRY: number[] = [48, 400, 40];
export const CAMEL_LEFT_FRONT_LEG_POSITION: number[] = [-40,
                                                        CAMEL_BODY_POSITION[1] - CAMEL_BODY_GEOMETRY[1],
                                                        CAMEL_BODY_POSITION[2] - 80];
export const CAMEL_RIGHT_FRONT_LEG_POSITION: number[] = [40,
                                                         CAMEL_BODY_POSITION[1] - CAMEL_BODY_GEOMETRY[1],
                                                         CAMEL_BODY_POSITION[2] - 80];
export const CAMEL_LEFT_BACK_LEG_POSITION: number[] = [-40,
                                                       CAMEL_BODY_POSITION[1] - CAMEL_BODY_GEOMETRY[1],
                                                       CAMEL_BODY_POSITION[2] + 80];
export const CAMEL_RIGHT_BACK_LEG_POSITION: number[] = [40,
                                                        CAMEL_BODY_POSITION[1] - CAMEL_BODY_GEOMETRY[1],
                                                        CAMEL_BODY_POSITION[2] + 80];
export const CAMEL_EARS_GEOMETRY: number[] = [20, 40, 20];
export const CAMEL_LEFT_EAR_POSITION: number[] = [-40,
                                                  CAMEL_HEAD_POSITION[1] + 60,
                                                  CAMEL_HEAD_POSITION[2] - 20];
export const CAMEL_RIGHT_EAR_POSITION: number[] = [40,
                                                   CAMEL_HEAD_POSITION[1] + 60,
                                                   CAMEL_HEAD_POSITION[2] - 20];
export const CAMEL_EYES_GEOMETRY: number[] = [20, 20, 20];
export const CAMEL_LEFT_EYE_POSITION: number[] = [-40,
                                                  CAMEL_HEAD_POSITION[1] + 10,
                                                  CAMEL_HEAD_POSITION[2] - 60];
export const CAMEL_RIGHT_EYE_POSITION: number[] = [40,
                                                   CAMEL_HEAD_POSITION[1] + 10,
                                                   CAMEL_HEAD_POSITION[2] - 60];
export const PANDA_NOSE_GEOMETRY: number[] = [53, 53, 40];
export const PANDA_NOSE_POSITION: number[] = [0, 120, 140];
export const PANDA_MEDIUM_NOSE_GEOMETRY: number[] = [27, 20, 0];
export const PANDA_MEDIUM_NOSE_POSITION: number[] = [0,
                                                     PANDA_NOSE_POSITION[1] + 7,
                                                     PANDA_NOSE_POSITION[2] + 27];
export const PANDA_SMALL_NOSE_GEOMETRY: number[] = [13, 13, 0];
export const PANDA_SMALL_NOSE_POSITION: number[] = [0,
                                                    PANDA_MEDIUM_NOSE_POSITION[1] - 13,
                                                    PANDA_MEDIUM_NOSE_POSITION[2]];
export const PANDA_HEAD_GEOMETRY: number[] = [106, 106, 67];
export const PANDA_HEAD_POSITION: number[] = [0,
                                              PANDA_NOSE_POSITION[1] + 27,
                                              PANDA_NOSE_POSITION[2] - PANDA_NOSE_GEOMETRY[2]];
export const PANDA_NECK_GEOMETRY: number[] = [80, 67, 20];
export const PANDA_NECK_POSITION: number[] = [0,
                                              PANDA_HEAD_POSITION[1] - 7,
                                              PANDA_HEAD_POSITION[2] - 33];
export const PANDA_BODY_GEOMETRY: number[] = [160, 160, 13];
export const PANDA_SMALL_BODY_POSITION: number[] = [0,
                                                    PANDA_NECK_POSITION[1] - 7,
                                                    PANDA_NECK_POSITION[2] - 13];
export const PANDA_MEDIUM_BODY_GEOMETRY: number[] = [160, 160, 80];
export const PANDA_MEDIUM_BODY_POSITION: number[] = [0,
                                                     PANDA_SMALL_BODY_POSITION[1],
                                                     PANDA_SMALL_BODY_POSITION[2] - 47];
export const PANDA_BIG_BODY_GEOMETRY: number[] = [160, 160, 133];
export const PANDA_BIG_BODY_POSITION: number[] = [0,
                                                  PANDA_SMALL_BODY_POSITION[1],
                                                  PANDA_MEDIUM_BODY_POSITION[2] - 107];
export const PANDA_LEGS_GEOMETRY: number[] = [60, 70, 60];
export const PANDA_FRONT_LEFT_LEG_POSITION: number[] = [-50,
                                                        PANDA_SMALL_BODY_POSITION[1] - 116,
                                                        PANDA_SMALL_BODY_POSITION[2] - 30];
export const PANDA_FRONT_RIGHT_LEG_POSITION: number[] = [50,
                                                         PANDA_SMALL_BODY_POSITION[1] - 116,
                                                         PANDA_SMALL_BODY_POSITION[2] - 30];
export const PANDA_BACK_LEFT_LEG_POSITION: number[] = [-50,
                                                       PANDA_SMALL_BODY_POSITION[1] - 116,
                                                       PANDA_BIG_BODY_POSITION[2] - 30];
export const PANDA_BACK_RIGHT_LEG_POSITION: number[] = [50,
                                                        PANDA_SMALL_BODY_POSITION[1] - 116,
                                                        PANDA_BIG_BODY_POSITION[2] - 30];
export const PANDA_EARS_GEOMETRY: number[] = [40, 40, 53];
export const PANDA_LEFT_EAR_POSITION: number[] = [-40,
                                                  PANDA_HEAD_POSITION[1] + 65,
                                                  PANDA_HEAD_POSITION[2]];
export const PANDA_RIGHT_EAR_POSITION: number[] = [40,
                                                   PANDA_HEAD_POSITION[1] + 65,
                                                   PANDA_HEAD_POSITION[2]];
export const PANDA_EYES_ANGLE: number = 20;
export const PANDA_SMALL_EYES_RADIUS: number = 10;
export const PANDA_BIG_EYES_RADIUS: number = 30;
export const PANDA_RIGHT_EYES_X_POS: number = 30;
export const PANDA_LEFT_EYES_X_POS: number = -30;
export const PANDA_EYES_Y_POS: number = PANDA_HEAD_POSITION[1] + 7;
export const PANDA_BIG_EYES_Z_POS: number = PANDA_HEAD_POSITION[2] + 40;
export const PANDA_SMALL_EYES_Z_POS: number = PANDA_BIG_EYES_Z_POS + 4;

// dolphin constants
export const DOLPHIN_COLOR: number = 0x616366;
export const DOLPHIN_NOSE_GEO: number[] = [60, 60, 200];
export const DOLPHIN_NOSE_POS: number[] = [0, 170, 140];
export const DOLPHIN_HEAD_GEO: number[] = [120, 160, 360];
export const DOLPHIN_HEAD_POS: number[] = [0, 198, -60];
export const DOLPHIN_BIG_TAIL_GEO: number[] = [40, 100, 140];
export const DOLPHIN_BIG_TAIL_POS: number[] = [10, 198, -240];
export const DOLPHIN_SMALL_TAIL_GEO: number[] = [80, 20, 80];
export const DOLPHIN_SMALL_TAIL_POS: number[] = [0, 198, -350];
export const DOLPHIN_FIN_GEO: number[] = [160, 40, 80];
export const DOLPHIN_RIGHT_FIN_POS: number[] = [60, 158, 0];
export const DOLPHIN_LEFT_FIN_POS: number[] = [-60, 158, 0];
export const DOLPHIN_RIGHT_FIN_ROT: number[] = [Math.PI * 5 / 6, Math.PI * 3 / 4, 0];
export const DOLPHIN_LEFT_FIN_ROT: number[] = [Math.PI * 5 / 6, Math.PI * 3 / 4, 0];
export const DOLPHIN_PECTORAL_FIN_GEO: number[] = [90, 120, 120];
export const DOLPHIN_PECTORAL_FIN_POS: number[] = [0, 238, -60];
export const DOLPHIN_PECTORAL_FIN_ROT: number[] = [0, 0, Math.PI * 5 / 6];
export const DOLPHIN_EYES_GEO: number[] = [20, 20, 20];
export const DOLPHIN_RIGHT_EYE_POS: number[] = [60, 198, 90];
export const DOLPHIN_LEFT_EYE_POS: number[] = [-60, 198, 90];

// elephant constants
export const ELEPHANT_COLOR: number = 0x484848;
export const ELEPHANT_HEAD_GEOMETRY: number[] = [213, 213, 160];
export const ELEPHANT_HEAD_POSITION: number[] = [0, 450, 160];
export const ELEPHANT_BODY_GEOMETRY: number[] = [267, 213, 426];
export const ELEPHANT_BODY_POSITION: number[] = [0,
                                                 ELEPHANT_HEAD_POSITION[1] - 200,
                                                 ELEPHANT_HEAD_POSITION[2] - 280];
export const ELEPHANT_LEGS_GEOMETRY: number[] = [80, 107, 80];
export const ELEPHANT_FRONT_LEFT_LEG_POSITION: number[] = [-53,
                                                           ELEPHANT_BODY_POSITION[1] - 160,
                                                           ELEPHANT_BODY_POSITION[2] + 173];
export const ELEPHANT_FRONT_RIGHT_LEG_POSITION: number[] = [53,
                                                            ELEPHANT_BODY_POSITION[1] - 160,
                                                            ELEPHANT_BODY_POSITION[2] + 173];
export const ELEPHANT_BACK_LEFT_LEG_POSITION: number[] = [-53,
                                                          ELEPHANT_BODY_POSITION[1] - 160,
                                                          ELEPHANT_BODY_POSITION[2] - 173];
export const ELEPHANT_BACK_RIGHT_LEG_POSITION: number[] = [53,
                                                           ELEPHANT_BODY_POSITION[1] - 160,
                                                           ELEPHANT_BODY_POSITION[2] - 173];
export const ELEPHANT_NOSE_GEOMETRY: number[] = [80, 80, 53];
export const ELEPHANT_FIRST_NOSE_POSITION: number[] = [0,
                                                       ELEPHANT_HEAD_POSITION[1],
                                                       ELEPHANT_HEAD_POSITION[2] + 80];
export const ELEPHANT_SECOND_NOSE_POSITION: number[] = [0,
                                                        ELEPHANT_FIRST_NOSE_POSITION[1] - 40,
                                                        ELEPHANT_FIRST_NOSE_POSITION[2] + 27];
export const ELEPHANT_TRUNK_GEOMETRY: number[] = [40, 213, 53];
export const ELEPHANT_TRUNK_POSITION: number[] = [0,
                                                  ELEPHANT_SECOND_NOSE_POSITION[1] - 100,
                                                  ELEPHANT_SECOND_NOSE_POSITION[2] + 40];
export const ELEPHANT_TIP_NOSE_GEOMETRY: number[] = [100, 40, 120];
export const ELEPHANT_TIP_NOSE_POSITION: number[] = [0,
                                                     ELEPHANT_TRUNK_POSITION[1] - 67,
                                                     ELEPHANT_TRUNK_POSITION[2]];
export const ELEPHANT_EARS_GEOMETRY: number[] = [120, 160, 13];
export const ELEPHANT_LEFT_EAR_POSITION: number[] = [-160,
                                                     ELEPHANT_HEAD_POSITION[1] + 80,
                                                     ELEPHANT_HEAD_POSITION[2] + 67];
export const ELEPHANT_RIGHT_EAR_POSITION: number[] = [160,
                                                      ELEPHANT_HEAD_POSITION[1] + 80,
                                                      ELEPHANT_HEAD_POSITION[2] + 67];
export const ELEPHANT_TUSKS_GEOMETRY: number[] = [27, 27, 80];
export const ELEPHANT_LEFT_TUSK_POSITION: number[] = [-80,
                                                      ELEPHANT_HEAD_POSITION[1] - 80,
                                                      ELEPHANT_HEAD_POSITION[2] + 160];
export const ELEPHANT_RIGHT_TUSK_POSITION: number[] = [80,
                                                       ELEPHANT_HEAD_POSITION[1] - 80,
                                                       ELEPHANT_HEAD_POSITION[2] + 160];
export const ELEPHANT_EYES_GEOMETRY: number[] = [27, 27, 13];
export const ELEPHANT_LEFT_EYE_POSITION: number[] = [-40,
                                                     ELEPHANT_HEAD_POSITION[1] + 53,
                                                     ELEPHANT_HEAD_POSITION[2] + 80];
export const ELEPHANT_RIGHT_EYE_POSITION: number[] = [40,
                                                      ELEPHANT_HEAD_POSITION[1] + 53,
                                                      ELEPHANT_HEAD_POSITION[2] + 80];

export const HORSE_BASE_COLOR: number = 0xB15228;
export const HORSE_BODY_GEOMETRY: number[] = [100, 100, 240];
export const HORSE_BODY_POSITION: number[] = [0, 150, 0];
export const HORSE_HEAD_GEOMETRY: number[] = [50, 80, 140];
export const HORSE_HEAD_POSITION: number[] = [0, 220, 130];
export const HORSE_HEAD_ROTATION: number[] = [- Math.PI / 4, 0, 0];
export const HORSE_EYES_GEOMETRY: number[] = [2, 14, 14];
export const HORSE_LEFT_EYE_POSITION: number[] = [HORSE_HEAD_GEOMETRY[0] / 2 + 1,
                                                  HORSE_HEAD_POSITION[1] + 40,
                                                  HORSE_HEAD_POSITION[2] + 20];
export const HORSE_RIGHT_EYE_POSITION: number[] = [- HORSE_HEAD_GEOMETRY[0] / 2 - 1,
                                                   HORSE_HEAD_POSITION[1] + 40,
                                                   HORSE_HEAD_POSITION[2] + 20];
export const HORSE_EYE_ROTATION: number[] = [- Math.PI / 4, 0, 0];
export const HORSE_MOUTH_GEOMETRY: number[] = [HORSE_HEAD_GEOMETRY[0] - 20,
                                               HORSE_HEAD_GEOMETRY[0] - 20,
                                               (HORSE_HEAD_GEOMETRY[0] - 20) * 3];
export const HORSE_MOUTH_POSITION: number[] = [0,
                                               HORSE_HEAD_POSITION[1],
                                               HORSE_HEAD_POSITION[2] + 70];
export const HORSE_MOUTH_ROTATION: number[] = [ Math.PI / 4, 0, 0];
export const HORSE_EARS_GEOMETRY: number[] = [16, 6, 30];
export const HORSE_LEFT_EAR_POSITION: number[] = [10, 300, 160];
export const HORSE_RIGHT_EAR_POSITION: number[] = [-10, 300, 160];
export const HORSE_EAR_ROTATION: number[] = [- Math.PI / 4, 0, 0];
export const HORSE_HAIR_GEOMETRY: number[] = [10, 30, 120];
export const HORSE_HAIR_POSITION: number[] = [0,
                                              HORSE_HEAD_POSITION[1] + 26,
                                              HORSE_HEAD_POSITION[2] - 30];
export const HORSE_HAIR_ROTATION: number[] = [- Math.PI / 4, 0, 0];
export const HORSE_LEGS_GEOMETRY: number[] = [36, 100, 36];
export const HORSE_FRONT_LEFT_LEG_POSITION: number[] = [25, 50, 100];
export const HORSE_FRONT_RIGHT_LEG_POSITION: number[] = [-25, 50, 100];
export const HORSE_BACK_LEFT_LEG_POSITION: number[] = [25, 50, -100];
export const HORSE_BACK_RIGHT_LEG_POSITION: number[] = [-25, 50, -100];

export const RABBIT_BODY_GEOMETRY: number[] = [50, 40, 100];
export const RABBIT_BODY_POSITION: number[] = [0, 50, 0];
export const RABBIT_BODY_ROTATION: number[] = [-Math.PI / 6, 0, 0];
export const RABBIT_FEET_GEOMETRY: number[] = [10, 6, 80];
export const RABBIT_LEFT_FOOT_POSITION: number[] = [14, 3, -6];
export const RABBIT_RIGHT_FOOT_POSITION: number[] = [-14, 3, -6];
export const RABBIT_LEGS_GEOMETRY: number[] = [20, 30, 40];
export const RABBIT_LEFT_LEG_POSITION: number[] = [RABBIT_LEFT_FOOT_POSITION[1] + 6, 24, -30];
export const RABBIT_RIGHT_LEG_POSITION: number[] = [-RABBIT_LEFT_FOOT_POSITION[1] - 6, 24, -30];
export const RABBIT_HEAD_GEOMETRY: number[] = [44, 40, 50];
export const RABBIT_HEAD_POSITION: number[] = [0, 90, 70];
export const RABBIT_EYES_GEOMETRY: number[] = [4, 8, 2];
export const RABBIT_LEFT_EYE_POSITION: number[] = [10,
                                                   RABBIT_HEAD_POSITION[1] + 6,
                                                   RABBIT_HEAD_POSITION[2] + 25];
export const RABBIT_RIGHT_EYE_POSITION: number[] = [-10,
                                                    RABBIT_HEAD_POSITION[1] + 6,
                                                    RABBIT_HEAD_POSITION[2] + 25];
export const RABBIT_NOSE_GEOMETRY: number[] = [6, 6, 6];
export const RABBIT_NOSE_POSITION: number[] = [0,
                                               RABBIT_HEAD_POSITION[1],
                                               RABBIT_HEAD_POSITION[2] + RABBIT_HEAD_GEOMETRY[2] / 2];
export const RABBIT_EARS_GEOMETRY: number[] = [16, 50, 6];
export const RABBIT_LEFT_EAR_POSITION: number[] = [14,
                                                   RABBIT_HEAD_POSITION[1] + 45,
                                                   RABBIT_HEAD_POSITION[2] - 20];
export const RABBIT_RIGHT_EAR_POSITION: number[] = [-14,
                                                    RABBIT_HEAD_POSITION[1] + 45,
                                                    RABBIT_HEAD_POSITION[2] - 20];
export const RABBIT_LEFT_EAR_ROTATION: number[] = [0, Math.PI / 10, 0];
export const RABBIT_RIGHT_EAR_ROTATION: number[] = [0, -Math.PI / 10, 0];
export const RABBIT_ARMS_GEOMETRY: number[] = [14, 56, 14];
export const RABBIT_LEFT_ARM_POSITION: number[] = [RABBIT_BODY_GEOMETRY[0] / 2,
                                                   RABBIT_ARMS_GEOMETRY[1] / 2,
                                                   40];
export const RABBIT_RIGHT_ARM_POSITION: number[] = [-RABBIT_BODY_GEOMETRY[0] / 2,
                                                    RABBIT_ARMS_GEOMETRY[1] / 2,
                                                    40];

export const BUTTERFLY_BODY_GEOMETRY: number[] = [15, 120, 15];
export const BUTTERFLY_BODY_POSITION: number[] = [0, 300, 40];
export const BUTTERFLY_HEAD_GEOMETRY: number[] = [25, 25, 25];
export const BUTTERFLY_HEAD_POSITION: number[] = [0,
                                                  BUTTERFLY_BODY_POSITION[1] + 50,
                                                  BUTTERFLY_BODY_POSITION[2]];
export const BUTTERFLY_SHAPE_POS: number = 50;
export const BUTTERFLY_FIRST_CURVE_CP1_X: number = 160;
export const BUTTERFLY_FIRST_CURVE_CP1_Y: number = 130;
export const BUTTERFLY_FIRST_CURVE_CP2_X: number = 80;
export const BUTTERFLY_FIRST_CURVE_CP2_Y: number = 0;
export const BUTTERFLY_FIRST_CURVE_X: number = 80;
export const BUTTERFLY_FIRST_CURVE_Y: number = 35;
export const BUTTERFLY_SECOND_CURVE_CP1_X: number = 80;
export const BUTTERFLY_SECOND_CURVE_CP1_Y: number = 35;
export const BUTTERFLY_SECOND_CURVE_CP2_X: number = 80;
export const BUTTERFLY_SECOND_CURVE_CP2_Y: number = 0;
export const BUTTERFLY_SECOND_CURVE_X: number = 50;
export const BUTTERFLY_SECOND_CURVE_Y: number = 0;
export const BUTTERFLY_THIRD_CURVE_CP1_X: number = 0;
export const BUTTERFLY_THIRD_CURVE_CP1_Y: number = 0;
export const BUTTERFLY_THIRD_CURVE_CP2_X: number = 20;
export const BUTTERFLY_THIRD_CURVE_CP2_Y: number = 20;
export const BUTTERFLY_THIRD_CURVE_X: number = 0;
export const BUTTERFLY_THIRD_CURVE_Y: number = 0;
export const BUTTERFLY_WINGS_DEPTH: number = 5;
export const BUTTERFLY_WINGS_COLOR: number = 0xFFFF00;
export const BUTTERFLY_RIGHT_WING_X_POS: number = 0;
export const BUTTERFLY_RIGHT_WING_Y_POS: number = BUTTERFLY_BODY_POSITION[1] - 10;
export const BUTTERFLY_RIGHT_WING_Z_POS: number = BUTTERFLY_BODY_POSITION[2] + 2;
export const BUTTERFLY_LEFT_WING_X_POS: number = 0;
export const BUTTERFLY_LEFT_WING_Y_POS: number = BUTTERFLY_BODY_POSITION[1] - 10;
export const BUTTERFLY_LEFT_WING_Z_POS: number = BUTTERFLY_BODY_POSITION[2] + 2;
export const BUTTERFLY_EARS_GEOMETRY: number[] = [5, 55, 5];
export const BUTTERFLY_LEFT_EAR_POSITION: number[] = [10,
                                                      BUTTERFLY_HEAD_POSITION[1] + 17,
                                                      BUTTERFLY_HEAD_POSITION[2]];
export const BUTTERFLY_RIGHT_EAR_POSITION: number[] = [-10,
                                                       BUTTERFLY_HEAD_POSITION[1] + 17,
                                                       BUTTERFLY_HEAD_POSITION[2]];
export const BUTTERFLY_EYES_GEOMETRY: number[] = [10, 10, 5];
export const BUTTERFLY_LEFT_EYE_POSITION: number[] = [10,
                                                      BUTTERFLY_HEAD_POSITION[1],
                                                      BUTTERFLY_HEAD_POSITION[2] + 17];
export const BUTTERFLY_RIGHT_EYE_POSITION: number[] = [-10,
                                                       BUTTERFLY_HEAD_POSITION[1],
                                                       BUTTERFLY_HEAD_POSITION[2] + 17];
// tslint:disable-next-line:max-file-line-count
