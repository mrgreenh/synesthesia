import Synesthesia from "views/visualizer/Synesthesia"

class Actor extends Synesthesia{
    static getActorParameters(){
        return [
            "posX",
            "posY"
        ];
    }

    constructor(actorData){
        super()
        this._actorData = actorData;
    }
}

export default Actor;