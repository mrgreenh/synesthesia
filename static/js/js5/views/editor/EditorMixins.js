"use strict";

define(["react", "editorFlux/EditorActions"], function (React, EditorActions) {

    var TrackStoreUpdater = {
        onChange: function onChange(e) {
            var $target = $(e.currentTarget);
            var newValue = $target.val();
            var propertyPath = this.props.path;
            EditorActions.updateField(propertyPath, newValue);
        },

        getInitialState: function getInitialState() {
            return { value: this.props.value };
        },

        getValue: function getValue() {
            return this.state.value;
        },

        getId: function getId() {
            return "track-" + this.props.path;
        }

    };

    return {
        TrackStoreUpdater: TrackStoreUpdater
    };
});