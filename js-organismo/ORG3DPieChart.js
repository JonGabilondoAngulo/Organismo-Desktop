/**
 * Created by jongabilondo on 08/11/2017.
 */


class ORG3DPieChart {

    constructor( radius, height, sectorsDescription ) {

        this._THREEModel = this._createModel( radius, height, sectorsDescription);

    }

    get THREEModel() {

        return this._THREEModel;

    }

    set position( position ) {

        if ( this._THREEModel ) {
            this._THREEModel.position.copy( position );
        }

    }

    // PRIVATE

    _createModel( radius, height, sectorsDescription) {

        const kSegments = 24;

        // Group
        var group = new THREE.Group();
        group.name = "ORG.Chart.Group";

        // build every sector
        var startAngle = 0;
        var sectorDesc;
        var rotationAngle;
        var sectorMesh;

        for (let sectorDesc of sectorsDescription) {
            rotationAngle = sectorDesc.percent * 2 * Math.PI;
            sectorMesh = this._createSector( radius, height, kSegments, startAngle, rotationAngle, sectorDesc.color);
            sectorMesh.name = "ORG.Chart.Sector";
            sectorMesh.ORGData = { "tooltip": sectorDesc.tooltip };
            group.add( sectorMesh );
            startAngle += rotationAngle;
        }

        group.rotateX( 1.15 * Math.PI ); // some rotation for better visuals
        return group;
    }

    _createSector( radius, height, segments, startAngle, endAngle, color) {

        var geometry = new THREE.CylinderGeometry( radius, radius, height, segments, 1, false, startAngle, endAngle );
        var material = new THREE.MeshStandardMaterial({ color: color, metalness: 0.5 });
        return new THREE.Mesh( geometry, material );

    }
}