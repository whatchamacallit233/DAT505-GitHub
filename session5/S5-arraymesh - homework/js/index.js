var renderer, scene, camera;
var cubes=[];
var randomSpeedX=[];
var scaleCube

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  //Create a three dimensional grid of objects, and position them accordingly
  for (var x = -10; x <= 10; x += 10)
  for (var y =-10 ; y <= 10; y += 10)
for (var z =-10 ; z <= 10; z += 10)
  { // Start from -45 and sequentially add one every 5 pixels
    //for (var y = -30; y <= 30; y += 5) {
      var boxGeometry = new THREE.TorusBufferGeometry(15,4,2,80);
    //  var wireframe=new THREE.WireframeGeometry(boxGeometry)
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF,wireframe:true});



      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;
      mesh.position.x =0//Math.random()*0.5;
      mesh.position.y =0//Math.random()*0.5;
      mesh.position.Z =0//Math.random()*0.5;


//set random rotation in three dimension
mesh.rotation.x=Math.random()*2*Math.PI;
mesh.rotation.y=Math.random()*2*Math.PI;
mesh.rotation.z=Math.random()*3*Math.PI;
//set random speed of rotation in three dimension
var randomValueX=(Math.random()*0.5-0.25);
var randomValueY=(Math.random()*0.5-0.25);
var randomValueZ=(Math.random()*0.5-0.25);
randomSpeedX.push(randomValueX);



      scene.add(mesh);
      cubes.push(mesh);
  }

  document.body.appendChild(renderer.domElement);
}
var scaleCube= -5

function drawFrame(){
  requestAnimationFrame(drawFrame);
//set the maximum scale of cubes:
scaleCube += 0.02;
if(scaleCube>1)scaleCube=-5;

//add rotation function
cubes.forEach(function(c,i){
c.rotation.x=0.01;
c.rotation.y=0.01;

c.scale.x=scaleCube;
})



console.log(scaleCube);

  renderer.render(scene, camera);
}

init();
drawFrame();
