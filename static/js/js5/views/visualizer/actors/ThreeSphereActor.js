"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/actors/ThreeActor", "/static/js/vendor/layers_dependencies/three.min.js"], function (ThreeActor, _THREE_) {
    var ThreeSphereActor = (function (_ThreeActor) {
        function ThreeSphereActor() {
            _classCallCheck(this, ThreeSphereActor);

            if (_ThreeActor != null) {
                _ThreeActor.apply(this, arguments);
            }
        }

        _inherits(ThreeSphereActor, _ThreeActor);

        _createClass(ThreeSphereActor, [{
            key: "renderFrame",
            value: function renderFrame() {
                var geometry = new THREE.SphereGeometry(150, 100, 100);
                var sphere = new THREE.Mesh(geometry, this._material);
                this._scene.add(sphere);
            }
        }], [{
            key: "getActorParameters",
            value: function getActorParameters() {
                return _get(Object.getPrototypeOf(ThreeSphereActor), "getActorParameters", this).call(this).concat(["radius"]);
            }
        }]);

        return ThreeSphereActor;
    })(ThreeActor);

    return ThreeSphereActor;
});