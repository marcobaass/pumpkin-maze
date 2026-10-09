import * as THREE from "three";
import * as CANNON from "cannon-es";

export const graves = [
  { i: 3, j: 2, side: "n" as const },
  { i: 6, j: 5, side: "w" as const },
  { i: 7, j: 2, side: "n" as const },
  { i: 1, j: 9, side: "w" as const },
];

export function createGravestone(
  localPos: THREE.Vector3,
  rotY = 0,
  height = 0.75,
  depth = 0.2,
  tileSize: number,
) {
  // Gravestone Mesurement
  const gravestoneSize = { width: tileSize, height, depth };

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(
      gravestoneSize.width,
      gravestoneSize.height,
      gravestoneSize.depth,
    ),
    new THREE.MeshStandardMaterial({ color: 0x888888 }),
  );

  mesh.position.copy(localPos);
  mesh.rotation.y = rotY;

  const orientation = new CANNON.Quaternion();
  orientation.setFromEuler(0, rotY, 0);

  const collisionShape = {
    halfExtents: new CANNON.Vec3(
      gravestoneSize.width / 2,
      gravestoneSize.height / 2,
      gravestoneSize.depth / 2,
    ),
    offset: new CANNON.Vec3(localPos.x, localPos.y, localPos.z),
    orientation: orientation,
  };

  return { mesh, collisionShape };
}
