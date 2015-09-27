define([
    "react",
    "vendor/signaljs/dist/signal",
    "views/editor/SliderField",
    "views/editor/TextField",
    "views/editor/Collapsable",
    "editorFlux/EditorActions"
    ], function(React, Signal, SliderField, TextField, Collapsable, EditorActions){

        var SignalEditor = React.createClass({

            render: function(){
                var signalData = this.props.signalData;

                var configurationFields = Object.keys(signalData).map((key) => {
                    var datum = signalData[key];
                    if(key=="type") return;
                    var input;
                    switch(datum.type){
                        case "number":
                            input = <SliderField path={[this.props.path, key, "value"].join(".")} value={datum.value} min={datum.range[0]} max={datum.range[1]} />;
                            break;
                        default: //It's not even an object
                            input = <TextField path={[this.props.path, key].join(".")} value={datum} />;
                            break;
                    }

                    return (
                            <li className="form-group">
                                {input}
                            </li>
                        );
                });

                return (
                        <Collapsable itemName={signalData.name} path={this.props.path} deletable="true">
                            <strong>Module type: {signalData.type}</strong>
                            <div className="form-group">
                                <ul>
                                    {configurationFields}
                                </ul>
                            </div>
                        </Collapsable>
                    );
            }
        });

        return SignalEditor;
    });