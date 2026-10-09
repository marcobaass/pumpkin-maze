import * as THREE from "three";
import * as CANNON from "cannon-es";
import { world, trayMaterial } from "../system/physics";
import { createGravestone, graves } from "./props/Gravestone";
import { BOARD_SIZE, TILES_COUNT } from "./config/BoardConfig";

export class Board {
  trayGroup = new THREE.Group();
  casingGroup = new THREE.Group();
  wallHeight = 0.5;
  wallThickness = 0.25;
  trayBody = new CANNON.Body({ type: CANNON.Body.KINEMATIC });
  casingBody = new CANNON.Body({ type: CANNON.Body.STATIC });

  constructor() {
    const size = BOARD_SIZE;
    const gap = 0.3;
    const color = 0x888888;
    const casingColor = 0x666666;
    const half = size / 2 + this.wallThickness / 2;

    this.createTray(size, color, half);
    this.placeGravestone(size);
    this.createCasing(size, gap, casingColor, half);
    this.trayBody.material = trayMaterial;
    this.casingBody.material = trayMaterial;
  }

  private createTray(size: number, color: number, half: number) {
    this.trayGroup.position.set(0, this.wallHeight, 0);
    this.trayBody.position.set(0, this.wallHeight, 0);

    const boardMaterial = new THREE.MeshStandardMaterial({ color });
    const wallMaterial = new THREE.MeshStandardMaterial({ color });

    // Floor Tiles visual
    const tilesCount = TILES_COUNT;
    const tileSize = size / tilesCount;

    for (let i = 0; i < tilesCount; i++) {
      for (let j = 0; j < tilesCount; j++) {
        const isGrave = graves.some((grave) => grave.i === i && grave.j === j);

        if (isGrave) {
          continue;
        }

        const tile = new THREE.Mesh(
          new THREE.PlaneGeometry(tileSize, tileSize),
          boardMaterial,
        );

        tile.position.set(
          i * tileSize - size / 2 + tileSize / 2,
          0,
          j * tileSize - size / 2 + tileSize / 2,
        );
        tile.rotation.x = -Math.PI / 2;
        this.trayGroup.add(tile);

        this.trayBody.addShape(
          new CANNON.Box(new CANNON.Vec3(tileSize / 2, 0.1, tileSize / 2)),
          new CANNON.Vec3(
            i * tileSize - size / 2 + tileSize / 2,
            0,
            j * tileSize - size / 2 + tileSize / 2,
          ),
        );
      }
    }

    // Walls (visual)
    const wallGeoZ = new THREE.BoxGeometry(
      size,
      this.wallHeight,
      this.wallThickness,
    );
    const wallGeoX = new THREE.BoxGeometry(
      size + this.wallThickness * 2,
      this.wallHeight,
      this.wallThickness,
    );

    const halfLengthZ = size / 2;
    const halfLengthX = (size + this.wallThickness * 2) / 2;

    const wallConfigs = [
      { geo: wallGeoZ, halfLength: halfLengthZ, x: 0, z: -half, rotY: 0 },
      { geo: wallGeoZ, halfLength: halfLengthZ, x: 0, z: half, rotY: 0 },
      {
        geo: wallGeoX,
        halfLength: halfLengthX,
        x: -half,
        z: 0,
        rotY: Math.PI / 2,
      },
      {
        geo: wallGeoX,
        halfLength: halfLengthX,
        x: half,
        z: 0,
        rotY: Math.PI / 2,
      },
    ];

    for (const { geo, halfLength, x, z, rotY } of wallConfigs) {
      // Visual wall
      const wall = new THREE.Mesh(geo, wallMaterial);
      wall.position.set(x, this.wallHeight / 2, z);
      wall.rotation.y = rotY;
      this.trayGroup.add(wall);

      // Physics wall
      const wallRotation = new CANNON.Quaternion();
      wallRotation.setFromEuler(0, rotY, 0);

      this.trayBody.addShape(
        new CANNON.Box(
          new CANNON.Vec3(
            halfLength,
            this.wallHeight / 2,
            this.wallThickness / 2,
          ),
        ),
        new CANNON.Vec3(x, this.wallHeight / 2, z),
        wallRotation,
      );
    }

    world.addBody(this.trayBody);
  }

