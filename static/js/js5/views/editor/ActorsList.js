"use strict";

define(["react", "views/editor/ActorEditor"], function (React, ActorEditor) {
    var ActorsList = React.createClass({
        displayName: "ActorsList",

        handleNewActorClick: function handleNewActorClick(event) {
            alert("Some more magic happens here!");
        },

        render: function render() {
            var _this = this;

            var actorsData = this.props.actorsData;
            var actors = actorsData.map(function (actor, index) {
                return React.createElement(ActorEditor, { actorData: actor, key: index, path: _this.props.path + "." + index, layerType: _this.props.layerType });
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