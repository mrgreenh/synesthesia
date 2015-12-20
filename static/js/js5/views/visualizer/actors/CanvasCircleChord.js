"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/actors/CanvasActor", "views/visualizer/actors/CanvasCircle"], function (CanvasActor, CanvasCircle) {
    var CanvasCircleChord = (function (_CanvasCircle) {
        _inherits(CanvasCircleChord, _CanvasCircle);

        function CanvasCircleChord(actorData, inputBuffer, options) {
            _classCallCheck(this, CanvasCircleChord);

            _get(Object.getPrototypeOf(CanvasCircleChord.prototype), "constructor", this).call(this, actorData, inputBuffer, options, "chord");
        }

        _createClass(CanvasCircleChord, [{
            key: "renderFrame",
            value: function renderFrame(context, width, height) {
                var activeNotes = this._getActiveNotes();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = activeNotes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var note = _step.value;

                        var radius = this._getParameter("size", { note: note });

                        var _getPositionCoords = this._getPositionCoords(width, height, note);

                        var posX = _getPositionCoords.posX;
                        var posY = _getPositionCoords.posY;

                        this._renderCircle(context, posX, posY, radius);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }]);

        return CanvasCircleChord;
    })(CanvasCircle);

    return CanvasCircleChord;
});