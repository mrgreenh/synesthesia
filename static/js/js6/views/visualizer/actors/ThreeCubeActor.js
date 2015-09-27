define([
    "views/visualizer/actors/ThreeActor",
    "/static/js/vendor/layers_dependencies/three.min.js"
], function(ThreeActor, _THREE_){
    class ThreeCubeActor extends ThreeActor{
        static getActorParameters(){
            return super.getActorParameters().concat(["edge", "size"]);
        }


        renderFrame(scene){
            var size = this._getParameter("size");
            var geometry = new THREE.BoxGeometry( size, size, size );
            var cube = new THREE.Mesh( geometry, this._material );

            cube.translateX(this._getParameter("posX"));
            cube.translateY(this._getParameter("posY"));
            scene.add( cube );
        }
    }
    
    return ThreeCubeActor;
});
