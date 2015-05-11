"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Layer = (function (Synesthesia) {
    function Layer(layerData, config) {
        _classCallCheck(this, Layer);

        this.type = layerData.type;
        this._layerConfig = config.layers[this.type];
        this._actorsData = layerData.actors;

        this._baseDependencyPath = "vendor/layers_dependencies/";
        this._dependencies = this._layerConfig.dependencies;
        Synesthesia.loadDependencies(this._baseDependencyPath, this._dependencies).done(_.bind(this.notifyInitialization, this));
    }

    _inherits(Layer, Synesthesia);

    _prototypeProperties(Layer, {
        getLayerSpecificActorClass: {
            value: function getLayerSpecificActorClass() {},
            writable: true,
            configurable: true
        },
        getAvailableActorsClasses: {
            value: function getAvailableActorsClasses() {
                var dfd = $.Deferred();
                dfd.resolve([]);
                return dfd.promise();
            },
            writable: true,
            configurable: true
        }
    }, {
        render: {
            value: function render($stageElement) {
                this._initializeActors();
                this.width = $stageElement.width();
                this.height = $stageElement.height();
            },
            writable: true,
            configurable: true
        },
        isItInitializedYet: {
            value: function isItInitializedYet() {
                if (!this._initDfd) this._initDfd = $.Deferred();
                return this._initDfd.promise();
            },
            writable: true,
            configurable: true
        },
        notifyInitialization: {
            value: function notifyInitialization() {
                if (this._initDfd) this._initDfd.resolve();
            },
            writable: true,
            configurable: true
        }
    });

    return Layer;
})(Synesthesia);

//Override if necessary