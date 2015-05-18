    define([
        "react",
        "views/editor/ActorEditor",
        "views/visualizer/Director",
        "views/editor/LayersList",
        "views/editor/ScenesList"
    ], function(React, ActorEditor, Director, LayersList, ScenesList){

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


    return EditorForm;
});