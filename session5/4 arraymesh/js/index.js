var renderer, scene, camera;
var cubes=[];
var randomSpeedX=[];

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

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <= 10; x += 5)
  for (var y = -10; y <= 10; y += 5) { // Start from -45 and sequentially add one every 5 pixels
    //for (var y = -30; y <= 30; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 6, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
if (x==-5&&y==5){
boxMaterial=new THREE.MeshLambertMaterial({color:0xCD2626})
}else if(x==5&&y==-5){
  boxMaterial=new THREE.MeshLambertMaterial({color:0x4682B4})
}else {
  boxMaterial=new THREE.MeshLambertMaterial({color:0xD1D1D1})

}



      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.scale.y = 0.5;

mesh.rotation.x=Math.random()*2*Math.PI;
mesh.rotation.y=Math.random()*2*Math.PI;
mesh.rotation.z=Math.random()*2*Math.PI;

var randomValueX=(Math.random()*0.5-0.25);
randomSpeedX.push(randomValueX);



      scene.add(mesh);
      cubes.push(mesh);
  }

  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);
console.log(randomSpeedX);

cubes[8].rotation.x+=randomSpeedX[8];
cubes[16].rotation.x+=randomSpeedX[16];


  renderer.render(scene, camera);
}

init();
drawFrame();
