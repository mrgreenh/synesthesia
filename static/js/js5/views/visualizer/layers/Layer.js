"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/Synesthesia", "views/visualizer/actors/Actor"], function (Synesthesia, Actor) {
    var Layer = (function (_Synesthesia) {
        function Layer(layerData, config) {
            _classCallCheck(this, Layer);

            _get(Object.getPrototypeOf(Layer.prototype), "constructor", this).call(this);
            this.type = layerData.type;
            this._layerConfig = config.layers[this.type];
            this._actorsData = layerData["actors"];
        }

        _inherits(Layer, _Synesthesia);

        _createClass(Layer, [{
            key: "initialize",
            value: function initialize() {
                var initDfd = $.Deferred();
                this._loadActorsClasses().done((function () {
                    this._actorsClassesDefinitions = arguments;
                    this._actorsClassesByName = _.object(this._actorsClasses, this._actorsClassesDefinitions);
                    initDfd.resolve();
                }).bind(this));
                return initDfd.promise();
            }
        }, {
            key: "_loadActorsClasses",
            value: function _loadActorsClasses() {
                var baseActorDependencyPath = "views/visualizer/actors/";
                this._actorsClasses = _(this._actorsData).pluck("className");
                var dfd = $.Deferred();
                Synesthesia.loadDependencies(baseActorDependencyPath, this._actorsClasses).done(dfd.resolve);
                return dfd.promise();
            }
        }, {
            key: "render",
            value: function render($stageElement) {
                this._initializeActors();
                this.width = $stageElement.width();
                this.height = $stageElement.height();
            }
        }], [{
            key: "getLayerSpecificActorClass",
            value: function getLayerSpecificActorClass() {}
        }, {
            key: "getAvailableActorsClasses",
            value: function getAvailableActorsClasses() {
                var dfd = $.Deferred();
                dfd.resolve([]);
                return dfd.promise();
            }
        }]);

        return Layer;
    })(Synesthesia);

    return Layer;
});

//Override if necessary