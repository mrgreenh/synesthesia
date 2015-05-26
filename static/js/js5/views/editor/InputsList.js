"use strict";

define(["react", "views/editor/InputEditor"], function (React, Synesthesia, BetterSelect, Collapsable, TextField) {
    var InputsList = React.createClass({
        displayName: "InputsList",

        render: function render() {
            var layerData = this.props.layerData;
            return React.createElement(
                Collapsable,
                { itemName: layerData.name },
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(TextField, { path: this.props.path + ".name", value: layerData.name }),
                    React.createElement(ActorsList, { actorsData: layerData.actors, path: this.props.path + ".actors", layerType: layerData.type })
                )
            );
        }
    });

    return LayerEditor;
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
    );
});
/*This can be a select with options filled in by the server*/ /*Notes and controls will be enriched with a normalized version of their value, computed based on this range*/