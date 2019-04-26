//Global variables
var scene, camera, renderer,controller;
var Bplace  = [];//make the object clickable
var color,grass;
//GUI - Declare variable
var gui = null;


//Create water drops
var drops = [];
var count = 0;
var geometry = new THREE.BoxGeometry(.1, .1, .1);
// Load a texture
var texturew =  new THREE.TextureLoader().load( "texture/texture.jpg" );
var material_river = new THREE.MeshLambertMaterial({ map:texturew });

var drop = new THREE.Mesh(geometry, material_river);

// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();

// create a global audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();


init();

function init() {



  // Create an empty scene ------------
  scene = new THREE.Scene();

  //create a camera-------
  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, .1, 1000);
  camera.position.set(-6, 1, 15);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  //Audio - Settings
    camera.add( listener );

  var raycaster = new THREE.Raycaster();
  // Create a renderer-------
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

  // Configure renderer clear color----
  renderer.setClearColor("#E5C1CD");

  // Configure renderer size----
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //add new controls:
  controls = new THREE.OrbitControls(camera, renderer.domElement)
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);



  //Ambient light
  var light = new THREE.AmbientLight(0xffffff, .5);

  var shadowLight = new THREE.DirectionalLight(0xffffff, .5);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;

  var backLight = new THREE.DirectionalLight(0xffffff, .2);
  backLight.position.set(-100, 200, 50);
  backLight.castShadow = true;
  // Add light to scene
  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);

  //grassland
  color = Math.random() * 0xffffff;
  var material_grass = new THREE.MeshLambertMaterial({ color: color,
  transparent: true   });
  // grassland left
  var geometry_left = new THREE.BoxGeometry(2.5, .2, 6);
  var ground_left = new THREE.Mesh(geometry_left, material_grass);
  ground_left.position.set(-1.2, 0.1, -1.9);
  scene.add(ground_left);
  //give shadow to left
  customizeShadow(ground_left, .25)

  //grassland right
  var geometry_right = new THREE.BoxGeometry(2, .2, 6);
  var ground_right = new THREE.Mesh(geometry_right, material_grass);
  ground_right.position.set(2, 0.1, -1.9);
  scene.add(ground_right);
  //give shadow to right
  customizeShadow(ground_right, .25) // mess, opacity


  //bridge
  var texture= new THREE.TextureLoader().load( "texture/textureBridge.jpg" );
  var material_wood = new THREE.MeshBasicMaterial( {map:texture});
  //bridge - wood block
  var geometry_block = new THREE.BoxGeometry(1.2, .02, .4);
  var block = new THREE.Mesh(geometry_block, material_wood);
  block.position.set(0.5, .21, 0.2);
  block.castShadow = true;
  block.receiveShadow = true;
  scene.add(block);

  //bridge - 6 rails
  var geometry_rail_v = new THREE.BoxGeometry(.04, .3, .04);
  var rail_1 = new THREE.Mesh(geometry_rail_v, material_wood);
  rail_1.position.set(-.1, .35, .4);
  rail_1.castShadow = true;
  customizeShadow(rail_1, .2);
  scene.add(rail_1);

  var rail_2 = new THREE.Mesh(geometry_rail_v, material_wood);
  rail_2.position.set(1.1, .35, .4);
  rail_2.castShadow = true;
  customizeShadow(rail_2, .2);
  scene.add(rail_2);

  var rail_3 = new THREE.Mesh(geometry_rail_v, material_wood);
  rail_3.position.set(-.1, .35, 0);
  rail_3.castShadow = true;
  customizeShadow(rail_3, .2);
  scene.add(rail_3);

  var rail_4 = new THREE.Mesh(geometry_rail_v, material_wood);
  rail_4.position.set(1.1, .35, 0);
  rail_4.castShadow = true;
  customizeShadow(rail_4, .2);
  scene.add(rail_4);

  var geometry_rail_h = new THREE.BoxGeometry(1.2, .04, .04);
  var rail_h1 = new THREE.Mesh(geometry_rail_h, material_wood);
  rail_h1.position.set(0.5, .42, .4);
  rail_h1.castShadow = true;
  customizeShadow(rail_h1, .2);
  scene.add(rail_h1);

  var rail_h2 = new THREE.Mesh(geometry_rail_h, material_wood);
  rail_h2.position.set(0.5, .42, 0);
  rail_h2.castShadow = true;
  customizeShadow(rail_h2, .2);
  scene.add(rail_h2);

  //collect them as a bridge group
  var group = new THREE.Group();
  group.add(block);
  group.add(rail_1);
  group.add(rail_2);
  group.add(rail_3);
  group.add(rail_4);
  group.add(rail_h1);
  group.add(rail_h2);
  scene.add(group);

  //set tree as the combination of trunk and leaves
  var tree = function (x, z) {
    tree.x = x;
    tree.z = z;

    //trunk
    var material_trunk = new THREE.MeshLambertMaterial({ color: 0x9A6169 });
    var geometry_trunk = new THREE.BoxGeometry(.15, .15, .15);
    var trunk = new THREE.Mesh(geometry_trunk, material_trunk);
    trunk.position.set(tree.x, .275, tree.z);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    scene.add(trunk);

    //leaves
    var geometry_leaves = new THREE.BoxGeometry(.25, .4, .25);
    //Generate a random number from 1 to 3
    var randomSelection=Math.round(Math.random()*4+1);
    // Load a texture
   var texture = new THREE.TextureLoader().load( "texture/texture"+randomSelection+".jpg" );
	// Create a MeshBasicMaterial with a loaded texture
    var material_leaves = new THREE.MeshBasicMaterial({map: texture});
    var leaves = new THREE.Mesh(geometry_leaves, material_leaves);
    leaves.position.set(tree.x, .2 + .15 + .4 / 2, tree.z);
    leaves.castShadow = true;
    customizeShadow(leaves, .25) // mess, opacity
    scene.add(leaves);
  }


  //make the number of trees on 2 sides the same and set random position for trees in each side
   for (var x = -3; x <= 40; x += 1) {
    if (x <= 20) {
   tree(Math.random() *1.7 -1.9 , Math.random() * -3);//set trees on the left side
    }
    else {
  tree(Math.random() * 1.7 + 1.2, Math.random() * -3);//set trees on the right side
    }
  }


  //give shadow to trees
  function customizeShadow(t, a) { //opacity, target mesh
    var material_shadow = new THREE.ShadowMaterial({ opacity: a });
    var mesh_shadow = new THREE.Mesh(t.geometry, material_shadow);
    mesh_shadow.position.set(t.position.x, t.position.y, t.position.z);
    mesh_shadow.receiveShadow = true;
    scene.add(mesh_shadow);
  }

  //river
  var geometry_river = new THREE.BoxGeometry(1, .1, 6);
  // Load a texture
  var texture =  new THREE.TextureLoader().load( "texture/texture.jpg" );
  var material_river = new THREE.MeshLambertMaterial({ map:texture });
  var river = new THREE.Mesh(geometry_river, material_river);
  river.position.set(.5, .1, -2);
  scene.add(river);
  //give shadow to river
  customizeShadow(river, .08) // mess, opacity

  audioLoader.load( 'audio/water.wav', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.6 );
        sound.play();

      });
  //add controller values for GUI
  controller = new function () {

    this.scaleY = 1;
    this.scaleZ = 1;

    this.positionZ = -1;
    this.BridgescaleZ = 1;

    this.waterLength = 10;
    this.waterSpeed = 0.01;

    this.groundColor = color;
    this.Opacity = 1;

  };
  //Create a new DAT.GUI
  var gui = new dat.GUI();

  var f1 = gui.addFolder('Land Scale');
  var f2 = gui.addFolder('Bridge Position');
  var f3 = gui.addFolder('water Center');

  f1.add(controller, 'scaleY', 0, 1).onChange(function () {
    ground_left.scale.y = ground_right.scale.y = (controller.scaleY)
  });
  f1.add(controller, 'scaleZ', 0.7, 1.2).onChange(function () {
    ground_left.scale.z = ground_right.scale.z = (controller.scaleZ)
  });

  f2.add(controller, 'positionZ', -4, -0.5).onChange(function () {
    group.position.z = (controller.positionZ)
  });
  f2.add(controller, 'BridgescaleZ', 0.5, 2.5).onChange(function () {
    group.scale.z = (controller.BridgescaleZ)
  });

  f3.add(controller, 'waterLength', 10, 50).onChange(function () {
    for (var i = 0; i <  drops.length; i++) {
      drops[i].speed = controller.waterLength;
    }
  });
  f3.add(controller, 'waterSpeed', 0, .07).onChange(function () {
    for (var i = 0; i <  drops.length; i++) {
      drops[i].speed = controller.waterSpeed;
    }
  });
  //add color controller for grassland
  gui.addColor( controller, 'groundColor', color ).onChange( function() {
  ground_left.material.color.setHex( dec2hex(controller.groundColor) );
    });

  gui.add( controller, 'Opacity', 0.1, 1 ).onChange( function() {
    material_grass.opacity = (controller.Opacity);
    });


    //sky
    //function skyBox() {
