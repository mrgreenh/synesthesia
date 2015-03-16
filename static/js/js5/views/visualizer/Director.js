"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Director = (function (Synesthesia) {
    function Director() {
        var _this = this;

        _classCallCheck(this, Director);

        this.$el = $("#stage-container");
        this._loadNextTrackData().done(function (data) {
            _this._trackData = data;
            _this._startTrack();
        });
    }

    _inherits(Director, Synesthesia);

    _prototypeProperties(Director, null, {
        _startTrack: {
            value: function _startTrack() {
                var _this = this;

                this._trackData.layersData.forEach(function (elem) {
                    _this._initializeLayer(elem);
                });
            },
            writable: true,
            configurable: true
        },
        _initializeLayer: {
            value: function _initializeLayer(layerData) {},
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
        }
    });

    return Director;
})(Synesthesia);

//Get the layer's type to require() and initialize the right class
//The layer's class might have more require() to do for the libs