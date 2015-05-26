"use strict";

define(["react", "views/editor/Collapsable", "views/editor/ActorsList", "views/editor/BetterSelect", "views/editor/TextField"], function (React, Collapsable, ActorsList, BetterSelect, TextField) {

    var LayerEditor = React.createClass({
        displayName: "LayerEditor",

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
});