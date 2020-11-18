import {expect} from "chai";
import * as THREE from "three";
import { ObjectsCreatorService } from "../../../client/src/app/threeJS/objectsCreator.service";
import { FreeDiffService } from "./FreeGameDiff.service";

export interface FreeGameDifference {
    diffTab: THREE.Object3D[];
    object: THREE.Object3D;
  }
describe("FreeDifferencesService", () => {
    let diffService: FreeDiffService;
    let freeGameDiffObj: FreeGameDifference;
    let objCreator: ObjectsCreatorService;

    beforeEach(() => { diffService = new FreeDiffService();
                       objCreator = new ObjectsCreatorService(); });
    describe("testing the function verifyDifference() in the micro-service", () => {
        it("should return true because the mesh is a difference", () => {
            const mesh: THREE.Object3D = new THREE.Object3D;
            // @ts-ignore
            mesh.object = objCreator.createCone();
            let diffTab: THREE.Object3D[];
            diffTab = [];
            diffTab.push(mesh);
            freeGameDiffObj = {diffTab: diffTab, object: mesh};
            expect(diffService.verifyDifference(freeGameDiffObj)).to.equal(true);
        });
        it("should return false because the mesh is not a difference", () => {
            const mesh: THREE.Object3D = new THREE.Object3D;
            // @ts-ignore
            mesh.object = objCreator.createCone();
            let diffTab: THREE.Object3D[];
            diffTab = [];
            freeGameDiffObj = {diffTab: diffTab, object: mesh};
            expect(diffService.verifyDifference(freeGameDiffObj)).to.equal(false);
        });
    });
});
