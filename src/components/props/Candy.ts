import * as THREE from "three";
import * as CANNON from "cannon-es";

export const candys = [
  { i: 3, j: 6, rotY: Math.PI * 0.1 },
  { i: 4, j: 2, rotY: Math.PI * 0.7 },
  { i: 10, j: 3, rotY: Math.PI * 0.3 },
  { i: 5, j: 11, rotY: Math.PI * 0.4 },
  { i: 7, j: 7, rotY: Math.PI * 0.8 },
  { i: 10, j: 11, rotY: Math.PI * 0.1 },
];

export function createCandy(
  localPos: THREE.Vector3,
  rotY = 0,
  height = 0.25,
  depth = 0.25,
  tileSize: number,
) {
  // Candy Mesurement
  const candySize = { width: tileSize, height, depth };

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(candySize.width, candySize.height, candySize.depth),
    new THREE.MeshStandardMaterial({ color: 0xfff000 }),
  );

  mesh.position.copy(localPos);
  mesh.rotation.y = rotY;

  const orientation = new CANNON.Quaternion();
  orientation.setFromEuler(0, rotY, 0);

  const collisionShape = {
    halfExtents: new CANNON.Vec3(
      candySize.width / 2,
      candySize.height / 2,
      candySize.depth / 2,
    ),
    offset: new CANNON.Vec3(localPos.x, localPos.y, localPos.z),
    orientation: orientation,
  };

  return { mesh, collisionShape };
}
