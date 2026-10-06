import * as CANNON from "cannon-es";

export const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -40, 0),
});

export function step() {
  world.fixedStep();
}

export const trayMaterial = new CANNON.Material("tray");
export const pumpkinMaterial = new CANNON.Material("pumpkin");

world.addContactMaterial(
  new CANNON.ContactMaterial(trayMaterial, pumpkinMaterial, {
    friction: 0.4,
    restitution: 0.05,
  }),
);
