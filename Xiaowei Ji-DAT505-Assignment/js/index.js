//Global variables
var scene, camera, renderer;
//GUI - Declare variable
var gui = null;
init();

function init(){

// Create an empty scene ------------
scene = new THREE.Scene();

//create a camera-------
camera = new THREE.PerspectiveCamera(25,window.innerWidth/window.innerHeight,.1,1000);
camera.position.set(-5,6,8);
camera.lookAt(new THREE.Vector3(0,0,0));

// Create a renderer-------
renderer = new THREE.WebGLRenderer({canvas:canvas,alpha: true, antialias: true});

// Configure renderer clear color----
renderer.setClearColor("#E5C1CD");

// Configure renderer size----
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//add new controls:
controls=new THREE.OrbitControls(camera,renderer.domElement)
// Append Renderer to DOM
document.body.appendChild( renderer.domElement );



//Ambient light
var light = new THREE.AmbientLight( 0xffffff ,.5);

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

// grassland left
var geometry_left = new THREE.BoxGeometry( 2.5, .2, 6 );
var material_grass = new THREE.MeshLambertMaterial( { color: 0xABD66A } );
var ground_left = new THREE.Mesh( geometry_left, material_grass );
ground_left.position.set(-1.2,0.1,-1.9);
scene.add( ground_left );
//give shadow to left trees
customizeShadow(ground_left,.25)

//grassland right
var geometry_right = new THREE.BoxGeometry( 2, .2, 6 );
var ground_right = new THREE.Mesh( geometry_right, material_grass );
ground_right.position.set(2,0.1,-1.9);
scene.add( ground_right );
//give shadow to right trees
customizeShadow(ground_right,.25) // mess, opacity


//bridge
var material_wood = new THREE.MeshLambertMaterial({ color: 0xA98F78  });
//bridge - wood block

var geometry_block = new THREE.BoxGeometry( 1.2, .02, .4 );
var block = new THREE.Mesh( geometry_block, material_wood );
block.position.set(0.5,.21,0.2);
block.castShadow = true;
block.receiveShadow = true;
scene.add( block);


//bridge - 6 rails
var geometry_rail_v = new THREE.BoxGeometry( .04,.3,.04 );
var rail_1 = new THREE.Mesh( geometry_rail_v, material_wood );
rail_1.position.set(-.1,.35,.4);
rail_1.castShadow = true;
customizeShadow(rail_1,.2);
scene.add( rail_1 );

var rail_2 = new THREE.Mesh( geometry_rail_v, material_wood );
rail_2.position.set(1.1,.35,.4);
rail_2.castShadow = true;
customizeShadow(rail_2,.2);
scene.add( rail_2 );

var rail_3 = new THREE.Mesh( geometry_rail_v, material_wood );
rail_3.position.set(-.1,.35,0);
rail_3.castShadow = true;
customizeShadow(rail_3,.2);
scene.add( rail_3 );

var rail_4 = new THREE.Mesh( geometry_rail_v, material_wood );
rail_4.position.set(1.1,.35,0);
rail_4.castShadow = true;
customizeShadow(rail_4,.2);
scene.add( rail_4 );

var geometry_rail_h = new THREE.BoxGeometry( 1.2,.04,.04 );
var rail_h1 = new THREE.Mesh( geometry_rail_h, material_wood );
rail_h1.position.set(0.5,.42,.4);
rail_h1.castShadow = true;
customizeShadow(rail_h1,.2);
scene.add( rail_h1 );

var rail_h2 = new THREE.Mesh( geometry_rail_h, material_wood );
rail_h2.position.set(0.5,.42,0);
rail_h2.castShadow = true;
customizeShadow(rail_h2,.2);
scene.add( rail_h2 );

//collect them as a bridge group
var group = new THREE.Group();
group.add( block);
group.add( rail_1 )
group.add( rail_2 );
group.add( rail_3 );
group.add( rail_4 );
group.add( rail_h1 );
group.add( rail_h2 );
scene.add (group);



//add controller values for GUI
  var controller = new function(){

    this.scaleY=1;
    this.scaleZ=1;

    this.scaleZ=1
    this.positionZ=-1;



};
//Create a new DAT.GUI
var gui = new dat.GUI();

var f1=gui.addFolder('Land Scale');
var f2=gui.addFolder('Bridge Position');

f1.add(controller,'scaleY',0,1).onChange(function(){
    ground_left.scale.y=ground_right.scale.y=(controller.scaleY)});
f1.add(controller,'scaleZ',0.7,1).onChange(function(){
  ground_left.scale.z=ground_right.scale.z=(controller.scaleZ)});

f2.add(controller,'positionZ',-4,-0.5).onChange(function(){
   group.position.z=(controller.positionZ)});
f2.add(controller,'scaleZ',0.5,2.5).onChange(function(){
    group.scale.z=(controller.scaleZ)});



}

