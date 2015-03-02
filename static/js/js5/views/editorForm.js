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
            { id: "editor-form-container" },
            React.createElement(
                "div",
                { className: "editorSection" },
                React.createElement(
                    "div",
                    { className: "formGroup" },
                    React.createElement(
                        "label",
                        { htmlFor: "track-title" },
                        "Title"
                    ),
                    React.createElement("input", { id: "track-title", valueLink: this.linkState("title") })
                ),
                React.createElement(
                    "div",
                    { className: "formGroup" },
                    React.createElement(
                        "label",
                        { htmlFor: "track-description" },
                        "Description"
                    ),
                    React.createElement("input", { id: "track-description", valueLink: this.linkState("description") })
                )
            ),
            React.createElement(
                "div",
                { className: "editorSection" },
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
            return React.createElement(
                "li",
                null,
                layer
            ); // TODO next: this becomes a layer object -->>
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