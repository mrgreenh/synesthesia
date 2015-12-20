    define([
        "views/visualizer/Synesthesia",
        "vendor/signaljs/dist/signal",
        "views/visualizer/BaseInputChannel",
    ], function(Synesthesia, Signal, BaseInputChannel){

        class ChordInputChannel extends BaseInputChannel{

            constructor(inputData, inputBuffer){
                super();
                this._inputData = _.defaults(inputData, {
                    inputBus: "",
                    inputType: "note",
                    inputChannel: 1
                });
                this._signals = {};
                this._signalProcessors = {};
                this._signalProcessorsTTL = {};
                this._signalProcessorsInitialTTL = 20000;
                inputBuffer.subscribeInput(
                    this,
                    this._inputData.inputBus,
                    this._inputData.inputType,
                    this._inputData.inputChannel,
                    this._inputData.sourceParameter
                );
            }

            getActivatedNotes(){
                return Object.keys(this._signalProcessors);
            }

            getCurrentFrameAndNoteValue(currentNote){
                /*TODO there is a bug here! If multiple actors represent the same instrument,
                This function is going to be called more than once per frame.*/
                let currentSignal = this._signalProcessors[currentNote];
                if(!currentSignal) return undefined;
                var result = currentSignal.push(this._signals[currentNote]);
                if(result==0){
                    if(this._signalProcessorsTTL[currentNote] === undefined)
                        this._signalProcessorsTTL[currentNote] = this._signalProcessorInitialTTL;
                    else if(this._signalProcessorsTTL[currentNote] > 0)
                        this._signalProcessorsTTL[currentNote] --;
                    else
                        delete this._signalProcessors[currentNote];
                }
                return result;
            }

            _onNoteEvent(noteData){
                var currentNote = noteData.note;
                if(!this._signalProcessors[currentNote]){
                    this._signalProcessors[currentNote] = new Signal(_.clone(this._inputData.signalsList));
                }
                switch(this._getSourceParameter()){
                    case "value":
                        this._signals[currentNote] = noteData.note;
                        break;
                    case "velocity":
                        if(noteData.type == "note_on")
                            this._signals[currentNote] = noteData.velocity || 0;
                        else
                            this._signals[currentNote] = 0;
                        break;
                    case "intensity":
                        if(noteData.type == "note_on")
                            this._signals[currentNote] = 1;
                        else
                            this._signals[currentNote] = 0;
                        break;
                }

            }

        }

        return ChordInputChannel;
    });