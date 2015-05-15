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

    _getActorParameters: function(className){
        var fullClassName = className || this.state.className;
        var layerClassName = this._getLayerClassName();
        return window[fullClassName].getActorParameters();
    },

    handleActorClassChange: function(e){
        var className = e.currentTarget.value;
        this.setState({
            className: className
        });
        this.setState({
            specificParams: this._getActorParameters(className)
        });
    },

    _getLayerAvailableActors: function(){
        var layerClassName = this._getLayerClassName();
        return window[layerClassName].getAvailableActorsClasses();
    },

    _loadLayerDependentFields: function(){
        Synesthesia.loadLayersSynesthesiaClasses([this.props.layerType]).done(() => {
            this._getLayerAvailableActors().done(classes => {
                this.setState({
                    availableActorsClasses: classes,
                });                            
            });
            this.setState({
                specificParams: this._getActorParameters()
            });            
        });

    },

    render: function(){
        //Will eventually rerender when class is loaded
        //This needs to go first because also loads the actors parent class
        //These two ifs should be preceded by some "loadActorsDependencies" thing first
        if(!window[this.props.layerType])
            this._loadLayerDependentFields();

        var ADSRForms = _(this.ADSREnvelopeAttributes).map(_.bind(function(attr){
           var attrHtmlName = "actor-" + attr;
            return (
               <div className="form-group form-inline">
                   <label htmlFor={attrHtmlName}>{attr} {this.state[attr]}</label>
                   <input id={attrHtmlName} className="form-control" valueLink={this.linkState(attr)} type="range" min="0" max="100" />
               </div>
            );
        }, this));

        // var actorParametersForm = this._getActorParameters().map(paramName => {
        if(this.state.specificParams){
            var actorParametersForm = this.state.specificParams.map(paramName => {
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
                        //How many inputs and what kind is defined by the actors class. For now only one
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
                                //This can be a select with options filled in by the server
                                <input id="input-bus" className="form-control" valueLink={this.linkState("inputBus")} />
                            </li>
                            <li className="form-group form-inline">
                                <label htmlFor="input-range-max">Range</label>
                                //Notes and controls will be enriched with a normalized version of their value, computed based on this range
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
