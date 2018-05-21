/**
 * Created by jongabilondo on 15/03/2018.
 */

class ORG3DNetPoint {

    constructor(text, position) {
        // sphere
        // tube
        // billboard
        this._sphere = this._createaSphere(0.2, position);
        const textPosition = new THREE.Vector3(position.x, position.y + 0.2, position.z);
        this._descriptor = this._createDescriptor(text, position);

        this._netPointGroup = new THREE.Group();
        this._netPointGroup.name = "ORG.NetPoint.Group";
        this._netPointGroup.add(this._sphere);
        this._netPointGroup.add(this._descriptor);
    }

    get model() {
        return this._netPointGroup;
    }

    get position() {
        return {x: 0, y: 0, z: 0};
    }

    // PRIVATE

    _createaSphere(radius, position) {
        let sphere;
        const wSegments = 22;
        const hSegments = 22;

        let geometry = new THREE.SphereGeometry(radius, wSegments, hSegments);
        let material = new THREE.MeshPhongMaterial({ color: 0x771122 });
        sphere = new THREE.Mesh(geometry, material);
        sphere.name = "ORG.NetPoint.Sphere";
        sphere.position.copy(position);
        return sphere;
    }

    _createDescriptor(text, position) {
        const kMetalness = 0.7;
        const billboardPosition = position || new THREE.Vector3(0, 0, 0);
        let texture = new THREE.TextTexture({
            text: text,
            fontStyle: 'italic',
            fontSize: 32,
            fontFamily: '"Times New Roman", Times, serif',
        });
        let material = new THREE.SpriteMaterial({map: texture, color: 0xffffbb, metalness: kMetalness});
        let sprite = new THREE.Sprite(material);
        sprite.scale.setX(texture.aspect).multiplyScalar(0.2);

        const pos = new THREE.Vector3(position.x, sprite.getWorldScale().y / 2 + position.y, position.z);

        sprite.position.copy(pos);
        return sprite;
    }


    /*_createaModel(radius) {
        const wSegments = 22;
        const hSegments = 22;

        let coreGeometry = new THREE.SphereGeometry(radius, wSegments, hSegments);
        let coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x771122
        });
        this._coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
        this._coreMesh.name = "ORG.NetPoint.Mesh"

        let netPointGroup = new THREE.Group();
        netPointGroup.name = "ORG.NetPoint.Group";
        netPointGroup.add(this._coreMesh);

        return netPointGroup;
    }*/
}