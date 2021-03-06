define([
    "views/visualizer/actors/CanvasActor",
    "views/visualizer/actors/CanvasCircle"
], function(CanvasActor, CanvasCircle){
    class CanvasCircleChord extends CanvasCircle{
        constructor(actorData, inputBuffer, options){
            super(actorData, inputBuffer, options, "chord");
        }

        renderFrame(context, width, height){
            var activeNotes = this._getActiveNotes();
            for(let note of activeNotes){
                var radius = this._getParameter("size", {note: note});
                var {posX, posY} = this._getPositionCoords(width, height, note);
                this._renderCircle(context, posX, posY, radius);
            }
        }
    }
    
    return CanvasCircleChord;
});
