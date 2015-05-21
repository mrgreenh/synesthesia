"use strict";

define(["react"], function (React) {

    var Collapsable = React.createClass({
        displayName: "Collapsable",

        getInitialState: function getInitialState() {
            return { collapsed: false,
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

    return Collapsable;
});