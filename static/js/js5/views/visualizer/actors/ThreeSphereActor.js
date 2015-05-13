"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ThreeSphereActor = (function (ThreeActor) {
    function ThreeSphereActor() {
        _classCallCheck(this, ThreeSphereActor);

        if (ThreeActor != null) {
            ThreeActor.apply(this, arguments);
        }
    }

    _inherits(ThreeSphereActor, ThreeActor);

    _prototypeProperties(ThreeSphereActor, {
        getActorParameters: {
            value: function getActorParameters() {
                return _get(Object.getPrototypeOf(ThreeSphereActor), "getActorParameters", this).call(this).concat(["radius"]);
            },
            writable: true,
            configurable: true
        }
    }, {
        renderFrame: {
            value: function renderFrame() {
                var geometry = new THREE.SphereGeometry(150, 100, 100);
                var sphere = new THREE.Mesh(geometry, this._material);
                this._scene.add(sphere);
            },
            writable: true,
            configurable: true
        }
    });

    return ThreeSphereActor;
})(ThreeActor);