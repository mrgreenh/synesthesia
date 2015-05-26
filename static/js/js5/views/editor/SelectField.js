"use strict";

define(["react", "views/editor/EditorMixins", "views/editor/BetterSelect"], function (React, EditorMixins, BetterSelect) {
    var SelectField = React.createClass({
        displayName: "SelectField",

        mixins: [EditorMixins.TrackStoreUpdater],

        render: function render() {
            return React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    null,
                    this.getName()
                ),
                React.createElement(
                    BetterSelect,
                    { value: this.getValue(), onChange: this.onChange },
                    this.props.children
                )
            );
        }

    });

    return SelectField;
});