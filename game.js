// game.js - Full 3D game logic
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

let scene, camera, renderer, player;
let isMobile = 'ontouchstart' in window;
let isVR = navigator.xr;

function init() {
  scene = new THREE.Scene();

  // Huge colorful ground
  const groundGeo = new THREE.PlaneGeometry(500, 500, 32, 32);
  const groundMat = new THREE.MeshPhongMaterial({ color: 0x3399ff });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Sky color
  scene.background = new THREE.Color(0x87ceeb);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 50, 10);
  scene.add(light);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 5);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
  renderer.setSize(window.innerWidth, window.innerHeight);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.onload = init;
