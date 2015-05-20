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
                return this.state.value;
            },

            getId: function(){
                return "track-"+this.props.path;
            }

        }

        return {
            TrackStoreUpdater: TrackStoreUpdater
        }
    });