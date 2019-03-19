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
renderer.setClearColor("#5A8296");

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

// Create a Cube Mesh with basic material ---------
//var geometry1 = new THREE.BoxGeometry(100, 100, 100);


 //MATERIAL 1:
//var material1 = new THREE.MeshBasicMaterial( { color: "#433F81" } );

//MATERIAL 2:
//var material2 = new THREE.MeshNormalMaterial();

//MATERIAL 3:
//var geometry2 =new THREE.SphereGeometry(100, 100, 100);

var material2 =
new THREE.MeshLambertMaterial({
  color: "#433F81",
  transparent: true,
  opacity: 1
});


//MATERIAL 4:
//var material = new THREE.MeshPhongMaterial({shininess: 1});

//MATERIAL 5 (non-shiny material):

var material3 = new THREE.MeshDepthMaterial({
  color: '#D2BE82',
  lightMap: null,
  lightMapIntensity: 1,
  emissive: 0x000000,
  emissiveMap: null,
  emissiveIntensity: 1,
  specularMap: null
});

// Create a Cube Mesh with basic material ---------
//var texture = new THREE.TextureLoader().load("texture.jpg");

//var material4 = new THREE.MeshBasicMaterial( {
//map:texture} );

//var material = new THREE.MeshNormalMaterial();


var texture = new THREE.TextureLoader().load("texture3.jpg")
geometry9= new THREE.ConeGeometry(150, 150, 150);
/*mesh5 = new THREE.Mesh( geometry5, material5 );
 mesh5.position.z = -1000;*/

 geometry2 = new THREE.IcosahedronBufferGeometry(100, 1);
material2 = new THREE.MeshPhongMaterial( { map:texture} );
 mesh2 = new THREE.Mesh( geometry2, material2 );
 mesh2.position.z = 30;

 scene.add( mesh2 );

