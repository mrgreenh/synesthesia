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
            key: "setProp",
            value: function setProp(dict, path, value) {
                var steps = path.split(".");
                if (steps.length > 1) {
                    if (_.isUndefined(dict[_.first(steps)])) dict[_.first(steps)] = {};
                    this.setProp(dict[steps.shift()], steps.join("."), value);
                } else {
                    dict[_.first(steps)] = value;
                }
            }
        }, {
            key: "observe",
            value: function observe(observed, eventName) {
                observed.addObserver(this, eventName);
            }
        }, {
            key: "unobserve",
            value: function unobserve(observed) {
                observed.removeObserver(this);
            }
        }, {
            key: "removeObserver",
            value: function removeObserver(observer) {
                var _this = this;

                _.keys(this.observers).forEach(function (key) {
                    _this.observers[key] = _.without(_this.observers[key], observer);
                });
            }
        }, {
            key: "addObserver",
            value: function addObserver(observer, eventName) {
                if (!this.observers[eventName]) this.observers[eventName] = [];
                this.observers[eventName].push(observer);
            }
        }, {
            key: "triggerEvent",
            value: function triggerEvent(eventName) {
                var _arguments = arguments;

                if (!this.observers[eventName]) return;
                this.observers[eventName].forEach(function (observer) {
                    observer.events.apply(observer, _arguments);
                });
            }
        }, {
            key: "$",
            value: function $(selector) {
                if (this.$el) return this.$el.find(selector);
            }
        }, {
            key: "events",
            value: function events(eventName) {}
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