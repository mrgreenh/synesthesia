define([
        "react",
        "views/visualizer/Synesthesia",
        "views/editor/BetterSelect",
        "views/editor/Collapsable"
    ], function(React, Synesthesia, BetterSelect, Collapsable){

    var ActorEditor = React.createClass({
        mixins: [React.addons.LinkedStateMixin],
        ADSREnvelopeAttributes: ["attack", "decay", "sustain", "release"],
        getInitialState: function(){
            return this.props.actorData;
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
            //Will eventually rerender when class is loaded
            //This needs to go first because also loads the actors parent class
            //These two ifs should be preceded by some "loadActorsDependencies" thing first
            if(!this.state.availabelActors)
                this._loadLayerAvailableActorsList();

            if(!this.state.actorParameters)
                this._loadActorSpecificParameters();

            var ADSRForms = _(this.ADSREnvelopeAttributes).map(_.bind(function(attr){
               var attrHtmlName = "actor-" + attr;
                return (
                   <div className="form-group form-inline">
                       <label htmlFor={attrHtmlName}>{attr} {this.state[attr]}</label>
                       <input id={attrHtmlName} className="form-control" valueLink={this.linkState(attr)} type="range" min="0" max="100" />
                   </div>
                );
            }, this));

            if(this.state.actorParameters){
                var actorParametersForm = this.state.actorParameters.map(paramName => {
                    return (
                                <li className="form-group form-inline">
                                    <label htmlFor={"parameter-"+paramName}>{paramName}</label>
                                    <input id={"parameter-"+paramName} className="form-control" valueLink={this.linkState(paramName+"Parameter")} />
                                </li>
                        )
                });
            }else{
                var actorParametersForm = "Nothing to display";
            }

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
                        <li className="form-group">
                            <label htmlFor="actor-name">Name</label>
                            <input id="actor-name" className="form-control" valueLink={this.linkState("name")} type="text" />
                        </li>
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