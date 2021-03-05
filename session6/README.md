# session 6
## S6-01-CityScape-full-my work
![6](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/6.jpg)  
Firstly,set buildings show by wireframe.
```javascript
var material = new THREE.MeshBasicMaterial({color:Math.random()*0xFFFFFF,wireframe:true});
```
Then,Randomize position and scale of the buildings:
```javascript
building.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
building.position.y = Math.floor( Math.random() * 200 - 100) * 30;
building.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
building.scale.x  = Math.pow(Math.random(), 2) * 500 + 10;
building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
building.scale.z  = building.scale.x;
```
