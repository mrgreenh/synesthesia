var EditorForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState(){
        return this.props.trackData;
    },

    render: function(){
        return (
            <div id="editor-form-container" className="container">
                <div className="editorSection row">
                    <div className="form-group">
                        <label htmlFor="track-title">Title</label>
                        <input id="track-title" className="form-control" valueLink={this.linkState("title")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="track-description">Description</label>
                        <input id="track-description" className="form-control" valueLink={this.linkState("description")} />
                    </div>
                </div>
                <div className="editorSection row">
                    <LayersList layersData={this.state.layersData} />
                </div>
            </div>
    );
    }
});

var LayersList = React.createClass({
    getInitialState(){
        return {layersData: this.props.layersData};
    },

    handleNewLayerClick(){
        alert("Cool magic stuff will start happening here.");
    },

    render: function(){
        var layers = this.state.layersData.map(function(layer){
           return <Layer layerData={layer} />;
        });
        return (<div className="layersListContainer">
                <button id="new-layer-button" onClick={this.handleNewLayerClick}>New Layer</button>
                <ul>
                    {layers}
                </ul>
            </div>);
    }
});

var Layer = React.createClass({
    getInitialState(){
        return {layerData: this.props.layerData}
    },

    render: function(){
        var layerData = this.state.layerData;
        return (<Collapsable itemName={layerData.name}>
                <div className="form-group">
                    <p className="bg-warning">These options are defined by loading the js classes of each layer</p>
                    <!-- TODO make the above statement true -->
                    <label htmlFor="layer-type">Layer type:</label>
                    <select value={layerData.type}>
                        <option value="Canvas2D">Canvas2D</option>
                        <option value="Processing2D">Processing2D</option>
                        <option value="Three3D">Three3D</option>
                    </select>
                </div>
            </Collapsable>);
    }
});

var Collapsable = React.createClass({
    getInitialState(){
        return {collapsed: false};
    },

    handleCollapseItem: function(e){
        this.setState({collapsed: !this.state.collapsed});
    },

    render: function(){
        var additional_classes = this.state.collapsed ? " collapsed" : "";
        var classes = "collapsable-content"+additional_classes;
        return (<li className="collapsable">
            <strong onClick={this.handleCollapseItem} className="bg-primary collapsing-switch">{this.props.itemName}</strong>
            <div className={classes}>
                {this.props.children}
            </div>
        </li>);
    }

});