"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["utils/BaseObject", "vendor/socket.io.min"], function (BaseObject, io) {
    var InputBuffer = (function (_BaseObject) {
        function InputBuffer() {
            _classCallCheck(this, InputBuffer);

            _get(Object.getPrototypeOf(InputBuffer.prototype), "constructor", this).call(this);
            this._ioNamespace = "/stage";
            this.connect();
        }

        _inherits(InputBuffer, _BaseObject);

        _createClass(InputBuffer, [{
            key: "connect",
            value: function connect() {
                this._socket = io.connect("http://" + document.domain + ":" + location.port + this._ioNamespace);
                this._setupSocketEvents();
            }
        }, {
            key: "_setupSocketEvents",
            value: function _setupSocketEvents() {
                this._socket.on("message", function (data) {
                    console.log(data.message);
                });
                this._socket.on("midi_note", function (data) {
                    if (data.type == "note_on") $("body").text(data.note);
                    //Notify all actors that will have subscribed to a note/channel/type combination
                    //Based on their inputs settings
                });
            }
        }]);

        return InputBuffer;
    })(BaseObject);

    return InputBuffer;
});