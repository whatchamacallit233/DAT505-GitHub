# session 3
## 00-BasicStructure-my work
![301](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/301.png)
This session we got the concept of GUI(Graphical User Interface).
To be more specific,we learnt how to create a new DAT.GUI and add controller values for GUI.
To begin with, it is necessary to add dat.gui.min.js to js package.In addition ,add the following code in index.html:
```javascript
      </script><script src="js/dat.gui.min.js"></script>
```
Then,add the following code to add initial controller values for GUI
  ```javascript
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
};
```
Then,Create a new DAT.GUI:
```javascript
var gui = new dat.GUI();
```
Add  3 folders on interface to control the scale,position and rotation respectively,and set the available chang range :
```javascript
var f1=gui.addFolder('Scale');
  var f2=gui.addFolder('Position');
  var f3=gui.addFolder('rotation');

    f1.add(controller,'scaleX',0.1,5).onChange(function(){
    mesh.scale.x=(controller.scaleX)});
    f1.add(controller,'scaleY',0.1,5).onChange(function(){
      mesh.scale.y=(controller.scaleY)});
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
```

## homework
![3h](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/3h.png)  
Add OrbitControls.js to move the rotation of object by mouse:
```javascript
var controls=new THREE.OrbitControls(camera,renderer.domElement);
document.body.appendChild(renderer.domElement);
window.addEventListener( 'resize', onWindowResize, false );
```
Create an alterable geometry with random color:
```javascript
var geometry = createGeometry();
color = Math.random() * 0xffffff;
var material = new THREE.MeshPhongMaterial( {
color: color,
transparent: true,
flatShading: true,
morphTargets: true
} );
mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```
Then, add changable color, opacity,twist and spherify functions :
```javascript
var controller = new function() {
    this.Color = color;
      this.Opacity = 1;
    }();
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

    initGUI();

    function createGeometry() {
     var geometry = new THREE.BoxBufferGeometry( 2, 2, 2, 32, 32, 32 );
     // create an empty array to  hold targets for the attribute we want to morph
     // morphing positions and normals is supported
     geometry.morphAttributes.position = [];
     // the original positions of the cube's vertices
     var positions = geometry.attributes.position.array;
     // for the first morph target we'll move the cube's vertices onto the surface of a sphere
     var spherePositions = [];
     // for the second morph target, we'll twist the cubes vertices
     var twistPositions = [];
     var direction = new THREE.Vector3( 1, 0, 0 ).normalize();
     var vertex = new THREE.Vector3();
     for ( var i = 0; i < positions.length; i += 3 ) {
       var x = positions[ i ];
       var y = positions[ i + 1 ];
       var z = positions[ i + 2 ];
       spherePositions.push(
         x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
         y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
         z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
       );
       // stretch along the x-axis so we can see the twist better
       vertex.set( x * 2, y, z );
       vertex.applyAxisAngle( direction, Math.PI * x / 2 ).toArray( twistPositions, twistPositions.length );
     }
     // add the spherical positions as the first morph target
     geometry.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( spherePositions, 3 );
     // add the twisted positions as the second morph target
     geometry.morphAttributes.position[ 1 ] = new THREE.Float32BufferAttribute( twistPositions, 3 );
     return geometry;
    }
  ```
  Set up dat.GUI to control targets:
  ```javascript
  var gui = new dat.GUI();

  var folder = gui.addFolder( 'Morph Targets' );
  folder.add( params, 'Spherify', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
    mesh.morphTargetInfluences[ 0 ] = value;
  } );
  folder.add( params, 'Twist', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
    mesh.morphTargetInfluences[ 1 ] = value;
  } );
  gui.addColor(controller, 'Color', color ).onChange( function() {
  mesh.material.color.setHex( dec2hex(controller.Color) );
  });
  gui.add( controller, 'Opacity', 0.1, 1 ).onChange( function() {
  material.opacity = (controller.Opacity);
  });
  folder.open();
  }
  }
```
