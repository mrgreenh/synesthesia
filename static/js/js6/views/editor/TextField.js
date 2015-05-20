define([
        "react",
        "views/editor/EditorMixins"
    ], function(React, EditorMixins){
        var TextField = React.createClass({
            mixins: [EditorMixins.TrackStoreUpdater],

            render: function(){
                return (
                        <div className="form-group">
                            <label htmlFor={this.getId()}>Description</label>
                            <input id={this.getId()} className="form-control" value={this.getValue()} onChange={this.onChange}/>
                        </div>
                    );
            }

        });

        return TextField;

    });