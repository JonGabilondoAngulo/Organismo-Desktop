
/*
    Spatial representation inspired by threejs examples.
*/

const { ORGDevice, ORGDeviceORIENTATION } = require('./ORGDevice')
const ORG3DSceneFloor = require('./ORG3DSceneFloor')

module.exports =

     class ORG3DLabSimulator {

        constructor(scene, cssScene, webglScene) {
            this._scene = scene
            this._THREECSSScene = cssScene
            this._THREEScene = webglScene
            this._racksFloor = null
            this._floor = null
            this._racks = []
            this._worldPlane = null
            this._worldBars = null
            this._initializeDevices()
        }

        showDevices() {
            this._removeLabObjects()
            this._floor = this._createFloor(this._scene.THREEScene, 70000, 100, -4000)
            this._createDevices(this._deviceCount);
            this._showDevices();
            this._resetCameraPosition(new THREE.Vector3(0, 400, 7000), new THREE.Vector3(0, 400, 0), 2000)
        }

        hideDevices() {
            if (this._floor) {
                this._floor.remove()
                this._floor = null
            }
            this._initializeDevices()
            this._THREECSSScene.remove.apply(this._THREECSSScene, this._THREECSSScene.children);
        }

        showRacks() {
            this._removeLabObjects()
            this._racksFloor = this._createFloor(this._THREEScene, 1000, 100, -1)
            this._racks = this._createRacks()
            this._resetCameraPosition(new THREE.Vector3(0, 20, 200), new THREE.Vector3(0, 0, 0), 2000)
        }

        hideRacks() {
            if (this._racksFloor) {
                this._racksFloor.remove()
                this._racksFloor = null
            }
            if (this._racks) {
                this._THREEScene.remove.apply(this._THREEScene, this._racks)
                this._racks = []
            }
        }

        showWorldView() {
            this._removeLabObjects()
            this._worldPlane = this._createPlaneWorld({ width:200, height:100 }, new THREE.Vector3(0, 0, 0))
            this._worldBars = this._createBars( this._THREEScene, .3,
                [new THREE.Vector3(0, 12, 0), new THREE.Vector3(-10, 10, -10), new THREE.Vector3(-20, 5, -30),
                    // North Am.
                    new THREE.Vector3(-40, 20, -30), new THREE.Vector3(-55, 25, -10), new THREE.Vector3(-58, 12, -15),
                    new THREE.Vector3(-68, 22, -10), new THREE.Vector3(-62, 18, -8)])
            this._resetCameraPosition(new THREE.Vector3(0, 60, 90), new THREE.Vector3(0, 0, 0), 2000)
        }

        hideWorldView() {
            if (this._worldPlane) {
                this._THREEScene.remove(this._worldPlane)
                this._worldPlane = null
            }
            if (this._worldBars) {
                this._THREEScene.remove.apply(this._THREEScene, this._worldBars)
                this._worldBars = []
            }
        }

        destroy() {

        }

        setMode(mode) {
            switch (mode) {
                case 'lab-mode-table' : {
                    this._transform( this._objects, this._targets.table, 2000 )
                } break;
                case 'lab-mode-sphere' : {
                    this._transform( this._objects, this._targets.sphere, 2000 )
                } break;
                case 'lab-mode-helix' : {
                    this._transform( this._objects, this._targets.helix, 2000 )
                } break;
                case 'lab-mode-grid' : {
                    this._transform( this._objects, this._targets.grid, 2000 )
                } break;
            }
        }

        _initializeDevices() {
            this._deviceCount = 156
            this._devices = [];
            this._objects = [];
            this._targets = { table: [], sphere: [], helix: [], grid: [] };
        }

        _removeLabObjects() {
            this.hideDevices()
            this.hideWorldView()
            this.hideRacks()
        }

        _createDevices(count) {

            var deviceInfo = {
                name : "Jon's iPhone",
                model : "iPhone",
                systemVersion : "12.0",
                productName : "iPhone",
                screenSize : {width: 222, height:480},
                orientation : ORGDeviceORIENTATION.PORTRAIT
            };

            for ( var i = 0; i < count; i++ ) {
                const device = new ORGDevice(deviceInfo);
                this._devices.push(device);
            }
        }

        _showDevices() {

            var cols = Math.ceil(Math.sqrt(this._deviceCount));
            var rows = Math.floor(Math.sqrt(this._deviceCount));
            if ((this._deviceCount - (cols * rows)) % cols) {
                rows++;
            }

            for ( let i = 0; i < this._deviceCount;  i++) {

                var device = this._devices[i];

                var element = document.createElement( 'div' );
                element.className = 'element';
                element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

                var name = document.createElement( 'div' );
                name.className = 'devicename';
                name.textContent = device.name;
                element.appendChild( name );

                var screenshot = document.createElement( 'div' );
                const kMaxScreenshots = 9;
                screenshot.className = 'screenshot' + (Math.floor(Math.random() * kMaxScreenshots) + 1);
                screenshot.textContent = "";
                element.appendChild( screenshot );

                var details = document.createElement( 'div' );
                details.className = 'details';
                details.innerHTML = device.model + '<br>' + device.productName;
                element.appendChild( details );

                var object = new THREE.CSS3DObject( element );
                object.position.x = Math.random() * 4000 - 2000;
                object.position.y = Math.random() * 4000 - 2000;
                object.position.z = Math.random() * 4000 - 2000;
                this._THREECSSScene.add( object );

                this._objects.push( object );

                //
                var currentRow = Math.floor(i/cols);
                var currentCol = (i % cols);

                var object = new THREE.Object3D();
                const deviceWidth = device.screenSize.width;
                const deviceHeight = device.screenSize.height;
                const spaceX = 120;
                const spaceY = 70;
                object.position.x = currentCol*(deviceWidth+spaceX) - (cols*deviceWidth)/2 - ((cols-1)*spaceX)/2 ;
                object.position.y = -currentRow*(deviceHeight+spaceY) + (rows*deviceHeight)/2 - ((rows-1)*spaceY)/2 ;

                this._targets.table.push( object );

            }

            // sphere

            var vector = new THREE.Vector3();

            for ( let i = 0, l = this._objects.length; i < l; i ++ ) {

                const phi = Math.acos( -1 + ( 2 * i ) / l );
                const theta = Math.sqrt( l * Math.PI ) * phi;

                var object = new THREE.Object3D();

                object.position.x = 1900 * Math.cos( theta ) * Math.sin( phi );
                object.position.y = 1900 * Math.sin( theta ) * Math.sin( phi );
                object.position.z = 1900 * Math.cos( phi );

                vector.copy( object.position ).multiplyScalar( 3 );

                object.lookAt( vector );

                this._targets.sphere.push( object );
            }

            // helix

            var vector = new THREE.Vector3();

            for ( let i = 0, l = this._objects.length; i < l; i ++ ) {

                const phi = i * 0.275 + Math.PI;

                var object = new THREE.Object3D();

                object.position.x = 1900 * Math.sin( phi );
                object.position.y = - ( i * 28 ) + 850;
                object.position.z = 1900 * Math.cos( phi );

                vector.x = object.position.x * 2;
                vector.y = object.position.y;
                vector.z = object.position.z * 2;

                object.lookAt( vector );

                this._targets.helix.push( object );

            }

            // grid

            for ( let i = 0; i < this._objects.length; i ++ ) {

                var object = new THREE.Object3D();

                object.position.x = ( ( i % 5 ) * 400 ) - 800;
                object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 800 ) + 800;
                object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

                this._targets.grid.push( object );

            }

            this._transform( this._objects, this._targets.table, 2000 );
        }


         _transform( objects, targets, duration ) {

             const _this = this;
             TWEEN.removeAll();

             for ( let i = 0; i < objects.length; i ++ ) {

                 var object = objects[ i ];
                 var target = targets[ i ];

                 new TWEEN.Tween( object.position )
                     .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
                     .easing( TWEEN.Easing.Exponential.InOut )
                     .start();

                 new TWEEN.Tween( object.rotation )
                     .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
                     .easing( TWEEN.Easing.Exponential.InOut )
                     .start();

             }

             new TWEEN.Tween( this )
                 .to( {}, duration * 2 )
                 //.onUpdate( _this._render() )
                 .start();

         }


         _createPlaneWorld(size, position) {
             let texture = new THREE.TextureLoader().load( 'assets/img/worldmap-texture.png' );
             let geometry = new THREE.PlaneBufferGeometry(size.width, size.height, 1, 1);
             geometry.dynamic = true;
             let material = new THREE.MeshBasicMaterial({ map : texture , color: 0xffffff, side: THREE.DoubleSide, transparent: true});
             let worldPlane = new THREE.Mesh(geometry, material);
             worldPlane.position.copy(position);
             worldPlane.name = "plane-world";
             worldPlane.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-90)));
             worldPlane.geometry.computeBoundingBox();

             this._THREEScene.add(worldPlane);
             return worldPlane;
         }

         _createFloor(threeScene, floorSize, tileSize, yPos) {
             return new ORG3DSceneFloor(floorSize, tileSize, true, threeScene, yPos)
         }

         _createBars(threeScene, radius, positions) {
             var worldBars = []
             const kSegments = 24
             const kOpacity = 1.0
             const kMetalness = 0.7

             var material = new THREE.MeshStandardMaterial({ color: 0xEE1100, transparent: false, opacity: kOpacity, metalness: kMetalness })

             for (let position of positions) {
                 let geometry = new THREE.CylinderGeometry( radius, radius, position.y, kSegments)
                 let bar = new THREE.Mesh( geometry, material )
                 bar.position.y = position.y / 2.0
                 bar.position.x = position.x
                 bar.position.z = position.z
                 this._THREEScene.add(bar)
                 worldBars.push(bar)

             }

             //for (let x = -10; x <= 10; x += 0.5) {
             //    let bar = new THREE.Mesh( geometry, material )
             //    bar.position.y = height / 2.0
             //    bar.position.x = x
             //    this._THREEScene.add(bar)
             //    worldBars.push(bar)
             //}
             return worldBars
         }

         _createRacks() {
             var racks = []
             const mtlLoader = new THREE.MTLLoader()
             mtlLoader.setPath('assets/3DModels/ServerV2console/')
             mtlLoader.load('ServerV2+console.mtl', (materials) => {
                 materials.preload();
                 let objLoader = new THREE.OBJLoader();
                 objLoader.setMaterials(materials);
                 objLoader.setPath( 'assets/3DModels/ServerV2console/' )
                 objLoader.load('ServerV2+console.obj', (obj) => {
                     //this._THREEScene.add(obj);

                     const kDistanceX = 8.0
                     const kDistanceZ = 10.0
                     const kRacksPerRow = 50
                     for (let i= -kRacksPerRow/2; i<kRacksPerRow/2; i++) {
                         for (let j= -kRacksPerRow/2; j<kRacksPerRow/2; j++) {
                             let clone = obj.clone()
                             clone.position.set( kDistanceX*i, 0.0, kDistanceZ*j)
                             clone.rotation.set( 0.0, THREE.Math.degToRad( -90 ), 0.0 )
                             this._THREEScene.add(clone)
                             racks.push(clone)

                             clone = obj.clone()
                             clone.position.set( kDistanceX*i, 0.0, kDistanceZ*j-2.2)
                             clone.rotation.set( 0.0, THREE.Math.degToRad( 90 ), 0.0 )
                             this._THREEScene.add(clone)
                             racks.push(clone)
                         }
                     }
                 })
             })
             return racks
         }

         _resetCameraPosition(toPosition, lookAt, duration) {
             const _this = this;
             new TWEEN.Tween(this._scene.THREECamera.position).to({
                 x: toPosition.x,
                 y: toPosition.y,
                 z: toPosition.z}, duration)
                 .easing(TWEEN.Easing.Quadratic.InOut)
                 .onComplete(() => {
                  }).start();

             // TWEEN camera lookAt. But we can't do it setting camera.lookAt ! Due to collision with OrbitControls !
             // We must use the OrbitControl.target instead.
             new TWEEN.Tween(_this._scene.THREEOrbitControls.target).to({
                 x: lookAt.x,
                 y: lookAt.y,
                 z: lookAt.z}, duration)
                 .easing(TWEEN.Easing.Quadratic.InOut)
                 .start();
         }

     }

