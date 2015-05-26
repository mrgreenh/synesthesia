define([
        "react",
        "views/editor/EditorMixins",
        "views/editor/BetterSelect",
    ], function(React, EditorMixins, BetterSelect){
        var SelectField = React.createClass({
            mixins: [EditorMixins.TrackStoreUpdater],

            render: function(){
                return (
                        <div className="form-group">
                            <label>{this.getName()}</label>
                            <BetterSelect value={this.getValue()} onChange={this.onChange}>
                                {this.props.children}
                            </BetterSelect>
                        </div>
                    );
            }

        });

        return SelectField;

    });