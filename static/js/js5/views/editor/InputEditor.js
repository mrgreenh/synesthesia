"use strict";

define(["react", "views/editor/Collapsable", "views/editor/SelectField", "views/editor/TextField"], function (React, Collapsable, ActorsList, SelectField, TextField) {

    var InputEditor = React.createClass({
        displayName: "InputEditor",

        render: function render() {
            var inputData = this.props.inputData;
            return React.createElement(
                Collapsable,
                { itemName: inputData.name },
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(TextField, { path: this.props.path + ".name", value: inputData.name }),
                    React.createElement(
                        "ul",
                        null,
                        React.createElement(
                            "li",
                            { className: "form-group" },
                            React.createElement(SelectField, { path: this.props.path + ".inputType", value: inputData.inputType, options: ["note", "control"] })
                        ),
                        React.createElement(
                            "li",
                            { className: "form-group form-inline" },
                            React.createElement(SliderField, { inputType: "number", path: this.props.path + ".inputChannel", value: inputData.inputChannel, min: "1" })
                        ),
                        React.createElement(
                            "li",
                            { className: "form-group form-inline" },
                            React.createElement(TextField, { path: this.props.path + ".inputBus", value: inputData.inputBus })
                        ),
                        React.createElement(
                            "li",
                            { className: "form-group form-inline" },
                            React.createElement(SliderField, { inputType: "number", path: this.props.path + ".inputRangeMax", min: "1", value: inputData.inputRangeMax }),
                            React.createElement(SliderField, { inputType: "number", path: this.props.path + ".inputRangeMin", min: "1", value: inputData.inputRangeMin })
                        )
                    )
                )
            );
        }
    });

    return LayerEditor;
});