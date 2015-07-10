"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["utils/BaseObject", "utils/constants"], function (BaseObject, constants) {
    var MidiManager = (function (_BaseObject) {
        function MidiManager(trackData) {
            _classCallCheck(this, MidiManager);

            _get(Object.getPrototypeOf(MidiManager.prototype), "constructor", this).call(this);
            this._trackData = trackData;
            this._connect();
            this._busses = [];

            this.MIDI_EVENT_CODES = {
                8: "note_off",
                9: "note_on"
            };
        }

        _inherits(MidiManager, _BaseObject);

        _createClass(MidiManager, [{
            key: "_connect",
            value: function _connect() {
                var _this = this;

                window.navigator.requestMIDIAccess().then(function (midiAccess) {
                    if (midiAccess.inputs && midiAccess.inputs.size > 0) {
                        var inputs = midiAccess.inputs.values();
                        var input = null;
                        while (input = inputs.next()) {
                            if (input.done) break;

                            input.value.onmidimessage = function (midiEvent) {
                                _this._onMidiEvent(midiEvent);
                            };
                            _this._busses.push(input);
                        }
                    } else {
                        console.error("No MIDI device detected :/");
                    }
                });
            }
        }, {
            key: "_onMidiEvent",
            value: function _onMidiEvent(midiEvent) {
                var note = {};
                var eventData = midiEvent.data;
                note["command"] = eventData[0] >> 4;
                note["channel"] = eventData[0] & 15;
                note["type"] = this.MIDI_EVENT_CODES[note["command"]];
                note["note"] = eventData[1];
                note["velocity"] = eventData[2];
                note["bus"] = "default_bus"; //for now. Then: midiEvent.srcElement.name;

                this.triggerEvent(constants.EVENTS.MIDI.NOTE, note);
            }
        }]);

        return MidiManager;
    })(BaseObject);

    return MidiManager;
});