//var geometry 9=new THREE.TorusBufferGeometry(10,1,4,25)
//MATERIAL 6 (shiny material):
var material 9 = new THREE.MeshPhongMaterial({
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
var mesh9 = new THREE.Mesh( geometry9, material9 );
mesh4.position.z = 0;
mesh4.position.x = 30;
mesh4.position.y =100;<div id="info"><a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - buffer geometry constructed from geometry - by <a target="_blank" href="http://callum.com">Callum Prentice</a></div>



			createScene();
			stats = new Stats();
			document.body.appendChild( stats.dom );
			window.addEventListener( 'resize', onWindowResize, false );
		}
		function createGeometry() {
			var heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths
			var x = 0, y = 0;
			heartShape.moveTo( x + 25, y + 25 );
			heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
			heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35, x - 30, y + 35 );
			heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
			heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
			heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
			heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
			var extrudeSettings = {
				depth: 16,
				bevelEnabled: true,
				bevelSegments: 1,
				steps: 2,
				bevelSize: 1,
				bevelThickness: 1
			};
			var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
			geometry.rotateX( Math.PI );
			geometry.scale( 0.4, 0.4, 0.4 );
			return geometry;
		}
		function createScene() {
			var bufferGeometry = new THREE.BufferGeometry();
			var radius = 125;
			var count = 80;
			var positions = [];
			var normals = [];
			var colors = [];
			var vector = new THREE.Vector3();
			var color = new THREE.Color( 0xffffff );
			var heartGeometry = createGeometry();
			var geometry = new THREE.Geometry();
			for ( var i = 1, l = count; i <= l; i ++ ) {
				var phi = Math.acos( - 1 + ( 2 * i ) / l );
				var theta = Math.sqrt( l * Math.PI ) * phi;
				vector.setFromSphericalCoords( radius, phi, theta );
				geometry.copy( heartGeometry );
				geometry.lookAt( vector );
				geometry.translate( vector.x, vector.y, vector.z );
				color.setHSL( ( i / l ), 1.0, 0.7 );
				geometry.faces.forEach( function ( face ) {
					positions.push( geometry.vertices[ face.a ].x );
					positions.push( geometry.vertices[ face.a ].y );
					positions.push( geometry.vertices[ face.a ].z );
					positions.push( geometry.vertices[ face.b ].x );
					positions.push( geometry.vertices[ face.b ].y );
					positions.push( geometry.vertices[ face.b ].z );
					positions.push( geometry.vertices[ face.c ].x );
					positions.push( geometry.vertices[ face.c ].y );
					positions.push( geometry.vertices[ face.c ].z );
					normals.push( face.normal.x );
					normals.push( face.normal.y );
					normals.push( face.normal.z );
					normals.push( face.normal.x );
					normals.push( face.normal.y );
					normals.push( face.normal.z );
					normals.push( face.normal.x );
					normals.push( face.normal.y );
					normals.push( face.normal.z );
					colors.push( color.r );
					colors.push( color.g );
					colors.push( color.b );
					colors.push( color.r );
					colors.push( color.g );
					colors.push( color.b );
					colors.push( color.r );
					colors.push( color.g );
					colors.push( color.b );
				} );
			}
			bufferGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
			bufferGeometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
			bufferGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
			var material = new THREE.MeshPhongMaterial( { shininess: 80, vertexColors: THREE.VertexColors } );
			var mesh = new THREE.Mesh( bufferGeometry, material );
			scene.add( mesh );

/*
//MATERIAL 6 (combination of shiny + non-shinny):
var material = new THREE.MeshStandardMaterial({
  color: 0xF3FFE2,
  roughness: 0.5,
  metalness: 0.5
});
*/

/*
//MATERIAL 7 (physical-based material)
var material = new THREE.MeshPhysicalMaterial({
  color: 0xF3FFE2,
  roughness: 0,
  metalness: 0.5,
  reflectivity: 0.5,
  clearCoat: 0,
  claerCoatRoughness: 0
});
*/

/*var mesh1 = new THREE.Mesh( geometry, material1 );
mesh1.position.z = -1000;
mesh1.position.y = 100;*/

/*var mesh2 = new THREE.Mesh( geometry1, material1 );
mesh2.position.z = -1000;
mesh2.position.x = -100;
mesh2.position.y = 200;*/

/*var mesh3 = new THREE.Mesh( geometry, material3 );
mesh3.position.z = -1000;
mesh3.position.x = -200;
mesh3.position.y = 100;*/

var mesh4 = new THREE.Mesh( geometry2, material3 );
mesh4.position.z = 30;
mesh4.position.x = 30;
mesh4.position.y =100;

/*.position.z = -1000;
mesh5.position.x = 200;
mesh5.position.y = 100;*/

/*var mesh6 = new THREE.Mesh( geometry5, material5 );
mesh6.position.z = -1000;
mesh6.position.x = 0;
mesh6.position.y = -100;*/

/*var mesh7 = new THREE.Mesh( geometry, material1 );
mesh7.position.z = -1000;
mesh7.position.x = -100;
mesh7.position.y = 0;

var mesh8 = new THREE.Mesh( geometry, material2 );
mesh8.position.z = -1000;
mesh8.position.x = -200;
mesh8.position.y = -100;

var mesh9 = new THREE.Mesh( geometry, material1 );
mesh9.position.z = -1000;
mesh9.position.x = 100;
mesh9.position.y = 0;

var mesh10 = new THREE.Mesh( geometry, material4 );
mesh10.position.z = -1000;
mesh10.position.x = 200;
mesh10.position.y = -100;

var mesh11 = new THREE.Mesh( geometry, material4 );
mesh11.position.z = -1000;
mesh11.position.x = -100;
mesh11.position.y = -200;

var mesh12 = new THREE.Mesh( geometry, material4 );
mesh12.position.z = -1000;
mesh12.position.x = 100;
mesh12.position.y = -200;*/

// ------------------------------------------------

//Add mesh to scene
//scene.add( mesh1 );
//scene.add( mesh2 );
//scene.add( mesh3 );
scene.add( mesh4 );
//scene.add( mesh5 );
//scene.add( mesh6 );
/*scene.add( mesh7 );
scene.add( mesh8 );*/
scene.add( mesh9 );
/*scene.add( mesh10 );
scene.add( mesh11 );
scene.add( mesh12 );*/

var rot = 0;

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  rot += 0.01;

  /*mesh1.rotation.x = rot+1; //Continuously rotate the mesh
  mesh1.rotation.y = rot+1;*/

//  mesh2.rotation.x = rot; //Continuously rotate the mesh
  //mesh2.rotation.y = rot;

  //mesh3.rotation.x = rot+2; //Continuously rotate the mesh
//  mesh3.rotation.y = rot+2;

  mesh4.rotation.x = rot; //Continuously rotate the mesh
  mesh4.rotation.y = rot;

//  mesh5.rotation.x = rot+2; //Continuously rotate the mesh
  //mesh5.rotation.y = rot+2;

  //mesh6.rotation.x = rot+1; //Continuously rotate the mesh
  //mesh6.rotation.y = rot+1;

  /*mesh7.rotation.x = rot; //Continuously rotate the mesh
  mesh7.rotation.y = rot;

  mesh8.rotation.x = rot+2; //Continuously rotate the mesh
  mesh8.rotation.y = rot+2;*/

  mesh9.rotation.x = rot; //Continuously rotate the mesh
  mesh9.rotation.y = rot;

/*  mesh10.rotation.x = rot+2; //Continuously rotate the mesh
  mesh10.rotation.y = rot+2;

  mesh11.rotation.x = rot; //Continuously rotate the mesh
  mesh11.rotation.y = rot;

  mesh12.rotation.x = rot; //Continuously rotate the mesh
  mesh12.rotation.y = rot;*/

  // Render the scene
  renderer.render(scene, camera);
};

render(); //Run the function render
