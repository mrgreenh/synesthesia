define([
        "react",
        "views/editor/ActorEditor",
        "views/editor/EditorMixins",
        "editorFlux/EditorActions",
        "views/visualizer/Synesthesia"
    ],
    function(React, ActorEditor, EditorMixins, EditorActions, Synesthesia){

        var ActorsList = React.createClass({
            mixins: [EditorMixins.TrackPathsParser],

            getInitialState: function(){
                return {
                    availableActorsClasses: []
                }
            },

            componentDidMount: function(){
                Synesthesia.getLayerAvailableActors([this.props.layerType]).done((classes) => {
                    this.setState({
                        availableActorsClasses: classes
                    });                            
                });
            },

            handleNewActorClick: function(event){
                var availableClasses = this.state.availableActorsClasses;
                if(availableClasses.length)
                    EditorActions.createActor(this._getLayerIndex(), availableClasses[0]);
            },

            render: function(){
                var actorsData = this.props.actorsData;
                var actors = actorsData.map((actor, index) => {
                   return (
                       <ActorEditor actorData={actor} key={index} path={this.props.path+"."+index} layerType={this.props.layerType} />
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

        return ActorsList;

});