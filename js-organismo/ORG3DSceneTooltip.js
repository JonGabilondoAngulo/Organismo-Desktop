/**
 * Created by jongabilondo on 12/11/2017.
 */


class ORG3DSceneTooltip {

    constructor( canvasDomElement ) {

        this._threeCanvasDomElement = canvasDomElement;
        this._tooltipOpen = false;

        $( this._threeCanvasDomElement ).uitooltip({
            items: $(this._threeCanvasDomElement),
            content: "Roll over element",
            track: true,
            open: function( event, ui ) {
                console.log( ui );
            },
            create: function( event, ui ) {
                console.log( ui );
            }
        });
        this._tooltipOpen = true;

    }

    destroy() {

        if (this._threeCanvasDomElement) {
            $( this._threeCanvasDomElement ).uitooltip( "destroy" );
        }

    }

    // DELEGATE METHOD

    mouseOverElement( threeElement ) {

        if ( !!threeElement ) {

            var mustShowTip = false;
            if ( !this._hilitedObj) {
                mustShowTip = true;
            } else if ( this._hilitedObj.id != threeElement.id ) {
                mustShowTip = true;
            }

            if ( mustShowTip ) {
                //console.log(threeElement.parent.userData.class);
                this._show( threeElement.parent.userData );
            }

        } else  {
            if (this._tooltipOpen) {
                $( this._threeCanvasDomElement ).uitooltip( "option", "content", "<span class='ui-tooltip-value'>Roll over element</span>" );
            }
        }

    }

    // PRIVATE

    _show( elementInfo ) {

        if ( this._tooltipOpen ) {
            $( this._threeCanvasDomElement ).uitooltip( "option", "content", this._createTooltipContent(elementInfo) );
            $( this._threeCanvasDomElement ).uitooltip( "enable" );
        } else {
        }

    }

    _hide() {

        if ( this._tooltipOpen) {
            $( this._threeCanvasDomElement ).uitooltip( "destroy" );
            this._tooltipOpen = false;
        }

    }

    _createTooltipContent( elementInfo) {

        if (!elementInfo) {
            return "";
        }

        var content = "<div>" + elementInfo.class;
        for (let key in elementInfo){
            if ( key == "screenshot" || key == "class" || key == "subviews" || key == "threeObj" || key == "originalWorldZPosition" || key == "zPosition") {
                continue;
            }

            if ( key == "accessibility") {
                content += this._serializeDictionary( elementInfo[key] );
                continue;
            }

            if ( key == "bounds" ) {
                content += "<br><span class='ui-tooltip-key'>bounds: </span>" + "<span class='ui-tooltip-value'>" + this._serializeBounds( elementInfo[key] ) + "</span>";
                continue;
            }

            if ( key == "gestures") {
                content += "<br><span class='ui-tooltip-key'>gestures: </span>" + "<span class='ui-tooltip-value'>" + this._serializeGestures( elementInfo[key] ) + "</span>";
                continue;
            }

            if ( key == "segues") {
                content += "<br><span class='ui-tooltip-key'>segues: </span>" + "<span class='ui-tooltip-value'>" + this._serializeSegues( elementInfo[key] ) + "</span>";
                continue;
            }

            if ( key == "controlEvents") {
                content += "<br><span class='ui-tooltip-key'>controlEvents: </span>" + "<span class='ui-tooltip-value'>" + this._serializeStrings( elementInfo[key] ) + "</span>";
                continue;
            }

            if ( key == "targets") {
                content += "<br><span class='ui-tooltip-key'>targets: </span>" + "<span class='ui-tooltip-value'>" + this._serializeStrings( elementInfo[key] ) + "</span>";
                continue;
            }

            if ( key == "pointer") {
                content += "<br><span class='ui-tooltip-key'>pointer: </span>" + "<span class='ui-tooltip-value'>" + elementInfo[key] + "</span>";
                continue;
            }

            content += "<br><span class='ui-tooltip-key'>" + key + ": </span>" + "<span class='ui-tooltip-value'>" + elementInfo[key] + "</span>";
        }
        return content += "</div>";
    }

}