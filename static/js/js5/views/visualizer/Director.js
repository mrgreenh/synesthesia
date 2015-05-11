"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Director = (function (Synesthesia) {
    function Director() {
        var _this = this;

        _classCallCheck(this, Director);

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

    _inherits(Director, Synesthesia);

    _prototypeProperties(Director, null, {
        _startTrack: {
            value: function _startTrack() {
                var _this = this;

                var layersBasePath = "views/visualizer/layers/";
                var layersClasses = _(this._trackData.layersData).map(function (elem) {
                    return _this._getLayerClassName(elem);
                });
                layersClasses.unshift("Layer");
                this._loadDependencies(layersBasePath, layersClasses).done(this._initializeLayers.bind(this));
            },
            writable: true,
            configurable: true
        },
        _getLayerClassName: {
            value: function _getLayerClassName(layerData) {
                var layerClazz = layerData.type + "Layer";
                return layerClazz;
            },
            writable: true,
            configurable: true
        },
        _initializeLayers: {
            value: function _initializeLayers() {
                var _this = this;

                if (!this._layersInitsPromises) this._layersInitsPromises = [];
                this._trackData.layersData.forEach(function (elem) {
                    _this._layersInitsPromises.push(_this._initializeLayer(elem));
                });
                $.when.apply($, this._layersInitsPromises).done(_.bind(this._renderLayers, this));
            },
            writable: true,
            configurable: true
        },
        _initializeLayer: {
            value: function _initializeLayer(layerData) {
                var className = this._getLayerClassName(layerData);
                try {
                    var layer = new window[className](layerData, this._config);
                    //Layers instances are kept in an array, as their order affects overlapping
                    this.layers.push(layer);
                    var layerInitPromise = layer.isItInitializedYet();
                    this._layersInitsPromises.push(layerInitPromise);
                    return layerInitPromise;
                } catch (ex) {
                    console.warn("Could not initialize layer " + className);
                    console.log(ex.stack);
                    console.log(ex);
                }
            },
            writable: true,
            configurable: true
        },
        _loadNextTrackData: {
            value: function _loadNextTrackData() {
                return $.ajax({
                    url: "/get_current_track"
                });
            },
            writable: true,
            configurable: true
        },
        _loadStageConfig: {
            value: function _loadStageConfig() {
                return $.ajax({
                    url: "/get_stage_config"
                });
            },
            writable: true,
            configurable: true
        },
        _renderLayers: {
            value: function _renderLayers() {
                var _this = this;

                this.layers.forEach(function (layer) {
                    layer.render(_this.$el);
                });
            },
            writable: true,
            configurable: true
        }
    });

    return Director;
})(Synesthesia);