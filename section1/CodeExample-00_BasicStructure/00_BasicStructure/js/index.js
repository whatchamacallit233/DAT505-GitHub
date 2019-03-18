//Global variables
var scene, camera, renderer;
var geometry1, material1, mesh1;
var geometry2, material2, mesh2;


function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------

geometry1 = new THREE.IcosahedronBufferGeometry(80,1);
 material1 = new THREE.MeshBasicMaterial( { color: "#8470FF" } );
mesh1 = new THREE.Mesh( geometry1, material1 );
 mesh1.position.z = -1000;
  scene.add( mesh1);
//  geometry = new THREE.ConeGeometry(150, 150, 150);
  //material = new THREE.MeshBasicMaterial( { color: "#8470FF" } );
  //mesh = new THREE.Mesh( geometry, material );
  //mesh.position.z = -1000;

  //geometry2 = new THREE.IcosahedronBufferGeometry(100, 1);
  //material2 = new THREE.WireframeGeometry( { color: "#8470FF" } );
  //mesh2 = new THREE.Mesh( geometry, material );
  //mesh2.position.z = -100;
  // Add mesh to scene
  //scene.add( mesh );
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.x += 0.01; //Continuously rotate the mesh
  mesh.rotation.y += 0.01;

  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
