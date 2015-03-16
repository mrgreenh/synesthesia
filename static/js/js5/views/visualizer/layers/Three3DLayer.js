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
                _get(Object.getPrototypeOf(Three3DLayer.prototype), "render", this).call(this, $stageElement);
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
                this.renderer = new THREE.WebGLRenderer({ alpha: true });
                this.renderer.setSize(this.width, this.height);
                //$(this.renderer.domElement).addClass("layer-canvas");
                $stageElement[0].appendChild(this.renderer.domElement);

                var geometry = new THREE.BoxGeometry(1, 1, 1);
                var material = new THREE.MeshBasicMaterial({ color: 65280 });
                var cube = new THREE.Mesh(geometry, material);
                this.scene.add(cube);

                this.camera.position.z = 5;
                this.camera.position.x = 1;
                this.camera.position.y = 1;

                this.renderFrame();

                alert("rendered three");
            },
            writable: true,
            configurable: true
        },
        renderFrame: {
            value: function renderFrame() {
                //requestAnimationFrame( this.renderFrame );
                this.renderer.render(this.scene, this.camera);
            },
            writable: true,
            configurable: true
        }
    });

    return Three3DLayer;
})(Layer);