"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["utils/BaseObject", "utils/constants", "views/visualizer/MidiManager"], function (BaseObject, constants, MidiManager) {
    var InputBuffer = (function (_BaseObject) {
        _inherits(InputBuffer, _BaseObject);

        function InputBuffer(trackData) {
            _classCallCheck(this, InputBuffer);

            _get(Object.getPrototypeOf(InputBuffer.prototype), "constructor", this).call(this);
            this._ioNamespace = "/stage";
            this._inputInstances = {};

            this._midiManager = new MidiManager(trackData);
            this._midiManager.addObserver(this, constants.EVENTS.MIDI.NOTE);
        }

        _createClass(InputBuffer, [{
            key: "connect",
            value: function connect() {
                this._socket = io.connect("http://" + document.domain + ":" + location.port + this._ioNamespace);
                this._setupSocketEvents();
            }
        }, {
            key: "events",
            value: function events(eventName) {
                switch (eventName) {
                    case constants.EVENTS.MIDI.NOTE:
                        this._onNoteReceived(arguments[1]);
                        break;
                }
            }
        }, {
            key: "getSnapshot",
            value: function getSnapshot() {
                var snapshot = {};
                _.forEach(this._inputInstances, function (inputsGroup, key) {
                    var inputGroupSnapshots = inputsGroup.map(function (inputInstance) {
                        return inputInstance.getSnapshot();
                    });
                    snapshot[key] = inputGroupSnapshots;
                }, this);

                return snapshot;
            }
        }, {
            key: "_onNoteReceived",
            value: function _onNoteReceived(noteData) {
                var _this = this;

                var eventType = noteData.type != "control" ? "note" : "control";
                constants.INPUTS.SOURCE_PARAMETERS.forEach(function (sourceParameter) {
                    var inputGroup = _this._getInputGroupIdentifier(noteData.bus, eventType, noteData.channel, sourceParameter);
                    if (_.has(_this._inputInstances, inputGroup)) _this._inputInstances[inputGroup].forEach(function (inputInstance) {
                        inputInstance.onInputEvent(noteData);
                    });
                });
            }
        }, {
            key: "_getInputGroupIdentifier",
            value: function _getInputGroupIdentifier(inputBus, eventType, inputChannel, sourceParameter) {
                return inputBus + ":" + eventType + ":" + inputChannel + ":" + sourceParameter;
            }
        }, {
            key: "subscribeInput",
            value: function subscribeInput(inputInstance, inputBus, eventType, inputChannel, sourceParameter) {
                var inputGroup = this._getInputGroupIdentifier(inputBus, eventType, inputChannel, sourceParameter);
                if (!_.has(this._inputInstances, inputGroup)) this._inputInstances[inputGroup] = [];
                if (!this._inputInstances[inputGroup].indexOf(inputInstance) > -1) this._inputInstances[inputGroup].push(inputInstance);
            }
        }]);

        return InputBuffer;
    })(BaseObject);

    return InputBuffer;
});