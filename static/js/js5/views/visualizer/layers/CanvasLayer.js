"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/actors/Actor", "views/visualizer/layers/Layer"], function (Actor, Layer) {
    var CanvasLayer = (function (_Layer) {
        _inherits(CanvasLayer, _Layer);

        _createClass(CanvasLayer, null, [{
            key: "getAvailableActorsClasses",
            value: function getAvailableActorsClasses() {
                //Even if right now it's not, one day this will be async
                //It will ask the server to check what classes are in the actors folder
                //Because adding actors will be part of creative processes that should not require code change to the main app
                var dfd = $.Deferred();
                dfd.resolve(["CanvasCircle", "CanvasSquare", "CanvasCircleChord"]);
                return dfd;
            }
        }]);

        function CanvasLayer(layerData, config, inputBuffer) {
            _classCallCheck(this, CanvasLayer);

            _get(Object.getPrototypeOf(CanvasLayer.prototype), "constructor", this).call(this, layerData, config, inputBuffer);
        }

        _createClass(CanvasLayer, [{
            key: "render",
            value: function render($stageElement) {
                _get(Object.getPrototypeOf(CanvasLayer.prototype), "render", this).call(this, $stageElement);
                this._width = $stageElement.width();
                this._height = $stageElement.height();

                this._canvasElement = document.createElement("canvas");
                this._canvasElement.width = this._width;
                this._canvasElement.height = this._height;
                $stageElement[0].appendChild(this._canvasElement);
                this._context = this._canvasElement.getContext("2d");

                this.renderFrame();
            }
        }, {
            key: "renderFrame",
            value: function renderFrame() {
                var _this = this;

                this._context.clearRect(0, 0, this._width, this._height);
                this._actorsInstances.forEach(function (actorInstance) {
                    actorInstance.renderFrame(_this._context, _this._width, _this._height);
                });
            }
        }, {
            key: "getFrameData",
            value: function getFrameData() {
                return this._canvasElement.toDataURL();
            }
        }]);

        return CanvasLayer;
    })(Layer);

    return CanvasLayer;
});