# session 4
## ArrayMesh-static cubes-homework1
It is a static project in init,while rotations of objects are random when benn refreshed.
```javascript
mesh.rotation.x=Math.random()*2*Math.PI;
mesh.rotation.y=Math.random()*2*Math.PI;
mesh.rotation.z=Math.random()*2*Math.PI;
```

## ArrayMesh-dynamic-homework2
It is a dynamic project on website,continuous rotations for each cube independently in different rotation and speed.
The difference from static project is setting random values for x and y:
```javascript
var randomRotationX = [];
var randomRotationY = [];
var randomValueX= (Math.random()*0.1)-0.05;
var randomValueY= (Math.random()*0.1)-0.05;
randomRotationX.push(randomValueX);
randomRotationY.push(randomValueY);
```
In addition,to make each cube rotates in different rotation and speed independently.
I added some code in animation function part:
```javascript
  cubes.forEach(function(c, i) {
    c.rotation.x += randomRotationX[i];
    c.rotation.y += randomRotationY[i];
  });
```
## S4-ArrayMesh class test-my work
It is a dynamic project,it combined by 64 rotating cubes.
After set basic function of the project,I created a three dimensional grid of objects, and position them accordingly:
```javascript
 for (var x = -10; x < 10; x += 5){
   for (var y = -10; y < 10; y += 5){
     for (var z = -10; z < 10; z += 5){
```
Set 8 different colors to specific 8 parts of the project:
```javascript
var boxGeometry = new THREE.BoxGeometry(3.5, 3.5, 3.5);
var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
//The color of the material is assigned a random colo{}
if (x>= 0 && y>=0 && z>=0){
  var boxMaterial = new THREE.MeshLambertMaterial({color: 0x87CEEB});
}else if (x<=0&& y>=0&&z>=0) {
  boxMaterial = new THREE.MeshLambertMaterial({color: 0x6B8E23});
}
else  if (x <0 && y <=0 && z>=0){
  var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFC1C1});
}
else  if (x >=0 && y <=0 && z>=0){
  var boxMaterial = new THREE.MeshLambertMaterial({color: 0xEEC90});
}
else  if (x <0 && y >=0 && z<=0){
  var boxMaterial = new THREE.MeshLambertMaterial({color: 0xB452CD});
}
else  if (x >=0 && y >=0 && z<=0){
  var boxMaterial = new THREE.MeshLambertMaterial({color: 0xEEE685});
}
  else  if (x <0 && y <0 && z<0){
    var boxMaterial = new THREE.MeshLambertMaterial({color: 0xEE3B3B});
}
else  {
    var boxMaterial = new THREE.MeshLambertMaterial({color:0xFFFFFF });
}
var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
```
Besides,to make all cubes rotate together in three dimension,add the following code in requestAnimationFrame part:
```javascript
rot+=0.01;
cubes.forEach(function(c,i){
  c.rotation.x=rot;
  c.rotation.y=rot;
  c.rotation.z=rot;
});
```
