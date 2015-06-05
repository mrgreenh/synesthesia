define([
    "views/visualizer/actors/Actor",
    "/static/js/vendor/layers_dependencies/three.min.js"
], function(Actor, _THREE_){

    class ThreeActor extends Actor{
        static getActorParameters(){
            return super.getActorParameters().concat(["posZ"]);
        }

        constructor(actorData, threeScene){
            super(actorData, threeScene);
            this._scene = threeScene;
            this._material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        }

    }

    return ThreeActor;
});
