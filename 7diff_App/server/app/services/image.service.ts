import * as fs from "fs";
import {injectable } from "inversify";
import {Stack} from "stack-typescript";
import * as constants from "../../../common/constants";
import {DimensionsError} from "../../../common/error";
interface Node {
    positionX: number;
    positionY: number;
}

@injectable()
export class ImageService {

    public readonly offsetOriginal: number = 10;
    public readonly offsetWidth: number = 18;
    public readonly offsetHeight: number = 22;
    public readonly offsetFile: number = 2;
    public readonly offsetDivider: number = 4;
    private readonly DIFF_IMAGE: string = "../imageDifferences2.bmp";
    public arrayPixel: string[][];
    public arrayOriginal: string[][];
    public arrayModified: string[][];

    public imgWidthOriginal: number;
    public imgHeightOriginal: number;
    public imgWidthModified: number;
    public imgHeightModified: number;
    public fileSize: number;
    public nbDifferences: number;
    public widthPixel: number = constants.IMAGE_SERVICE_WIDTHPIXEL;

    public arePositionInBoundaries(positionX: number, positionY: number): boolean {
        return (positionX >= 0 && positionX < constants.SIMPLEVIEW_IMG_HEIGHT
            && positionY >= 0 && positionY < constants.SIMPLEVIEW_IMG_WIDTH);
    }

