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
        events: function(eventName){ //Meaning BaseObject events. No DOM involved.
            switch(eventName){
                case EditorConstants.STORE_EVENTS.CHANGE:
                    var newData = arguments[1];
                    this.setState(newData);
                    break;
            }
        },

        componentDidMount: function(){
            trackStore.addObserver(this, EditorConstants.STORE_EVENTS.CHANGE);
        },

        render: function(){
            var trackData = this.props.trackData;
            return (
                <div id="editor-form-container" className="container">
                    <div className="editorSection row">
                        <TextField path="title" value={trackData.title}/>
                        <TextField path="description" value={trackData.description}/>
                    </div>
                    <div className="editorSection row">
                        <LayersList layersData={trackData.layersData} path="layersData" />
                        <ScenesList scenesData={trackData.scenesData} />
                    </div>
                </div>
        );
        }
    });


    return EditorForm;
});