define([
    "views/visualizer/actors/Actor"
], function(Actor){

    class CanvasActor extends Actor{
        constructor(actorData, inputBuffer, options, inputChannelsType){
            super(actorData, inputBuffer, options, inputChannelsType);  
        }

        _getAnchorPosition(width, height){
            switch(this._getUnprocessedParameter("posAnchor")){
                case "top":
                    return {
                                anchorX: width/2,
                                anchorY: 0
                            };
                case "bottom":
                    return {
                                anchorX: width/2,
                                anchorY: height
                            };
                case "left":
                    return {
                                anchorX: 0,
                                anchorY: height/2
                            };
                case "right":
                    return {
                                anchorX: width,
                                anchorY: height/2
                            };
                case "top_left":
                    return {
                                anchorX: 0,
                                anchorY: 0
                            };
                case "top_right":
                    return {
                                anchorX: width,
                                anchorY: 0
                            };
                case "bottom_left":
                    return {
                                anchorX: 0,
                                anchorY: height
                            };
                case "bottom_right":
                    return {
                                anchorX: width,
                                anchorY: height
                            };
                case "center":
                    return {
                                anchorX: width/2,
                                anchorY: height/2
                            }
            }
        }

        _getPositionCoords(width, height, note){
            var {anchorX, anchorY} = this._getAnchorPosition(width, height);
            switch(this._getUnprocessedParameter("posType")){
                case "percent":
                    return {
                        posX: anchorX + (this._getParameter("posX", {note: note}) * width),
                        posY: anchorY + (this._getParameter("posY", {note: note}) * height)
                    };
                case "absolute":
                    return {
                        posX: anchorX + this._getParameter("posX", {note: note}),
                        posY: anchorY + this._getParameter("posY", {note: note})
                    };
            }
        }

        _getParameter(paramName, options){
            options = options || {};
            _.defaults(options, {
                canvasDimension: undefined,
                note: undefined
            });
            var originalResult = super._getParameter(paramName, options.note);
            if(options.canvasDimension && originalResult <= 100 && originalResult >= 0){
                return (originalResult/100) * options.canvasDimension;
            }else{
                return originalResult;
            }
        }

    }

    return CanvasActor;
});
