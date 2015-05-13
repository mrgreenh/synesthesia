define([
        "utils/oop",
        "views/visualizer/Synesthesia"
    ], function(BaseObject, Synesthesia){

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

    return Actor;    
});
