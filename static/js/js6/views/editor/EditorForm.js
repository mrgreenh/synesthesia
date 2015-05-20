    define([
        "react",
        "views/editor/ActorEditor",
        "views/visualizer/Director",
        "views/editor/LayersList",
        "views/editor/ScenesList",
        "views/editor/TextField",
        "editorFlux/TrackStore",
        "editorFlux/EditorConstants",
    ], function(React,
                ActorEditor,
                Director,
                LayersList,
                ScenesList,
                TextField,
                trackStore,
                EditorConstants){

    var EditorForm = React.createClass({
        mixins: [React.addons.LinkedStateMixin],
        events: function(eventName){ //Meaning BaseObject events. No DOM involved.
            switch(eventName){
                case EditorConstants.STORE_EVENTS.CHANGE:
                    var newData = arguments[1];
                    this.setState(newData);
                    break;
            }
        },

        getInitialState(){
            return this.props.trackData;
        },

        componentDidMount: function(){
            trackStore.addObserver(this, EditorConstants.STORE_EVENTS.CHANGE);
        },

        render: function(){
            return (
                <div id="editor-form-container" className="container">
                    <div className="editorSection row">
                        <TextField path="title" value={this.state.title}/>
                        <TextField path="description" value={this.state.description}/>
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