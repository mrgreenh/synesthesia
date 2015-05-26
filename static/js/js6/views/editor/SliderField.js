define([
        "react",
        "views/editor/EditorMixins"
    ], function(React, EditorMixins){
        var SliderField = React.createClass({
            mixins: [EditorMixins.TrackStoreUpdater],

            getInitialState: function(){
              return {
                inputType: this.props.numberInputType || "range"
              }
            },

            render: function(){
                return (
                       <div className="form-group form-inline">
                           <label htmlFor={this.getId()}>{this.getName()}</label>
                           <input id={this.getId()} className="form-control" value={this.getValue()} onChange={this.onChange} type={this.state.inputType} {...this.props} />
                       </div>
                    );
            }

        });

        return SliderField;

    });