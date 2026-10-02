import * as THREE from "three";

export class Board {
  trayGroup = new THREE.Group();
  casingGroup = new THREE.Group();
  wallHeight = 0.5;
  wallThickness = 0.25;

  constructor() {
    const size = 10;
    const gap = 0.3;
    const color = 0x888888;
    const casingColor = 0x666666;
    const half = size / 2 + this.wallThickness / 2;

    this.createTray(size, color, half);
    this.createCasing(size, gap, casingColor, half);
  }

  private createTray(size: number, color: number, half: number) {
    const boardMaterial = new THREE.MeshStandardMaterial({ color });
    const wallMaterial = new THREE.MeshStandardMaterial({ color });

    // Floor
    const boardMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      boardMaterial,
    );
    boardMesh.rotation.x = -Math.PI / 2;
    this.trayGroup.add(boardMesh);

    // Two wall on x axis
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

    const wallConfigs = [
      { geo: wallGeoZ, x: 0, z: -half, rotY: 0 },
      { geo: wallGeoZ, x: 0, z: half, rotY: 0 },
      { geo: wallGeoX, x: -half, z: 0, rotY: Math.PI / 2 },
      { geo: wallGeoX, x: half, z: 0, rotY: Math.PI / 2 },
    ];

    for (const { geo, x, z, rotY } of wallConfigs) {
      const wall = new THREE.Mesh(geo, wallMaterial);
      wall.position.set(x, this.wallHeight / 2, z);
      wall.rotation.y = rotY;
      this.trayGroup.add(wall);
    }
    this.trayGroup.position.set(0, this.wallHeight * 2 - this.wallHeight, 0);
  }

  // Casing
  private createCasing(size: number, gap: number, color: number, half: number) {
    const casingWallConfig = [
      {
        geo: new THREE.BoxGeometry(
          size + this.wallThickness * 2 + gap * 2,
          this.wallHeight * 4,
          this.wallThickness,
        ),
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
        x: -half - this.wallThickness - gap,
        z: 0,
        rotY: Math.PI / 2,
      },
    ];

    for (const { geo, x, z, rotY } of casingWallConfig) {
      const wall = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({ color }),
      );
      wall.position.set(x, 0, z);
      wall.rotation.y = rotY;
      this.casingGroup.add(wall);
    }
  }
}
