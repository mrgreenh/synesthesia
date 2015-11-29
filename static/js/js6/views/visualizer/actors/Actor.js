define([
        "views/visualizer/Synesthesia",
        "views/visualizer/InputChannel"
    ], function(Synesthesia, InputChannel){

    class Actor extends Synesthesia{
        static getActorParameters(){
            return [
                "posX",
                "posY",
                "posType", //percent or absolute
                "posAnchor", //top, bottom, right, left, any _ separated combination
                "color"
            ];
        }

        constructor(actorData, inputBuffer){
            super();
            this._actorData = actorData;
            this._inputBuffer = inputBuffer;
            this._inputChannels = {};
            this._initializeInputs();
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

        _getUnprocessedParameter(parameterName){
            return this._actorData[parameterName+"Parameter"];
        }

        _getParameter(parameterName){
            return parseFloat(this._actorData[parameterName+"Parameter"]) * (parseFloat(this._getSignalForParameter(parameterName)) || 0);
        }

        _getSignalForParameter(parameterName){
            var inputChannel = this._inputChannels[parameterName];
            return inputChannel ? inputChannel.getCurrentFrameValue() : 0;
        }
    }

    return Actor;
});
