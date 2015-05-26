define([
        "react",
        "views/editor/Collapsable",
        "views/editor/SelectField",
        "views/editor/TextField",
        "views/editor/EditorConstants"
    ], function(React, Collapsable, ActorsList, SelectField, TextField, EditorConstants){

        var InputEditor = React.createClass({

            render: function(){
                var inputData = this.props.inputData;

                var ADSRForms = _(EditorConstants.ADSR_ATTRIBUTES).map(_.bind(function(attr){
                    return (
                        <SliderField min=0 max=100 {this.props.path+"."+attr} value=actorData[attr] />
                    );
                }, this));

                return (<Collapsable itemName={inputData.name}>
                        <div className="form-group">
                            <TextField path={this.props.path+".name"} value={inputData.name} />
                            <ul>
                                <li className="form-group">
                                    <SelectField path={this.props.path+".inputType"} value={inputData.inputType}>
                                        <option value="note">Note</option>
                                        <option value="control">Control</option>
                                    </SelectField>
                                </li>
                                <li className="form-group form-inline">
                                    <SliderField inputType="number" path={this.props.path+".inputChannel"} value={inputData.inputChannel} min="1" />
                                </li>
                                <li className="form-group form-inline">
                                    <TextField path={this.props.path+".inputBus"} value={inputData.inputBus} />
                                </li>
                                <li className="form-group form-inline">
                                    <SliderField inputType="number" path={this.props.path+".inputRangeMax"} min="1" value={inputData.inputRangeMax} />
                                    <SliderField inputType="number" path={this.props.path+".inputRangeMin"} min="1" value={inputData.inputRangeMin} />
                                </li>
                            </ul>
                        </div>
                        <Collapsable itemName="ADSR Envelope">
                            <div className="form-group">
                                {ADSRForms}
                            </div>
                        </Collapsable>
                    </Collapsable>);
            }
        });

        return InputEditor;

});
