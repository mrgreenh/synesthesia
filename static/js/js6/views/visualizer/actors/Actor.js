define([
        "views/visualizer/Synesthesia",
        "views/visualizer/InputChannel",
        "views/visualizer/ChordInputChannel",
    ], function(Synesthesia, InputChannel, ChordInputChannel){

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

        constructor(actorData, inputBuffer, options, inputChannelsType){
            super();
            this._actorData = actorData;
            this._inputBuffer = inputBuffer;
            this._inputChannelType = inputChannelsType;
            this._inputChannels = {};
            this._initializeInputs();
        }

        _initializeInputs(){
            var inputChannelsData = this._actorData.inputChannels;
            inputChannelsData.forEach(inputData => {
                var inputChannel = this._initializeInputChannel(inputData);
                var targetParameter = inputData.targetParameter;

                this._inputChannels[targetParameter] = inputChannel;
            });
        }

        _initializeInputChannel(inputData){
            switch(this._inputChannelType){
                case "chord":
                    return new ChordInputChannel(inputData, this._inputBuffer);
                default:
                    return new InputChannel(inputData, this._inputBuffer);
            }
        }

        _getUnprocessedParameter(parameterName){
            return this._actorData[parameterName+"Parameter"];
        }

        _getParameter(parameterName, note){
            var actorParameter = parseFloat(this._actorData[parameterName+"Parameter"]);
            var originalSignalValue;
            switch(this._inputChannelType){
                case "chord":
                    note = note || 0;
                    originalSignalValue = this._getSignalForParameterAndNote(parameterName, note);
                    break;
                default:
                    originalSignalValue = this._getSignalForParameter(parameterName);
                    break;
            }
            var signalValue = parseFloat(originalSignalValue) || 0;
            return actorParameter * signalValue;
        }

        _getSignalForParameterAndNote(parameterName, note){
            var inputChannel = this._inputChannels[parameterName];
            return inputChannel ? inputChannel.getCurrentFrameAndNoteValue(note) : 1;
        }

        _getSignalForParameter(parameterName){
            var inputChannel = this._inputChannels[parameterName];
            return inputChannel ? inputChannel.getCurrentFrameValue() : 1;
        }

        _getActiveNotes(){
            var anyInputChannel = Object.values(this._inputChannels)[0];
            var activeNotes = anyInputChannel.getActivatedNotes();
            return activeNotes;
        }
    }

    return Actor;
});
