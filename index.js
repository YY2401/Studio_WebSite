// import * as THREE from 'https://cdn.skypack.dev/three@0.129.0'; 
import './lib/three.js';
import {OrbitControls} from './lib/OrbitControls.js';
import {GLTFLoader} from './lib/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/
window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//以下模型載入部分

const loader_FirstModel = new GLTFLoader();
loader_FirstModel.load('../obj/TestPlaneGL.glb',function(gltf){
  gltf.scene.traverse(function(child){
    child.name = "First_model";
    child.position.set(-1,-1,-1);
    child.scale.set(4,.5,4);
  })
  scene.add(gltf.scene);
},undefined,function(error){
  console.error(error);
});

const loader_SecondModel = new GLTFLoader();
loader_SecondModel.load('../obj/TestOBJAGL.glb',function(gltf){
  gltf.scene.traverse(function(child){
    child.name = "Second_Model";
    child.position.set(1,.5,1);
    child.scale.set(1,1,1);
  })
  scene.add(gltf.scene);
},undefined,function(error){
  console.error(error);
});

const loader_ThirdModel = new GLTFLoader();
loader_ThirdModel.load('../obj/TestOBJBGL.glb',function(gltf){
  gltf.scene.traverse(function(child){
    child.name = "Third_Model";
    child.position.set(2,.5,2);
    child.scale.set(1,1,1);
  })
  scene.add(gltf.scene);
},undefined,function(error){
  console.error(error);
});

const loader_ForthModel = new GLTFLoader();
loader_ForthModel.load('../obj/TestOBJCGL.glb',function(gltf){
  gltf.scene.traverse(function(child){
    child.name = "Forth_Model";
    child.position.set(-.2,.5,-.2);
    child.scale.set(1,1,1);
  })
  scene.add(gltf.scene);
},undefined,function(error){
  console.error(error);
});

//以上模型載入部分

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onMouseMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(pointer,camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if(intersects.length>0){
    var intersection = intersects[0];
    var obj = intersection.object;
    console.log("intersectionobj",obj.name);
    intersects[0].object.material.color.set(0xff0000);
    }
};
window.addEventListener('click',onMouseMove);

//區域環境光源
const controls = new OrbitControls(camera,renderer.domElement);
const light_1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
light_1.position.set(1, 3, 0);
scene.add(light_1);

const geometry = new THREE.SphereGeometry(1,32,32);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('starrysky.jpg');
const material = new THREE.MeshBasicMaterial({map:texture});
const sphere = new THREE.Mesh(geometry,material);
scene.add(sphere);
sphere.position.set(-2,1,0);

camera.position.z = 5;

function animate()
{
  sphere.rotation.x +=0.01;
  sphere.rotation.y +=0.01;
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene,camera);
}

animate();
