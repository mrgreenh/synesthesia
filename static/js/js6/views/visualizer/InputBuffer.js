define([
        "utils/BaseObject",
        "vendor/socket.io.min"
    ], function(BaseObject, io){
        class InputBuffer extends BaseObject{
            constructor(){
                super()
                this._ioNamespace = '/stage';
                this.connect();
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
                    if(data.type=="note_on") $("body").text(data.note);
                    //Notify all actors that will have subscribed to a note/channel/type combination
                    //Based on their inputs settings
                });
            }

        }

        return InputBuffer;
    });