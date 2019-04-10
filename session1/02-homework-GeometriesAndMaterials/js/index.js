//Global variables
var scene, camera, renderer;
var geometry1, material1, mesh1;
var geometry2, material2, mesh2;
var geometry3, material3, mesh3;

var cubes=[];

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#9999FF");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a IcosahedronBufferGeometry inside---------

geometry1 = new THREE.IcosahedronBufferGeometry(70,1);
 material1 = new THREE.MeshNormalMaterial( { color: "#8470FF" } );
mesh1 = new THREE.Mesh( geometry1, material1 );
 mesh1.position.z = -1000;
  cubes.push(mesh1);
  scene.add( mesh1);

/* geometry1 = new THREE.ConeGeometry(150, 150, 150);
  material1 = new THREE.MeshBasicMaterial( { color: "#FFFFFF" } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  mesh1.position.z = -1000;*/

// Create a IcosahedronBufferGeometry wireframe 0utside---------
  geometry2 = new THREE.IcosahedronBufferGeometry(100, 1);
  material2 = new THREE.MeshBasicMaterial( { color: Math.random()*0xFFFFFF,wireframe:true } );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.z = -1000;
  // Add mesh to scene
  cubes.push(mesh2);
  scene.add( mesh2 );

  geometry3 = new THREE.IcosahedronBufferGeometry(150, 1);
  material3 = new THREE.MeshNormalMaterial( { color: Math.random()*0xFFFFFF,wireframe:true } );
  mesh3 = new THREE.Mesh( geometry3, material3 );
  mesh3.position.z = -1000;
  // Add mesh to scene
  cubes.push(mesh3);
  scene.add( mesh3 );
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

mesh1.rotation.x += 0.5; //Continuously rotate the mesh
 mesh1.rotation.y += 0.5;
 mesh2.rotation.x += 0.3; //Continuously rotate the mesh
  mesh2.rotation.y += 0.3;
  mesh3.rotation.x += 0.2; //Continuously rotate the mesh
   mesh3.rotation.y += 0.2;

  renderer.setClearColor("#9999FF");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
