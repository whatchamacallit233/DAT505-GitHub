# session 9
## S9-01-RaycastAudio-my work
I have learned how to add audio to object:
```javascript
// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();

// create a global audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
init();
animate();
function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
```

## S9-02-PostProcessing-Glitch-class test
I have learnt how to add shaders.
![902](https://github.com/whatchamacallit233/CreativeCoding--Xiaowei-JI/blob/master/Digital%20Nature-Final%20Assignment/texture/902.png)
