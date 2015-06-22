"use strict";

define(["react", "views/editor/InputEditor", "views/editor/EditorMixins", "editorFlux/EditorActions"], function (React, InputEditor, EditorMixins, EditorActions) {
    var InputsList = React.createClass({
        displayName: "InputsList",

        mixins: [EditorMixins.TrackPathsParser],

        handleNewInputClick: function handleNewInputClick() {
            EditorActions.createInput(this._getLayerIndex(), this._getActorIndex());
        },

        render: function render() {
            var _this = this;

            var inputsData = this.props.inputsData;
            var inputs = inputsData.map(function (input, index) {
                return React.createElement(InputEditor, { inputData: input, targetParameters: _this.props.targetParameters, key: index, path: _this.props.path + "." + index });
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