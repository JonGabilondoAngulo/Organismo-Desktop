/**
 * Created by jongabilondo on 08/11/2017.
 */


class ORG3DMemoryChart extends ORG3DPieChart {

    constructor( data ) {

        const kRadius = 0.02;
        const kThickness = 0.002;
        const kMetalness = 0.7;
        const kLabelLeftOffset = 0.025;
        const kFontSize = 0.006;
        const kFontHeight = 0.002;
        const kCurveSegments = 16;
        const kLabelsGap = 0.01;

        const kTotalMemory =  parseInt( data["TotalMemory"] );
        var kFreeMemoryPercent =  parseFloat( data["FreeMemory (Formatted)"] ) / 100.0;
        const kFreeMemoryRaw =  parseFloat( data["FreeMemory (Not Formatted)"] );
        var kUsedMemoryPercent =  parseFloat( data["UsedMemory (Formatted)"] ) / 100.0;
        const kUsedMemoryRaw =  parseFloat( data["UsedMemory (Not Formatted)"] );
        var kActiveMemoryPercent =  parseFloat( data["ActiveMemory (Formatted)"] ) / 100.0;
        const kActiveMemoryRaw =  parseFloat( data["ActiveMemory (Not Formatted)"] );
        var kInactiveMemoryPercent =  parseFloat( data["InactiveMemory (Formatted)"] ) / 100.0;
        const kInactiveMemoryRaw =  parseFloat( data["InactiveMemory (Not Formatted)"] );
        var kWiredMemoryPercent =  parseFloat( data["WiredMemory (Formatted)"] ) / 100.0;
        const kWiredMemoryRaw =  parseFloat( data["WiredMemory (Not Formatted)"] );
        var kPurgableMemoryPercent =  parseFloat( data["PurgableMemory (Formatted)"] ) / 100.0;
        const kPurgableMemoryRaw =  parseFloat( data["PurgableMemory (Not Formatted)"] );

        const totalPercent = kFreeMemoryPercent + kUsedMemoryPercent + kActiveMemoryPercent + kInactiveMemoryPercent +  kWiredMemoryPercent + kPurgableMemoryPercent;
        const overshootCorrection = 1.0 / totalPercent;
        kFreeMemoryPercent *= overshootCorrection;
        kUsedMemoryPercent *= overshootCorrection;
        kActiveMemoryPercent *= overshootCorrection;
        kInactiveMemoryPercent *= overshootCorrection;
        kWiredMemoryPercent *= overshootCorrection;
        kPurgableMemoryPercent *= overshootCorrection;

        super( kRadius, kThickness, [
            {"percent": kFreeMemoryPercent, "color": 0x0099CC, "tooltip": "Free Memory \r" +  kFreeMemoryRaw / 1024 + " MB\r" + kFreeMemoryPercent + " %"},
            {"percent": kUsedMemoryPercent, "color": 0xFFDC00, "tooltip": "Free Memory \r" +  kUsedMemoryRaw / 1024 + " MB\r" + kUsedMemoryPercent + " %" },
            {"percent": kActiveMemoryPercent, "color": 0xFF9933, "tooltip": "Free Memory \r" +  kActiveMemoryRaw / 1024 + " MB\r" + kActiveMemoryPercent + " %" },
            {"percent": kInactiveMemoryPercent, "color": 0xFF3333, "tooltip": "Free Memory \r" +  kInactiveMemoryRaw / 1024 + " MB\r" + kInactiveMemoryPercent + " %" },
            {"percent": kWiredMemoryPercent, "color": 0x99CC33, "tooltip": "Free Memory \r" +  kWiredMemoryRaw / 1024 + " MB\r" + kWiredMemoryPercent + " %" },
            {"percent": kPurgableMemoryPercent, "color": 0x1767676, "tooltip": "Free Memory \r" +  kPurgableMemoryRaw / 1024 + " MB\r" + kPurgableMemoryPercent + " %" }
            ]);

        // Labels
        var textGeometry = new THREE.TextGeometry( "RAM: " + kTotalMemory + "MB", {
            font: ORG.font_helvetiker_regular,
            size: kFontSize,
            height: kFontHeight,
            curveSegments: kCurveSegments
        });
        var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: kMetalness}));
        textMesh.translateX( kLabelLeftOffset );
        textMesh.rotateX( 0.8 * Math.PI );
        this.THREEModel.add( textMesh );

        const percentFixed = kFreeMemoryPercent * 100;
        textGeometry = new THREE.TextGeometry( "Free: " + percentFixed.toFixed( 2 ) + "%", {
            font: ORG.font_helvetiker_regular,
            size: kFontSize,
            height: kFontHeight,
            curveSegments: kCurveSegments
        });
        textMesh = new THREE.Mesh( textGeometry, new THREE.MeshStandardMaterial({color: 0xeeeeee, metalness: kMetalness}));
        textMesh.translateX( kLabelLeftOffset );
        textMesh.rotateX( 0.8 * Math.PI );
        textMesh.translateY( -kLabelsGap );
        this.THREEModel.add( textMesh );


    }
}