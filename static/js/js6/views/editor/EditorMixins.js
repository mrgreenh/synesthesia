define([
    "react",
    "editorFlux/EditorActions"
    ], function(React, EditorActions){

        var TrackStoreUpdater = {
            onChange: function(e){
                var $target = $(e.currentTarget);
                var newValue = $target.val();
                var propertyPath = this.props.path;
                EditorActions.updateField(propertyPath, newValue);
            },

            getInitialState: function(){
                return {value: this.props.value};
            },

            getValue: function(){
                return this.props.value;
            },

            getId: function(){
                return "track-"+this.props.path;
            },

            getName: function(){
                return _.last(this.props.path.split("."));
            },

        }

        return {
            TrackStoreUpdater: TrackStoreUpdater
        }
    });