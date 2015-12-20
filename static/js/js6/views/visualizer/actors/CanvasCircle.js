define([
    "views/visualizer/actors/CanvasActor"
], function(CanvasActor){
    class CanvasCircle extends CanvasActor{
        static getActorParameters(){
            return super.getActorParameters().concat(["size"]);
        }

        constructor(actorData, inputBuffer, options, inputType){
            super(actorData, inputBuffer, options, inputType);
        }

        _renderCircle(context, posX, posY, radius){
            context.fillStyle = this._getUnprocessedParameter("color");
            context.beginPath();
            context.ellipse(posX, posY, radius, radius, 0, 0, 2 * Math.PI);
            context.fill();
        }

        renderFrame(context, width, height){
            var radius = this._getParameter("size");
            var {posX, posY} = this._getPositionCoords(width, height);
            this._renderCircle(context, posX, posY, radius);
        }
    }
    
    return CanvasCircle;
});
