"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Three3DLayer = (function (Layer) {
    function Three3DLayer(layerData, config) {
        _classCallCheck(this, Three3DLayer);

        _get(Object.getPrototypeOf(Three3DLayer.prototype), "constructor", this).call(this, layerData, config);
    }

    _inherits(Three3DLayer, Layer);

    _prototypeProperties(Three3DLayer, null, {
        render: {
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
            },
            writable: true,
            configurable: true
        },
        renderFrame: {
            value: function renderFrame() {
                //requestAnimationFrame( this.renderFrame );
                this._actorsInstances.forEach(function (actorInstance) {
                    actorInstance.renderFrame();
                });
                this._renderer.render(this._scene, this._camera);
            },
            writable: true,
            configurable: true
        },
        _initializeActors: {
            value: function _initializeActors() {
                var _this = this;

                this._actorsInstances = this._actorsData.map(function (actorData) {
                    return new (window[_this._getActorClass(actorData.className)])(actorData, _this._scene);
                });
            },
            writable: true,
            configurable: true
        }
    });

    return Three3DLayer;
})(Layer);