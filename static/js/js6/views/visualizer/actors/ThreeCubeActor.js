define([
    "views/visualizer/actors/ThreeActor",
    "/static/js/vendor/layers_dependencies/three.min.js"
], function(ThreeActor, _THREE_){
    class ThreeCubeActor extends ThreeActor{
        static getActorParameters(){
            return super.getActorParameters().concat(["edge", "size"]);
        }


        renderFrame(scene){
            var size = this._getSignalForParameter("size");
            var geometry = new THREE.BoxGeometry( size, size, size );
            var cube = new THREE.Mesh( geometry, this._material );
            scene.add( cube );
        }
    }
    
    return ThreeCubeActor;
});
