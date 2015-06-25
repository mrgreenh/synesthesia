define([
        "utils/BaseObject",
        "vendor/socket.io.min"
    ], function(BaseObject, io){
        class InputBuffer extends BaseObject{
            constructor(){
                super()
                this._ioNamespace = '/stage';
                this.connect();

                this._inputInstances = {};
            }

            connect(){
                this._socket = io.connect('http://' + document.domain + ':' + location.port + this._ioNamespace);
                this._setupSocketEvents();
            }

            _setupSocketEvents(){
                this._socket.on('message', (data) => {
                    console.log(data.message)
                });
                this._socket.on('midi_note', (data) => {
                    this._onNoteReceived(data);
                });
            }

            _onNoteReceived(noteData){
                var eventType = noteData != "control" ? "note" : "control";
                ["value", "intensity", "velocity"].forEach(sourceParameter => { //Move this array to constants
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