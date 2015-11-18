define([
    "views/visualizer/actors/CanvasActor"
], function(CanvasActor){
    class CanvasCircle extends CanvasActor{
        static getActorParameters(){
            return super.getActorParameters().concat(["size"]);
        }

        constructor(actorData, inputBuffer, options){
            super(actorData, inputBuffer);
        }

        renderFrame(context, width, height){
            context.fillStyle = this._getUnprocessedParameter("color");
            var radius = this._getParameter("size");
            var {posX, posY} = this._getPositionCoords(width, height);

            context.beginPath();
            context.ellipse(posX, posY, radius, radius, 0, 0, 2 * Math.PI);
            context.fill();
        }
    }
    
    return CanvasCircle;
});
