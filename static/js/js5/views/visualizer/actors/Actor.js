"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/Synesthesia", "views/visualizer/InputChannel"], function (Synesthesia, InputChannel) {
    var Actor = (function (_Synesthesia) {
        _inherits(Actor, _Synesthesia);

        _createClass(Actor, null, [{
            key: "getActorParameters",
            value: function getActorParameters() {
                return ["posX", "posY", "posType", //percent or absolute
                "posAnchor", //top, bottom, right, left, any _ separated combination
                "color"];
            }
        }]);

        function Actor(actorData, inputBuffer) {
            _classCallCheck(this, Actor);

            _get(Object.getPrototypeOf(Actor.prototype), "constructor", this).call(this);
            this._actorData = actorData;
            this._inputBuffer = inputBuffer;
            this._inputChannels = {};
            this._initializeInputs();
        }

        _createClass(Actor, [{
            key: "_initializeInputs",
            value: function _initializeInputs() {
                var _this = this;

                var inputChannelsData = this._actorData.inputChannels;
                inputChannelsData.forEach(function (inputData) {
                    var inputChannel = new InputChannel(inputData, _this._inputBuffer);
                    var targetParameter = inputChannel.getTargetParameter();
                    if (targetParameter) _this._inputChannels[targetParameter] = inputChannel;
                });
            }
        }, {
            key: "_getUnprocessedParameter",
            value: function _getUnprocessedParameter(parameterName) {
                return this._actorData[parameterName + "Parameter"];
            }
        }, {
            key: "_getParameter",
            value: function _getParameter(parameterName) {
                return parseFloat(this._actorData[parameterName + "Parameter"]) * (parseFloat(this._getSignalForParameter(parameterName)) || 0);
            }
        }, {
            key: "_getSignalForParameter",
            value: function _getSignalForParameter(parameterName) {
                var inputChannel = this._inputChannels[parameterName];
                return inputChannel ? inputChannel.getCurrentFrameValue() : 1;
            }
        }]);

        return Actor;
    })(Synesthesia);

    return Actor;
});