define(["exports", "module", "views/visualizer/Synesthesia", "views/visualizer/actors/Actor", "views/visualizer/layers/Layer", "views/visualizer/layers/Three3DLayer", "utils/utilities"], function (exports, module, _viewsVisualizerSynesthesia, _viewsVisualizerActorsActor, _viewsVisualizerLayersLayer, _viewsVisualizerLayersThree3DLayer, _utilsUtilities) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var _Synesthesia2 = _interopRequire(_viewsVisualizerSynesthesia);

    var _Actor = _interopRequire(_viewsVisualizerActorsActor);

    var _Layer = _interopRequire(_viewsVisualizerLayersLayer);

    var _Three3DLayer = _interopRequire(_viewsVisualizerLayersThree3DLayer);

    var Director = (function (_Synesthesia) {
        function Director() {
            var _this = this;

            _classCallCheck(this, Director);

            _get(Object.getPrototypeOf(Director.prototype), "constructor", this).call(this);
            _Synesthesia2;
            _Actor;
            _Layer;
            this.$el = $("#stage-container");
            this.layers = [];
            this._config;
            this._trackData;
            //Load the configuration that describes classes and track data
            //Then start doing your thing
            $.when(this._loadNextTrackData(), this._loadStageConfig()).then(function (trackData, configData) {
                _this._config = configData[0];
                _this._trackData = trackData[0];
                _this._startTrack();
            });
        }

        _inherits(Director, _Synesthesia);

        _createClass(Director, [{
            key: "_startTrack",
            value: function _startTrack() {
                this._initializeLayers();
            }
        }, {
            key: "_initializeLayers",
            value: function _initializeLayers() {
                var _this2 = this;

                this._trackData.layersData.forEach(function (elem) {
                    _this2._initializeLayer(elem);
                }, this);
                this._renderLayers();
            }
        }, {
            key: "_initializeLayer",
            value: function _initializeLayer(layerData) {
                var className = layerData.type;
                var layer = new (window[(0, _utilsUtilities.getBabelCompiledClassName)(className)])(layerData, this._config);
                //Layers instances are kept in an array, as their order affects overlapping
                this.layers.push(layer);
            }
        }, {
            key: "_loadNextTrackData",
            value: function _loadNextTrackData() {
                return $.ajax({
                    url: "/get_current_track"
                });
            }
        }, {
            key: "_loadStageConfig",
            value: function _loadStageConfig() {
                return $.ajax({
                    url: "/get_stage_config"
                });
            }
        }, {
            key: "_renderLayers",
            value: function _renderLayers() {
                var _this3 = this;

                this.layers.forEach(function (layer) {
                    layer.render(_this3.$el);
                });
            }
        }]);

        return Director;
    })(_Synesthesia2);

    module.exports = Director;
});