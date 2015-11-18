define([
        "views/visualizer/actors/Actor",
        "views/visualizer/layers/Layer"
],function(Actor, Layer){

    class CanvasLayer extends Layer{
        static getAvailableActorsClasses(){
            //Even if right now it's not, one day this will be async
            //It will ask the server to check what classes are in the actors folder
            //Because adding actors will be part of creative processes that should not require code change to the main app
            var dfd = $.Deferred();
            dfd.resolve([
                    "CanvasCircle"
                ]);
            return dfd;
        }

        constructor(layerData, config, inputBuffer){
            super(layerData, config, inputBuffer);
        }

        render($stageElement){
            super.render($stageElement);
            this._width = $stageElement.width();
            this._height = $stageElement.height();

            this._canvasElement = document.createElement('canvas');
            this._canvasElement.width = this._width;
            this._canvasElement.height = this._height;
            $stageElement[0].appendChild( this._canvasElement );
            this._context = this._canvasElement.getContext("2d");

            this.renderFrame();
        }

        renderFrame(){
            this._context.clearRect(0, 0, this._width, this._height);
            this._actorsInstances.forEach(actorInstance => {
                actorInstance.renderFrame(this._context, this._width, this._height);
            });
        }
    }

    return CanvasLayer;
});