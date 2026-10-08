import * as THREE from "three";
import * as CANNON from "cannon-es";

export function createGravestone(localPos: THREE.Vector3, rotY = 0) {
  // Gravestone Mesurement
  const gravestoneSize = { width: 1, height: 1, depth: 0.3 };

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
