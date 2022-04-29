import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render ( scene, camera);

const geometry1 = new THREE.RingGeometry( 4, 4.5, 30, 14, 6.283185 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const ring1 = new THREE.Mesh( geometry1, material );

const geometry2 = new THREE.RingGeometry( 5, 5.5, 30, 14, 6.283185 );
const ring2 = new THREE.Mesh( geometry2, material );

scene.add(ring1,ring2);

const pointLight = new THREE.PointLight( 0xfffff );
pointLight.position.set( 5,5,5 );

const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add ( pointLight, ambientLight );
/*
const lightHelper = new THREE.PointLightHelper( pointLight );
const gridHelper = new THREE.GridHelper ( 200, 50 );
scene.add( lightHelper, gridHelper);
*/
const controls = new OrbitControls( camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial ( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [ x, y, z ] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 150 ) );

  star.position.set( x, y, z );
  scene.add(star)
  }

  Array(300).fill().forEach(addStar);

  const spaceTexture = new THREE.TextureLoader().load('space.jpg');
  scene.background = spaceTexture;

/*
const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial ( {map : jeffTexture } )
);

scene.add(jeff);
*/

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 34, 34),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);


function animate() {
  requestAnimationFrame ( animate );
  ring1.rotation.x += 0.01;
  ring1.rotation.y += 0.005;
  ring1.rotation.z += 0.01;

  ring2.rotation.x += 0.03;
  ring2.rotation.y += 0.008;
  ring2.rotation.z += 0.0;

  controls.update();

  renderer.render( scene, camera );
}


animate()
