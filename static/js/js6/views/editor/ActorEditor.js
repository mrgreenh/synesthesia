define([
        "react",
        "views/visualizer/Synesthesia",
        "views/editor/BetterSelect",
        "views/editor/Collapsable",
        "views/editor/TextField",
        "views/editor/SelectField",
        "views/editor/InputsList",
        "editorFlux/EditorActions"
    ], function(React, Synesthesia, BetterSelect, Collapsable, TextField, SelectField, InputsList, EditorActions){

    var ActorEditor = React.createClass({
        mixins: [React.addons.LinkedStateMixin],
        getInitialState: function(){
            return {
                actorParameters: [],
                availableActorsClasses: []
            };
        },

        componentDidMount: function(){
                this._loadLayerAvailableActorsList();
                this._loadActorSpecificParameters();
        },

        _getLayerClassName: function(){
            var layerType = this.props.layerType;
            return layerType;
        },

        _loadActorSpecificParameters: function(className){
            var fullClassName = className || this.props.actorData.className;
            Synesthesia.getActorSpecificParameters(fullClassName).done((parameters) => {
                this.setState({actorParameters:parameters});
            });
        },

        handleActorClassChange: function(e){
            var className = e.currentTarget.value;
            this._loadActorSpecificParameters(className);
            var propertyPath = this.props.path + ".className";
            EditorActions.updateField(propertyPath, className);
        },

        _loadLayerAvailableActorsList: function(){
            Synesthesia.getLayerAvailableActors([this.props.layerType]).done((classes) => {
                    this.setState({
                        availableActorsClasses: classes
                    });                            
                });
        },

        render: function(){
            var actorData = this.props.actorData;
            //Actor specific parameters
            if(this.state.actorParameters){
                var actorParametersForm = this.state.actorParameters.map(paramName => {
                    return (
                            <TextField path={this.props.path+"."+paramName+"Parameter"} value={this.props.actorData[paramName+"Parameter"]} />
                        )
                });
            }else{
                var actorParametersForm = "Nothing to display";
            }

            //Actor classes
            if(this.state.availableActorsClasses){
                var actorClassOptions = this.state.availableActorsClasses.map(option => {
                    return (
                        <option value={option}>{option}</option>
                        );
                });
            }else{
                var actorClassOptions = [];
            }

            return (
                <Collapsable itemName={this.props.actorData.name} path={this.props.path} deletable="true">
                    <ul className="parameters-list">
                        <TextField path={this.props.path+".name"} value={this.props.actorData.name} />

                        <SelectField value={this.props.actorData.className} path={this.props.path+".className"} onChange={this.handleActorClassChange}>
                            {actorClassOptions}
                        </SelectField>
                        <Collapsable itemName="actorParams">
                            <ul>
                                {actorParametersForm}
                            </ul>                        
                        </Collapsable>
                        <Collapsable itemName="Inputs">
                            <InputsList path={ this.props.path+".inputChannels" } inputsData={this.props.actorData.inputChannels} targetParameters={this.state.actorParameters} />
                        </Collapsable>
                    </ul>
                </Collapsable>
            );
        },
    });

    return ActorEditor;
});