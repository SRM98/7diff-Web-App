import {expect} from "chai";
import {Converter} from "./converter";

describe("differencesService", () => {
    const converter: Converter = new Converter();
    it("imgToBase64 should return the given name when given an unvalid path", () => {
        expect(converter.imgToBase64("bonjour", Buffer.from(""))).to.equal("bonjour");
    });
});
