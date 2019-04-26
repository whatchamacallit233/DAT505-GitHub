# B161006068 Xiaowei Ji
my github link:https://github.com/whatchamacallit233/DAT505-GitHub
## files:
* ##### '4 images  of final screen composition' file :
 4 preview pictures
* ##### 'audio'file:
 the audio of water
* ##### 'build'file:
 three.min.js
* ##### 'js'file:
it contains the js which be used in the project: 'dat.gui.min.js'
'FBXLoader.js'
'inflate.min,js'
'OrbitControls.js'
and the main js:'index.js'

* ##### 'model'file:
the model of 'cloud'

* ##### 'skyboxing'file:
6 different angles pictures of sky,which constitutes the whole sky

* ##### 'texture'files:
textures of used in project:river,water drop,trees and bridge
textures used in readme.md

## introduction
My work is not only an audiovisual interactive composition,but also a three-dimensional data visualization in interface.

The project shows the view of a park,including an adjustable land,plenty of random placed trees with various patterns,a scalable and removable bridge,an adjustable waterfall,the length and speed of waterdrop can be controlled directly ,in addition,the colour and opacity of the land can be changed in interface.On top of that,the point which should be highlighted here is that I created an invisible plane over the land,it would create clouds when be clicked.The amount and position of clouds depends on the number of times you click and the position (inside the plane) of you click.

Also,I add the audio of waterfall,it effects when the project starts.In addition,i add skybox to make the scene closer to reality.Apart from this,I add orbitcontrols.js to make the park be available to see from multi-angle.

## Details and process
![image of the project](https://github.com/whatchamacallit233/DAT505-GitHub/blob/master/Xiaowei%20Ji-DAT505-Assignment/texture/3.jpg)

The idea of making this project is from the beauty of nature.Nature is the  combination of dynamic and static,which can be demonstrated by code exactly.So i set 'nature ' as the theme of my project.

To begin with,I write basic code to set scene,camera,renderer,light.Then I create a river and use a water texture as the material :
```javascript
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
```
Then,set 2 grasslands at the left and right sides of river:
```javascript
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
```
I also add the function of changing grassland 's scaleY and scaleZ(the reason why I haven't made it changable in scaleX is that it contains two part,it would cover the river if been widen,also, they would leave space when been shrinked in scaleX):
```javascript  
controller = new function () {

    this.scaleY = 1;
    this.scaleZ = 1;
//Create a new DAT.GUI
var gui = new dat.GUI();
var f1 = gui.addFolder('Land Scale');
f1.add(controller, 'scaleY', 0, 1).onChange(function () {
    ground_left.scale.y = ground_right.scale.y = (controller.scaleY)
  });
  f1.add(controller, 'scaleZ', 0.7, 1.2).onChange(function () {
    ground_left.scale.z = ground_right.scale.z = (controller.scaleZ)
  });
```
The color of grassland can be controlled:
```javascript
this.groundColor = color;
//add color controller for grassland
  gui.addColor( controller, 'groundColor', color ).onChange( function() {
  ground_left.material.color.setHex( dec2hex(controller.groundColor) );
    });
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

```
In addition,the opacity of land can be controled:
```javascript
this.Opacity = 1;

gui.add( controller, 'Opacity', 0.1, 1 ).onChange( function() {
  material_grass.opacity = (controller.Opacity);
  });
```
Then,I add a bridge which comprised by a wood block and 6 rails,set  wood texture as it material :
```javascript
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
```
Then i finded a problem that they could not move together,because they were independent,so l set them in a group:
```javascript
var group = new THREE.Group();
  group.add(block);
  group.add(rail_1);
  group.add(rail_2);
  group.add(rail_3);
  group.add(rail_4);
  group.add(rail_h1);
  group.add(rail_h2);
  scene.add(group);
```
set the function of controlling  bridge's position Z and scale Z:
```javascript
controller = new function () {
  this.positionZ = -1;
  this.BridgescaleZ = 1;
var gui = new dat.GUI();
var f2 = gui.addFolder('Bridge Position');

f2.add(controller, 'positionZ', -4, -0.5).onChange(function () {
   group.position.z = (controller.positionZ)
    });
f2.add(controller, 'BridgescaleZ', 0.5, 2.5).onChange(function () {
      group.scale.z = (controller.BridgescaleZ)
    });
```

Besides, I set trees as the combination of trunk and leaves.
I thought that the only difference in position of each tree's trunk and leaves is the position of Y, so i named their position of x and z as tree.x and tree.z,which means each tree's trunk and leaves can share the same x and z.So they can move together :
```javascript
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
```

