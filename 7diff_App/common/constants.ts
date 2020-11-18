// tslint:disable:no-magic-numbers
// server constant
export const SERVER_IP: string = "localhost";
// constants used for the simpleView component
export const SIMPLEVIEW_IMG_WIDTH: number = 640;
export const SIMPLEVIEW_IMG_HEIGHT: number = 480;
export const SIMPLEVIEW_EXTENSION: string = "image/bmp";
export const SIMPLEVIEW_WINDOW_WIDTH: string = "600px";
export const SIMPLEVIEW_WINDOW_HEIGHT: string = "550px";
// constants used for both views
export const BASIC_USERNAME: string = "Pro";
export const SCORES_LENGTH: number = 3;
export const MIN_SCORE: number = 600;
export const MAX_SCORE: number = 3540;
export const INDEX_TOP_HS: number = 3;
export const LEAVE_ALERT: string = "leaveWaitingGame";
export const ID_INDEX: number = 2;
export const POV_INDEX: number = 1;
export const CAN_DISPLAY_WIN_INDEX: number = 0;
export const CAN_DISPLAY_LOSE_INDEX: number = 1;
export const CAN_DISPLAY_LEAVE_INDEX: number = 2;
export const CAN_DISPLAY_OPP_HAS_LEFT_INDEX: number = 3;
export const CAN_DISPLAY_ERROR_INDEX: number = 4;
export const CAN_CLICK_INDEX: number = 5;
export const CAN_DISPLAY_COVER: number = 6;
export const CAN_DISPLAY_PLAYER_TWO: number = 7;
export const CAN_DISPLAY_CHEAT_MODE: number = 8;
export const COLOR_INDEX: number = 2;
// constants used for image service
export const IMAGE_SERVICE_WIDTHPIXEL: number = 3;
export const IMAGE_SERVICE_OFFSET: number = 54;
export const IMAGE_SERVICE_BLACKPIXEL: string = "0,0,0";
export const IMAGE_SERVICE_WHITEPIXEL: string = "255,255,255";
export const IMAGE_SERVICE_TESTEDPIXEL: string = "100,100,100";
// constants for gameView
export const MAX_NUMBER_OF_DIFFERENCES: number = 7;
export const NUMBER_OF_DIFFERENCES_1V1: number = 4;
export const NB_TYPES_DIFF: number = 3;
export const DIFF_COLOR_ID: number = 0;
export const DIFF_ADD_ID: number = 1;
export const DIFF_REMOVE_ID: number = 2;
export const SECONDS_IN_MINUTE: number = 60;
export const MILLISECONDS_IN_SECOND: number = 1000;
export const TWO_DIGITS_TIME: number = 10;
export const POP_UP_TIME_INTERVAL: number = 2000;
export const SOUND_URL: string = "http://" + SERVER_IP + ":3000/api/sound/sound";
export const DIFFERENCES_URL: string = "http://" + SERVER_IP + ":3000/api/image/difference";
export const MODGAMEIMG_URL: string = "http://" + SERVER_IP + ":3000/api/image/modifiedGameImg";
export const DELETE_GAME_URL: string = "http://" + SERVER_IP + ":3000/api/image/deleteGame";
export const POPUP_WIDTH: number = 0.05;
export const POPUP_HEIGHT: number = 0.03;
// constants for forms
export const MIN_LENGTH_GAME_NAME: number = 4;
export const MAX_LENGTH_GAME_NAME: number = 12;
export const MIN_OBJECT_NUMBER: number = 10;
export const MAX_OBJECT_NUMBER: number = 200;
export const NUMBER_PATTERN: string = "^[0-9]*$";
// constants for 3D Scene
export const TIME_TO_WAIT: number = 200;
export const WHITE_HEX: number = 0xFFFFFF;
export const BLACK_HEX: number = 0;
export const FLOOR_WIDTH_MULTIPLICATOR: number = 600;
export const SKY_GEOM_COLOR: number = 0x2D383A;
export const FLOOR_GEOM_COLOR: number = 0x606060;
export const SKY_ANIM_COLOR: number = 0x87CEEB;
export const FLOOR_ANIM_COLOR: number = 0x228B22;
export const FLOOR_ANGLE: number = - Math.PI / 2;
export const FLOOR_SPAWNING_BUFFER: number = 500;
export const CAM_FOV: number = 40;
export const CAM_NEAR: number = 1;
export const CAM_FAR: number = 30000;
export const CAM_FAR_MULTIPLICATOR: number = 10;
export const CAM_POS_X: number = 0;
export const CAM_POS_Y: number = 400;
export const CAM_POS_Y_PHOTO: number = 4000;
export const CAM_POS_Z: number = 2000;
export const CAM_POS_Z_PHOTO: number = 8000;
export const AMBIENT_HEX: number = 0xAAAAAA;
export const DIRECTION_HEX: number = 0xFFFFFF;
export const SPOT_HIGH_INTENSITY: number = 1;
export const SPOT_LOW_INTENSITY: number = 0.5;
export const SPOT_DISTANCE: number = 20000;
export const SPOT_SHADOW_MAPSIZE: number = 2048;
export const SPOT1_Y_BUFFER: number = 2000;
export const SPOT2_Z_BUFFER: number = 2000;
export const SPOT1_Z_BUFFER: number = 4000;
export const SPOT1_POS_X: number = 0;
export const SUN_COLOR: number = 0xF8F7ED;
export const SUN1_RADIUS: number = 700;
export const SUN2_RADIUS: number = 500;
export const NB_VIEWPORT: number = 2;
export const SCENE_WIDTH_RATIO: number = 0.8;
export const SCENE_HEIGHT_RATIO: number = 0.9;
// movement constants
export const CAM_REPOSITION_BUFFER: number = 200;
export const CONTROLS_MIN_POLAR: number = Math.PI / 6;
export const CONTROLS_TARGET_BUFFER: number = 400;
export const CONTROLS_TARGET_Y_POS: number = 300;
export const CONTROLS_MAX_POLAR: number = Math.PI / 2.01;
export const CONTROLS_PAN_SPEED: number = 50;
export const CONTROLS_ROLLBACK_SPEED: number = CONTROLS_PAN_SPEED * 2;
export const CONTROLS_COLLISON_DISTANCE: number = 200;
// geometric constants
export const MIN_SCALE: number = 0.5;
export const BASIC_SIZE: number = 150;
export const PYRAMID_BASE_HEIGHT: number = 300;
export const PYRAMID_SEGMENTS: number = 3;
export const SPHERE_WIDTH_SEGMENTS: number = 30;
export const SPHERE_HEIGHT_SEGMENTS: number = 32;
export const CONE_BASE_HEIGHT: number = 400;
export const CONE_RADIAL_SEGMENTS: number = 30;
export const CYLINDER_BASE_HEIGHT: number = 300;
export const CYLINDER_RADIUS_SEGMENT: number = 30;
// spawning IDs and informations
export const NB_DIFERENCES: number = 7;
export const NB_SHAPES_GEOMETRY: number = 5;
export const PYRAMID_SPAWN_ID: number = 0;
export const CUBE_SPAWN_ID: number = 1;
export const SPHERE_SPAWN_ID: number = 2;
export const CONE_SPAWN_ID: number = 3;
export const CYLINDER_SPAWN_ID: number = 4;
// spawning prcentages
export const THEME_MAX_DISTRIBUTION: number = 100;
export const CAT_SPAWN_LIMIT_PERCENT: number = 10;
export const CHICKEN_SPAWN_LIMIT_PERCENT: number = CAT_SPAWN_LIMIT_PERCENT + 15;
export const HORSE_SPAWN_LIMIT_PERCENT: number = CHICKEN_SPAWN_LIMIT_PERCENT + 5;
export const RABBIT_SPAWN_LIMIT_PERCENT: number = HORSE_SPAWN_LIMIT_PERCENT + 10;
export const CAMEL_SPAWN_LIMIT_PERCENT: number = RABBIT_SPAWN_LIMIT_PERCENT + 5;
export const SPIDER_SPAWN_LIMIT_PERCENT: number = CAMEL_SPAWN_LIMIT_PERCENT + 15;
export const ELEPHANT_SPAWN_LIMIT_PERCENT: number = SPIDER_SPAWN_LIMIT_PERCENT + 5;
export const DOLPHIN_SPAWN_LIMIT_PERCENT: number = ELEPHANT_SPAWN_LIMIT_PERCENT + 10;
export const PANDA_SPAWN_LIMIT_PERCENT: number = DOLPHIN_SPAWN_LIMIT_PERCENT + 10;
export const BUTTERFLY_SPAWN_LIMIT_PERCENT: number = PANDA_SPAWN_LIMIT_PERCENT + 15;
// clicks offsets
export const RIGHT_X_OFFSET: number = - 3;
export const RIGHT_Y_OFFSET: number = 1;
export const LEFT_X_OFFSET: number = - 1;
// division constants
export const DIVIDE_BY_2: number = 2;
