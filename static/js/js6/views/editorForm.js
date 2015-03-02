var EditorForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState(){
        return this.props.trackData;
    },

    render: function(){
        return (
            <div id="editor-form-container">
                <div className="editorSection">
                    <div className="formGroup">
                        <label htmlFor="track-title">Title</label>
                        <input id="track-title" valueLink={this.linkState("title")} />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="track-description">Description</label>
                        <input id="track-description" valueLink={this.linkState("description")} />
                    </div>
                </div>
                <div className="editorSection">
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
           return <li>{layer}</li>; <!-- TODO next: this becomes a layer object -->>
        });
        return <div className="layersListContainer">
                <button id="new-layer-button" onClick={this.handleNewLayerClick}>New Layer</button>
                <ul>
                    {layers}
                </ul>
            </div>
    }
});