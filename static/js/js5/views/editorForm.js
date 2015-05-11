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
                React.createElement(LayersList, { layersData: this.state.layersData }),
                React.createElement(ScenesList, { scenesData: this.state.scenesData })
            )
        );
    }
});

var ScenesList = React.createClass({
    displayName: "ScenesList",

    getInitialState: function getInitialState() {
        return { scenesData: this.props.scenesData };
    },

    handleNewSceneClick: function handleNewSceneClick() {
        alert("Cool magic stuff will start happening here.");
    },

    render: function render() {
        var scenes = this.state.scenesData.map(function (scene) {
            //return <Layer sceneData={scene} />;
            return React.createElement(
                "li",
                null,
                scene.name
            );
        });
        return React.createElement(
            "div",
            { className: "scenesListContainer" },
            React.createElement(
                "h3",
                null,
                "Scenes"
            ),
            React.createElement(
                "p",
                { className: "bg-primary" },
                "Here scenes can be added and configured (bg color, stage and unstage duration etc...). Scenes added here will also add a new tab in the layers section. Each tab allows to overwrite each parameter by checking a checkbox next to it."
            ),
            React.createElement(
                "button",
                { id: "new-scene-button", onClick: this.handleNewSceneClick },
                "New Scene"
            ),
            React.createElement(
                "ul",
                null,
                scenes
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

var Layer = React.createClass({
    displayName: "Layer",

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
                ),
                React.createElement(ActorsList, { actorsData: this.state.actors })
            )
        );
    }
});

var ActorsList = React.createClass({
    displayName: "ActorsList",

    getInitialState: function getInitialState() {
        return { actorsData: this.props.actorsData };
    },

    handleNewActorClick: function handleNewActorClick(event) {
        alert("Some more magic happens here!");
    },

    render: function render() {
        var actors = this.state.actorsData.map(function (actor) {
            return React.createElement(Actor, { actorData: actor });
        });
        return React.createElement(
            "div",
            { className: "actors-list" },
            React.createElement(
                "button",
                { id: "new-actor-button", onClick: this.handleNewActorClick },
                "New Actor"
            ),
            React.createElement(
                "ul",
                null,
                actors
            )
        );
    }
});

var Actor = React.createClass({
    displayName: "Actor",

    mixins: [React.addons.LinkedStateMixin],
    ADSREnvelopeAttributes: ["attack", "decay", "sustain", "release"],
    getInitialState: function getInitialState() {
        return this.props.actorData;
    },

    render: function render() {
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
                    { valueLink: this.linkState("className") },
                    React.createElement(
                        "option",
                        { value: "Circle3D" },
                        "\"Circle\""
                    ),
                    React.createElement(
                        "option",
                        { value: "Pyramid3D" },
                        "\"Pyramid\""
                    ),
                    React.createElement(
                        "option",
                        { value: "Cube3D" },
                        "\"Cube\""
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

var Collapsable = React.createClass({
    displayName: "Collapsable",

    getInitialState: function getInitialState() {
        return { collapsed: true,
            backgroundColor: this._getBackgroundColor() };
    },

    _getBackgroundColor: function _getBackgroundColor() {
        var rgb = [];
        for (var i = 0; i < 3; i++) {
            rgb.push(parseInt(Math.min(255, Math.random() * 255)));
        }
        return rgb;
    },

    handleCollapseItem: function handleCollapseItem(e) {
        this.setState({ collapsed: !this.state.collapsed });
    },

    render: function render() {
        var additional_classes = this.state.collapsed ? " collapsed" : "";
        var classes = "collapsable-content" + additional_classes;
        var backgroundColor = "rgba(" + this.state.backgroundColor.join(",") + ",.1)";
        var inlineStyles = { backgroundColor: backgroundColor };
        return React.createElement(
            "li",
            { className: "collapsable", style: inlineStyles },
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
// How many inputs and what kind is defined by the actors class. For now only one -->
// This can be a select with options filled in by the server -->
// Notes and controls will be enriched with a normalized version of their value, computed based on this range -->