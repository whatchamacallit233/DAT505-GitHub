# session 7
## S7-02-texture-cube practice-my work
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
