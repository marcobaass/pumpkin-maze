import "./style.css";
import * as THREE from "three";
import { Board } from "./components/Board";
import { Pumpkin } from "./components/boardElements";
import { cursor } from "./system/input";

const app = document.querySelector<HTMLDivElement>("#app")!;
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// Lights (placeholder)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Orthographic camera (isometric-ish framing)
const frustumSize = 13;
const aspect = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  (-frustumSize * aspect) / 2,
  (frustumSize * aspect) / 2,
  frustumSize / 2,
  -frustumSize / 2,
  0.1,
  100,
);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// Board
const board = new Board();
console.log(board);

scene.add(board.trayGroup);
scene.add(board.casingGroup);

// Pumpkin
const pumpkin = new Pumpkin(board.wallHeight);
scene.add(pumpkin.pumpkinMesh);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.appendChild(renderer.domElement);

// Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  const aspect = sizes.width / sizes.height;
  camera.left = (-frustumSize * aspect) / 2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Loop
const maxTilt = 0.25;

const tick = () => {
  const tiltX = (cursor.x - cursor.y) * maxTilt;
  const tiltZ = (cursor.x + cursor.y) * maxTilt;

  board.trayGroup.rotation.x = tiltX;
  board.trayGroup.rotation.z = tiltZ;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
