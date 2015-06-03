define([
        "react",
        "views/editor/ActorEditor",
        "views/editor/EditorMixins",
        "editorFlux/EditorActions"
    ],
    function(React, ActorEditor, EditorMixins, EditorActions){

        var ActorsList = React.createClass({
            mixins: [EditorMixins.TrackPathsParser],

            handleNewActorClick: function(event){
                EditorActions.createActor(this._getLayerIndex());
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