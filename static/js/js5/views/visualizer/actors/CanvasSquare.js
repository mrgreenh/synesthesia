"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/actors/CanvasActor"], function (CanvasActor) {
    var CanvasSquare = (function (_CanvasActor) {
        _inherits(CanvasSquare, _CanvasActor);

        _createClass(CanvasSquare, null, [{
            key: "getActorParameters",
            value: function getActorParameters() {
                return _get(Object.getPrototypeOf(CanvasSquare), "getActorParameters", this).call(this).concat(["sizeX", "sizeY"]);
            }
        }]);

        function CanvasSquare(actorData, inputBuffer, options) {
            _classCallCheck(this, CanvasSquare);

            _get(Object.getPrototypeOf(CanvasSquare.prototype), "constructor", this).call(this, actorData, inputBuffer);
        }

        _createClass(CanvasSquare, [{
            key: "renderFrame",
            value: function renderFrame(context, width, height) {
                context.fillStyle = this._getUnprocessedParameter("color");
                var sizeX = this._getParameter("sizeX", { canvasDimension: width });
                var sizeY = this._getParameter("sizeY", { canvasDimension: height });

                var _getPositionCoords = this._getPositionCoords(width, height);

                var posX = _getPositionCoords.posX;
                var posY = _getPositionCoords.posY;

                context.fillRect(posX, posY, sizeX, sizeY);
            }
        }]);

        return CanvasSquare;
    })(CanvasActor);

    return CanvasSquare;
});