    // tslint:disable-next-line: max-func-body-length
    public readFile(originalBuffer: Buffer, modifiedBuffer: Buffer): void {
        try {
            this.nbDifferences = 0;

            let offsetOriginal: number = originalBuffer.readInt32LE(this.offsetOriginal);
            let offsetModified: number = modifiedBuffer.readInt32LE(this.offsetOriginal);
            this.findDimensions(originalBuffer, modifiedBuffer);

            this.allocateArray();

            if (this.fileValidation()) {

                    for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
                        for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {

                            this.arrayOriginal[i][j] = "" + originalBuffer.readUInt8(offsetOriginal++) + "," +
                                originalBuffer.readUInt8(offsetOriginal++) + "," + originalBuffer.readUInt8(offsetOriginal++);

                            this.arrayModified[i][j] = "" + modifiedBuffer.readUInt8(offsetModified++) + "," +
                                modifiedBuffer.readUInt8(offsetModified++) + "," + modifiedBuffer.readUInt8(offsetModified++);
                            this.colorPixel(i, j);
                        }
                        offsetOriginal = offsetOriginal + (constants.SIMPLEVIEW_IMG_WIDTH % this.offsetDivider);
                    }
                    this.checkDifferences();
                    this.writeHeader(originalBuffer);
                } else {
                    throw new DimensionsError("Mauvaises dimensions");
                }
            } catch (e) {
                return e;
            }
    }
    public colorPixel(i: number, j: number): void {
        if (this.arrayOriginal[i][j] !== this.arrayModified[i][j]) {
            this.arrayPixel[i][j] = constants.IMAGE_SERVICE_TESTEDPIXEL;
            this.enlarge(i, j);
        } else {
            this.arrayPixel[i][j] = constants.IMAGE_SERVICE_WHITEPIXEL;
        }
    }

    public allocateArray(): void {
        this.arrayPixel = [];
        this.arrayOriginal = [];
        this.arrayModified = [];
        for (let p: number = 0; p < constants.SIMPLEVIEW_IMG_HEIGHT; p++) {
            this.arrayPixel[p] = [];
            this.arrayOriginal[p] = [];
            this.arrayModified[p] = [];
        }
    }

    public fileValidation(): boolean {
        return this.imgWidthOriginal === this.imgWidthModified && this.imgWidthOriginal === constants.SIMPLEVIEW_IMG_WIDTH
        && (this.imgHeightModified === this.imgHeightOriginal) &&
        this.imgHeightOriginal === constants.SIMPLEVIEW_IMG_HEIGHT;
    }

    public findDimensions(originalBuffer: Buffer, modifiedBuffer: Buffer): void {
        this.imgWidthOriginal = originalBuffer.readInt32LE(this.offsetWidth);
        this.imgHeightOriginal = originalBuffer.readInt32LE(this.offsetHeight);
        this.fileSize = originalBuffer.readInt32LE(this.offsetFile);
        this.imgWidthModified = modifiedBuffer.readInt32LE(this.offsetWidth);
        this.imgHeightModified = modifiedBuffer.readInt32LE(this.offsetHeight);

    }

    public writeHeader(originalFile: Buffer ): void {

        const buffOutput: Buffer = Buffer.from(originalFile);
        this.writeFile(buffOutput, this.arrayPixel);

    }

    public writeFile(buff: Buffer, array: string[][]): Buffer {

        try {

        let offset: number = constants.IMAGE_SERVICE_OFFSET;
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
                const split: number[] = array[i][j].trim().split(",").map(Number);

                for (const pixel of split) {
                    buff.writeUInt8(pixel, offset);
                    ++offset;
                }
            }
        }
        fs.writeFile(this.DIFF_IMAGE, buff, (err: Error) => {
            if (err) {
                throw new Error("writeFile error");
            }
            });
        } catch (e) {
            return e;
        }

        return buff;
    }

    public writePixels(positionX: number, positionY: number, xIncrement: number, yIncrement: number): void {

        let tempColor: string = "";
        tempColor = this.isWithinRange(xIncrement, yIncrement)
                    && this.isNotTested(positionX, positionY) ? constants.IMAGE_SERVICE_WHITEPIXEL :
                                                                constants.IMAGE_SERVICE_TESTEDPIXEL;
        this.arrayPixel[positionX][positionY] = tempColor;

    }
    public enlarge(positionX: number, positionY: number): void {

        for (let i: number = 0; i < this.widthPixel + 1; i++) {
            for (let j: number = 0; j < this.widthPixel + 1; j++) {
                if (this.arePositionInBoundaries(positionX + i, positionY + j)) {
                    this.writePixels((positionX + i), (positionY + j), i, j);
                }
                if (this.arePositionInBoundaries(positionX + i, positionY - j)) {
                    this.writePixels((positionX + i), (positionY - j), i, j);
                }
                if (this.arePositionInBoundaries(positionX - i, positionY + j)) {
                    this.writePixels((positionX - i), (positionY + j), i, j);
                }
                if (this.arePositionInBoundaries(positionX - i, positionY - j)) {
                    this.writePixels((positionX - i), (positionY - j), i, j);
                }
            }
        }

    }

    public checkDifferences(): void {
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
                if (this.arrayPixel[i][j] === constants.IMAGE_SERVICE_TESTEDPIXEL) {
                    this.nbDifferences++;
                    this.checkArea(i, j);
                }
            }
        }
    }

    public findNeighbours(listOfNeighbours: Node[], pixelTested: Node): void {
        for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                if (this.isValidCoordinates(i, j) && this.arePositionInBoundaries(pixelTested.positionX + i, pixelTested.positionY + j)) {
                    listOfNeighbours.push({
                        positionX: pixelTested.positionX + i,
                        positionY: pixelTested.positionY + j,
                    });
                }
            }
        }
    }

    public checkArea(startPositionX: number, startPositionY: number): void {
        if (!this.arePositionInBoundaries(startPositionX, startPositionY)) {return; }
        this.arrayPixel[startPositionX][startPositionY] = constants.IMAGE_SERVICE_BLACKPIXEL;
        const pixelPositionStack: Stack<Node> = new Stack<Node>();
        pixelPositionStack.push({positionX: startPositionX, positionY: startPositionY});

        while (pixelPositionStack.length !== 0) {

            const pixelTested: Node = pixelPositionStack.pop();
            const listOfNeighbours: Node[] = [];
            this.findNeighbours(listOfNeighbours, pixelTested);

            for (const neighbour of listOfNeighbours) {
                const selectedNeighbour: Node = neighbour;
                if (this.arrayPixel[selectedNeighbour.positionX][selectedNeighbour.positionY] === constants.IMAGE_SERVICE_TESTEDPIXEL) {
                    pixelPositionStack.push(selectedNeighbour);
                    this.arrayPixel[selectedNeighbour.positionX][selectedNeighbour.positionY] = constants.IMAGE_SERVICE_BLACKPIXEL;
                }
            }
        }
    }

    private isWithinRange(xIncrement: number, yIncrement: number): boolean {
        return (yIncrement === this.widthPixel && xIncrement === (this.widthPixel - 1))
            || (yIncrement === this.widthPixel && xIncrement === this.widthPixel)
            || (yIncrement === (this.widthPixel - 1) && xIncrement === this.widthPixel);
    }

    private isNotTested(positionX: number, positionY: number): boolean {
        return this.arrayPixel[positionX][positionY] !== constants.IMAGE_SERVICE_TESTEDPIXEL;
    }

    private isValidCoordinates(i: number, j: number): boolean {
        return (i !== 0 || j !== 0);
    }
}
