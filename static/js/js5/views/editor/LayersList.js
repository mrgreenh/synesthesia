"use strict";

define(["react", "views/editor/LayerEditor"], function (React, LayerEditor) {
    var LayersList = React.createClass({
        displayName: "LayersList",

        getInitialState: function getInitialState() {
            return { layersData: this.props.layersData };
        },

        handleNewLayerClick: function handleNewLayerClick() {
            alert("Cool magic stuff will start happening here.");
        },

        render: function render() {
            var _this = this;

            var layers = this.state.layersData.map(function (layer, index) {
                return React.createElement(LayerEditor, { layerData: layer, key: index, path: _this.props.path + "." + index });
            });
            return React.createElement(
                "div",
                { className: "layersListContainer" },
                React.createElement(
                    "h3",
                    null,
                    "Layers"
                ),
                React.createElement(
                    "button",
                    { id: "new-layer-button", onClick: this.handleNewLayerClick },
                    "New Layer"
                ),
                React.createElement(
                    "ul",
                    null,
                    layers
                )
            );
        }
    });

    return LayersList;
});