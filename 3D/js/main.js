import '../../css/style.css';

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

//controller
const controls =  new OrbitControls(camera, renderer.domElement)

//licht
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);

// laat grid zien en waar light vandaan komt
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper);

//achtergrond
const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;

//bloem
const glftLoader = new GLTFLoader();
let bloem;

glftLoader.load("bloem.glb", (gltf) => {
  bloem = gltf.scene;
  bloem.rotation.x = 1.5;
  bloem.position.set(-1, 2, 20);

  scene.add(bloem);
})

//aarde
const aardeTexture = new THREE.TextureLoader().load('images/aarde.jpg')
const normalTexture = new THREE.TextureLoader().load('images/normal.jfif')

const aarde = new THREE.Mesh(
  new THREE.SphereGeometry(28, 32, 32),
  new THREE.MeshStandardMaterial({
    map: aardeTexture, 
    normalMap: normalTexture
  })
);

aarde.position.set(25, -50, -125);
scene.add(aarde)

//maak sterren
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.12, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFAE6})
  const star =  new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)


const beweegBloem = () => {
  let positie = window.scrollY;
  positie = positie/50;
  console.log(positie);
  if (bloem){  
    bloem.position.z = 20 - positie;
  }
}

document.body.onscroll = beweegBloem;
beweegBloem();


const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  aarde.rotation.y += 0.002;

  const elapsedTime = clock.getElapsedTime() * 0.2;
  scene.position.y = Math.sin(elapsedTime * 12) * 0.12;

  controls.update();

  renderer.render(scene, camera);
}

animate();