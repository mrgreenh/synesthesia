"use strict";

define(["react", "views/editor/EditorMixins"], function (React, EditorMixins) {
    var TextField = React.createClass({
        displayName: "TextField",

        mixins: [EditorMixins.TrackStoreUpdater],

        render: function render() {
            return React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    { htmlFor: this.getId() },
                    this.getName()
                ),
                React.createElement("input", { id: this.getId(), className: "form-control", defaultValue: this.getValue(), onChange: this.onChange })
            );
        }

    });

    return TextField;
});