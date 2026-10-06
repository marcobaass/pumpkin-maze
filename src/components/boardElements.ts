import * as THREE from "three";
import * as CANNON from "cannon-es";
import { world, pumpkinMaterial } from "../system/physics";

export class Pumpkin {
  pumpkinSize: number = 0.25;
  pumpkinGeometry = new THREE.SphereGeometry(this.pumpkinSize, 32, 32);
  pumpkinMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  pumpkinMesh = new THREE.Mesh(this.pumpkinGeometry, this.pumpkinMaterial);
  body: CANNON.Body;

  constructor(wallHeight: number) {
    const y = wallHeight + this.pumpkinSize;
    this.pumpkinMesh.position.set(0, y, 0);

    this.body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Sphere(this.pumpkinSize),
      position: new CANNON.Vec3(0, y, 0),
      material: pumpkinMaterial,
      linearDamping: 0.35,
      angularDamping: 0.15,
    });
    world.addBody(this.body);
  }
}
