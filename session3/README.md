# session 3
## 00
This session we got the concept of GUI(Graphical User Interface).
To be more specific,we learnt how to create a new DAT.GUI and add controller values for GUI.
To begin with,it is necessary to add dat.gui.min.js to js package.In addition ,add the following code in index.html:
    ```javascript
      </script><script src="js/dat.gui.min.js"></script>
```
Then,add the following code to add initial controller values for GUI
  ```javascript
var controller = new function(){
  this.scaleX=1;
  this.scaleY=1;
  this.scaleZ=1;

  this.positionX=0;
  this.positionY=0;
  this.positionZ=-200;

  this.rotationX=0;
  this.rotationY=0;
  this.rotationZ=0;
};
```
Then,Create a new DAT.GUI:
```javascript
var gui = new dat.GUI();
```
Add  3 folders on interface to control the scale,position and rotation respectively,and set the available chang range :
```javascript
var f1=gui.addFolder('Scale');
  var f2=gui.addFolder('Position');
  var f3=gui.addFolder('rotation');

    f1.add(controller,'scaleX',0.1,5).onChange(function(){
    mesh.scale.x=(controller.scaleX)});
    f1.add(controller,'scaleY',0.1,5).onChange(function(){
      mesh.scale.y=(controller.scaleY)});
    f1.add(controller,'scaleZ',0.1,5).onChange(function(){
      mesh.scale.z=(controller.scaleZ)});

      f2.add(controller,'positionX',-500,500).onChange(function(){
        mesh.position.x=(controller.positionX)});
      f2.add(controller,'positionY',-500,500).onChange(function(){
          mesh.position.y=(controller.positionY)});
      f2.add(controller,'positionZ',-5000,-400).onChange(function(){
            mesh.position.z=(controller.positionZ)});

      f3.add(controller,'rotationX',-180,180).onChange(function(){
              mesh.rotation.x=de2ra(controller.rotationX)});
      f3.add(controller,'rotationY',-180,180).onChange(function(){
                mesh.rotation.y=de2ra(controller.rotationY)});
      f3.add(controller,'rotationZ',-180,180).onChange(function(){
                  mesh.rotation.z=de2ra(controller.rotationZ)});
```
