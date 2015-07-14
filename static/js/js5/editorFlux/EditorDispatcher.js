"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["utils/BaseObject"], function (BaseObject) {
    var EditorDispatcher = (function (_BaseObject) {
        _inherits(EditorDispatcher, _BaseObject);

        function EditorDispatcher() {
            _classCallCheck(this, EditorDispatcher);

            _get(Object.getPrototypeOf(EditorDispatcher.prototype), "constructor", this).call(this);
            this._callbacks = [];
            this._promises = [];
        }

        _createClass(EditorDispatcher, [{
            key: "register",
            value: function register(callback) {
                this._callbacks.push(callback);
                return this._callbacks.length - 1;
            }
        }, {
            key: "dispatch",
            value: function dispatch(payload) {
                //These resolves and rejects stuff will enable for implementing a waitFor utility
                var resolves = [];
                var rejects = [];
                this._promises = this._callbacks.map(function (_, i) {
                    var dfd = $.Deferred();
                    resolves[i] = dfd.resolve;
                    rejects[i] = dfd.reject;
                    return dfd.promise();
                });

                this._callbacks.forEach(function (callback, i) {
                    var result = callback(payload);
                    if (result.done) {
                        result.done(function () {
                            resolved[i](payload);
                        });
                        result.fail(function () {
                            new Error("Oh nooo! The dispatcher just tripped! And I'm too lazy to have this message tell you why!");
                        });
                    }
                });
                this._promises = [];
            }
        }]);

        return EditorDispatcher;
    })(BaseObject);

    return new EditorDispatcher();
});