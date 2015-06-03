"use strict";

define(["react", "views/editor/Collapsable", "views/editor/SelectField", "views/editor/SliderField", "views/editor/TextField", "editorFlux/EditorConstants"], function (React, Collapsable, SelectField, SliderField, TextField, EditorConstants) {

    var InputEditor = React.createClass({
        displayName: "InputEditor",

        render: function render() {
            var inputData = this.props.inputData;

            var ADSRForms = _(EditorConstants.ADSR_ATTRIBUTES).map(_.bind(function (attr) {
                return React.createElement(SliderField, { min: "0", max: "100", path: this.props.path + "." + attr, value: inputData[attr] });
            }, this));
            return React.createElement(
                Collapsable,
                { itemName: inputData.name },
                React.createElement(TextField, { path: this.props.path + ".name", value: inputData.name }),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "ul",
                        null,
                        React.createElement(
                            "li",
                            { className: "form-group" },
                            React.createElement(
                                SelectField,
                                { path: this.props.path + ".inputType", value: inputData.inputType },
                                React.createElement(
                                    "option",
                                    { value: "note" },
                                    "Note"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "control" },
                                    "Control"
                                )
                            )
                        ),
                        React.createElement(
                            "li",
                            { className: "form-group form-inline" },
                            React.createElement(SliderField, { path: this.props.path + ".inputChannel", value: inputData.inputChannel, min: "1" })
                        ),
                        React.createElement(
                            "li",
                            { className: "form-group form-inline" },
                            React.createElement(TextField, { path: this.props.path + ".inputBus", value: inputData.inputBus })
                        ),
                        React.createElement(
                            "li",
                            { className: "form-group form-inline" },
                            React.createElement(SliderField, { path: this.props.path + ".inputRangeMax", min: "1", value: inputData.inputRangeMax }),
                            React.createElement(SliderField, { path: this.props.path + ".inputRangeMin", min: "1", value: inputData.inputRangeMin })
                        ),
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                Collapsable,
                                { itemName: "ADSR Envelope" },
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    ADSRForms
                                )
                            )
                        )
                    )
                )
            );
        }
    });

    return InputEditor;
});