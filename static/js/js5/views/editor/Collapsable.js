"use strict";

define(["react", "editorFlux/EditorActions"], function (React, EditorActions) {

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

        handleDeleteItem: function handleDeleteItem(e) {
            //Assuming it's an item of a list, last step of the path will be the index
            var fullPath = this.props.path;
            var steps = fullPath.split(".");
            var index = steps[steps.length - 1];
            steps.splice(steps.length - 1, 1);
            var pathToArray = steps.join(".");
            EditorActions.deleteItem(pathToArray, index);
        },

        render: function render() {
            var additional_classes = this.state.collapsed ? " collapsed" : "";
            var classes = "collapsable-content" + additional_classes;
            var backgroundColor = "rgba(" + this.state.backgroundColor.join(",") + ",.1)";
            var inlineStyles = { backgroundColor: backgroundColor };
            var deleteButton = this.props.deletable ? React.createElement(
                "button",
                { onClick: this.handleDeleteItem },
                "Ø"
            ) : undefined;

            return React.createElement(
                "li",
                { className: "collapsable", style: inlineStyles },
                React.createElement(
                    "strong",
                    { onClick: this.handleCollapseItem, className: "bg-primary collapsing-switch" },
                    this.props.itemName
                ),
                deleteButton,
                React.createElement(
                    "div",
                    { className: classes },
                    this.props.children
                )
            );
        }
    });

    return Collapsable;
});