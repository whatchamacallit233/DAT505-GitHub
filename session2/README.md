# session 2
## 02-GeometriesAndMaterials-my work
![202](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/202.png)  
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
![203](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/203.png)
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


## 04-homework
![204](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/204.png)  
I Created a composition with 3 geometries by using different materials.
One of it is BoxGeometry,made by MeshPhongMaterial：
```javascript
var geometry1 = new THREE.BoxGeometry(100, 100, 100);
var material1 = new THREE.MeshPhongMaterial({
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
```
One of it is IcosahedronBufferGeometry,made by MeshLambertMaterial and set wireframe：
```javascript
var geometry2 = new THREE.IcosahedronBufferGeometry(100, 1);
var material2 = new THREE.MeshLambertMaterial({
  color: '#D2BE82',
  lightMap: null,
  lightMapIntensity: 1,
  emissive: 0x000000,
  emissiveMap: null,
  emissiveIntensity: 1,
  specularMap: null,
  wireframe:true
});
```
The third one used the texture I drawn by myself:
```javascript
var texture = new THREE.TextureLoader().load("texture2.jpg")
geometry3= new THREE.ConeGeometry(150, 150, 150);
material3 = new THREE.MeshBasicMaterial( { map:texture} );
```
