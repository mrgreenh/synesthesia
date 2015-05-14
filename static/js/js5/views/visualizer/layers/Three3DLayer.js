define(["exports", "module", "views/visualizer/layers/Layer", "utils/utilities"], function (exports, module, _viewsVisualizerLayersLayer, _utilsUtilities) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var _Layer2 = _interopRequire(_viewsVisualizerLayersLayer);

    var _getBabelCompiledClassName = _interopRequire(_utilsUtilities);

    var Three3DLayer = (function (_Layer) {
        function Three3DLayer(layerData, config) {
            _classCallCheck(this, Three3DLayer);

            _get(Object.getPrototypeOf(Three3DLayer.prototype), "constructor", this).call(this, layerData, config);
        }

        _inherits(Three3DLayer, _Layer);

        _createClass(Three3DLayer, [{
            key: "render",
            value: function render($stageElement) {
                this._scene = new THREE.Scene();
                _get(Object.getPrototypeOf(Three3DLayer.prototype), "render", this).call(this, $stageElement);
                this._camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
                this._renderer = new THREE.WebGLRenderer({ alpha: true });
                this._renderer.setSize(this.width, this.height);
                //$(this._renderer.domElement).addClass("layer-canvas");
                $stageElement[0].appendChild(this._renderer.domElement);

                this._camera.position.z = 5;
                this._camera.position.x = 1;
                this._camera.position.y = 1;

                this.renderFrame();
            }
        }, {
            key: "renderFrame",
            value: function renderFrame() {
                //requestAnimationFrame( this.renderFrame );
                this._actorsInstances.forEach(function (actorInstance) {
                    actorInstance.renderFrame();
                });
                this._renderer.render(this._scene, this._camera);
            }
        }, {
            key: "_initializeActors",
            value: function _initializeActors() {
                var _this = this;

                this._actorsInstances = this._actorsData.map(function (actorData) {
                    return new (window[(0, _getBabelCompiledClassName)(actorData.className)])(actorData, _this._scene);
                });
            }
        }], [{
            key: "getLayerSpecificActorClass",
            value: function getLayerSpecificActorClass() {
                return "ThreeActor";
            }
        }, {
            key: "getAvailableActorsClasses",
            value: function getAvailableActorsClasses() {
                return ["ThreeCubeActor", "ThreeSphereActor"];
            }
        }]);

        return Three3DLayer;
    })(_Layer2);

    module.exports = Three3DLayer;
});