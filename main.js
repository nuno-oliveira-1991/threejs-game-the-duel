import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
// Adding a non-default loader (for external 3D models)
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Creating the scene - "the cube scene"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Creating a Mesh (a object with geometry and a material) - "the cube"

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5; // moving the camera away from the coordinates origin, the default position

// Web compatibility check for WebGL, a Javascript API for rendering graphics used with Three.js library

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}

// Creating the render or animate loop, the function that renders the scene on the html5 canvas

function animate() {
	requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();

/*
// Creating the scene - "the line scene"

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Creating a Mesh - "the line"

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const line = new THREE.Line( geometry, material );
scene.add( line );

// Creating the render or animate loop, the function that renders the scene on the html5 canvas

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}
animate();

*/