var path = "skyboxing/";
var urls = [ path + "px.jpg", path + "nx.jpg",
					  path + "py.jpg", path + "ny.jpg",
					 	path + "pz.jpg", path + "nz.jpg" ];

var  textureCube1 = new THREE.CubeTextureLoader().load( urls );
		 scene.background = textureCube1;

}

//Color converter
function dec2hex(i) {
  var result = "0x000000";
  if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
  else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
  else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
  else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
  else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
  else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
  if (result.length == 8){return result;}
}





//waterfall
var Drop = function (waterLength,waterSpeed) {
  this.geometry = new THREE.BoxGeometry(.1, .1, .1);
  this.drop = new THREE.Mesh(this.geometry, material_river);
  //Create random values for drop x and z
  this.drop.position.set(Math.random(.1, .9), 0.1, 1 + (Math.random() - .5) * .1);
  this.speed = waterSpeed;
  //the length of waterfall
  this.lifespan = (Math.random()*Math.round(waterLength)+50);
  //update them drop from different position in different speed
  this.update = function () {
    this.speed += .0007;
    this.lifespan--;
    this.drop.position.x += (.5 - this.drop.position.x) / 70;
    this.drop.position.y -= this.speed;
  }
  scene.add(this.drop);
}


//add water drop animation function
var render = function () {
  requestAnimationFrame(render);
if (count % 3 == 0) {
    for (var i = 0; i < 5; i++) {
      drops.push(new Drop(controller.waterLength,controller.waterSpeed));
    }
}
count++;
for (var i = 0; i < drops.length; i++) {
    drops[i].update();
    if (drops[i].lifespan < 0) {
      scene.remove(scene.getObjectById(drops[i].drop.id));
      drops.splice(i, 1);
    }
}
  renderer.render(scene, camera);
}


