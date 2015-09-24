"use strict";

define(["react", "vendor/signaljs/dist/signal", "views/editor/SliderField", "views/editor/TextField", "views/editor/Collapsable", "editorFlux/EditorActions"], function (React, Signal, SliderField, TextField, Collapsable, EditorActions) {

    var SignalEditor = React.createClass({
        displayName: "SignalEditor",

        render: function render() {
            var _this = this;

            var signalData = this.props.signalData;

            var configurationFields = Object.keys(signalData).map(function (key) {
                var datum = signalData[key];
                var input;
                switch (datum.type) {
                    case "number":
                        input = React.createElement(SliderField, { path: [_this.props.path, key, "value"].join("."), value: datum.value, min: datum.range[0], max: datum.range[1] });
                        break;
                    default:
                        //It's not even an object
                        input = React.createElement(TextField, { path: [_this.props.path, key].join("."), value: datum });
                        break;
                }

                return React.createElement(
                    "li",
                    { className: "form-group" },
                    input
                );
            });

            return React.createElement(
                Collapsable,
                { itemName: signalData.name, path: this.props.path, deletable: "true" },
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "ul",
                        null,
                        configurationFields
                    )
                )
            );
        }
    });

    return SignalEditor;
});