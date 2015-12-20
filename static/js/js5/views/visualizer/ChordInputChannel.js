"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/Synesthesia", "vendor/signaljs/dist/signal", "views/visualizer/BaseInputChannel"], function (Synesthesia, Signal, BaseInputChannel) {
    var ChordInputChannel = (function (_BaseInputChannel) {
        _inherits(ChordInputChannel, _BaseInputChannel);

        function ChordInputChannel(inputData, inputBuffer) {
            _classCallCheck(this, ChordInputChannel);

            _get(Object.getPrototypeOf(ChordInputChannel.prototype), "constructor", this).call(this);
            this._inputData = _.defaults(inputData, {
                inputBus: "",
                inputType: "note",
                inputChannel: 1
            });
            this._signals = {};
            this._signalProcessors = {};
            this._signalProcessorsTTL = {};
            this._signalProcessorsInitialTTL = 20000;
            inputBuffer.subscribeInput(this, this._inputData.inputBus, this._inputData.inputType, this._inputData.inputChannel, this._inputData.sourceParameter);
        }

        _createClass(ChordInputChannel, [{
            key: "getActivatedNotes",
            value: function getActivatedNotes() {
                return Object.keys(this._signalProcessors);
            }
        }, {
            key: "getCurrentFrameAndNoteValue",
            value: function getCurrentFrameAndNoteValue(currentNote) {
                /*TODO there is a bug here! If multiple actors represent the same instrument,
                This function is going to be called more than once per frame.*/
                var currentSignal = this._signalProcessors[currentNote];
                if (!currentSignal) return undefined;
                var result = currentSignal.push(this._signals[currentNote]);
                if (result == 0) {
                    if (this._signalProcessorsTTL[currentNote] === undefined) this._signalProcessorsTTL[currentNote] = this._signalProcessorInitialTTL;else if (this._signalProcessorsTTL[currentNote] > 0) this._signalProcessorsTTL[currentNote]--;else delete this._signalProcessors[currentNote];
                }
                return result;
            }
        }, {
            key: "_onNoteEvent",
            value: function _onNoteEvent(noteData) {
                var currentNote = noteData.note;
                if (!this._signalProcessors[currentNote]) {
                    this._signalProcessors[currentNote] = new Signal(_.clone(this._inputData.signalsList));
                }
                switch (this._getSourceParameter()) {
                    case "value":
                        this._signals[currentNote] = noteData.note;
                        break;
                    case "velocity":
                        if (noteData.type == "note_on") this._signals[currentNote] = noteData.velocity || 0;else this._signals[currentNote] = 0;
                        break;
                    case "intensity":
                        if (noteData.type == "note_on") this._signals[currentNote] = 1;else this._signals[currentNote] = 0;
                        break;
                }
            }
        }]);

        return ChordInputChannel;
    })(BaseInputChannel);

    return ChordInputChannel;
});