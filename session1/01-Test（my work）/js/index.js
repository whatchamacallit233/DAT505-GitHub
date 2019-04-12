//Global variables
var scene, camera, renderer;
var geometry, material, mesh;

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#B0E0E6");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a object---------
  geometry = new THREE.CylinderBufferGeometry(50, 50,200,50);
  material = new THREE.MeshLambertMaterial( { color: Math.random()* 0xFFFFFF,wireframe:true} );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh );
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.x += 0.01; //Continuously rotate the mesh
  mesh.rotation.y += 0.01;
  mesh.rotation.z+= 0.01;

  renderer.setClearColor("#B0E0E6");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
