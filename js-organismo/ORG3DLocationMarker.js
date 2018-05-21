/**
 * Created by jongabilondo on 15/05/2017.
 */

/**
 * Wrapper class to create and handle the 3D location marker and the 3D description text in the 3D scene.
 */
class ORG3DLocationMarker {

    constructor(anchorPoint, text, threeScene) {
        this._kCoreAnimationScale = 0.3;
        this._kCoreAnimationTime = 1000; //ms
        this._descriptor = null;
        this._marker = null;

        this._anchorPoint = anchorPoint;
        this._THREEScene = threeScene;

        this._marker = this._createMarker(this._anchorPoint);
        this._THREEScene.add(this._marker);

        this.updateDescriptor(text);

        this._scaleDown().start();
    }

    destructor() {
        this._removeMarker();
        this._removeDescriptor();
    }

    updateDescriptor(text) {
        if (!this._THREEScene) {
            return;
        }
        this._removeDescriptor();
        this._descriptor = this._createDescriptor(text);
        this._THREEScene.add(this._descriptor);
    }

    setPosition(position) {
        if (this._marker) {
            this._marker.position.copy(position);
        }
        this._placeDescriptor(this._descriptor);
    }


    //------------
    // PRIVATE
    //-------------

    _createMarker(anchorPoint) {
        const kRadiusTop = 0.01;
        const kRadiusBottom = kRadiusTop;
        const kHeight = kRadiusTop * 0.3;
        const kRadialSegments = 30;
        const kHeightSegments = 1;
        const kOpenEnded = false;
        const cylinderGeo = new THREE.CylinderGeometry(kRadiusTop, kRadiusBottom, kHeight, kRadialSegments, kHeightSegments, kOpenEnded);
        let material = new THREE.MeshPhongMaterial({ color: 0x0000ee });
        material.side = THREE.DoubleSide;
        //let marker = THREE.SceneUtils.createMultiMaterialObject(cylinderGeo, [meshMaterial]);
        let marker = new THREE.Mesh(cylinderGeo, material);
        marker.position.copy(anchorPoint);
        return marker;
    }

    _createDescriptor(address) {
        const kFontSize = 0.01;
        const kFontHeight = kFontSize * 0.2;
        const kBevelThickness = kFontSize * 0.1;
        const kBevelSize = kFontSize * 0.1;
        const addressGeom = new THREE.TextGeometry(address, {
            font: ORG.font_helvetiker_regular,
            size: kFontSize,
            height: kFontHeight,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: kBevelThickness,
            bevelSize: kBevelSize,
            bevelSegments: 5
        });

        const material = new THREE.MeshPhongMaterial({color: 0xeeeeee});
        const textMesh = new THREE.Mesh(addressGeom, material);
        this._placeDescriptor(textMesh);
        return textMesh;
    }

    _removeMarker() {
        if (this._THREEScene && this._marker) {
            this._THREEScene.remove(this._marker);
            this._marker = null;
        }
    }

    _removeDescriptor() {
        if (this._THREEScene && this._descriptor) {
            this._THREEScene.remove(this._descriptor);
            this._descriptor = null;
        }
    }

    _placeDescriptor(textMesh) {
        if (this._marker && textMesh) {
            this._marker.geometry.computeBoundingBox();
            const markerRadius = this._marker.geometry.boundingBox.getSize().z;

            //textMesh.position.set( 0, 0, 0 );
            textMesh.updateMatrix();
            textMesh.geometry.computeBoundingBox();
            const textSizeX = textMesh.geometry.boundingBox.getSize().x;
            textMesh.position.set(
                this._marker.position.x - textSizeX/2,
                this._marker.position.y,
                this._marker.position.z + markerRadius + textMesh.geometry.boundingBox.getSize().y);
            textMesh.rotation.set(THREE.Math.degToRad( -90 ), 0, 0);
        }
    }

    _scaleUp() {
        if (!this._marker) {
            return null;
        }
        const _this = this;
        return new TWEEN.Tween(this._marker.scale).to ({
            x : 1,
            y : 1,
            z : 1
        }, this._kCoreAnimationTime).onUpdate( () => {
            //
        }).onComplete( () => {
            let tween = _this._scaleDown();
            if (tween) {
                tween.start();
            }
        })
    }

    _scaleDown() {
        if (!this._marker) {
            return null;
        }
        const _this = this;
        return new TWEEN.Tween(this._marker.scale).to ({
            x : this._kCoreAnimationScale,
            y : 1,
            z : this._kCoreAnimationScale
        }, this._kCoreAnimationTime).onUpdate( function()  {
            //
        }).onComplete( function()  {
            let tween = _this._scaleUp();
            if (tween) {
                tween.start();
            }
        })
    }
}