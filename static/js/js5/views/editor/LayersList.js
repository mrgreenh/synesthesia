"use strict";

define(["react", "views/editor/LayerEditor", "editorFlux/EditorActions"], function (React, LayerEditor, EditorActions) {
    var LayersList = React.createClass({
        displayName: "LayersList",

        handleNewLayerClick: function handleNewLayerClick() {
            EditorActions.createLayer();
        },

        render: function render() {
            var _this = this;

            var layersData = this.props.layersData;
            var layers = layersData.map(function (layer, index) {
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