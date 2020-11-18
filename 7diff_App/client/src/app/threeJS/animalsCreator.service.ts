import { Injectable } from "@angular/core";
import * as THREE from "three";
import * as constants from "../../../../common/constants";
import {Animal} from "./animal";
import {Butterfly} from "./butterfly";
import {Camel} from "./camel";
import {Cat} from "./cat";
import {Chicken} from "./chicken";
import {Dolphin} from "./dolphin";
import {Elephant} from "./elephant";
import {Horse} from "./horse";
import {Panda} from "./panda";
import {Rabbit} from "./rabbit";
import {Spider} from "./spider";

@Injectable()
export class AnimalsCreatorService {
  private nbAnimals: number;
  private floorWidth: number;
  private group: THREE.Group;
  private boundingBoxes: THREE.Box3[];

  public constructor() {
    this.boundingBoxes = [];
  }
  public setSceneParams(nbAnimals: number): void {
    this.boundingBoxes = [];
    this.nbAnimals = nbAnimals;
    this.floorWidth = Math.floor(Math.sqrt(this.nbAnimals + constants.NB_DIFERENCES)) * constants.FLOOR_WIDTH_MULTIPLICATOR;
  }
  public getNbElements(): number {
    return this.nbAnimals;
  }
  public getFloorDimension(): number {
    return this.floorWidth;
  }
  private setPositionTheme(cadrant: string): void {
    const position: number[] = this.generateRandomPosition();
    this.group.position.set(position[0], 0, position[1]);
    if (this.hasCollision()) {
      this.setPositionTheme(cadrant);
    }
    this.addBoundingBox();
  }
  public createHorse(): Animal {
    const horse: Horse = new Horse();
    this.group = horse.generateAnimalGroup();
    this.setPositionTheme("none");

    return horse;
  }
  public createChicken(): Animal {
    const chicken: Chicken = new Chicken();
    this.group = chicken.generateAnimalGroup();
    this.setPositionTheme("none");

    return chicken;
  }
  public createRabbit(): Animal {
    const rabbit: Rabbit = new Rabbit();
    this.group = rabbit.generateAnimalGroup();
    this.setPositionTheme("none");

    return rabbit;
  }
  public createCat(): Animal {
    const cat: Cat = new Cat();
    this.group = cat.generateAnimalGroup();
    this.setPositionTheme("none");

    return cat;
  }
  public createCamel(): Animal {
    const camel: Camel = new Camel();
    this.group = camel.generateAnimalGroup();
    this.setPositionTheme("none");

    return camel;
  }
  public createSpider(): Animal {
    const spider: Spider = new Spider();
    this.group = spider.generateAnimalGroup();
    this.setPositionTheme("none");

    return spider;
  }
  public createPanda(): Animal {
    const panda: Panda = new Panda();
    this.group = panda.generateAnimalGroup();
    this.setPositionTheme("none");

    return panda;
  }
  public createDolphin(): Animal {
    const dolphin: Dolphin = new Dolphin();
    this.group = dolphin.generateAnimalGroup();
    this.setPositionTheme("none");

    return dolphin;
  }
  public createElephant(): Animal {
    const elephant: Elephant = new Elephant();
    this.group = elephant.generateAnimalGroup();
    this.setPositionTheme("none");

    return elephant;
  }

  public createButterfly(): Animal {
    const butterfly: Butterfly = new Butterfly();
    this.group = butterfly.generateAnimalGroup();
    this.setPositionTheme("none");

    return butterfly;
  }

  private hasCollision(): boolean {
    const tempCollisionBox: THREE.Box3 = new THREE.Box3().setFromObject(this.group);
    let foundCollision: boolean = false;
    for (let i: number = 0; i < this.boundingBoxes.length && !foundCollision; i++) {
      foundCollision = this.boundingBoxes[i].intersectsBox(tempCollisionBox);
    }

    return foundCollision;
  }
  private addBoundingBox(): void {
    this.boundingBoxes.push(new THREE.Box3().setFromObject(this.group));
  }
  public generateRandomPosition(): number[] {
    const basePosition: number = this.floorWidth - constants.FLOOR_SPAWNING_BUFFER;
    const position: number[] = [];
    // tslint:disable-next-line:no-magic-numbers
    position.push(Math.random() * (basePosition) - ((basePosition) / 2));
    // tslint:disable-next-line:no-magic-numbers
    position.push(Math.random() * (basePosition) - ((basePosition) / 2));

    return position;
  }
  public generateAnimal(): Animal {
    let elementShape: number;
    elementShape = Math.floor(Math.random() * constants.THEME_MAX_DISTRIBUTION);
    switch (true) {
      default:
      case elementShape <= constants.CAT_SPAWN_LIMIT_PERCENT:
        return  this.createCat();
      case elementShape <= constants.CHICKEN_SPAWN_LIMIT_PERCENT:
        return  this.createChicken();
      case elementShape <= constants.HORSE_SPAWN_LIMIT_PERCENT:
        return  this.createHorse();
      case elementShape <= constants.RABBIT_SPAWN_LIMIT_PERCENT:
        return  this.createRabbit();
      case elementShape <= constants.CAMEL_SPAWN_LIMIT_PERCENT:
        return  this.createCamel();
      case elementShape <= constants.SPIDER_SPAWN_LIMIT_PERCENT:
        return  this.createSpider();
      case elementShape <= constants.ELEPHANT_SPAWN_LIMIT_PERCENT:
        return  this.createElephant();
      case elementShape <= constants.DOLPHIN_SPAWN_LIMIT_PERCENT:
        return  this.createDolphin();
      case elementShape <= constants.PANDA_SPAWN_LIMIT_PERCENT:
        return  this.createPanda();
      case elementShape <= constants.BUTTERFLY_SPAWN_LIMIT_PERCENT:
        return  this.createButterfly();
    }
  }
}
