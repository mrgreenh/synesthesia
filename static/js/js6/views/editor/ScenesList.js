define(
    ["react"],
    function(React){
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

        return ScenesList;
    });