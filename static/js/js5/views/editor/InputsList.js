"use strict";

define(["react", "views/editor/InputEditor"], function (React, Synesthesia, BetterSelect, Collapsable, TextField) {
    var InputsList = React.createClass({
        displayName: "InputsList",

        handleNewInputClick: function handleNewInputClick() {
            alert("Cool magic stuff will start happening here.");
        },

        render: function render() {
            var _this = this;

            var inputsData = this.props.inputsData;
            var layers = inputsData.map(function (input, index) {
                return React.createElement(InputEditor, { inputData: input, key: index, path: _this.props.path + "." + index });
            });
            return React.createElement(
                "div",
                { className: "inputsListContainer" },
                React.createElement(
                    "h3",
                    null,
                    "Inputs"
                ),
                React.createElement(
                    "button",
                    { id: "new-input-button", onClick: this.handleNewInputClick },
                    "New Input"
                ),
                React.createElement(
                    "ul",
                    null,
                    inputs
                )
            );
        }
    });

    return InputsList;
});