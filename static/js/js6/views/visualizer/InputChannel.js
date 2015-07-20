define([
        "views/visualizer/Synesthesia",
        "vendor/signaljs/dist/signal"
    ], function(Synesthesia, Signal){

        class InputChannel extends Synesthesia{

            constructor(inputData, inputBuffer){
                super();
                this._inputData = _.defaults(inputData, {
                    inputBus: "",
                    inputType: "note",
                    inputChannel: 1
                });
                this._signal = 0;
                inputBuffer.subscribeInput(
                    this,
                    this._inputData.inputBus,
                    this._inputData.inputType,
                    this._inputData.inputChannel,
                    this._inputData.sourceParameter
                );

                this._signalProcessor = new Signal();
            }

            getTargetParameter(){
                return this._inputData.targetParameter;
            }

            _getSourceParameter(){
                return this._inputData.sourceParameter || "note";
            }

            getCurrentFrameValue(){
                var result = this._signalProcessor.push(this._signal);
                return result;
            }

            onInputEvent(noteData){
                if(noteData.type == "control")
                    this._onControlEvent(noteData);
                else
                    this._onNoteEvent(noteData);
            }

            _onNoteEvent(noteData){
                //this._signal will be an instance of signal.js
                //Should actually also update values like note and velocity
                //And the actor should receive one of these values (whatever selected in the editor "srcProperty")
                switch(this._getSourceParameter()){
                    case "value":
                        this._signal = noteData.note;
                        break;
                    case "velocity":
                        if(noteData.type == "note_on")
                            this._signal = noteData.velocity || 0;
                        else
                            this._signal = 0;    
                        break;
                    case "intensity":
                        if(noteData.type == "note_on")
                            this._signal = 1;
                        else
                            this._signal = 0;                        
                        break;
                }

            }

            _onControlEvent(){
                throw Exception("Not yet implemented!");
            }

        }

        return InputChannel;
    });