"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ThreeActor = (function (Actor) {
    function ThreeActor(actorData, threeScene) {
        _classCallCheck(this, ThreeActor);

        _get(Object.getPrototypeOf(ThreeActor.prototype), "constructor", this).call(this, actorData, threeScene);
        this._scene = threeScene;
        this._material = new THREE.MeshBasicMaterial({ color: 65280 });
    }

    _inherits(ThreeActor, Actor);

    _prototypeProperties(ThreeActor, {
        getActorParameters: {
            value: function getActorParameters() {
                return _get(Object.getPrototypeOf(ThreeActor), "getActorParameters", this).call(this).concat(["zPos"]);
            },
            writable: true,
            configurable: true
        }
    });

    return ThreeActor;
})(Actor);