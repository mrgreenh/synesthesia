"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/actors/Actor", "views/visualizer/layers/Layer", "/static/js/vendor/layers_dependencies/three.min.js"], function (Actor, Layer, _THREE_) {
    var Three3DLayer = (function (_Layer) {
        _inherits(Three3DLayer, _Layer);

        _createClass(Three3DLayer, null, [{
            key: "getAvailableActorsClasses",
            value: function getAvailableActorsClasses() {
                //Even if right now it's not, one day this will be async
                //It will ask the server to check what classes are in the actors folder
                //Because adding actors will be part of creative processes that should not require code change to the main app
                var dfd = $.Deferred();
                dfd.resolve(["ThreeCubeActor", "ThreeSphereActor"]);
                return dfd;
            }
        }]);

        function Three3DLayer(layerData, config, inputBuffer) {
            _classCallCheck(this, Three3DLayer);

            _get(Object.getPrototypeOf(Three3DLayer.prototype), "constructor", this).call(this, layerData, config, inputBuffer);

            this._scene = new THREE.Scene();
        }

        _createClass(Three3DLayer, [{
            key: "render",
            value: function render($stageElement) {
                _get(Object.getPrototypeOf(Three3DLayer.prototype), "render", this).call(this, $stageElement);
                this._camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.1, 1000);
                this._renderer = new THREE.WebGLRenderer({ alpha: true });
                this._renderer.setPixelRatio(window.devicePixelRatio);
                this._renderer.setSize(this.width, this.height);
                //$(this._renderer.domElement).addClass("layer-canvas");
                $stageElement[0].appendChild(this._renderer.domElement);

                this._camera.position.z = 400;
                this._camera.position.x = 0;
                this._camera.position.y = 0;

                this.renderFrame();
            }
        }, {
            key: "renderFrame",
            value: function renderFrame() {
                this._actorsInstances.forEach(function (actorInstance) {
                    actorInstance.renderFrame();
                });
                this._renderer.render(this._scene, this._camera);
            }
        }, {
            key: "_initializeActors",
            value: function _initializeActors() {
                this._actorsInstances = this._actorsData.map((function (actorData) {
                    return new this._actorsClassesByName[actorData.className](actorData, this._inputBuffer, this._scene);
                }).bind(this));
            }
        }]);

        return Three3DLayer;
    })(Layer);

    return Three3DLayer;
});