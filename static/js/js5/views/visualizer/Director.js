"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/Synesthesia", "views/visualizer/actors/Actor", "views/visualizer/layers/Three3DLayer", "views/visualizer/InputBuffer"], function (Synesthesia, Actor, Three3DLayer, InputBuffer) {
    var Director = (function (_Synesthesia) {
        function Director() {
            var _this = this;

            _classCallCheck(this, Director);

            _get(Object.getPrototypeOf(Director.prototype), "constructor", this).call(this);
            this.$el = $("#stage-container");
            this.layers = [];
            this._config;
            this._trackData;

            this._inputBuffer = new InputBuffer();
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
                var layersBasePath = "views/visualizer/layers/";
                var layersClasses = _(this._trackData.layersData).pluck("type");
                layersClasses.unshift("Layer");
                Synesthesia.loadDependencies(layersBasePath, layersClasses).done(this._initializeLayers.bind(this));
            }
        }, {
            key: "_initializeLayers",
            value: function _initializeLayers() {
                var _this2 = this;

                if (!this._layersInitsPromises) this._layersInitsPromises = [];
                this._trackData.layersData.forEach(function (elem) {
                    _this2._layersInitsPromises.push(_this2._initializeLayer(elem));
                });
                $.when.apply($, this._layersInitsPromises).done((function () {
                    this._renderLayers();
                }).bind(this));
            }
        }, {
            key: "_initializeLayer",
            value: function _initializeLayer(layerData) {
                var _this3 = this;

                var className = layerData.type;
                var layerDfd = $.Deferred();
                Synesthesia.loadDependencies("views/visualizer/layers/", [className]).done(function (layerClass) {
                    var layer = new layerClass(layerData, _this3._config);
                    //Layers instances are kept in an array, as their order affects overlapping
                    _this3.layers.push(layer);
                    layer.initialize().done(function () {
                        layerDfd.resolve();
                    });
                });
                return layerDfd;
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
                var _this4 = this;

                this.layers.forEach(function (layer) {
                    layer.render(_this4.$el);
                });
            }
        }]);

        return Director;
    })(Synesthesia);

    return Director;
});