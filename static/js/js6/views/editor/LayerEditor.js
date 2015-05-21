define([
        "react",
        "views/editor/Collapsable",
        "views/editor/ActorsList",
        "views/editor/BetterSelect",
        "views/editor/TextField"
    ], function(React, Collapsable, ActorsList, BetterSelect, TextField){

        var LayerEditor = React.createClass({
            mixins: [React.addons.LinkedStateMixin],

            getInitialState(){
                return this.props.layerData;
            },

            render: function(){
                return (<Collapsable itemName={this.state.name}>
                        <div className="form-group">
                            <TextField path={this.props.path+".name"} value={this.state.name} />

                            /*<label htmlFor="layer-type">Layer type:</label>
                            <BetterSelect valueLink={this.linkState("type")}>
                                <option value="Canvas2DLayer">Canvas2D</option>
                                <option value="Processing2DLayer">Processing2D</option>
                                <option value="Three3DLayer">Three3D</option>
                            </BetterSelect>*/
                            <ActorsList actorsData={this.state.actors} path={this.props.path+".actors"} layerType={this.state.type} />
                        </div>
                    </Collapsable>);
            }
        });

        return LayerEditor;

});