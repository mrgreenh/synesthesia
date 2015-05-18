"use strict";

define(["react", "views/visualizer/Synesthesia", "views/editor/BetterSelect", "views/editor/Collapsable"], function (React, Synesthesia, BetterSelect, Collapsable) {

    var ActorEditor = React.createClass({
        displayName: "ActorEditor",

        mixins: [React.addons.LinkedStateMixin],
        ADSREnvelopeAttributes: ["attack", "decay", "sustain", "release"],
        getInitialState: function getInitialState() {
            return this.props.actorData;
        },

        _getLayerClassName: function _getLayerClassName() {
            var layerType = this.props.layerType;
            return layerType;
        },

        _loadActorSpecificParameters: function _loadActorSpecificParameters(className) {
            var _this = this;

            var fullClassName = className || this.state.className;
            Synesthesia.getActorSpecificParameters(fullClassName).done(function (parameters) {
                _this.setState({ actorParameters: parameters });
            });
        },

        handleActorClassChange: function handleActorClassChange(e) {
            var className = e.currentTarget.value;
            this.setState({
                className: className
            });
            this._loadActorSpecificParameters(className);
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

            //Will eventually rerender when class is loaded
            //This needs to go first because also loads the actors parent class
            //These two ifs should be preceded by some "loadActorsDependencies" thing first
            if (!this.state.availabelActors) this._loadLayerAvailableActorsList();

            if (!this.state.actorParameters) this._loadActorSpecificParameters();

            var ADSRForms = _(this.ADSREnvelopeAttributes).map(_.bind(function (attr) {
                var attrHtmlName = "actor-" + attr;
                return React.createElement(
                    "div",
                    { className: "form-group form-inline" },
                    React.createElement(
                        "label",
                        { htmlFor: attrHtmlName },
                        attr,
                        " ",
                        this.state[attr]
                    ),
                    React.createElement("input", { id: attrHtmlName, className: "form-control", valueLink: this.linkState(attr), type: "range", min: "0", max: "100" })
                );
            }, this));

            if (this.state.actorParameters) {
                var actorParametersForm = this.state.actorParameters.map(function (paramName) {
                    return React.createElement(
                        "li",
                        { className: "form-group form-inline" },
                        React.createElement(
                            "label",
                            { htmlFor: "parameter-" + paramName },
                            paramName
                        ),
                        React.createElement("input", { id: "parameter-" + paramName, className: "form-control", valueLink: _this3.linkState(paramName + "Parameter") })
                    );
                });
            } else {
                var actorParametersForm = "Nothing to display";
            }

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
                { itemName: this.state.name },
                React.createElement(
                    "ul",
                    { className: "parameters-list" },
                    React.createElement(
                        "li",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { htmlFor: "actor-name" },
                            "Name"
                        ),
                        React.createElement("input", { id: "actor-name", className: "form-control", valueLink: this.linkState("name"), type: "text" })
                    ),
                    React.createElement(
                        "label",
                        { htmlFor: "actor-type" },
                        "Actor type:"
                    ),
                    React.createElement(
                        BetterSelect,
                        { value: this.state.className, onChange: this.handleActorClassChange },
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
                        React.createElement(
                            "ul",
                            null,
                            React.createElement(
                                "li",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "input-type" },
                                    "Type"
                                ),
                                React.createElement(
                                    BetterSelect,
                                    { valueLink: this.linkState("inputType") },
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
                                React.createElement(
                                    "label",
                                    { htmlFor: "input-channel" },
                                    "Channel"
                                ),
                                React.createElement("input", { id: "input-channel", className: "form-control", valueLink: this.linkState("inputChannel"), type: "number", min: "1" })
                            ),
                            React.createElement(
                                "li",
                                { className: "form-group form-inline" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "input-bus" },
                                    "Bus"
                                ),
                                React.createElement("input", { id: "input-bus", className: "form-control", valueLink: this.linkState("inputBus") })
                            ),
                            React.createElement(
                                "li",
                                { className: "form-group form-inline" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "input-range-max" },
                                    "Range"
                                ),
                                React.createElement("input", { id: "input-range-max", className: "form-control", valueLink: this.linkState("inputRangeMax"), type: "number", min: "1" }),
                                React.createElement("input", { id: "input-range-min", className: "form-control", valueLink: this.linkState("inputRangeMin"), type: "number", min: "1" })
                            )
                        )
                    ),
                    React.createElement(
                        Collapsable,
                        { itemName: "ADSR Envelope" },
                        ADSRForms
                    )
                )
            );
        } });

    return ActorEditor;
});
/*This can be a select with options filled in by the server*/ /*Notes and controls will be enriched with a normalized version of their value, computed based on this range*/