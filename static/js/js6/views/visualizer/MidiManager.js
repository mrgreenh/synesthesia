define([
    "utils/BaseObject",
    "utils/constants",
    "vendor/vivaldijs/dist/vivaldi"
    ], function(BaseObject, constants, VivaldiJs){
        class MidiManager extends BaseObject{

            constructor(trackData){
                super();
                this._trackData = trackData;
                this._busses = this.getActiveBusses();

                this._midiInput = new VivaldiJs(this._busses);
                this._midiInput.onNote((note) => {
                    this._onMidiEvent(note);
                });
            }

            getActiveBusses(){
                var result = [];

                var layersData = this.getProp(this._trackData, "layersData", []);
                layersData.forEach((layerData) => {
                    var actorsData = this.getProp(layerData, "actors", []);
                    actorsData.forEach((actorData) => {
                        var inputsData = this.getProp(actorData, "inputChannels", []);
                        inputsData.forEach((inputData) => {
                            if(inputData.inputBus && inputData.inputBus!="default_bus")
                                result.push(inputData.inputBus);
                        });
                    });
                });

                return result;
            }

            _onMidiEvent(note){
                this.triggerEvent(constants.EVENTS.MIDI.NOTE, note);
            }
        }

        return MidiManager;
});