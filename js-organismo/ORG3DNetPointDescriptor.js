/**
 * Created by jongabilondo on 15/03/2018.
 */


class ORG3DNetPointDescriptor {

    constructor() {
        this._model = this._createaModel(0);
    }

    get model() {
        return this._model;
    }

    get location() {
        return (this._model ?this._model.position :null)
    }

    set position(position) {
        if (this._model) {
            this._model.position.copy(position);
        }
    }

    // PRIVATE

    _createaModel() {
        //let spritey = this._makeTextSprite( "www.google.com" , { fontsize: 12, backgroundColor: {r:0, g:0, b:0, a:1}, fontColor: {r:255, g:255, b:255, a:1} } );
        //return spritey;

        let texture = new THREE.TextTexture({
            text: 'www.google.com\nRequests: 134\n2356K Bytes',
            fontStyle: 'italic',
            fontSize: 32,
            fontFamily: '"Times New Roman", Times, serif',
        });
        let material = new THREE.SpriteMaterial({map: texture, color: 0xffffbb});
        let sprite = new THREE.Sprite(material);
        sprite.scale.setX(texture.aspect).multiplyScalar(10);
        return sprite;
    }

    /*_makeTextSprite( message, parameters ) {
        if ( parameters === undefined ) parameters = {};

        var fontface = parameters.hasOwnProperty("fontface") ?
            parameters["fontface"] : "Arial";

        var fontsize = parameters.hasOwnProperty("fontsize") ?
            parameters["fontsize"] : 10;

        var borderThickness = parameters.hasOwnProperty("borderThickness") ?
            parameters["borderThickness"] : 1;

        var borderColor = parameters.hasOwnProperty("borderColor") ?
            parameters["borderColor"] : { r:200, g:200, b:200, a:1.0 };

        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
            parameters["backgroundColor"] : { r:25, g:25, b:25, a:1.0 };

        var fontColor = parameters.hasOwnProperty("fontColor") ?
            parameters["fontColor"] : { r:255, g:255, b:255, a:1.0 };

        //var spriteAlignment = parameters.hasOwnProperty("alignment") ?
        //	parameters["alignment"] : THREE.SpriteAlignment.topLeft;

        //var spriteAlignment = THREE.SpriteAlignment.topLeft;


        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;

        // get size data (height depends only on font size)
        var metrics = context.measureText( message );
        var textWidth = metrics.width;
        //var textHeight = metrics.height;

        // background color
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
            + backgroundColor.b + "," + backgroundColor.a + ")";
        // border color
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
            + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        this._roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
        // 1.4 is extra height factor for text below baseline: g,j,p,q.

        // text color
        context.fillStyle = "rgba(" + fontColor.r + "," + fontColor.g + ","
            + fontColor.b + "," + fontColor.a + ")";

        context.fillText(message, borderThickness, fontsize + borderThickness);

        // canvas contents will be used for a texture
        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
        var sprite = new THREE.Sprite( spriteMaterial );
        //sprite.scale.set(50,25,1.0);
        return sprite;
    }

    _roundRect(ctx, x, y, w, h, r)
    {
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+r);
        ctx.lineTo(x+w, y+h-r);
        ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        ctx.lineTo(x+r, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-r);
        ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }*/

}