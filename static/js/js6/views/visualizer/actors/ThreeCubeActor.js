define([
    "views/visualizer/actors/ThreeActor",
    "/static/js/vendor/layers_dependencies/three.min.js"
], function(ThreeActor, _THREE_){
    class ThreeCubeActor extends ThreeActor{
        static getActorParameters(){
            return super.getActorParameters().concat(["edge"]);
        }

        constructor(actorData, threeScene){
            super(actorData, threeScene);
        }

        renderFrame(){
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var cube = new THREE.Mesh( geometry, this._material );
            this._scene.add( cube );
        }
    }
    
    return ThreeCubeActor;
});
