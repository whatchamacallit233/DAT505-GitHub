// -----------------------------------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene --------------------------
var scene = new THREE.Scene();

// Create a basic perspective camera --------------
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

// Create a renderer with Antialiasing ------------
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#9BCD9B");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// Configure lights -------------------------------
var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);
// ------------------------------------------------

// -----------------------------------------------------------------------------

// ------------------------------------------------
// Main Content
// ------------------------------------------------

//Create the first object ---------
var geometry1 = new THREE.BoxGeometry(100, 100, 100);
var material1 = new THREE.MeshPhongMaterial({
  color: 0xF3FFE2,
  specular: 0xffffff,
  shininess: 1000,
  lightMap: null,
  lightMapIntensity: 1,
  bumpMap: null,
  bumpScale: 1,
  normalMap: null,
  normalScale: 1,
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,
  specularMap: null
});

//Create the second object ---------
var geometry2 = new THREE.IcosahedronBufferGeometry(100, 1);
var material2 = new THREE.MeshLambertMaterial({
  color: '#D2BE82',
  lightMap: null,
  lightMapIntensity: 1,
  emissive: 0x000000,
  emissiveMap: null,
  emissiveIntensity: 1,
  specularMap: null,
  wireframe:true
});




//Create the third object ---------
var texture = new THREE.TextureLoader().load("texture2.jpg")
geometry3= new THREE.ConeGeometry(150, 150, 150);
material3 = new THREE.MeshBasicMaterial( { map:texture} );




var mesh1 = new THREE.Mesh( geometry1, material1 );
mesh1.position.z = -1000;
mesh1.position.x = -150;
mesh1.position.y = 200;


var mesh2 = new THREE.Mesh( geometry2, material2);
mesh2.position.z = -1000;
mesh2.position.x = 150;
mesh2.position.y = 200;


var mesh3 = new THREE.Mesh( geometry3, material3 );
mesh3.position.z = -1000;
mesh3.position.x = 0;
mesh3.position.y = -100;


// ------------------------------------------------

//Add mesh to scene

scene.add( mesh1 );

scene.add( mesh2 );

scene.add( mesh3 );


var rot = 0;

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  rot += 0.01;



  mesh1.rotation.x = rot; //Continuously rotate the mesh
  mesh1.rotation.y = rot;


  mesh2.rotation.x = rot+2; //Continuously rotate the mesh
  mesh2.rotation.y = rot+2;

  mesh3.rotation.x = rot+1; //Continuously rotate the mesh
  mesh3.rotation.y = rot+1;


  // Render the scene
  renderer.render(scene, camera);
};

render(); //Run the function render