//river
var geometry_river = new THREE.BoxGeometry( 1, .1, 6);
var material_river = new THREE.MeshLambertMaterial( { color: 0x70B7E3 } );
var river = new THREE.Mesh( geometry_river, material_river );
river.position.set(.5,.1,-2);
scene.add( river );
//give shadow to river
customizeShadow(river,.08) // mess, opacity

//set tree as the combination of trunk and leaves
var tree=function(x,z){
  tree.x=x;
  tree.z=z;

  //trunk
  var material_trunk = new THREE.MeshLambertMaterial({ color: 0x9A6169  });
  var geometry_trunk = new THREE.BoxGeometry( .15, .15, .15 );
  var trunk = new THREE.Mesh( geometry_trunk, material_trunk );
  trunk.position.set(tree.x,.275,tree.z);
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  scene.add( trunk );

  //leaves
  var geometry_leaves = new THREE.BoxGeometry( .25, .4, .25 );
  var material_leaves = new THREE.MeshLambertMaterial({ color: 0x65BB61});
  var leaves = new THREE.Mesh( geometry_leaves, material_leaves );
  leaves.position.set(tree.x,.2+.15+.4/2,tree.z);
  leaves.castShadow = true;
  customizeShadow(leaves,.25) // mess, opacity
  scene.add( leaves );
}
//set random quantity and position for trees on 2 sides
for (var x =-3;x <=40;x +=1){
if(x<=20){
 tree(Math.random()*-1.7-0.7,Math.random()*-3);//set trees on the left side
}
  else  {
 tree(Math.random()*-1.7+2.9,Math.random()*-3);//set trees on the right side
  }
}


//give shadow to trees
function customizeShadow(t,a){ //opacity, target mesh
  var material_shadow = new THREE.ShadowMaterial({opacity:a});
  var mesh_shadow = new THREE.Mesh( t.geometry, material_shadow );
  mesh_shadow.position.set(t.position.x,t.position.y,t.position.z);
  mesh_shadow.receiveShadow = true;
  scene.add( mesh_shadow );
}



//waterfall
var Drop=function(){
  this.geometry = new THREE.BoxGeometry(.1, .1, .1 );
  this.drop= new THREE.Mesh( this.geometry, material_river );
  //Create random values for drop x and z
  this.drop.position.set(Math.random(.1,.9),0.1,1+(Math.random()-.5)*.1);
  scene.add( this.drop );
  this.speed=0;
  //the length of waterfall
  this.lifespan=(Math.random()*50)+20;
 //the speed of water drop
  this.update=function(){
    this.speed+=.0007;
    this.lifespan--;
    this.drop.position.x+=(.5-this.drop.position.x)/70;
    this.drop.position.y-=this.speed;
  }
}

//add water drop animation function
var drops=[];
var count=0;
var render = function() {
	requestAnimationFrame( render );
  if(count%3==0){
     for(var i=0;i<5;i++){
      drops.push(new Drop());
    }
  }
  count++;
  for(var i=0;i<drops.length;i++){
    drops[i].update();
    if(drops[i].lifespan<0){
      scene.remove(scene.getObjectById(drops[i].drop.id));
      drops.splice(i,1);
    }
  }
	renderer.render( scene, camera );
}
render();
