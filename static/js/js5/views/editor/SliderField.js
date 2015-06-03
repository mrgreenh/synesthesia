"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

define(["react", "views/editor/EditorMixins"], function (React, EditorMixins) {
    var SliderField = React.createClass({
        displayName: "SliderField",

        mixins: [EditorMixins.TrackStoreUpdater],

        render: function render() {
            return React.createElement(
                "div",
                { className: "form-group form-inline" },
                React.createElement(
                    "label",
                    { htmlFor: this.getId() },
                    this.getName()
                ),
                React.createElement("input", _extends({ id: this.getId(), className: "form-control", value: this.getValue(), onChange: this.onChange, type: "range" }, this.props)),
                React.createElement("input", _extends({ id: this.getId(), className: "form-control", value: this.getValue(), onChange: this.onChange, type: "number" }, this.props))
            );
        }

    });

    return SliderField;
});