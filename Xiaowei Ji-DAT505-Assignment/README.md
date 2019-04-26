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

To begin with,I write basic code to set scene,camera,renderer,light.Then I create a river and used a water texture as the material :
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
I also add the function of changing grassland 's scaleY and scaleZ(the reason why I haven't made it changable in scaleX is that it contains two part,it would cover the river if been widen):
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
