# session 2
## 02-GeometriesAndMaterials-my work
I changed material of each cube,and use different numbers to distinguish different materials.
Each mesh can use different geometries and different materials by this code:
```javascript
var mesh1 = new THREE.Mesh( geometry, material1 );
```

Also,I used a texture as a material of some cubes,the way of it is download the texture and add it into package,and write codes:
```javascript
var texture = new THREE.TextureLoader().load("texture.jpg");
var material4 = new THREE.MeshBasicMaterial( {
map:texture} );
```

Besides,the way of setting different position for each mesh:
```javascript
mesh2.position.z = -1000;
mesh2.position.x = -100;
mesh2.position.y = 200;
```

The way of rotating meshs in different speed respectively and continuously:
First,define the initial rotation:
```javascript
var rot = 0;
```

Besides,in animation function,wrote:
```javascript
var render = function () {
  requestAnimationFrame( render );
  rot += 0.01;
```
which means the rotation is changing all the time,so meshs can be dynamic

We can set different rotation to different mesh:
```javascript
  mesh1.rotation.x = rot+1;
  mesh1.rotation.y = rot+1;

  mesh2.rotation.x = rot;
  mesh2.rotation.y = rot;

  ```

## 03-COPY-ThreeJS-Materials my work
For this exercise, we were asked to copy one example on Threejs and make it work on our computers.
First,I chose a project named buffergeometry/constructed/from/geometry from threejs.org website.
Then,I viewed the source of head part and searched referenced js files from threejs material package which we have downloaded.
Besides,add the referenced .js file in to js package.
On top of that,I add the following code in index.html file:
```javascript
<script src="js/TrackballControls.js"></script>
<script src="js/stats.min.js"></script>
<script src="js/WebGL.js"></script>
```
Finally,I copied the rest code of body part into my index.js and changed index.html'body part like following:
```javascript
<body>
<script src="js/index.js"></script>
</body>
```
