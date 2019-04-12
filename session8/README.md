# session 8
##S8-01-RaycastSprite-my work
add the following codes to make function works when mouse move or clicks:
```javascript
window.addEventListener( 'mousemove', onDocumentMousemove,false);
window.addEventListener( 'mousedown', onDocumentMouseDown,false);
```
move mouse on shape will change to a random colour
```javascript
function onDocumentMousemove( event ) {
  event.preventDefault();
  if ( selectedObject ) {
    selectedObject.material.color.set( '#69f' );
    selectedObject =null;
  }
  var intersects = getIntersects( event.layerX, event.layerY );
  if ( intersects.length > 0 ) {
    var res = intersects.filter( function ( res ) {
      return res && res.object;
    } )[ 0 ];
    if ( res && res.object ) {
      selectedObject = res.object;
      selectedObject.material.color.set( Math.random()*0xFFFFFF );
    }
  }
}
```
click on shape will print on console its size
```javascript
function onDocumentMouseDown( event ) {
  event.preventDefault();
  var intersects = getIntersects( event.layerX, event.layerY );
  if ( intersects.length > 0 ) {
    var res = intersects.filter( function ( res ) {
      return res && res.object;
    } )[ 0 ];
    if ( res && res.object ) {
      selectedObject = res.object;
      console.log(selectedObject.scale);
    }
  }
}
```

##S8-02-objLoader-Raycasting-my work

Model/material loading:
```javascript
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load("elephant2.mtl", function(materials){

  materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);

    objLoader.load("elephant2.obj", function(mesh){
      mesh.traverse(function(node){
        if( node instanceof THREE.Mesh ){
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
```
