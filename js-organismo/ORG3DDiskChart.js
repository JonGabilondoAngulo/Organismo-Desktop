/**
 * Created by jongabilondo on 08/11/2017.
 */


class ORG3DDiskChart extends ORG3DPieChart {

    constructor( data ) {

        const radius = 0.02;
        const thickness = 0.002;
        const fontSize = 0.006;
        const fontHeight = 0.002;
        const curveSegments = 16;
        const labelLeftOffset = 0.025;
        const labelsGap = 0.01;
        const freeSpacePercentString = data["FreeDiskSpace (Formatted)"]; //  format : "50%"
        const freePercent = parseFloat( freeSpacePercentString.substring( 0, freeSpacePercentString.length - 1 )) / 100.0;
        const usedPercent = 1.0 - freePercent;

        super( radius, thickness, [
            {"percent": usedPercent, "color": 0xFF0011, "tooltip": "Used " +  data.usedDiskSpaceinPercent },
            {"percent": freePercent, "color": 0x22FF11, "tooltip": "Free: " +  freeSpacePercentString +  data["FreeDiskSpace (Not Formatted)"] }
            ]);


        // Labels
        var textGeometry = new THREE.TextGeometry( "Disk: " + data["DiskSpace"], {
            font: ORG.font_helvetiker_regular,
            size: fontSize,
            height: fontHeight,
            curveSegments: curveSegments
        });
        textGeometry.computeFaceNormals();
        var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: 0.7}));
        textMesh.rotateX( 0.8 * Math.PI );
        textMesh.translateX( labelLeftOffset );
        this.THREEModel.add( textMesh );

        textGeometry = new THREE.TextGeometry( "Free: " + freeSpacePercentString + " " +  data["FreeDiskSpace (Not Formatted)"], {
            font: ORG.font_helvetiker_regular,
            size: fontSize,
            height: fontHeight,
            curveSegments: curveSegments
        });
        textGeometry.computeFaceNormals();
        textMesh = new THREE.Mesh( textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: 0.7 }));
        textMesh.rotateX( 0.8 * Math.PI );
        textMesh.translateX( labelLeftOffset );
        textMesh.translateY( -labelsGap );
        this.THREEModel.add( textMesh );
    }
}