/**
 * Created by jongabilondo on 14/11/2017.
 */

class ORG3DCPUUsageBarChart {

    constructor( barSize ) {

        this._barSize = barSize;
        this._barCount = 0;
        this._THREEGroup = new THREE.Group();

    }

    get THREEModel() {

        return this._THREEGroup;

    }

    set position( position ) {

        if ( this._THREEGroup ) {
            this._THREEGroup.position.copy( position );
        }

    }

    usageUpdate( usageData ) {

        const usagePercent = parseFloat( usageData["CPUUsage"] ) / 100;
        this._createBar( usagePercent );

    }

    _createBar( usagePercent ) {

        const kColor = 0xFFEEFF;
        const kMetalness = 0.7;
        const kBarHeight = this._barSize.y * usagePercent;
        const kBarGap = 0.0005;

        var geometry = new THREE.CubeGeometry( this._barSize.x, kBarHeight ,this._barSize.z );
        var material = new THREE.MeshStandardMaterial( {color: kColor, metalness: kMetalness} );
        var bar = new THREE.Mesh( geometry, material );
        bar.translateX( - ( (this._barCount * this._barSize.x) + ( kBarGap * (this._barCount - 1))) );
        bar.translateY( kBarHeight / 2.0 );
        this._THREEGroup.add( bar );
        this._THREEGroup.translateX( this._barSize.x + kBarGap);
        this._barCount++;

    }
}