"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/actors/ThreeActor", "/static/js/vendor/layers_dependencies/three.min.js"], function (ThreeActor, _THREE_) {
    var ThreeCubeActor = (function (_ThreeActor) {
        _inherits(ThreeCubeActor, _ThreeActor);

        _createClass(ThreeCubeActor, null, [{
            key: "getActorParameters",
            value: function getActorParameters() {
                return _get(Object.getPrototypeOf(ThreeCubeActor), "getActorParameters", this).call(this).concat(["edge", "size"]);
            }
        }]);

        function ThreeCubeActor(actorData, inputBuffer, scene) {
            _classCallCheck(this, ThreeCubeActor);

            _get(Object.getPrototypeOf(ThreeCubeActor.prototype), "constructor", this).call(this, actorData, inputBuffer);
            this._material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            this._cube = new THREE.Mesh(geometry, this._material);
            scene.add(this._cube);
        }

        _createClass(ThreeCubeActor, [{
            key: "renderFrame",
            value: function renderFrame() {
                this._cube.scale.x = this._getParameter("size");
                this._cube.scale.y = this._getParameter("size");
                this._cube.scale.z = this._getParameter("size");

                this._cube.position.x = this._getParameter("posX");
                this._cube.position.y = this._getParameter("posY");
                this._cube.updateMatrixWorld();
            }
        }]);

        return ThreeCubeActor;
    })(ThreeActor);

    return ThreeCubeActor;
});