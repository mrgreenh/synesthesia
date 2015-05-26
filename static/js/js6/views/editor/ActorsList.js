define([
        "react",
        "views/editor/ActorEditor"
    ],
    function(React, ActorEditor){
        var ActorsList = React.createClass({

            handleNewActorClick: function(event){
                alert("Some more magic happens here!");
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