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
                    <ScenesList scenesData={this.state.scenesData} />
                </div>
            </div>
    );
    }
});

var ScenesList = React.createClass({
    getInitialState(){
        return {scenesData: this.props.scenesData};
    },

    handleNewSceneClick(){
        alert("Cool magic stuff will start happening here.");
    },

    render: function(){
        var scenes = this.state.scenesData.map(function(scene){
            //return <LayerEditor sceneData={scene} />;
            return <li>{scene.name}</li>
        });
        return (<div className="scenesListContainer">
            <h3>Scenes</h3>
            <p className="bg-primary">
                Here scenes can be added and configured (bg color, stage and unstage duration etc...).
                Scenes added here will also add a new tab in the layers section. Each tab allows to overwrite each parameter by checking a checkbox next to it.
            </p>
            <button id="new-scene-button" onClick={this.handleNewSceneClick}>New Scene</button>
            <ul>
                    {scenes}
            </ul>
        </div>);
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
           return <LayerEditor layerData={layer} />;
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

var LayerEditor = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState(){
        return this.props.layerData;
    },

    render: function(){
        return (<Collapsable itemName={this.state.name}>
                <div className="form-group">
                    <p className="bg-warning">These options are defined by loading the js classes of each layer</p>
                    <!-- TODO make the above statement true -->
                    <div className="form-group">
                        <label htmlFor="layer-name">Name</label>
                        <input id="layer-name" className="form-control" valueLink={this.linkState("name")} />
                    </div>

                    <label htmlFor="layer-type">Layer type:</label>
                    <BetterSelect valueLink={this.linkState("type")}>
                        <option value="Canvas2D">Canvas2D</option>
                        <option value="Processing2D">Processing2D</option>
                        <option value="Three3D">Three3D</option>
                    </BetterSelect>
                    <ActorsList actorsData={this.state.actors} layerType={this.state.type} />
                </div>
            </Collapsable>);
    }
});

var ActorsList = React.createClass({
    getInitialState: function(){
        return {actorsData: this.props.actorsData}
    },

    handleNewActorClick: function(event){
        alert("Some more magic happens here!");
    },

    render: function(){
        var actors = this.state.actorsData.map(actor => {
           return (
               <ActorEditor actorData={actor} layerType={this.props.layerType} />
           );
        });
        return (
            <div className="actors-list">
                <button id="new-actor-button" onClick={this.handleNewActorClick}>New Actor</button>
                <ul>
                    {actors}
                </ul>
            </div>
        );
    }
});

var Collapsable = React.createClass({
    getInitialState(){
        return {collapsed: true,
                backgroundColor: this._getBackgroundColor()};
    },

    _getBackgroundColor: function(){
      var rgb = [];
      for(var i=0; i<3; i++){
          rgb.push(parseInt(Math.min(255, Math.random()*255)));
      }
      return rgb;
    },

    handleCollapseItem: function(e){
        this.setState({collapsed: !this.state.collapsed});
    },

    render: function(){
        var additional_classes = this.state.collapsed ? " collapsed" : "";
        var classes = "collapsable-content"+additional_classes;
        var backgroundColor = "rgba(" + this.state.backgroundColor.join(",") + ",.1)";
        var inlineStyles = {backgroundColor: backgroundColor};
        return (<li className="collapsable" style={inlineStyles}>
            <strong onClick={this.handleCollapseItem} className="bg-primary collapsing-switch">{this.props.itemName}</strong>
            <div className={classes}>
                {this.props.children}
            </div>
        </li>);
    }

});