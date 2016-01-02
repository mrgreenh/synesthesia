"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["utils/constants", "views/visualizer/Synesthesia", "views/visualizer/actors/Actor", "views/visualizer/layers/Three3DLayer", "views/visualizer/InputBuffer", "views/visualizer/TimeKeeper", "react", "views/visualizer/OfflineRenderingControls"], function (constants, Synesthesia, Actor, Three3DLayer, InputBuffer, TimeKeeper, React, OfflineRenderingControls) {
    var Director = (function (_Synesthesia) {
        _inherits(Director, _Synesthesia);

        function Director(isOffline) {
            var _this = this;

            _classCallCheck(this, Director);

            _get(Object.getPrototypeOf(Director.prototype), "constructor", this).call(this);
            this.$el = $("#stage-container");
            this._isOffline = isOffline;
            if (isOffline) {
                this._inputSnapshots = [];
                this._isRecording = true;
                this.$el.append($("<div></div>").addClass("recording-ui-container"));
                this._recordingUIContainer = this.$el.find(".recording-ui-container");
            }
            this.layers = [];
            this._config;
            this._trackData;

            //Load the configuration that describes classes and track data
            //Then start doing your thing
            $.when(this._loadNextTrackData(), this._loadStageConfig()).then(function (trackData, configData) {
                _this._config = configData[0];
                _this._trackData = trackData[0];
                _this._inputBuffer = new InputBuffer(_this._trackData);
                _this._timeKeeper = new TimeKeeper(_this._isOffline, _this._config.offlineRenderingSettings);

                _this.observe(_this._timeKeeper, constants.EVENTS.TIME.INCREMENT);
                _this.observe(_this._timeKeeper, constants.EVENTS.TIME.INCREMENT_OFFLINE);
                _this._startTrack();
            });
        }

        _createClass(Director, [{
            key: "events",
            value: function events(eventName) {
                switch (eventName) {
                    case constants.EVENTS.TIME.INCREMENT:
                        this._renderFrame();
                        break;
                    case constants.EVENTS.TIME.INCREMENT_OFFLINE:
                        if (this._isRecording) this._recordFrame();else this._renderFrameToFile();
                        break;
                }
            }
        }, {
            key: "_recordFrame",
            value: function _recordFrame() {
                var inputSnapshots = this._inputBuffer.getSnapshot();
                this._inputSnapshots.push(inputSnapshots);
            }
        }, {
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
                    this._timeKeeper.ignite();
                }).bind(this));
            }
        }, {
            key: "_renderFrame",
            value: function _renderFrame() {
                this.layers.forEach(function (layer) {
                    layer.renderFrame();
                });
            }
        }, {
            key: "_initializeLayer",
            value: function _initializeLayer(layerData) {
                var _this3 = this;

                var className = layerData.type;
                var layerDfd = $.Deferred();
                Synesthesia.loadDependencies("views/visualizer/layers/", [className]).done(function (layerClass) {
                    var layer = new layerClass(layerData, _this3._config, _this3._inputBuffer);
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
                if (this._isOffline) this._renderOfflineControls();
            }
        }, {
            key: "_onStartRenderingClick",
            value: function _onStartRenderingClick() {
                this._isRecording = false;
                console.log(this._inputSnapshots);
                this._renderOfflineControls();
            }
        }, {
            key: "_renderFrameToFile",
            value: function _renderFrameToFile() {
                if (this._inputSnapshots.length) {
                    var currentInputSnapshot = this._inputSnapshots.splice(0, 1)[0];
                    this._inputBuffer.setSnapshot(currentInputSnapshot);
                    this._renderFrame();
                    this._saveFrameToFiles();
                }

                this._renderOfflineControls();
            }
        }, {
            key: "_saveFrameToFiles",
            value: function _saveFrameToFiles() {
                console.log("Take the snapshot of each layer and send it to the server");
            }
        }, {
            key: "_renderOfflineControls",
            value: function _renderOfflineControls() {
                var additionalMessage = this._inputSnapshots.length ? "" : "Nothing to render";
                React.render(React.createElement(OfflineRenderingControls, {
                    isRecording: this._isRecording,
                    onStartRenderingClick: _.bind(this._onStartRenderingClick, this),
                    additionalMessage: additionalMessage }), this._recordingUIContainer[0]);
            }
        }]);

        return Director;
    })(Synesthesia);

    return Director;
});