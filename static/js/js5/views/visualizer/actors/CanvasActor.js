"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/actors/Actor"], function (Actor) {
    var CanvasActor = (function (_Actor) {
        _inherits(CanvasActor, _Actor);

        function CanvasActor(actorData, inputBuffer) {
            _classCallCheck(this, CanvasActor);

            _get(Object.getPrototypeOf(CanvasActor.prototype), "constructor", this).call(this, actorData, inputBuffer);
        }

        _createClass(CanvasActor, [{
            key: "_getAnchorPosition",
            value: function _getAnchorPosition(width, height) {
                switch (this._getUnprocessedParameter("posAnchor")) {
                    case "top":
                        return {
                            anchorX: width / 2,
                            anchorY: 0
                        };
                    case "bottom":
                        return {
                            anchorX: width / 2,
                            anchorY: height
                        };
                    case "left":
                        return {
                            anchorX: 0,
                            anchorY: height / 2
                        };
                    case "right":
                        return {
                            anchorX: width,
                            anchorY: height / 2
                        };
                    case "top_left":
                        return {
                            anchorX: 0,
                            anchorY: 0
                        };
                    case "top_right":
                        return {
                            anchorX: width,
                            anchorY: 0
                        };
                    case "bottom_left":
                        return {
                            anchorX: 0,
                            anchorY: height
                        };
                    case "bottom_right":
                        return {
                            anchorX: width,
                            anchorY: height
                        };
                    case "center":
                        return {
                            anchorX: width / 2,
                            anchorY: height / 2
                        };
                }
            }
        }, {
            key: "_getPositionCoords",
            value: function _getPositionCoords(width, height) {
                var _getAnchorPosition2 = this._getAnchorPosition(width, height);

                var anchorX = _getAnchorPosition2.anchorX;
                var anchorY = _getAnchorPosition2.anchorY;

                switch (this._getUnprocessedParameter("posType")) {
                    case "percent":
                        return {
                            posX: anchorX + this._getParameter("posX") * width,
                            posY: anchorY + this._getParameter("posY") * height
                        };
                    case "absolute":
                        return {
                            posX: anchorX + this._getParameter("posX"),
                            posY: anchorY + this._getParameter("posY")
                        };
                }
            }
        }]);

        return CanvasActor;
    })(Actor);

    return CanvasActor;
});