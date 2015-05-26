"use strict";

define(["react", "editorFlux/EditorActions"], function (React, EditorActions) {

    var TrackStoreUpdater = {
        onChange: function onChange(e) {
            if (this.props.onChange) {
                return this.props.onChange(e);
            } else {
                var $target = $(e.currentTarget);
                var newValue = $target.val();
                var propertyPath = this.props.path;
                EditorActions.updateField(propertyPath, newValue);
            }
        },

        getInitialState: function getInitialState() {
            return { value: this.props.value };
        },

        getValue: function getValue() {
            return this.props.value;
        },

        getId: function getId() {
            return "track-" + this.props.path;
        },

        getName: function getName() {
            return _.last(this.props.path.split("."));
        } };

    return {
        TrackStoreUpdater: TrackStoreUpdater
    };
});