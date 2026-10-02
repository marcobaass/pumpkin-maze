import * as THREE from "three";

export class Pumpkin {
  pumpkinSize: number = 0.25;
  pumpkinGeometry = new THREE.SphereGeometry(this.pumpkinSize, 32, 32);
  pumpkinMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  pumpkinMesh = new THREE.Mesh(this.pumpkinGeometry, this.pumpkinMaterial);

  constructor(wallHeight: number) {
    this.pumpkinMesh.position.set(0, wallHeight + this.pumpkinSize, 0);
  }
}
