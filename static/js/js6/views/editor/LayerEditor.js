define([
        "react",
        "views/editor/Collapsable",
        "views/editor/ActorsList",
        "views/editor/BetterSelect",
        "views/editor/TextField"
    ], function(React, Collapsable, ActorsList, BetterSelect, TextField){

        var LayerEditor = React.createClass({

            render: function(){
                var layerData = this.props.layerData;
                return (<Collapsable itemName={layerData.name} deletable="true" path={this.props.path}>
                        <div className="form-group">
                            <TextField path={this.props.path+".name"} value={layerData.name} />
                            <ActorsList actorsData={layerData.actors} path={this.props.path+".actors"} layerType={layerData.type} />
                        </div>
                    </Collapsable>);
            }
        });

        return LayerEditor;

});