  // Props
  private placeGravestone(size: number) {
    const tilesCount = TILES_COUNT;
    const tileSize = size / tilesCount;
    const gravestoneHeight = 0.75;

    for (const grave of graves) {
      let x = (grave.i + 0.5) * tileSize - size / 2;
      let z = (grave.j + 0.5) * tileSize - size / 2;
      const depth = 0.2;
      const dist = tileSize / 2;

      let rotY = 0;
      switch (grave.side) {
        case "n":
          z -= dist + depth / 2;
          rotY = 0;
          break;
        case "w": // -x
          x -= dist + depth / 2;
          rotY = Math.PI / 2;
          break;
      }

      const localPos = new THREE.Vector3(x, gravestoneHeight / 2, z);
      const stone = createGravestone(
        localPos,
        rotY,
        gravestoneHeight,
        depth,
        tileSize,
      );

      this.trayGroup.add(stone.mesh);
      this.trayBody.addShape(
        new CANNON.Box(stone.collisionShape.halfExtents),
        stone.collisionShape.offset,
        stone.collisionShape.orientation,
      );
    }
  }

  // Casing
  private createCasing(size: number, gap: number, color: number, half: number) {
    const casingHalfLengthZ = (size + this.wallThickness * 2 + gap * 2) / 2;
    const casingHalfLengthX = (size + this.wallThickness * 4 + gap * 2) / 2;
    const casingHalfHeight = (this.wallHeight * 4) / 2;
    const casingWallConfig = [
      {
        geo: new THREE.BoxGeometry(
          size + this.wallThickness * 2 + gap * 2,
          this.wallHeight * 4,
          this.wallThickness,
        ),
        halfLength: casingHalfLengthZ,
        x: 0,
        z: half + this.wallThickness + gap,
        rotY: 0,
      },
      {
        geo: new THREE.BoxGeometry(
          size + this.wallThickness * 4 + gap * 2,
          this.wallHeight * 4,
          this.wallThickness,
        ),
        halfLength: casingHalfLengthX,
        x: half + this.wallThickness + gap,
        z: 0,
        rotY: Math.PI / 2,
      },
      {
        geo: new THREE.BoxGeometry(
          size + this.wallThickness * 2 + gap * 2,
          this.wallHeight * 4,
          this.wallThickness,
        ),
        halfLength: casingHalfLengthZ,
        x: 0,
        z: -half - this.wallThickness - gap,
        rotY: Math.PI,
      },
      {
        geo: new THREE.BoxGeometry(
          size + this.wallThickness * 4 + gap * 2,
          this.wallHeight * 4,
          this.wallThickness,
        ),
        halfLength: casingHalfLengthX,
        x: -half - this.wallThickness - gap,
        z: 0,
        rotY: Math.PI / 2,
      },
    ];

    // Casing walls
    for (const { geo, halfLength, x, z, rotY } of casingWallConfig) {
      // Visual walls
      const wall = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({ color }),
      );
      wall.position.set(x, 0, z);
      wall.rotation.y = rotY;

      this.casingGroup.add(wall);

      // Physics walls

      const wallRotation = new CANNON.Quaternion();
      wallRotation.setFromEuler(0, rotY, 0);

      this.casingBody.addShape(
        new CANNON.Box(
          new CANNON.Vec3(halfLength, casingHalfHeight, this.wallThickness / 2),
        ),
        new CANNON.Vec3(x, 0, z),
        wallRotation,
      );
    }

    // Casing floor
    const casingFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshStandardMaterial({ color }),
    );
    casingFloor.position.set(0, -this.wallHeight / 2, 0);
    casingFloor.rotation.x = -Math.PI / 2;
    this.casingGroup.add(casingFloor);

    const casingFloorThickness = 0.1;
    this.casingBody.addShape(
      new CANNON.Box(
        new CANNON.Vec3(size / 2, casingFloorThickness / 2, size / 2),
      ),
      new CANNON.Vec3(0, -this.wallHeight / 2 - casingFloorThickness / 2, 0),
    );
    world.addBody(this.casingBody);
  }
}
