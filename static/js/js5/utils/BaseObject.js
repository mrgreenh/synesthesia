"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {
    var BaseObject = (function () {
        function BaseObject() {
            _classCallCheck(this, BaseObject);

            this.observers = {};
        }

        _createClass(BaseObject, [{
            key: "observe",
            value: function observe(observed, eventName) {
                observed.addObserver(this, eventName);
            }
        }, {
            key: "addObserver",
            value: function addObserver(observer, eventName) {
                if (!this.observers[eventName]) this.observers[eventName] = [];
                this.observers[eventName].push(observer);
            }
        }, {
            key: "trigger",
            value: function trigger(eventName) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.observers[eventName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var observer = _step.value;

                        _.bind(observer.events(), observer);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }, {
            key: "$",
            value: function $(selector) {
                if (this.$el) return this.$el.find(selector);
            }
        }, {
            key: "events",
            value: function events() {}
        }, {
            key: "onEvent",

            /*
                1) I don't like callbacks
                2) You end up binding events all in the same spot of the code for readability anyway
                3) Not saying this is better, but let's see how far it can get
            */
            value: function onEvent(eventName) {
                //To be overridden in the subclass
                console.log(eventName);
            }
        }]);

        return BaseObject;
    })();

    return BaseObject;
});

//To be subclassed