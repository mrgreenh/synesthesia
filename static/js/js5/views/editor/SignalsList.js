"use strict";

define(["react", "views/editor/InputEditor", "views/editor/SignalEditor", "views/editor/EditorMixins", "editorFlux/EditorActions", "vendor/signaljs/dist/signal"], function (React, InputEditor, SignalEditor, EditorMixins, EditorActions, Signal) {

    var SignalsList = React.createClass({
        displayName: "SignalsList",

        mixins: [EditorMixins.TrackPathsParser],

        _handleNewModuleClick: function _handleNewModuleClick() {
            //Use modules bag to list the modules available in the prompt
            var promptString = "Type the name of the module you want to add:";
            var possibleOptions = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Signal.getModulesList()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    moduleName = _step.value;

                    promptString += "\n" + moduleName;
                    possibleOptions.push(moduleName.toLowerCase());
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var moduleName = prompt(promptString);
            var selectedOptionIndex = possibleOptions.indexOf(moduleName.toLowerCase());
            if (selectedOptionIndex > -1) {
                EditorActions.createSignal(this._getLayerIndex(), this._getActorIndex(), this._getInputIndex(), moduleName);
            } else alert("Wait... what did you say?!");
        },

        render: function render() {
            var _this = this;

            var modulesData = this.props.signalData;
            var signalsModules = modulesData.map(function (signalModule, index) {
                return React.createElement(SignalEditor, { key: index, signalData: signalModule, path: _this.props.path + "." + index });
            });
            return React.createElement(
                "div",
                { className: "signalsListContainer" },
                React.createElement(
                    "h4",
                    null,
                    "Signals processors"
                ),
                React.createElement(
                    "button",
                    { id: "new-signal-button", onClick: this._handleNewModuleClick },
                    "New Module"
                ),
                React.createElement(
                    "ul",
                    null,
                    signalsModules
                )
            );
        }
    });

    return SignalsList;
});