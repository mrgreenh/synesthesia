define([
        "react",
        "views/editor/LayerEditor"
    ], function(React, LayerEditor){
        var LayersList = React.createClass({
            getInitialState(){
                return {layersData: this.props.layersData};
            },

            handleNewLayerClick(){
                alert("Cool magic stuff will start happening here.");
            },

            render: function(){
                var layers = this.state.layersData.map((layer, index) => {
                   return <LayerEditor layerData={layer} key={index} path={this.props.path+"."+index}/>;
                });
                return (<div className="layersListContainer">
                        <h3>Layers</h3>
                        <button id="new-layer-button" onClick={this.handleNewLayerClick}>New Layer</button>
                        <ul>
                            {layers}
                        </ul>
                    </div>);
            }
        });

        return LayersList;
    });