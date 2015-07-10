define([
    "utils/BaseObject",
    "utils/constants",
    ], function(BaseObject, constants){
        class MidiManager extends BaseObject{

            constructor(trackData){
                super();
                this._trackData = trackData;
                this._connect();
                this._busses = [];

                this.MIDI_EVENT_CODES = {
                    8: "note_off",
                    9: "note_on"
                }
            }

            _connect(){
                window.navigator.requestMIDIAccess().then((midiAccess)=>{
                    if(midiAccess.inputs && midiAccess.inputs.size > 0){
                        var inputs = midiAccess.inputs.values();
                        var input = null;
                        while(input = inputs.next()){
                            if(input.done) break;

                            input.value.onmidimessage = (midiEvent) => {
                                this._onMidiEvent(midiEvent);
                            }
                            this._busses.push(input);
                        }

                    }else{
                        console.error("No MIDI device detected :/");
                    }
                });
            }

            _onMidiEvent(midiEvent){
                var note = {};
                var eventData = midiEvent.data;
                note["command"] = eventData[0] >> 4;
                note["channel"] = eventData[0] & 0xf;
                note["type"] = this.MIDI_EVENT_CODES[note["command"]];
                note["note"] = eventData[1];
                note["velocity"] = eventData[2];
                note["bus"] = "default_bus"; //for now. Then: midiEvent.srcElement.name;

                this.triggerEvent(constants.EVENTS.MIDI.NOTE, note);
            }

        }

        return MidiManager;
});