class Actor extends Synesthesia{
    static getActorParameters(){
        return [
            "posX",
            "posY"
        ];
    }

    constructor(actorData){
        this._actorData = actorData;
    }
}