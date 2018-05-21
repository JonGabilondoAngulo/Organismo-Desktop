/**
 * Created by jongabilondo on 27/07/2016.
 */

class ORGTooltip {

    constructor( canvasDomElement ) {
        this._threeCanvasDomElement = canvasDomElement;
        this._hilitedObj = null;
        this._tooltipOpen = false;

        $(this._threeCanvasDomElement).uitooltip({
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
        //$( this._threeCanvasDomElement ).uitooltip( "open" );
        //$( this._threeCanvasDomElement ).uitooltip( "disable" );
        this._tooltipOpen = true;
    }

    destroy() {
        if (this._threeCanvasDomElement) {
            $( this._threeCanvasDomElement ).uitooltip( "destroy" );
        }
    }

    // DELEGATE METHOD Gets called when hilite must change
    mouseOverElement( threeElement ) {
        if ( !!threeElement ) {
            // Mouse is over some UI element

            // if (this._tooltipOpen) {
            //     $( this._threeCanvasDomElement ).uitooltip( "enable" );
            // }

            var mustShowTip = false;
            if ( !this._hilitedObj) {
                mustShowTip = true;
            } else if ( this._hilitedObj.id != threeElement.id ) {
                mustShowTip = true;
            }

            if ( mustShowTip ) {
                console.log(threeElement.parent.userData.class);
                this._show( threeElement.parent.userData );
            }

            //updatePosition();
        } else  {
            //this._hide(); // Mouse is NOT over any UI element
            if (this._tooltipOpen) {
               //$( this._threeCanvasDomElement ).uitooltip( "disable" );
               $( this._threeCanvasDomElement ).uitooltip( "option", "content", "<span class='ui-tooltip-value'>Roll over element</span>" );
            }
        }
    }

    // PRIVATE

    _show( elementInfo ) {
        if (this._tooltipOpen) {
            $( this._threeCanvasDomElement ).uitooltip( "option", "content", this._createTooltipContent(elementInfo) );
            $( this._threeCanvasDomElement ).uitooltip( "enable" );
            //$( this._threeCanvasDomElement ).uitooltip( "option", "track", true );
            // $( this._threeCanvasDomElement ).uitooltip( "option", "position", { using: function(pos,b) {
            //     console.log(pos);
            //     console.log(b);
            //     pos.left = 300;
            //     pos.top = 300;
            //     $(this).css(pos);
            // } } );
        } else {
            // $(this._threeCanvasDomElement).uitooltip({
            //     items: $(this._threeCanvasDomElement),
            //     content: this._createTooltipContent(elementInfo),
            //     track: true,
            //     open: function( event, ui ) {
            //         console.log( ui );
            //     },
            //     create: function( event, ui ) {
            //         console.log( ui );
            //     }
            // });
            //$( _threeCanvasDomElement ).uitooltip( "option", "content", createTooltipContent(elementInfo) );
            //$( this._threeCanvasDomElement ).uitooltip( "open" );
            //this._tooltipOpen = true;
        }
    }

    _hide() {
        if ( this._tooltipOpen) {
            //$( _threeCanvasDomElement ).uitooltip( "close" );
            //$( _threeCanvasDomElement ).uitooltip( "option", "content", null );
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


            content += "<br><span class='ui-tooltip-key'>" + key + ": </span>" + "<span class='ui-tooltip-value'>" + elementInfo[key] + "</span>";
        }
        return content += "</div>";
    }

    _serializeDictionary( dictionary ) {
        var content = "";
        for (let key in dictionary){
            content += "<br><span class='ui-tooltip-key'>" + key + ": </span>" + "<span class='ui-tooltip-value'>" + dictionary[key] + "</span>";
        }
        return content;
    }

    _serializeBounds( dictionary ) {
        var content = "x:" + dictionary.left + " y:" + dictionary.top.toString() + " w:" + (dictionary.right-dictionary.left).toString() + " h:" + (dictionary.bottom-dictionary.top).toString();
        return content;
    }

    _serializeGestures( gestures ) {
        var content = "";
        for ( var i=0; i<gestures.length; i++ ) {
            content += this._serializeGesture( gestures[i] );
        }
        return content;
    }

    _serializeGesture( gesture ) {
        var content = "";
        for (var key in gesture) {
            if ( content.length) {
                content += ", ";
            }
            content += key + ":" + gesture[key];
        }
        return "[" + content + "]";
    }

    _serializeSegues( segues ) {
        var content = "";
        for ( let i=0; i<segues.length; i++ ) {
            content += this._serializeSegue( segues[i] );
        }
        return content;
    }

    _serializeSegue( segue ) {
        var content = "";
        for (let key in segue) {
            if ( content.length) {
                content += ", ";
            }
            content += key + ":" + segue[key];
        }
        return "[" + content + "]";
    }

    _serializeStrings( strings ) {
        var content = "";
        for ( var i=0; i<strings.length; i++ ) {
            content += (content.length ?", " :"") + strings[i];
        }
        return content;
    }

}