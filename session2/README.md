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
