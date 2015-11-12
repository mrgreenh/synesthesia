define([
    "views/visualizer/actors/ThreeActor",
    "/static/js/vendor/layers_dependencies/three.min.js"
], function(ThreeActor, _THREE_){
    class ThreeCubeActor extends ThreeActor{
        static getActorParameters(){
            return super.getActorParameters().concat(["edge", "size"]);
        }

        constructor(actorData, inputBuffer, scene){
            super(actorData, inputBuffer);
            this._material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            this._cube = new THREE.Mesh( geometry, this._material );
            scene.add( this._cube );
        }

        renderFrame(){
            this._cube.scale.x = this._getParameter("size");
            this._cube.scale.y = this._getParameter("size");
            this._cube.scale.z = this._getParameter("size");

            this._cube.position.x = this._getParameter("posX");
            this._cube.position.y = this._getParameter("posY");
            this._cube.updateMatrixWorld();
        }
    }
    
    return ThreeCubeActor;
});
