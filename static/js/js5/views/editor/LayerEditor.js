"use strict";

define(["react", "views/editor/Collapsable", "views/editor/ActorsList", "views/editor/BetterSelect"], function (React, Collapsable, ActorsList, BetterSelect) {

    var LayerEditor = React.createClass({
        displayName: "LayerEditor",

        mixins: [React.addons.LinkedStateMixin],

        getInitialState: function getInitialState() {
            return this.props.layerData;
        },

        render: function render() {
            return React.createElement(
                Collapsable,
                { itemName: this.state.name },
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "p",
                        { className: "bg-warning" },
                        "These options are defined by loading the js classes of each layer"
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            { htmlFor: "layer-name" },
                            "Name"
                        ),
                        React.createElement("input", { id: "layer-name", className: "form-control", valueLink: this.linkState("name") })
                    ),
                    React.createElement(
                        "label",
                        { htmlFor: "layer-type" },
                        "Layer type:"
                    ),
                    React.createElement(
                        BetterSelect,
                        { valueLink: this.linkState("type") },
                        React.createElement(
                            "option",
                            { value: "Canvas2DLayer" },
                            "Canvas2D"
                        ),
                        React.createElement(
                            "option",
                            { value: "Processing2DLayer" },
                            "Processing2D"
                        ),
                        React.createElement(
                            "option",
                            { value: "Three3DLayer" },
                            "Three3D"
                        )
                    ),
                    React.createElement(ActorsList, { actorsData: this.state.actors, layerType: this.state.type })
                )
            );
        }
    });

    return LayerEditor;
});