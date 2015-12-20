"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/Synesthesia", "vendor/signaljs/dist/signal"], function (Synesthesia, Signal) {
    var BaseInputChannel = (function (_Synesthesia) {
        _inherits(BaseInputChannel, _Synesthesia);

        function BaseInputChannel() {
            _classCallCheck(this, BaseInputChannel);

            _get(Object.getPrototypeOf(BaseInputChannel.prototype), "constructor", this).call(this);
        }

        _createClass(BaseInputChannel, [{
            key: "_getSourceParameter",
            value: function _getSourceParameter() {
                return this._inputData.sourceParameter || "note";
            }
        }, {
            key: "getCurrentFrameValue",
            value: function getCurrentFrameValue() {
                var result = this._signalProcessor.push(this._signal);
                return result;
            }
        }, {
            key: "onInputEvent",
            value: function onInputEvent(noteData) {
                if (noteData.type == "control") this._onControlEvent(noteData);else this._onNoteEvent(noteData);
            }
        }, {
            key: "_onNoteEvent",
            value: function _onNoteEvent(noteData) {
                switch (this._getSourceParameter()) {
                    case "value":
                        this._signal = noteData.note;
                        break;
                    case "velocity":
                        if (noteData.type == "note_on") this._signal = noteData.velocity || 0;else this._signal = 0;
                        break;
                    case "intensity":
                        if (noteData.type == "note_on") this._signal = 1;else this._signal = 0;
                        break;
                }
            }
        }, {
            key: "_onControlEvent",
            value: function _onControlEvent() {
                throw Exception("Not yet implemented!");
            }
        }]);

        return BaseInputChannel;
    })(Synesthesia);

    return BaseInputChannel;
});