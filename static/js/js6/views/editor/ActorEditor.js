define([
        "react",
        "views/visualizer/Synesthesia",
        "views/editor/BetterSelect",
        "views/editor/Collapsable",
        "views/editor/TextField"
    ], function(React, Synesthesia, BetterSelect, Collapsable, TextField){

    var ActorEditor = React.createClass({
        mixins: [React.addons.LinkedStateMixin],
        ADSREnvelopeAttributes: ["attack", "decay", "sustain", "release"],
        getInitialState: function(){
            return this.props.actorData;
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
            var fullClassName = className || this.state.className;
            Synesthesia.getActorSpecificParameters(fullClassName).done((parameters) => {
                this.setState({actorParameters:parameters});
            });
        },

        handleActorClassChange: function(e){
            var className = e.currentTarget.value;
            this.setState({
                className: className
            });
            this._loadActorSpecificParameters(className);
        },

        _loadLayerAvailableActorsList: function(){
            Synesthesia.getLayerAvailableActors([this.props.layerType]).done((classes) => {
                    this.setState({
                        availableActorsClasses: classes
                    });                            
                });
        },

        render: function(){
            //ADSR envelope
            var ADSRForms = _(this.ADSREnvelopeAttributes).map(_.bind(function(attr){
               var attrHtmlName = "actor-" + attr;
                return (
                   <div className="form-group form-inline">
                       <label htmlFor={attrHtmlName}>{attr} {this.state[attr]}</label>
                       <input id={attrHtmlName} className="form-control" valueLink={this.linkState(attr)} type="range" min="0" max="100" />
                   </div>
                );
            }, this));

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
                <Collapsable itemName={this.state.name}>
                    <ul className="parameters-list">
                        <TextField path={this.props.path+".name"} value={this.props.actorData.name} />

                        <label htmlFor="actor-type">Actor type:</label>
                        <BetterSelect value={this.state.className} onChange={this.handleActorClassChange}>
                            {actorClassOptions}
                        </BetterSelect>
                        <Collapsable itemName="actorParams">
                            <ul>
                                {actorParametersForm}
                            </ul>                        
                        </Collapsable>
                        <Collapsable itemName="Inputs">
                            <ul>
                                <li className="form-group">
                                    <label htmlFor="input-type">Type</label>
                                    <BetterSelect valueLink={this.linkState("inputType")}>
                                        <option value="note">Note</option>
                                        <option value="control">Control</option>
                                    </BetterSelect>
                                </li>
                                <li className="form-group form-inline">
                                    <label htmlFor="input-channel">Channel</label>
                                    <input id="input-channel" className="form-control" valueLink={this.linkState("inputChannel")} type="number" min="1" />
                                </li>
                                <li className="form-group form-inline">
                                    <label htmlFor="input-bus">Bus</label>
                                    {/*This can be a select with options filled in by the server*/}
                                    <input id="input-bus" className="form-control" valueLink={this.linkState("inputBus")} />
                                </li>
                                <li className="form-group form-inline">
                                    <label htmlFor="input-range-max">Range</label>
                                    {/*Notes and controls will be enriched with a normalized version of their value, computed based on this range*/}
                                    <input id="input-range-max" className="form-control" valueLink={this.linkState("inputRangeMax")} type="number" min="1" />
                                    <input id="input-range-min" className="form-control" valueLink={this.linkState("inputRangeMin")} type="number" min="1" />
                                </li>
                            </ul>
                        </Collapsable>
                        <Collapsable itemName="ADSR Envelope">
                            {ADSRForms}
                        </Collapsable>
                    </ul>
                </Collapsable>
            );
        },
    });

    return ActorEditor;
});