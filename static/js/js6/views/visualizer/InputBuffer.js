define([
        "utils/BaseObject",
        "utils/constants",
        "views/visualizer/MidiManager"
    ], function(BaseObject, constants, MidiManager){
        class InputBuffer extends BaseObject{
            constructor(trackData){
                super()
                this._ioNamespace = '/stage';
                this._inputInstances = {};

                this._midiManager = new MidiManager(trackData);
                this._midiManager.addObserver(this, constants.EVENTS.MIDI.NOTE);
            }

            connect(){
                this._socket = io.connect('http://' + document.domain + ':' + location.port + this._ioNamespace);
                this._setupSocketEvents();
            }

            events(eventName){
                switch(eventName){
                    case constants.EVENTS.MIDI.NOTE:
                        this._onNoteReceived(arguments[1]);
                        break;
                }

            }

            _onNoteReceived(noteData){
                var eventType = noteData.type != "control" ? "note" : "control";
                constants.INPUTS.SOURCE_PARAMETERS.forEach(sourceParameter => {
                    var inputId = this._getInputIdentifier(
                            noteData.bus,
                            eventType,
                            noteData.channel,
                            sourceParameter
                        );
                    if(_.has(this._inputInstances, inputId))
                        this._inputInstances[inputId].onInputEvent(noteData);                    
                });
            }

            _getInputIdentifier(inputBus, eventType, inputChannel, sourceParameter){
                return inputBus + ":" + eventType + ":" + inputChannel + ":" + sourceParameter;
            }

            subscribeInput(inputInstance, inputBus, eventType, inputChannel, sourceParameter){
                var inputId = this._getInputIdentifier(inputBus, eventType, inputChannel, sourceParameter);
                if(!_.has(this._inputInstances, inputId))
                    this._inputInstances[inputId] = inputInstance;
            }

        }

        return InputBuffer;
    });