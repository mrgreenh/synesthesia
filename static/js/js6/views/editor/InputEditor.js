define([
        "react",
        "views/editor/Collapsable",
        "views/editor/SelectField",
        "views/editor/SliderField",
        "views/editor/TextField",
        "views/editor/SignalEditor",
        "views/editor/SignalsList",
        "editorFlux/EditorConstants",
        "utils/constants"
    ], function(React, Collapsable, SelectField, SliderField, TextField, SignalEditor, SignalsList, EditorConstants, constants){

        var InputEditor = React.createClass({

            render: function(){
                var inputData = this.props.inputData;

                if(this.props.targetParameters){
                    var targetParametersOptions = this.props.targetParameters.map(option => {
                        return (
                            <option value={option}>{option}</option>
                            );
                    });
                }else{
                    var targetParametersOptions = [];
                }

                var sourceParameters = constants.INPUTS.SOURCE_PARAMETERS.map(option => {
                    return (<option value={option}>{option}</option>);
                });

                return (
                    <Collapsable itemName={inputData.name} path={this.props.path} deletable="true">
                        <TextField path={this.props.path+".name"} value={inputData.name} />
                        <SelectField value={inputData.targetParameter} path={this.props.path+".targetParameter"}>
                            {targetParametersOptions}
                        </SelectField>
                        <SelectField value={inputData.sourceParameter} path={this.props.path+".sourceParameter"}>
                            {sourceParameters}
                        </SelectField>
                        <div className="form-group">
                            <ul>
                                <li className="form-group">
                                    <SelectField path={this.props.path+".inputType"} value={inputData.inputType}>
                                        <option value="note">Note</option>
                                        <option value="control">Control</option>
                                    </SelectField>
                                </li>
                                <li className="form-group form-inline">
                                    <SliderField path={this.props.path+".inputChannel"} value={inputData.inputChannel} min="1" />
                                </li>
                                <li className="form-group form-inline">
                                    <TextField path={this.props.path+".inputBus"} value={inputData.inputBus} />
                                </li>
                                <li className="form-group form-inline">
                                    <SliderField path={this.props.path+".inputRangeMax"} min="1" value={inputData.inputRangeMax} />
                                    <SliderField path={this.props.path+".inputRangeMin"} min="1" value={inputData.inputRangeMin} />
                                </li>
                                <li>
                                    <Collapsable itemName="Signal processor">
                                        <div className="form-group">
                                            <SignalsList path={ this.props.path+".signalsList" } signalData={this.props.inputData.signalsList} />
                                        </div>
                                    </Collapsable>
                                </li>
                            </ul>
                        </div>
                    </Collapsable>);
            }
        });

        return InputEditor;
});
