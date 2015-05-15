define([
    "views/visualizer/actors/ThreeActor",
    "/static/js/vendor/layers_dependencies/three.min.js"
], function(ThreeActor, _THREE_){
    class ThreeSphereActor extends ThreeActor{
        static getActorParameters(){
            return super.getActorParameters().concat(["radius"]);
        }

        renderFrame(){
            var geometry = new THREE.SphereGeometry(150, 100, 100);
            var sphere = new THREE.Mesh(geometry, this._material);
            this._scene.add( sphere );
        }
    }
    
    return ThreeSphereActor;
});
