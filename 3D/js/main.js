import '../../css/style.css';

import * as THREE from 'three';

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';


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
const controls = new OrbitControls(camera, renderer.domElement)

//licht
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20, 20, 20)

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
  bloem.position.set(25, -50, -125);

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
  const material = new THREE.MeshStandardMaterial({
    color: 0xFFFAE6
  })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)


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


const observerText = new IntersectionObserver(entries => {
  // Loop over de text wrapper
  entries.forEach(entry => {
    const text = entry.target.querySelector('.text');
    // als het zichtbaar is doe dit
    if (entry.isIntersecting) {
      // voeg de animatie toe
      text.classList.add('text__transition');
      return; // na het toevoegen van de class, ga uit de functie
    }
    //als je de text niet meer ziet, verwijder de class
    text.classList.remove('text__transition');
  });
});

let target = '.text__wrapper';
document.querySelectorAll(target).forEach((i) => {
  if (i) {
    observerText.observe(i);
  }
});


const fadeOutOnScroll = (header, scroll) => {
  const titel = header[0];
  const down = scroll[0];

  let distanceToTop = window.pageYOffset + titel.getBoundingClientRect().top;
  let elementHeight = titel.offsetHeight;
  let scrollTop = document.documentElement.scrollTop;

  let opacity = 1;

  if (scrollTop > (distanceToTop - 175)) {
    opacity = 1 - (scrollTop - (distanceToTop - 175)) / elementHeight;
  }

  if (opacity >= 0) {
    titel.style.opacity = opacity;
    down.style.opacity = opacity;
  }

}

const scrollHandler = () => {
  fadeOutOnScroll(document.getElementsByClassName('titel'), document.getElementsByClassName('scroll'));

  let scrollTop = window.scrollY;
  let docHeight = document.querySelector('main').offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = scrollTop / (docHeight - winHeight);
  let scrollPercentRounded = Math.round(scrollPercent * 100);

  let targetX = 0;
  let targetY = 0;
  let targetZ = 15;

  let originX = 25;
  let originY = -50;
  let originZ = -125;

  const setPosition = (axis, origin, target) => {
    let distance;
    axis == "x" ? distance = origin + target : distance = origin - target;

    let step = distance / 100;
    if (bloem) {
      bloem.position[axis] = origin - step * scrollPercentRounded;
    }
  }

  setPosition('x', originX, targetX);
  setPosition('y', originY, targetY);
  setPosition('z', originZ, targetZ);

  let scale = scrollPercentRounded / 100;
  if (bloem) {
    bloem.scale.set(scale,scale,scale)
  }
  
}

window.addEventListener('scroll', scrollHandler);


const makePicture = () => {
  document.querySelector('main').style.background = "#FFFFFF";
  setTimeout(() => { 
    window.location.href = "plaatje.html";
  }, 1000);
}

let photo_icon = document.getElementById('photoIcon');

photo_icon.addEventListener("click", makePicture);


const scroll = document.getElementById("scroll");
let pageHeight = window.innerHeight;

scroll.onclick = () => {
    console.log("yo");
    window.scroll(0, pageHeight, 'smooth');
};