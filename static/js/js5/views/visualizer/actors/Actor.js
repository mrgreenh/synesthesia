"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Actor = (function (Synesthesia) {
    function Actor(actorData) {
        _classCallCheck(this, Actor);

        this._actorData = actorData;
    }

    _inherits(Actor, Synesthesia);

    _prototypeProperties(Actor, {
        getActorParameters: {
            value: function getActorParameters() {
                return ["posX", "posY"];
            },
            writable: true,
            configurable: true
        }
    });

    return Actor;
})(Synesthesia);