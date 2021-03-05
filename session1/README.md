# session 1
## 01-Test
![1test1](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/1test1.png)

Except some basic settings(scene,camera,render),this project uses#B0E0E6 as background color,the main object is CylinderBufferGeometry with MeshLamberMaterial,which is showed by wireframe.
```javascript
function geometry(){
  geometry = new THREE.CylinderBufferGeometry(50, 50,200,50);
  material = new THREE.MeshLambertMaterial( { color: Math.random()* 0xFFFFFF,wireframe:true} );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;
// Add mesh to scene
  scene.add( mesh );
}
```

Also,it adds animation in render function,to continuously rotate the mesh:
```javascript
var render = function () {
  requestAnimationFrame( render );
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  mesh.rotation.z+= 0.01;
  renderer.setClearColor("#B0E0E6");
  // Render the scene
  renderer.render(scene, camera);
};
```


## 02-homework-GeometriesAndMaterials
![1test2](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/1test2.png)
It made by three IcosahedronBufferGeometries with different size. While,they have the same center point.Meanwhile,the smallest and the biggest one are set by the same material:MeshNormalMaterial,which makes them seem colourful.
```javascript
function geometry(){
  // Create a IcosahedronBufferGeometry inside---------
geometry1 = new THREE.IcosahedronBufferGeometry(70,1);
 material1 = new THREE.MeshNormalMaterial( { color: "#8470FF" } );
mesh1 = new THREE.Mesh( geometry1, material1 );
 mesh1.position.z = -1000;
  cubes.push(mesh1);
  scene.add( mesh1);
// Create two IcosahedronBufferGeometry wireframe 0utside---------
  geometry2 = new THREE.IcosahedronBufferGeometry(100, 1);
  material2 = new THREE.MeshBasicMaterial( { color: Math.random()*0xFFFFFF,wireframe:true } );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.z = -1000;
  // Add mesh to scene
  cubes.push(mesh2);
  scene.add( mesh2 );

  geometry3 = new THREE.IcosahedronBufferGeometry(150, 1);
  material3 = new THREE.MeshNormalMaterial( { color: Math.random()*0xFFFFFF,wireframe:true } );
  mesh3 = new THREE.Mesh( geometry3, material3 );
  mesh3.position.z = -1000;
  // Add mesh to scene
  cubes.push(mesh3);
  scene.add( mesh3 );
}
```

Continuously rotate the mesh in different speed:
```javascript
var render = function () {
 requestAnimationFrame( render );
mesh1.rotation.x += 0.5;
mesh1.rotation.y += 0.5;
mesh2.rotation.x += 0.3;
mesh2.rotation.y += 0.3;
mesh3.rotation.x += 0.2;
mesh3.rotation.y += 0.2;
  renderer.setClearColor("#9999FF");
  // Render the scene
  renderer.render(scene, camera);
};
```
