# session 7
## S7-02-texture-cube practice-my work
![702](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/702.png)  
add 3 texture as cubes' material and let then show randomly

```javascript
  var randomSelection=Math.round(Math.random()*3);
  texture = new THREE.TextureLoader().load( "texture"+randomSelection+".jpg" );
  material = new THREE.MeshBasicMaterial( { map: texture} );
```


  add animation:
  ```javascript
  for(var i=0;i<cubes.length;i++){
  	cubes[i].rotation.x += 0.02;
  	cubes[i].rotation.y += 0.01;
  	cubes[i].position.y -= speed[i];
  	//If the mesh passes the bottom of the screen,
  	//make it appear on the top. Also x position is randomized
  	if (cubes[i].position.y <-30){
  		cubes[i].position.y =50 ;
  		cubes[i].position.x = (Math.random() * -20) +5;
  		cubes[i].scale.x = (Math.random()*-2)+2;
  		cubes[i].scale.y = (Math.random()*-2)+2;
  		cubes[i].scale.z =(Math.random()*-2)+2;
  	}
  }
```
## S7-04-Texture-Eyes-homework
![704](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/704.png)  
set each eye in ramdom position :
```javascript
for(var i=0;i<cubesNum;i++){
mesh=new THREE.Mesh(geometry,material);
```
set each eye in ramdom position :
```javascript
xPos[i] = Math.random() * 100 - 50;
	yPos[i] = Math.random() * 100 - 50;
```
set random position in x y z:
```javascript
mesh.position.x=(Math.random()*-200)+40;
mesh.position.y=(Math.random()*-100)+40;
mesh.position.z=(Math.random()*-150)+40;
```
set random scale:
```javascript
var eyescale=Math.random()*0.8;
mesh.scale.x=eyescale;
mesh.scale.y=eyescale;
mesh.scale.z=eyescale;
```
