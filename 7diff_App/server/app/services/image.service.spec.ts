import {expect} from "chai";
import {readFileSync} from "fs";
import "reflect-metadata";
import * as constants from "../../../common/constants";
import {ImageService} from "./image.service";

describe("imageService", () => {
    let service: ImageService;
    const imageOriginal: Buffer = Buffer.from(readFileSync("app/Bmp/carre.bmp"));
    const imageWrong: Buffer = Buffer.from(readFileSync("app/Bmp/pandaWrong.bmp"));
    const imageModifed: Buffer = Buffer.from(readFileSync("app/Bmp/carreMod.bmp"));
    const image7Diff: Buffer = Buffer.from(readFileSync("app/Bmp/carre2.bmp"));
    const image1Diff: Buffer = Buffer.from(readFileSync("app/Bmp/carre3.bmp"));

    beforeEach(() => { service = new ImageService(); });

    describe("Testing the right dimensions and nb of differences", () => {
    it("should return the right height", () => {
        service.readFile(imageOriginal, imageModifed);

        // tslint:disable-next-line:no-magic-numbers
        expect(service.imgHeightOriginal).to.equal(480);

    });
    it("should return the right width", () => {
        service.readFile(imageOriginal, imageModifed);

        // tslint:disable-next-line:no-magic-numbers
        expect(service.imgWidthOriginal).to.equal(640);

    });
    it("should return the right number of differences", () => {
        service.readFile(imageOriginal, imageModifed);

        expect(service.nbDifferences).to.equal(1);
    });

    it("should return the right number of differences, which should be 7", () => {
        service.readFile(imageOriginal, image7Diff);

        // tslint:disable-next-line:no-magic-numbers
        expect(service.nbDifferences).to.equal(7);
    });
    it("should return the right number of differences, which should be 1", () => {
        service.readFile(imageOriginal, image1Diff);

        // tslint:disable-next-line:no-magic-numbers
        expect(service.nbDifferences).to.equal(1);
    });

    it("should return of bad dimensions", () => {
        try {
            service.readFile(imageWrong, imageModifed);
        } catch (error) {
            expect(error.message).to.equal( "Mauvaises dimensions");
        }
    });
    it("Should have no differences", () => {

        service.readFile(imageOriginal, imageOriginal);
        expect(service.nbDifferences).to.equal(0);

    });
});
    describe("Testing FileValidation function", () => {
    it("Verify the function fileValidation, FALSE", () => {

        // tslint:disable-next-line:no-magic-numbers
        service.imgWidthOriginal = 400;

        expect(service.fileValidation()).to.equal(false);

    });
    it("Verify the function fileValidation, true", () => {

        service.imgWidthOriginal = constants.SIMPLEVIEW_IMG_WIDTH;
        service.imgHeightOriginal = constants.SIMPLEVIEW_IMG_HEIGHT;
        service.imgWidthModified = constants.SIMPLEVIEW_IMG_WIDTH;
        service.imgHeightModified = constants.SIMPLEVIEW_IMG_HEIGHT;
        expect(service.fileValidation()).to.equal(true);

    });
});

    describe("Testing findDimensions() function ", () => {

    it("Verify of the good dimensions while reading the buffer ", () => {

        const buff: Buffer = Buffer.from(imageOriginal.buffer);
        service.findDimensions(buff, buff);
        expect(service.imgHeightOriginal).to.equal(constants.SIMPLEVIEW_IMG_HEIGHT);
        expect(service.imgWidthOriginal).to.equal(constants.SIMPLEVIEW_IMG_WIDTH);
        // tslint:disable-next-line:no-magic-numbers
        expect(service.fileSize).to.equal(921654);

    });

    it("Verify of the wrong dimensions while reading the buffer ", () => {

        const buff: Buffer = Buffer.from(imageWrong.buffer);
        service.findDimensions(buff, buff);
        expect(service.imgHeightOriginal).to.not.equal(constants.SIMPLEVIEW_IMG_HEIGHT);

    });

    });
    describe("Testing boundaries and check area functions", () => {

    it("Verify the position of the interior of the image", () => {

        // tslint:disable-next-line:no-unused-expression
        expect(service.arePositionInBoundaries(0, 0)).to.be.true;
        // tslint:disable-next-line:no-unused-expression no-magic-numbers
        expect(service.arePositionInBoundaries(125, 112)).to.be.true;
        // tslint:disable-next-line:no-unused-expression no-magic-numbers
        expect(service.arePositionInBoundaries(0, 640)).to.be.false;
        // tslint:disable-next-line:no-unused-expression no-magic-numbers
        expect(service.arePositionInBoundaries(480, 0)).to.be.false;
        // tslint:disable-next-line:no-unused-expression no-magic-numbers
        expect(service.arePositionInBoundaries(480, 640)).to.be.false;
        // tslint:disable-next-line:no-unused-expression no-magic-numbers
        expect(service.arePositionInBoundaries(99999999, 99999999)).to.be.false;
        // tslint:disable-next-line:no-unused-expression no-magic-numbers
        expect(service.arePositionInBoundaries(-1, -1)).to.be.false;

    });

    it("Verification of number of differences - out of bounds", () => {
        service.arrayPixel = [[constants.IMAGE_SERVICE_BLACKPIXEL]];
        service.checkArea(-1, -1);
        // tslint:disable-next-line:no-unused-expression
        expect(service.arrayPixel[0][0] === constants.IMAGE_SERVICE_BLACKPIXEL).to.be.true;
    });

    it("Verification of checkArea - changing the color of the pixel", () => {
        service.arrayPixel = [[constants.IMAGE_SERVICE_WHITEPIXEL, constants.IMAGE_SERVICE_WHITEPIXEL, constants.IMAGE_SERVICE_WHITEPIXEL],
                              [constants.IMAGE_SERVICE_WHITEPIXEL, constants.IMAGE_SERVICE_TESTEDPIXEL, constants.IMAGE_SERVICE_WHITEPIXEL],
                              [constants.IMAGE_SERVICE_WHITEPIXEL, constants.IMAGE_SERVICE_WHITEPIXEL, constants.IMAGE_SERVICE_WHITEPIXEL]];
        service.checkArea(1, 1);
        // tslint:disable-next-line:no-unused-expression
        expect(service.arrayPixel[1][1] === constants.IMAGE_SERVICE_BLACKPIXEL).to.be.true;
        // tslint:disable-next-line:no-unused-expression no-magic-numbers
        expect(service.arrayPixel[2][2] === constants.IMAGE_SERVICE_WHITEPIXEL).to.be.true;
        // tslint:disable-next-line:no-unused-expression
        expect(service.arrayPixel[0][0] === constants.IMAGE_SERVICE_WHITEPIXEL).to.be.true;
    });
});

    // tslint:disable:no-magic-numbers
    describe("Testing pixel enlargement and colors", () => {

    it("Verification of pixel enlargement", () => {

        service.readFile(imageOriginal, imageModifed);
        service.enlarge(20, 20);
        expect(service.arrayPixel[20][20]).to.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
        expect(service.arrayPixel[23][20]).to.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
        expect(service.arrayPixel[24][20]).to.not.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
        expect(service.arrayPixel[20][24]).to.not.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
        expect(service.arrayPixel[23][23]).to.not.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
        expect(service.arrayPixel[23][22]).to.not.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
        expect(service.arrayPixel[22][23]).to.not.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
        expect(service.arrayPixel[17][17]).to.not.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
        expect(service.arrayPixel[23][17]).to.not.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
        expect(service.arrayPixel[17][23]).to.not.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);
    });

    it("ColorPixel should color black if different", () => {
        service.readFile(imageOriginal, imageModifed);
        service.arrayOriginal[20][20] = "0,1,2";
        service.arrayModified[20][20] = "22,34,56";
        service.colorPixel(20, 20);
        expect(service.arrayPixel[20][20]).to.equal(constants.IMAGE_SERVICE_TESTEDPIXEL);

    });
});
});
