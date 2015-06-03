define([
        "react",
        "views/editor/EditorMixins"
    ], function(React, EditorMixins){
        var SliderField = React.createClass({
            mixins: [EditorMixins.TrackStoreUpdater],

            render: function(){
                return (
                       <div className="form-group form-inline">
                           <label htmlFor={this.getId()}>{this.getName()}</label>
                           <input id={this.getId()} className="form-control" value={this.getValue()} onChange={this.onChange} type="range" {...this.props} />
                           <input id={this.getId()} className="form-control" value={this.getValue()} onChange={this.onChange} type="number" {...this.props} />
                       </div>
                    );
            }

        });

        return SliderField;

    });