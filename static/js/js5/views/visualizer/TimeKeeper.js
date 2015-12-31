"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["views/visualizer/Synesthesia", "utils/constants"], function (Synesthesia, constants) {
    var TimeKeeper = (function (_Synesthesia) {
        _inherits(TimeKeeper, _Synesthesia);

        function TimeKeeper(isOffline, offlineRenderingSettings) {
            _classCallCheck(this, TimeKeeper);

            _get(Object.getPrototypeOf(TimeKeeper.prototype), "constructor", this).call(this);

            this._offlineRenderingSettings = offlineRenderingSettings;
            this._isOffline = isOffline;
        }

        _createClass(TimeKeeper, [{
            key: "ignite",
            value: function ignite() {
                this._frame = 0;
                if (this._isOffline) this._incrementFrameOffline();else this._incrementFrame();
            }
        }, {
            key: "_incrementFrame",
            value: function _incrementFrame() {
                this.triggerEvent(constants.EVENTS.TIME.INCREMENT);
                this._frame++;
                window.requestAnimationFrame(_.bind(this._incrementFrame, this));
            }
        }, {
            key: "_incrementFrameOffline",
            value: function _incrementFrameOffline() {
                this.triggerEvent(constants.EVENTS.TIME.INCREMENT_OFFLINE);
                this._frame++;
                //TODO this might introduce a delay because 1000/60 gives decimal crap
                setTimeout(_.bind(this._incrementFrameOffline, this), 17);
            }
        }]);

        return TimeKeeper;
    })(Synesthesia);

    return TimeKeeper;
});