Then I set random position(in x and z) for trees on 2 sides of river:(By the following way can make the number of trees on 2 sides the same)
```javascript
    for (var x = 0 x <= 40; x += 1) {
  if (x <= 20) {
   tree(Math.random() *1.7 -1.9 , Math.random() * -3);//set trees on the left side
    }
    else {
  tree(Math.random() * 1.7 + 1.2, Math.random() * -3);//set trees on the right side
    }
  }
```
add the sound of water flow(continue from the begining to the end )
```javascript
// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
// create a global audio source
var sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();

audioLoader.load( 'audio/water.wav', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.6 );
        sound.play();
      });
```
Then i created the sky:
I set up a new folder named 'skyboxing',added the 6 angles of sky,including right,left,up,down,back and front angles.And wrote the following code(the sequence of coding them should be the same as adove):
```javascript
var path = "skyboxing/";
var urls = [ path + "px.jpg", path + "nx.jpg",
					  path + "py.jpg", path + "ny.jpg",
					 	path + "pz.jpg", path + "nz.jpg" ];

var  textureCube1 = new THREE.CubeTextureLoader().load( urls );
		 scene.background = textureCube1;
```
One of the challenging part of the work is to create dynamic drops.The first step is to create the drops which make up the waterfall,i wrote it at the begining:
```javascript
//Create water drops
var drops = [];
var count = 0;
var geometry = new THREE.BoxGeometry(.1, .1, .1);
// Load a texture
var texturew =  new THREE.TextureLoader().load( "texture/texture.jpg" );
var material_river = new THREE.MeshLambertMaterial({ map:texturew });
var drop = new THREE.Mesh(geometry, material_river);
```
Then add the following code after controller function and dat.gui respectively to make the length and speed of waterfall controllable on interface :
```javascript
  this.waterLength = 10;
  this.waterSpeed = 0.01;

  var f3 = gui.addFolder('water Center');

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
```

 Set drop position ,speed,lifespan:
```javascript
//Create random values for drop x and z
this.drop.position.set(Math.random(.1, .9), 0.1, 1 + (Math.random() - .5) * .1);
this.speed = waterSpeed;
//the length of waterfall
this.lifespan = (Math.random()*Math.round(waterLength)+50);
```
after that,add the function of update them drop from different position in different speed,which make it closer to reality:
```javascript
 this.update = function () {
  this.speed += .0007;
  this.lifespan--;
  this.drop.position.x += (.5 - this.drop.position.x) / 70;
  this.drop.position.y -= this.speed;
}
```
Then add animation function of drops:
```javascript
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
```
Another challenging part for me is add the function of creating clouds by click.
Originally,with the purpose of showing the relationship between water and clouds.I want to creat clouds by clicking river.Unfortunately i failed.I can just creat clouds at the position where clicked:

![created clouds in river](https://github.com/whatchamacallit233/DAT505-GitHub/blob/master/Xiaowei%20Ji-DAT505-Assignment/texture/failed.jpg)

So I set an invisible plane in the sky directly, which is parallel to the ground:
```javascript
   var geometry_bgGround = new THREE.PlaneGeometry(5,5.8);
   var material_bgGround = new THREE.MeshBasicMaterial({visible:false});
   var bgGround = new THREE.Mesh(geometry_bgGround,material_bgGround);

	bgGround.rotation.x = -Math.PI/2

```
  The most important thing is add 'Bplace'function,it can make object clickable,wrote the following code at the begining:
```javascript
var Bplace  = [];
```
And add this to make it act on the plane I set before:
```javascript
Bplace.push(bgGround)
```
Then load the cloud model which is in the format of fbx.So I add a FBXLoader.js to load it:
```javascript
var fbxLoader = new THREE.FBXLoader();
fbxLoader.load('model/file.fbx', function(object){
```
In addition,I set the scale of clouds:
```javascript
 var models = object;
	models.scale.set(.085,.075,.075)
```
While I found that the orginal color of the cloud object is quite dark,so i printed the cloud object:
```javascript
console.log(object)
```
and found that it is in type of 'group'.Then i found the children of it:
![console](https://github.com/whatchamacallit233/DAT505-GitHub/blob/master/Xiaowei%20Ji-DAT505-Assignment/texture/console.jpg)

So I changed the color of clouds by the following code:
```javascript
models.children[0].children[0].material.color = new THREE.Color(0XB0E2FF)
```
The latst challenging thing is to transfrom screen coordinate to standardVector,then transform standardVector to worldVector.For the purpose of creating clouds at the position where clicked:
```javascript
    var Sx = event.clientX;
    var Sy = event.clientY;
  //transform screen coordinate to standardVector
    var x = (Sx / window.innerWidth) * 2 - 1;
    var y = -(Sy / window.innerHeight) * 2 + 1;
    var standardVector = new THREE.Vector3(x, y, 0.5);//transform standardVector to worldVector
    var worldVector = standardVector.unproject(camera);
```
make it effective when click:
```javascript
document.addEventListener('click', ray);
```

Finally,set ray and intersects,add the function of clone
```javascript
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
```
