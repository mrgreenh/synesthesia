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
                    if(data.type=="note_on") $("body").text(data.note);
                    //Notify all actors that will have subscribed to a note/channel/type combination
                    //Based on their inputs settings
                });
            }

            _onNoteReceived(noteData){
                var eventType = noteData != "control" ? "note" : "control";
                var inputId = this._getInputIdentifier(
                        noteData.bus,
                        eventType,
                        noteData.channel
                    );
                if(_.hasKey(this._inputInstances, inputId))
                    this._inputInstances[inputId].onInputEvent(noteData);
            }

            _getInputIdentifier(inputBus, eventType, inputChannel){
                return inputBus + ":" + eventType + ":" + inputChannel;
            }

            subscribeInput(inputInstance, inputBus, eventType, inputChannel){
                var inputId = this._getInputIdentifier(inputBus, eventType, inputChannel);
                if(!_.haskey(this._inputInstances, inputId))
                    this._inputInstances[inputId] = inputInstance;
            }

        }

        return InputBuffer;
    });