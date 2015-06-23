define([
        "views/visualizer/Synesthesia"
    ], function(Synesthesia){

        class InputChannel extends Synesthesia{

            constructor(inputData, inputBuffer){
                super();
                this._inputData = inputData;
                this._signal = 0;
                inputBuffer.subscribeInput(
                    this,
                    this.inputData.inputBus,
                    this.inputData.inputType,
                    this.inputData.inputChannel
                );
            }

            getTargetParameter(){
                return this._inputData.targetParameter;
            }

            getCurrentFrameValue(){
                //This will have to increment T of the signaljs instance
                return this._signal();
            }

            onInputEvent(noteData){
                if(noteData.type == "control")
                    this._onControlEvent(noteData);
                else
                    this._onNoteEvent(noteData);
            }

            _onNoteEvent(noteData){
                //this._signal will be an instance of signal.js
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