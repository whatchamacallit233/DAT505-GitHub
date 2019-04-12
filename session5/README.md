# session 5
## S5-arraymesh-homework
my project is made by plenty of colorful dynamic objects which can stretch and shrink automatically.
Create a three dimensional grid of objects, and position them accordingly,set random color and wireframe:
```javascript
for (var x = -10; x <= 10; x += 10)
for (var y =-10 ; y <= 10; y += 10)
for (var z =-10 ; z <= 10; z += 10)
 var boxGeometry = new THREE.TorusBufferGeometry(15,4,2,80);
    var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF,wireframe:true});
```

set random rotation in three dimension
```javascript
mesh.rotation.x=Math.random()*2*Math.PI;
mesh.rotation.y=Math.random()*2*Math.PI;
mesh.rotation.z=Math.random()*3*Math.PI;
```
set random speed of rotation in three dimension
```javascript
var randomValueX=(Math.random()*0.5-0.25);
var randomValueY=(Math.random()*0.5-0.25);
var randomValueZ=(Math.random()*0.5-0.25);
randomSpeedX.push(randomValueX);
```
set the maximum scale of cubes
```javascript
scaleCube += 0.02;
if(scaleCube>1)scaleCube=-5;
```

add rotation function
```javascript
cubes.forEach(function(c,i){
c.rotation.x=0.01;
c.rotation.y=0.01;
```

## S5-arraymesh-classtest-my work
I learnt how to set animation to specific cubes or for each cube.
