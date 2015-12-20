define([
        "views/visualizer/Synesthesia",
        "vendor/signaljs/dist/signal"
    ], function(Synesthesia, Signal){

        class BaseInputChannel extends Synesthesia{

            constructor(){
                super();
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

        return BaseInputChannel;
    });