define([
        "utils/BaseObject",
        "utils/constants",
        "views/visualizer/MidiManager"
    ], function(BaseObject, constants, MidiManager){
        class InputBuffer extends BaseObject{
            constructor(trackData){
                super()
                this._inputInstances = {};

                this._midiManager = new MidiManager(trackData);
                this._midiManager.addObserver(this, constants.EVENTS.MIDI.NOTE);
            }

            events(eventName){
                console.log("REcording MIDI event")
                switch(eventName){
                    case constants.EVENTS.MIDI.NOTE:
                        this._onNoteReceived(arguments[1]);
                        break;
                }

            }

            stopMidiListening(){
                this._midiManager.removeObserver(this);
            }

            setSnapshot(snapshotData){
                _.forEach(snapshotData, function(inputsGroupData, key){
                    _.forEach(inputsGroupData, function(inputData, index){
                        let inputDistance = this._inputInstances[key][index];
                        inputDistance.setSnapshot(inputData)
                    }, this);
                }, this);            
            }

            getSnapshot(){
                var snapshot = {};
                _.forEach(this._inputInstances, function(inputsGroup, key){
                    let inputGroupSnapshots = inputsGroup.map((inputInstance) => {
                        return inputInstance.getSnapshot();
                    });
                    snapshot[key] = inputGroupSnapshots;
                }, this);

                return snapshot;
            }

            _onNoteReceived(noteData){
                var eventType = noteData.type != "control" ? "note" : "control";
                constants.INPUTS.SOURCE_PARAMETERS.forEach(sourceParameter => {
                    var inputGroup = this._getInputGroupIdentifier(
                            noteData.bus,
                            eventType,
                            noteData.channel,
                            sourceParameter
                        );
                    if(_.has(this._inputInstances, inputGroup))
                        this._inputInstances[inputGroup].forEach((inputInstance) => {
                            inputInstance.onInputEvent(noteData);
                        });
                });
            }

            _getInputGroupIdentifier(inputBus, eventType, inputChannel, sourceParameter){
                return inputBus + ":" + eventType + ":" + inputChannel + ":" + sourceParameter;
            }

            subscribeInput(inputInstance, inputBus, eventType, inputChannel, sourceParameter){
                var inputGroup = this._getInputGroupIdentifier(inputBus, eventType, inputChannel, sourceParameter);
                if(!_.has(this._inputInstances, inputGroup))
                    this._inputInstances[inputGroup] = [];
                if(!this._inputInstances[inputGroup].indexOf(inputInstance) > -1)
                    this._inputInstances[inputGroup].push(inputInstance);
            }

        }

        return InputBuffer;
    });