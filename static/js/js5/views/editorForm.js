"use strict";

var EditorForm = React.createClass({
    displayName: "EditorForm",

    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function getInitialState() {
        return this.props.trackData;
    },

    render: function render() {
        return React.createElement(
            "div",
            { id: "editor-form-container", className: "container" },
            React.createElement(
                "div",
                { className: "editorSection row" },
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "track-title" },
                        "Title"
                    ),
                    React.createElement("input", { id: "track-title", className: "form-control", valueLink: this.linkState("title") })
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { htmlFor: "track-description" },
                        "Description"
                    ),
                    React.createElement("input", { id: "track-description", className: "form-control", valueLink: this.linkState("description") })
                )
            ),
            React.createElement(
                "div",
                { className: "editorSection row" },
                React.createElement(LayersList, { layersData: this.state.layersData })
            )
        );
    }
});

var LayersList = React.createClass({
    displayName: "LayersList",

    getInitialState: function getInitialState() {
        return { layersData: this.props.layersData };
    },

    handleNewLayerClick: function handleNewLayerClick() {
        alert("Cool magic stuff will start happening here.");
    },

    render: function render() {
        var layers = this.state.layersData.map(function (layer) {
            return React.createElement(Layer, { layerData: layer });
        });
        return React.createElement(
            "div",
            { className: "layersListContainer" },
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

var Layer = React.createClass({
    displayName: "Layer",

    getInitialState: function getInitialState() {
        return { layerData: this.props.layerData };
    },

    render: function render() {
        var layerData = this.state.layerData;
        return React.createElement(
            Collapsable,
            { itemName: layerData.name },
            React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "p",
                    { className: "bg-warning" },
                    "These options are defined by loading the js classes of each layer"
                ),
                React.createElement(
                    "label",
                    { htmlFor: "layer-type" },
                    "Layer type:"
                ),
                React.createElement(
                    "select",
                    { value: layerData.type },
                    React.createElement(
                        "option",
                        { value: "Canvas2D" },
                        "Canvas2D"
                    ),
                    React.createElement(
                        "option",
                        { value: "Processing2D" },
                        "Processing2D"
                    ),
                    React.createElement(
                        "option",
                        { value: "Three3D" },
                        "Three3D"
                    )
                )
            )
        );
    }
});

var Collapsable = React.createClass({
    displayName: "Collapsable",

    getInitialState: function getInitialState() {
        return { collapsed: false };
    },

    handleCollapseItem: function handleCollapseItem(e) {
        this.setState({ collapsed: !this.state.collapsed });
    },

    render: function render() {
        var additional_classes = this.state.collapsed ? " collapsed" : "";
        var classes = "collapsable-content" + additional_classes;
        return React.createElement(
            "li",
            { className: "collapsable" },
            React.createElement(
                "strong",
                { onClick: this.handleCollapseItem, className: "bg-primary collapsing-switch" },
                this.props.itemName
            ),
            React.createElement(
                "div",
                { className: classes },
                this.props.children
            )
        );
    }

});
// TODO make the above statement true -->