var loadClouds = function (){
  //create a clickable ground,and set it invisible
  var geometry_bgGround = new THREE.PlaneGeometry(5,5.8);
  var material_bgGround = new THREE.MeshBasicMaterial({visible:false});
	var bgGround = new THREE.Mesh(geometry_bgGround,material_bgGround);

	//set the rotation and position
	bgGround.rotation.x = -Math.PI/2//make it parallel to the ground
	bgGround.position.y = 2
	bgGround.position.z = -1.5
	scene.add(bgGround)
  //make the bgGround clickable
	Bplace.push(bgGround)

  // Model loading
	var fbxLoader = new THREE.FBXLoader();
	fbxLoader.load('model/file.fbx', function(object){

		var models = object;

		models.scale.set(.085,.075,.075)
    //set color for Clouds
		models.children[0].children[0].material.color = new THREE.Color(0XB0E2FF)


		//scene.add(models)

		rayBreathing(models)
	})

 }
 loadClouds()
   function rayBreathing(obj) {
				document.addEventListener('click', ray);

				function ray() {

					var Sx = event.clientX;
					var Sy = event.clientY;
					//transform screen coordinate to standardVector
					var x = (Sx / window.innerWidth) * 2 - 1;
					var y = -(Sy / window.innerHeight) * 2 + 1;
					var standardVector = new THREE.Vector3(x, y, 0.5);
					//transform standardVector to worldVector
					var worldVector = standardVector.unproject(camera);
					//set ray(worldVector subtract camera position)
					var ray = worldVector.sub(camera.position).normalize();
					//set raycaster
					var raycaster = new THREE.Raycaster(camera.position, ray);
					//the object which is affected by raycaster
					var intersects = raycaster.intersectObjects(Bplace); //Bplace

					if(intersects.length > 0) {

						var bone = intersects[0]
						var name = bone.name

						var nowModel = obj.clone();
						nowModel.receiveShadow = true;
						nowModel.castShadow = true
						nowModel.position.copy(bone.point)
						scene.add(nowModel)
					}
				}
			}

render();
