"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

define(function () {
    var BaseObject = (function () {
        function BaseObject() {
            _classCallCheck(this, BaseObject);

            this.observers = {};
        }

        _prototypeProperties(BaseObject, null, {
            observe: {
                value: function observe(observed, eventName) {
                    observed.addObserver(this, eventName);
                },
                writable: true,
                configurable: true
            },
            addObserver: {
                value: function addObserver(observer, eventName) {
                    if (!this.observers[eventName]) this.observers[eventName] = [];
                    this.observers[eventName].push(observer);
                },
                writable: true,
                configurable: true
            },
            trigger: {
                value: function trigger(eventName) {
                    for (var _iterator = this.observers[eventName][Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                        var observer = _step.value;

                        _.bind(observer.events(), observer);
                    }
                },
                writable: true,
                configurable: true
            },
            $: {
                value: function $(selector) {
                    if (this.$el) {
                        return this.$el.find(selector);
                    }
                },
                writable: true,
                configurable: true
            },
            events: {
                value: function events() {},
                writable: true,
                configurable: true
            },
            onEvent: {

                /*
                    1) I don't like callbacks
                    2) You end up binding events all in the same spot of the code for readability anyway
                    3) Not saying this is better, but let's see how far it can get
                */

                value: function onEvent(eventName) {
                    //To be overridden in the subclass
                    console.log(eventName);
                },
                writable: true,
                configurable: true
            }
        });

        return BaseObject;
    })();

    return BaseObject;
});

//To be subclassed