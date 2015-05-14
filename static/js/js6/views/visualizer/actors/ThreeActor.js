import Actor from "views/visualizer/actors/Actor"

class ThreeActor extends Actor{
    static getActorParameters(){
        return super.getActorParameters().concat(["zPos"]);
    }

    constructor(actorData, threeScene){
        super(actorData, threeScene);
        this._scene = threeScene;
        this._material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    }

}

export default ThreeActor;