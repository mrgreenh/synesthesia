"use strict";

define(["react"], function (React) {
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
                //return <LayerEditor sceneData={scene} />;
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

    return ScenesList;
});