define(["exports"], function (exports) {
    "use strict";

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

        _getActorParameters: function _getActorParameters(className) {
            var fullClassName = className || this.state.className;
            var layerClassName = this._getLayerClassName();
            return window[fullClassName].getActorParameters();
        },

        handleActorClassChange: function handleActorClassChange(e) {
            var className = e.currentTarget.value;
            this.setState({
                className: className
            });
            this.setState({
                specificParams: this._getActorParameters(className)
            });
        },

        _getLayerAvailableActors: function _getLayerAvailableActors() {
            var layerClassName = this._getLayerClassName();
            return window[layerClassName].getAvailableActorsClasses();
        },

        _loadLayerDependentFields: function _loadLayerDependentFields() {
            var _this = this;

            Synesthesia.loadLayersSynesthesiaClasses([this.props.layerType]).done(function () {
                _this._getLayerAvailableActors().done(function (classes) {
                    _this.setState({
                        availableActorsClasses: classes });
                });
                _this.setState({
                    specificParams: _this._getActorParameters()
                });
            });
        },

        render: function render() {
            var _this2 = this;

            //Will eventually rerender when class is loaded
            //This needs to go first because also loads the actors parent class
            //These two ifs should be preceded by some "loadActorsDependencies" thing first
            if (!window[this.props.layerType]) this._loadLayerDependentFields();

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

            // var actorParametersForm = this._getActorParameters().map(paramName => {
            if (this.state.specificParams) {
                var actorParametersForm = this.state.specificParams.map(function (paramName) {
                    return React.createElement(
                        "li",
                        { className: "form-group form-inline" },
                        React.createElement(
                            "label",
                            { htmlFor: "parameter-" + paramName },
                            paramName
                        ),
                        React.createElement("input", { id: "parameter-" + paramName, className: "form-control", valueLink: _this2.linkState(paramName + "Parameter") })
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
});