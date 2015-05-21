"use strict";

define(["react", "views/editor/Collapsable", "views/editor/ActorsList", "views/editor/BetterSelect", "views/editor/TextField"], function (React, Collapsable, ActorsList, BetterSelect, TextField) {

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
                    React.createElement(TextField, { path: this.props.path + ".name", value: this.state.name }),
                    "/*",
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
                    "*/",
                    React.createElement(ActorsList, { actorsData: this.state.actors, path: this.props.path + ".actors", layerType: this.state.type })
                )
            );
        }
    });

    return LayerEditor;
});