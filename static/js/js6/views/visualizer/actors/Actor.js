define([
        "views/visualizer/Synesthesia",
        "views/visualizer/InputChannel"
    ], function(Synesthesia, InputChannel){

    class Actor extends Synesthesia{
        static getActorParameters(){
            return [
                "posX",
                "posY"
            ];
        }

        constructor(actorData, inputBuffer){
            super();
            this._actorData = actorData;
            this._initializeInputs();
            this._inputBuffer = inputBuffer;
            this._inputChannels = {};
        }

        _initializeInputs(){
            var inputChannelsData = this._actorData.inputChannels;
            inputChannelsData.forEach(inputData => {
                var inputChannel = new InputChannel(inputData, this._inputBuffer);
                var targetParameter = inputChannel.getTargetParameter();
                if(targetParameter)
                    this._inputChannels[targetParameter] = inputChannel;
            });
        }
    }

    return Actor;    
});
