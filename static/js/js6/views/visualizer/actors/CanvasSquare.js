define([
    "views/visualizer/actors/CanvasActor"
], function(CanvasActor){
    class CanvasSquare extends CanvasActor{
        static getActorParameters(){
            return super.getActorParameters().concat(["sizeX", "sizeY"]);
        }

        constructor(actorData, inputBuffer, options){
            super(actorData, inputBuffer);
        }

        renderFrame(context, width, height){
            context.fillStyle = this._getUnprocessedParameter("color");
            var sizeX = this._getParameter("sizeX", {canvasDimension: width});
            var sizeY = this._getParameter("sizeY", {canvasDimension: height});
            var {posX, posY} = this._getPositionCoords(width, height);
            context.fillRect(posX, posY, sizeX, sizeY);
        }
    }
    
    return CanvasSquare;
});