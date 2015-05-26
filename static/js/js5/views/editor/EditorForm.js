"use strict";

define(["react", "views/editor/ActorEditor", "views/visualizer/Director", "views/editor/LayersList", "views/editor/ScenesList", "views/editor/TextField", "editorFlux/TrackStore", "editorFlux/EditorConstants"], function (React, ActorEditor, Director, LayersList, ScenesList, TextField, trackStore, EditorConstants) {

    var EditorForm = React.createClass({
        displayName: "EditorForm",

        events: function events(eventName) {
            //Meaning BaseObject events. No DOM involved.
            switch (eventName) {
                case EditorConstants.STORE_EVENTS.CHANGE:
                    var newData = arguments[1];
                    this.setState(newData);
                    break;
            }
        },

        componentDidMount: function componentDidMount() {
            trackStore.addObserver(this, EditorConstants.STORE_EVENTS.CHANGE);
        },

        render: function render() {
            var trackData = this.props.trackData;
            return React.createElement(
                "div",
                { id: "editor-form-container", className: "container" },
                React.createElement(
                    "div",
                    { className: "editorSection row" },
                    React.createElement(TextField, { path: "title", value: trackData.title }),
                    React.createElement(TextField, { path: "description", value: trackData.description })
                ),
                React.createElement(
                    "div",
                    { className: "editorSection row" },
                    React.createElement(LayersList, { layersData: trackData.layersData, path: "layersData" }),
                    React.createElement(ScenesList, { scenesData: trackData.scenesData })
                )
            );
        }
    });

    return EditorForm;
});