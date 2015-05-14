import ThreeActor from "views/visualizer/actors/ThreeActor"

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

export default ThreeCubeActor;