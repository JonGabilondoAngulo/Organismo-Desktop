/**
 * Created by jongabilondo on 08/11/2017.
 */


class ORG3DBattery {

    constructor(radius, height, percent) {
        this._THREEModel = this._createModel( radius, height, percent );
    }

    get THREEModel() {
        return this._THREEModel;
    }

    set position(position) {
        if ( this._THREEModel ) {
            this._THREEModel.position.copy( position );
        }
    }

    // PRIVATE

    _createModel(radius, batteryHeight, percent) {

        const kSegments = 24;
        const kGreenHeight = batteryHeight * percent;
        const kRedHeight = batteryHeight * (1 - percent);
        const kOpacity = 0.75;
        const kFontSize = 0.005;
        const kFontHeight = 0.002;
        const kCurveSegments = 16;
        const kMetalness = 0.7;

        // Group
        var group = new THREE.Group();
        group.name = "ORG.Battery.Group";

        // Bottom green
        var geometry = new THREE.CylinderGeometry( radius, radius, kGreenHeight, kSegments);
        var material = new THREE.MeshStandardMaterial({ color: 0x00FF00, transparent: true, opacity: kOpacity, metalness: kMetalness });
        var greenMesh = new THREE.Mesh( geometry, material );
        greenMesh.name = "ORG.Battery.Green.Mesh";
        group.add( greenMesh );

        // Upper red
        if ( percent < 1.0 ) {
            geometry = new THREE.CylinderGeometry( radius, radius, kRedHeight, kSegments);
            material = new THREE.MeshStandardMaterial({  color: 0xFF0000, transparent: true, opacity: kOpacity, metalness: kMetalness });
            var redMesh = new THREE.Mesh( geometry, material );
            redMesh.name = "ORG.Battery.Red.Mesh";
            redMesh.translateY( (kGreenHeight + kRedHeight) / 2.0 + 0.0001 );
            group.add( redMesh );
        }

        // Label
        var textGeometry = new THREE.TextGeometry(Math.floor(percent * 100) + "%", {
            font: ORG.font_helvetiker_regular,
            size: kFontSize,
            height: kFontHeight,
            curveSegments: kCurveSegments
        });
        var textMesh = new THREE.Mesh(textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: kMetalness }));
        const labelPosition = this._calculatePositionForLabel(textMesh, batteryHeight, kFontSize);
        textMesh.position.copy(labelPosition);
        group.add( textMesh );

        return group;
    }

    _calculatePositionForLabel(textMesh, batteryHeight, fontSize) {

        textMesh.geometry.computeBoundingBox();
        const bbox = textMesh.geometry.boundingBox;
        return new THREE.Vector3( -bbox.getSize().x / 2.0, batteryHeight / 2.0 + fontSize, 0);

    }
}