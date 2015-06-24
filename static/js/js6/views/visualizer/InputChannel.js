define([
        "views/visualizer/Synesthesia"
    ], function(Synesthesia){

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
                    this._inputData.inputChannel
                );
            }

            getTargetParameter(){
                return this._inputData.targetParameter;
            }

            getCurrentFrameValue(){
                //This will have to increment T of the signaljs instance
                return this._signal;
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
                if(noteData.type == "note_on")
                    this._signal = 1;
                else
                    this._signal = 0;
            }

            _onControlEvent(){
                throw Exception("Not yet implemented!");
            }

        }

        return InputChannel;
    });