var container, camera, scene, renderer, mesh;
var controls,color;


			function init() {
				container = document.getElementById( 'container' );

				// Create an empty scene -----------------------
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x8FBCD4 );
				scene.add( new THREE.AmbientLight( 0x8FBCD4, 0.4 ) );

				// Create a  camera --------------
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20 );
				camera.position.z = 8;
				scene.add( camera );

        // create PointLight
				var pointLight = new THREE.PointLight( 0xffffff, 1 );
				camera.add( pointLight );

				// Create a renderer  ------------
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setAnimationLoop( function () {
					renderer.render( scene, camera );
				} );

				var controls=new THREE.OrbitControls(camera,renderer.domElement);
				document.body.appendChild(renderer.domElement);
				window.addEventListener( 'resize', onWindowResize, false );
					// Create a alterable geometry -------
				var geometry = createGeometry();
				color = Math.random() * 0xffffff;
				var material = new THREE.MeshPhongMaterial( {
					color: color,
					transparent: true,
					flatShading: true,
					morphTargets: true
				} );
				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				var controller = new function() {
						this.Color = color;
							this.Opacity = 1;
						}();

       initGUI();

			function createGeometry() {
				var geometry = new THREE.BoxBufferGeometry( 2, 2, 2, 32, 32, 32 );
				// create an empty array to  hold targets for the attribute we want to morph
				// morphing positions and normals is supported
				geometry.morphAttributes.position = [];
				// the original positions of the cube's vertices
				var positions = geometry.attributes.position.array;
				// for the first morph target we'll move the cube's vertices onto the surface of a sphere
				var spherePositions = [];
				// for the second morph target, we'll twist the cubes vertices
				var twistPositions = [];
				var direction = new THREE.Vector3( 1, 0, 0 ).normalize();
				var vertex = new THREE.Vector3();
				for ( var i = 0; i < positions.length; i += 3 ) {
					var x = positions[ i ];
					var y = positions[ i + 1 ];
					var z = positions[ i + 2 ];
					spherePositions.push(
						x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
						y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
						z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
					);
					// stretch along the x-axis so we can see the twist better
					vertex.set( x * 2, y, z );
					vertex.applyAxisAngle( direction, Math.PI * x / 2 ).toArray( twistPositions, twistPositions.length );
				}
				// add the spherical positions as the first morph target
				geometry.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( spherePositions, 3 );
				// add the twisted positions as the second morph target
				geometry.morphAttributes.position[ 1 ] = new THREE.Float32BufferAttribute( twistPositions, 3 );
				return geometry;
			}
			function initGUI() {
				// Set up dat.GUI to control targets
				var params = {
					Spherify: 0,
					Twist: 0,
				};
				var gui = new dat.GUI();

				var folder = gui.addFolder( 'Morph Targets' );
				folder.add( params, 'Spherify', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
					mesh.morphTargetInfluences[ 0 ] = value;
				} );
				folder.add( params, 'Twist', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
					mesh.morphTargetInfluences[ 1 ] = value;
				} );
			gui.addColor(controller, 'Color', color ).onChange( function() {
		 mesh.material.color.setHex( dec2hex(controller.Color) );
	});
			gui.add( controller, 'Opacity', 0.1, 1 ).onChange( function() {
			material.opacity = (controller.Opacity);
		});
				folder.open();
			}
		}
		//Color converter
		function dec2hex(i) {
			var result = "0x000000";
			if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
			else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
			else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
			else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
			else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
			else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
			if (result.length == 8){return result;}
		}
			// Render Loop
			function render () {
				requestAnimationFrame(render);
				renderer.render(scene, camera);
		};
				function onWindowResize() {
					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();
					renderer.setSize( window.innerWidth, window.innerHeight );
				}
			init();
