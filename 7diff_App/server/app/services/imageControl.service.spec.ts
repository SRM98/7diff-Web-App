import {expect} from "chai";
import {readFileSync} from "fs";
import "reflect-metadata";
import { DifferencesService } from "./differences.service";
import {ImageService} from "./image.service";

import { Converter } from "../converter";
import { ImageControlService } from "./imageControl.service";

describe("imageControlService", () => {
    let service: ImageService;
    let imageControl: ImageControlService;
    // tslint:disable-next-line:prefer-const
    let diffService: DifferencesService;
    const converter: Converter = new Converter();

    beforeEach(() => {
        service = new ImageService();
        imageControl = new ImageControlService(diffService, service); });

    it("Should allocate the arrays correctly", () => {
        // tslint:disable-next-line:deprecation
        const image7Diff: Buffer = new Buffer(readFileSync("app/Bmp/carre2.bmp"));
        // tslint:disable-next-line:deprecation
        const imageOriginal: Buffer = new Buffer(readFileSync("app/Bmp/carre.bmp"));
        const fileOri: string = converter.imgToBase64("", image7Diff);
        const fileDiff: string = converter.imgToBase64("", imageOriginal);
        imageControl.readHeader(fileOri, fileDiff);
        expect(service.arrayOriginal[0][0]).to.equal("255,255,255");

    });
});
