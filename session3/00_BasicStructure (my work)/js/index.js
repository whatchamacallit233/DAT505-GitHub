//Global variables
var scene, camera, renderer;
var geometry, material;

var WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;

//GUI - Declare variable
var gui = null;

//Rotation converter
var de2ra = function(degree){
  return degree*(Math.PI/180);
}
init();
render();

function init(){



  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#9BCD9B");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.Enabled = true;
  renderer.shadowMapSoft = true;
  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );

  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.BoxGeometry(100, 100, 100);
  material = new THREE.MeshNormalMaterial( { color: Math.random() * 0xffffff} );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh );

  //add controller values for GUI
  var controller = new function(){
    this.scaleX=1;
    this.scaleY=1;
    this.scaleZ=1;

    this.positionX=0;
    this.positionY=0;
    this.positionZ=-200;

    this.rotationX=0;
    this.rotationY=0;
    this.rotationZ=0;


  }();


  //Create a new DAT.GUI
  var gui = new dat.GUI();

  var f1=gui.addFolder('Scale');
  var f2=gui.addFolder('Position');
  var f3=gui.addFolder('rotation');

  f1.add(controller,'scaleX',0.1,5).onChange(function(){
    mesh.scale.x=(controller.scaleX)});

    f1.add(controller,'scaleY',0.1,5).onChange(function(){
      mesh.scale.y=(controller.scaleY);
    });

    f1.add(controller,'scaleZ',0.1,5).onChange(function(){
      mesh.scale.z=(controller.scaleZ)});


      f2.add(controller,'positionX',-500,500).onChange(function(){
        mesh.position.x=(controller.positionX)});
      f2.add(controller,'positionY',-500,500).onChange(function(){
          mesh.position.y=(controller.positionY)});
      f2.add(controller,'positionZ',-5000,-400).onChange(function(){
            mesh.position.z=(controller.positionZ)});

      f3.add(controller,'rotationX',-180,180).onChange(function(){
              mesh.rotation.x=de2ra(controller.rotationX)});
      f3.add(controller,'rotationY',-180,180).onChange(function(){
                mesh.rotation.y=de2ra(controller.rotationY)});
      f3.add(controller,'rotationZ',-180,180).onChange(function(){
                  mesh.rotation.z=de2ra(controller.rotationZ)});





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
                // Render Loop
          function render () {
      requestAnimationFrame( render );



                  // Render the scene
      renderer.render(scene, camera);
    };
    function lightingSystem(){
      var object3d  = new THREE.DirectionalLight('white', 0.15);
      object3d.position.set(6,3,9);
      object3d.name = 'Back light';
      scene.add(object3d);

      object3d = new THREE.DirectionalLight('white', 0.35);
      object3d.position.set(-6, -3, 0);
      object3d.name   = 'Key light';
      scene.add(object3d);

      object3d = new THREE.DirectionalLight('white', 0.55);
      object3d.position.set(9, 9, 6);
      object3d.name = 'Fill light';
      scene.add(object3d);

      var spotLight = new THREE.SpotLight( 0xffffff );
      spotLight.position.set( 3, 30, 3 );
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;
      spotLight.shadow.camera.near = 1;
      spotLight.shadow.camera.far = 4000;
      spotLight.shadow.camera.fov = 45;
      scene.add( spotLight );
    }
