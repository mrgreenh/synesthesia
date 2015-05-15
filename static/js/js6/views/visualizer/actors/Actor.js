define([
        "utils/BaseObject",
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
            super();
            this._actorData = actorData;
        }
    }

    return Actor;    
});
