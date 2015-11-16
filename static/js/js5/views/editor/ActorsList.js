"use strict";

define(["react", "views/editor/ActorEditor", "views/editor/EditorMixins", "editorFlux/EditorActions", "views/visualizer/Synesthesia"], function (React, ActorEditor, EditorMixins, EditorActions, Synesthesia) {

    var ActorsList = React.createClass({
        displayName: "ActorsList",

        mixins: [EditorMixins.TrackPathsParser],

        getInitialState: function getInitialState() {
            return {
                availableActorsClasses: []
            };
        },

        componentDidMount: function componentDidMount() {
            var _this = this;

            Synesthesia.getLayerAvailableActors([this.props.layerType]).done(function (classes) {
                _this.setState({
                    availableActorsClasses: classes
                });
            });
        },

        handleNewActorClick: function handleNewActorClick(event) {
            var availableClasses = this.state.availableActorsClasses;
            if (availableClasses.length) EditorActions.createActor(this._getLayerIndex(), availableClasses[0]);
        },

        render: function render() {
            var _this2 = this;

            var actorsData = this.props.actorsData;
            var actors = actorsData.map(function (actor, index) {
                return React.createElement(ActorEditor, { actorData: actor, key: index, path: _this2.props.path + "." + index, layerType: _this2.props.layerType });
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

    return ActorsList;
});