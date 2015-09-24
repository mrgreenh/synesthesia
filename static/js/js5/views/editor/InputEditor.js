"use strict";

define(["react", "views/editor/Collapsable", "views/editor/SelectField", "views/editor/SliderField", "views/editor/TextField", "views/editor/SignalEditor", "views/editor/SignalsList", "editorFlux/EditorConstants", "utils/constants"], function (React, Collapsable, SelectField, SliderField, TextField, SignalEditor, SignalsList, EditorConstants, constants) {

    var InputEditor = React.createClass({
        displayName: "InputEditor",

        render: function render() {
            var inputData = this.props.inputData;

            if (this.props.targetParameters) {
                var targetParametersOptions = this.props.targetParameters.map(function (option) {
                    return React.createElement(
                        "option",
                        { value: option },
                        option
                    );
                });
            } else {
                var targetParametersOptions = [];
            }

            var sourceParameters = constants.INPUTS.SOURCE_PARAMETERS.map(function (option) {
                return React.createElement(
                    "option",
                    { value: option },
                    option
                );
            });

            return React.createElement(
                Collapsable,
                { itemName: inputData.name, path: this.props.path, deletable: "true" },
                React.createElement(TextField, { path: this.props.path + ".name", value: inputData.name }),
                React.createElement(
                    SelectField,
                    { value: inputData.targetParameter, path: this.props.path + ".targetParameter" },
                    targetParametersOptions
                ),
                React.createElement(
                    SelectField,
                    { value: inputData.sourceParameter, path: this.props.path + ".sourceParameter" },
                    sourceParameters
                ),
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
                                { itemName: "Signal processor" },
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(SignalsList, { path: this.props.path + ".signalsList", signalData: this.props.inputData.signalsList })
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