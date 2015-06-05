"use strict";

define(["react", "views/visualizer/Synesthesia", "views/editor/BetterSelect", "views/editor/Collapsable", "views/editor/TextField", "views/editor/SelectField", "views/editor/InputsList", "editorFlux/EditorActions"], function (React, Synesthesia, BetterSelect, Collapsable, TextField, SelectField, InputsList, EditorActions) {

    var ActorEditor = React.createClass({
        displayName: "ActorEditor",

        mixins: [React.addons.LinkedStateMixin],
        getInitialState: function getInitialState() {
            return {
                actorParameters: [],
                availableActorsClasses: []
            };
        },

        componentDidMount: function componentDidMount() {
            this._loadLayerAvailableActorsList();
            this._loadActorSpecificParameters();
        },

        _getLayerClassName: function _getLayerClassName() {
            var layerType = this.props.layerType;
            return layerType;
        },

        _loadActorSpecificParameters: function _loadActorSpecificParameters(className) {
            var _this = this;

            var fullClassName = className || this.props.actorData.className;
            Synesthesia.getActorSpecificParameters(fullClassName).done(function (parameters) {
                _this.setState({ actorParameters: parameters });
            });
        },

        handleActorClassChange: function handleActorClassChange(e) {
            var className = e.currentTarget.value;
            this._loadActorSpecificParameters(className);
            var propertyPath = this.props.path + ".className";
            EditorActions.updateField(propertyPath, className);
        },

        _loadLayerAvailableActorsList: function _loadLayerAvailableActorsList() {
            var _this2 = this;

            Synesthesia.getLayerAvailableActors([this.props.layerType]).done(function (classes) {
                _this2.setState({
                    availableActorsClasses: classes
                });
            });
        },

        render: function render() {
            var _this3 = this;

            var actorData = this.props.actorData;
            //Actor specific parameters
            if (this.state.actorParameters) {
                var actorParametersForm = this.state.actorParameters.map(function (paramName) {
                    return React.createElement(TextField, { path: _this3.props.path + "." + paramName + "Parameter", value: _this3.props.actorData[paramName + "Parameter"] });
                });
            } else {
                var actorParametersForm = "Nothing to display";
            }

            //Actor classes
            if (this.state.availableActorsClasses) {
                var actorClassOptions = this.state.availableActorsClasses.map(function (option) {
                    return React.createElement(
                        "option",
                        { value: option },
                        option
                    );
                });
            } else {
                var actorClassOptions = [];
            }

            return React.createElement(
                Collapsable,
                { itemName: this.props.actorData.name, path: this.props.path, deletable: "true" },
                React.createElement(
                    "ul",
                    { className: "parameters-list" },
                    React.createElement(TextField, { path: this.props.path + ".name", value: this.props.actorData.name }),
                    React.createElement(
                        SelectField,
                        { value: this.props.actorData.className, path: this.props.path + ".className", onChange: this.handleActorClassChange },
                        actorClassOptions
                    ),
                    React.createElement(
                        Collapsable,
                        { itemName: "actorParams" },
                        React.createElement(
                            "ul",
                            null,
                            actorParametersForm
                        )
                    ),
                    React.createElement(
                        Collapsable,
                        { itemName: "Inputs" },
                        React.createElement(InputsList, { path: this.props.path + ".inputChannels", inputsData: this.props.actorData.inputChannels })
                    )
                )
            );
        } });

    return ActorEditor;
});