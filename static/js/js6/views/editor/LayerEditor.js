define([
        "react",
        "views/editor/Collapsable",
        "views/editor/ActorsList",
        "views/editor/BetterSelect"
    ], function(React, Collapsable, ActorsList, BetterSelect){

        var LayerEditor = React.createClass({
            mixins: [React.addons.LinkedStateMixin],

            getInitialState(){
                return this.props.layerData;
            },

            render: function(){
                return (<Collapsable itemName={this.state.name}>
                        <div className="form-group">
                            <p className="bg-warning">These options are defined by loading the js classes of each layer</p>
                            <div className="form-group">
                                <label htmlFor="layer-name">Name</label>
                                <input id="layer-name" className="form-control" valueLink={this.linkState("name")} />
                            </div>

                            <label htmlFor="layer-type">Layer type:</label>
                            <BetterSelect valueLink={this.linkState("type")}>
                                <option value="Canvas2DLayer">Canvas2D</option>
                                <option value="Processing2DLayer">Processing2D</option>
                                <option value="Three3DLayer">Three3D</option>
                            </BetterSelect>
                            <ActorsList actorsData={this.state.actors} layerType={this.state.type} />
                        </div>
                    </Collapsable>);
            }
        });

        return LayerEditor;

});