import * as THREE from "three";
import * as constants from "../../../../common/constants";

export interface Member {
  geometryParam: number[];
  materialParam: number;
  meshPosition: number[];
  meshRotation: number[];
  isModifiable: boolean;
}

export abstract class Animal {
  protected scale: number;
  protected orientation: number;
  protected textureColor: number;
  protected group: THREE.Group;
  protected modifiableMeshes: THREE.Mesh[];
  protected constantMeshes: THREE.Mesh[];

  protected constructor() {
    this.scale = Math.random() + constants.MIN_SCALE;
    this.textureColor = Math.random() * constants.WHITE_HEX;
    // tslint:disable-next-line: no-magic-numbers
    this.orientation = Math.random() * 2 * Math.PI;
    this.group = new THREE.Group;
    this.constantMeshes = [];
    this.modifiableMeshes = [];
    this.createModifiableMembers();
    this.createConstantMembers();
  }

  protected updateGroup(): void {
    const tempPosX: number = this.group.position.x.valueOf();
    const tempPosZ: number = this.group.position.z.valueOf();
    this.group = new THREE.Group;
    for (const mesh of this.modifiableMeshes) {
      this.group.add(mesh);
    }
    for (const mesh of this.constantMeshes) {
      this.group.add(mesh);
    }
    this.group.rotation.set(0, this.orientation, 0);
    this.group.position.set(tempPosX, 0, tempPosZ);
  }

  public setNewColor(newColor: number): void {
    this.textureColor = newColor;
    for (const mesh of this.modifiableMeshes) {
      // @ts-ignore because it doesn't recognize "material.color"
      mesh.material.color.setHex(newColor);
    }
    this.updateGroup();
  }

  public setVisibility(visibility: boolean): void {
    for (const mesh of this.modifiableMeshes) {
      // @ts-ignore because it doesn't recognize "material.visible"
      mesh.material.visible = visibility;
    }
    for (const mesh of this.constantMeshes) {
      // @ts-ignore because it doesn't recognize "material.visible"
      mesh.material.visible = visibility;
    }
    this.updateGroup();
  }

  public getColor(): number {
    return this.textureColor;
  }

  public getScale(): number {
    return this.scale;
  }

  public getGroup(): THREE.Group {
    return this.group;
  }

  public generateAnimalGroup(): THREE.Group {
    this.updateGroup();
    this.group.rotation.set(0, this.orientation, 0);

    return this.group;
  }

  public createMembers(memberParams: Member): void {
    let geometry: THREE.BoxBufferGeometry;
    let material: THREE.MeshPhongMaterial;
    let mesh: THREE.Mesh;
    geometry = new THREE.BoxBufferGeometry(memberParams.geometryParam[0] * this.scale,
                                           memberParams.geometryParam[1] * this.scale,
                                            // tslint:disable-next-line: no-magic-numbers
                                           memberParams.geometryParam[2] * this.scale);
    material = new THREE.MeshPhongMaterial({color: memberParams.materialParam});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(memberParams.meshPosition[0] * this.scale,
                      memberParams.meshPosition[1] * this.scale,
                      // tslint:disable-next-line: no-magic-numbers
                      memberParams.meshPosition[2] * this.scale);
    mesh.rotation.set(memberParams.meshRotation[0],
                      memberParams.meshRotation[1],
                      // tslint:disable-next-line: no-magic-numbers
                      memberParams.meshRotation[2]);
    if (memberParams.isModifiable) {
      this.modifiableMeshes.push(mesh);
    } else {
      this.constantMeshes.push(mesh);
    }
  }
  protected abstract createConstantMembers(): void;
  protected abstract createModifiableMembers(): void;
}
