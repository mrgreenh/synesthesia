define([
    "react",
    "editorFlux/EditorActions"
    ], function(React, EditorActions){

        var TrackStoreUpdater = {
            onChange: function(e){
                if(this.props.onChange){
                    return this.props.onChange(e);
                }else{
                    var $target = $(e.currentTarget);
                    var newValue = $target.val();
                    var propertyPath = this.props.path;
                    EditorActions.updateField(propertyPath, newValue);                    
                }
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

        var TrackPathsParser = {
            _getLayerIndex: function(){
                var path = this.props.path;
                var steps = path.split(".");
                if(steps.length>1) return steps[1];
            },

            _getActorIndex: function(){
                var path = this.props.path;
                var steps = path.split(".");
                if(steps.length>3) return steps[3];
            },

            _getInputIndex: function(){
                var path = this.props.path;
                var steps = path.split(".");
                if(steps.length>5) return steps[5];
            }
        }

        return {
            TrackStoreUpdater: TrackStoreUpdater,
            TrackPathsParser: TrackPathsParser
        }
    });