"use strict";

define(["react", "views/editor/ActorEditor"], function (React, ActorEditor) {
    var ActorsList = React.createClass({
        displayName: "ActorsList",

        getInitialState: function getInitialState() {
            return { actorsData: this.props.actorsData };
        },

        handleNewActorClick: function handleNewActorClick(event) {
            alert("Some more magic happens here!");
        },

        render: function render() {
            var _this = this;

            var actors = this.state.actorsData.map(function (actor) {
                return React.createElement(ActorEditor, { actorData: actor, layerType: _this.props.layerType });
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