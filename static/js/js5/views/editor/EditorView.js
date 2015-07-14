"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["utils/BaseObject", "react", "views/editor/EditorForm", "editorFlux/EditorConstants"], function (BaseObject, React, EditorForm, EditorConstants) {
    var EditorView = (function (_BaseObject) {
        _inherits(EditorView, _BaseObject);

        function EditorView() {
            _classCallCheck(this, EditorView);

            _get(Object.getPrototypeOf(EditorView.prototype), "constructor", this).call(this);
            this.$el = $("#editor-view-container");
        }

        _createClass(EditorView, [{
            key: "events",
            value: function events(eventName) {
                switch (eventName) {
                    case EditorConstants.STORE_EVENTS.LOAD:
                        var newData = arguments[1];
                        this._trackData = newData;
                        this.render();
                        break;
                }
            }
        }, {
            key: "render",
            value: function render() {
                if (this._trackData) React.render(React.createElement(EditorForm, { trackData: this._trackData }), this.$el[0]);
            }
        }]);

        return EditorView;
    })(BaseObject);

    return EditorView;
});