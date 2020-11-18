import {expect} from "chai";
import {readFileSync} from "fs";
import * as constants from "../../../common/constants";
import { DifferencesService } from "./differences.service";
import { ImageService } from "./image.service";

// tslint:disable:no-magic-numbers
describe("differencesService", () => {
    let diffService: DifferencesService;
    let service: ImageService;
    const image7Diff: Buffer = Buffer.from(readFileSync("app/Bmp/carre2.bmp"));

    beforeEach(() => { diffService = new DifferencesService(service);
                       service = new ImageService(); });

    describe("Allocating the arrays testing", () => {

    it("should allocate the right pixels - black pixels", () => {

        let arrayPixel: string[][];
        let arrayOriginal: string[][];
        let arrayModified: string[][];

        arrayModified = [];
        arrayPixel = [];
        arrayOriginal = [];
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            arrayModified[i] = [];
            arrayPixel[i] = [];
            arrayOriginal[i] = [];
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
              arrayModified[i][j] =  "0,0,0";
              arrayPixel[i][j] = "0,0,0";
              arrayOriginal[i][j] = "0,0,0";
            }}

        diffService.allocate( arrayPixel, arrayOriginal, arrayModified);
        expect(diffService.arrayPixel[20][20]).to.equal("0,0,0");

    });
    it("should allocate the right pixels - black pixels", () => {

        let arrayPixel: string[][];
        let arrayOriginal: string[][];
        let arrayModified: string[][];

        arrayModified = [];
        arrayPixel = [];
        arrayOriginal = [];
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            arrayModified[i] = [];
            arrayPixel[i] = [];
            arrayOriginal[i] = [];
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
              arrayModified[i][j] =  "0,10,15";
              arrayPixel[i][j] = "0,0,0";
              arrayOriginal[i][j] = "0,0,0";
            }}

        diffService.allocate( arrayPixel, arrayOriginal, arrayModified);
        expect(diffService.arrayModified[220][20]).to.equal("0,10,15");

    });
});
    describe("Testing the differences counter", () => {

        it("Pixel should  be black, so 1 differences", () => {

            let arrayPixel: string[][];
            let arrayOriginal: string[][];
            let arrayModified: string[][];

            arrayModified = [];
            arrayPixel = [];
            arrayOriginal = [];
            for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
                arrayModified[i] = [];
                arrayPixel[i] = [];
                arrayOriginal[i] = [];
                for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
                  arrayModified[i][j] =  "0,10,15";
                  arrayPixel[i][j] = "0,0,0";
                  arrayOriginal[i][j] = "0,0,0";
                }}

            diffService.allocate( arrayPixel, arrayOriginal, arrayModified);

            const returnValue: number = diffService.checkIfDifferent(20, 20, image7Diff);
            expect(returnValue).to.equal(1);

        });

        it("Pixel should not be black, so no differences", () => {

            let arrayPixel: string[][];
            let arrayOriginal: string[][];
            let arrayModified: string[][];

            arrayModified = [];
            arrayPixel = [];
            arrayOriginal = [];
            for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
                arrayModified[i] = [];
                arrayPixel[i] = [];
                arrayOriginal[i] = [];
                for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
                  arrayModified[i][j] =  "0,10,15";
                  arrayPixel[i][j] = "250,0,0";
                  arrayOriginal[i][j] = "0,0,0";
                }}

            diffService.allocate( arrayPixel, arrayOriginal, arrayModified);
            const buff: Buffer = Buffer.from("");
            const returnValue: number = diffService.checkIfDifferent(20, 20, buff);
            expect(returnValue).to.equal(0);

        });

        it("Pixel should not be black, so no differences", () => {

        let arrayPixel: string[][];
        let arrayOriginal: string[][];
        let arrayModified: string[][];

        arrayModified = [];
        arrayPixel = [];
        arrayOriginal = [];
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            arrayModified[i] = [];
            arrayPixel[i] = [];
            arrayOriginal[i] = [];
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
              arrayModified[i][j] =  "0,10,15";
              arrayPixel[i][j] = "250,0,0";
              arrayOriginal[i][j] = "0,0,0";
            }}

        diffService.allocate( arrayPixel, arrayOriginal, arrayModified);
        const buff: Buffer = Buffer.from("");
        const returnValue: number = diffService.checkIfDifferent(20, 20, buff);
        expect(returnValue).to.equal(0);

    });
});
    describe("Testing the modifications to the array/image", () => {

    it("CheckArea should modify the image since there are differences, but the position is out of bounds", () => {

        let arrayPixel: string[][];
        let arrayOriginal: string[][];
        let arrayModified: string[][];

        arrayModified = [];
        arrayPixel = [];
        arrayOriginal = [];
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            arrayModified[i] = [];
            arrayPixel[i] = [];
            arrayOriginal[i] = [];
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
              arrayModified[i][j] =  "0,10,15";
              arrayPixel[i][j] = "0,0,0";
              arrayOriginal[i][j] = "0,2,0";
            }}

        diffService.allocate( arrayPixel, arrayOriginal, arrayModified);

        diffService.checkArea(-20, -20);
        expect(diffService.arrayModified[20][20]).to.equal("0,10,15");

    });

    it("should change the modified array to the original since a diff has been found", () => {

        let arrayPixel: string[][];
        let arrayOriginal: string[][];
        let arrayModified: string[][];

        arrayModified = [];
        arrayPixel = [];
        arrayOriginal = [];
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            arrayModified[i] = [];
            arrayPixel[i] = [];
            arrayOriginal[i] = [];
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
              arrayModified[i][j] =  "0,10,15";
              arrayPixel[i][j] = "0,0,0";
              arrayOriginal[i][j] = "0,0,0";
            }}

        diffService.allocate( arrayPixel, arrayOriginal, arrayModified);

        diffService.checkIfDifferent(20, 20, image7Diff);

        expect(diffService.arrayModified[21][20]).to.equal("0,0,0");

    });
    it("should not change the modified array to the original since no diff has been found", () => {

        let arrayPixel: string[][];
        let arrayOriginal: string[][];
        let arrayModified: string[][];

        arrayModified = [];
        arrayPixel = [];
        arrayOriginal = [];
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            arrayModified[i] = [];
            arrayPixel[i] = [];
            arrayOriginal[i] = [];
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
              arrayModified[i][j] =  "0,10,15";
              arrayPixel[i][j] = "20,0,0";
              arrayOriginal[i][j] = "0,0,0";
            }}

        diffService.allocate( arrayPixel, arrayOriginal, arrayModified);

        diffService.checkIfDifferent(20, 20, image7Diff);

        expect(diffService.arrayModified[21][20]).to.equal("0,10,15");

    });
    it("CheckArea should modify the image if differences are found", () => {

        let arrayPixel: string[][];
        let arrayOriginal: string[][];
        let arrayModified: string[][];

        arrayModified = [];
        arrayPixel = [];
        arrayOriginal = [];
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            arrayModified[i] = [];
            arrayPixel[i] = [];
            arrayOriginal[i] = [];
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
              arrayModified[i][j] =  "0,10,15";
              arrayPixel[i][j] = "20,10,20";
              arrayOriginal[i][j] = "0,2,0";
            }}

        diffService.allocate( arrayPixel, arrayOriginal, arrayModified);

        diffService.checkArea(20, 20);
        expect(diffService.arrayModified[21][20]).to.equal("0,10,15");

    });

    it("CheckArea should modify the image if differences are found", () => {

        let arrayPixel: string[][];
        let arrayOriginal: string[][];
        let arrayModified: string[][];

        arrayModified = [];
        arrayPixel = [];
        arrayOriginal = [];
        for (let i: number = 0; i < constants.SIMPLEVIEW_IMG_HEIGHT; i++) {
            arrayModified[i] = [];
            arrayPixel[i] = [];
            arrayOriginal[i] = [];
            for (let j: number = 0; j < constants.SIMPLEVIEW_IMG_WIDTH; j++) {
              arrayModified[i][j] =  "0,10,15";
              arrayPixel[i][j] = "0,0,0";
              arrayOriginal[i][j] = "0,2,0";
            }}

        diffService.allocate( arrayPixel, arrayOriginal, arrayModified);

        diffService.checkArea(20, 20);
        expect(diffService.arrayModified[21][20]).to.equal("0,2,0");

    });
});

});
