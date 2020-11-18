
import {inject, injectable } from "inversify";
import {Stack} from "stack-typescript";
import * as constants from "../../../common/constants";
import {ImageService} from "../services/image.service";
import Types from "../types";
interface Node {
  positionX: number;
  positionY: number;
}

@injectable()
export class DifferencesService {

public arrayPixel: string[][];
public arrayOriginal: string[][];
public arrayModified: string[][];
public finalBuff: Buffer;

public constructor(@inject(Types.ImageService) private imageService: ImageService) {}

public allocate(arrayPixel: string[][], arrayOri: string[][], arrayMod: string[][]): void {
  this.arrayPixel = arrayPixel;
  this.arrayOriginal = arrayOri;
  this.arrayModified = arrayMod;
}

public checkIfDifferent(positionX: number, positionY: number, modifiedBuffer: Buffer): number {

    if (this.arrayPixel[positionY][positionX] === constants.IMAGE_SERVICE_BLACKPIXEL) {
        this.checkArea(positionY, positionX);
        this.finalBuff = this.imageService.writeFile(modifiedBuffer, this.arrayModified);

        return 1;
      }
    this.finalBuff = this.imageService.writeFile(modifiedBuffer, this.arrayModified);

    return 0;

}

public checkArea(startPositionX: number, startPositionY: number): void {
  if (!this.imageService.arePositionInBoundaries(startPositionX, startPositionY)) {return; }
  this.arrayPixel[startPositionX][startPositionY] = constants.IMAGE_SERVICE_BLACKPIXEL;
  const pixelPositionStack: Stack<Node> = new Stack<Node>();
  pixelPositionStack.push({positionX: startPositionX, positionY: startPositionY});

  while (pixelPositionStack.length !== 0) {

      const pixelTested: Node = pixelPositionStack.pop();
      const listOfNeighbours: Node[] = [];
      this.imageService.findNeighbours(listOfNeighbours, pixelTested);

      for (const neighbour of listOfNeighbours) {
          const selectedNeighbour: Node = neighbour;
          if (this.arrayPixel[selectedNeighbour.positionX][selectedNeighbour.positionY] === constants.IMAGE_SERVICE_BLACKPIXEL) {
              pixelPositionStack.push(selectedNeighbour);
              this.arrayPixel[selectedNeighbour.positionX][selectedNeighbour.positionY] = constants.IMAGE_SERVICE_WHITEPIXEL;
              this.arrayModified[selectedNeighbour.positionX][selectedNeighbour.positionY] =
                this.arrayOriginal[selectedNeighbour.positionX][selectedNeighbour.positionY];
          }
      }
  }
}
}
