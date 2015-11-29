define([
        "react",
        "views/editor/EditorMixins"
    ], function(React, EditorMixins){
        var SliderField = React.createClass({
            mixins: [EditorMixins.TrackStoreUpdater],

            render: function(){
                var labelValue = this.props.label || this.getName()

                return (
                       <div className="form-group form-inline">
                           <label htmlFor={this.getId()}>{labelValue}</label>
                           <input id={this.getId()} className="form-control" value={this.getValue()} onChange={this.onChange} type="range" {...this.props} />
                           <input id={this.getId()} className="form-control" value={this.getValue()} onChange={this.onChange} type="number" {...this.props} />
                       </div>
                    );
            }

        });

        return SliderField;

    });