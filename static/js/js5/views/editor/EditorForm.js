"use strict";

define(["react", "views/editor/ActorEditor", "views/visualizer/Director", "views/editor/LayersList", "views/editor/ScenesList"], function (React, ActorEditor, Director, LayersList, ScenesList) {

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

    return EditorForm;
});