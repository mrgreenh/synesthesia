define([
        "react",
        "views/editor/InputEditor",
        "views/editor/SignalEditor",
        "views/editor/EditorMixins",
        "editorFlux/EditorActions",
        "vendor/signaljs/dist/signal"
    ], function(React, InputEditor, SignalEditor, EditorMixins, EditorActions, Signal){

        var SignalsList = React.createClass({
                mixins: [EditorMixins.TrackPathsParser],

                _handleNewModuleClick: function(){
                    //Use modules bag to list the modules available in the prompt
                    var promptString = "Type the name of the module you want to add:";
                    var possibleOptions = [];
                    for(moduleName of Signal.getModulesList()){
                        promptString += "\n"+moduleName;
                        possibleOptions.push(moduleName.toLowerCase());
                    }
                    var moduleName = prompt(promptString);
                    var selectedOptionIndex = possibleOptions.indexOf(moduleName.toLowerCase());
                    if(selectedOptionIndex>-1){
                        EditorActions.createSignal(
                                this._getLayerIndex(),
                                this._getActorIndex(),
                                this._getInputIndex(),
                                moduleName);
                    }else alert("Wait... what did you say?!");
                },

                render: function(){
                    var modulesData = this.props.signalData;
                    var signalsModules = modulesData.map((signalModule, index) => {
                       return <SignalEditor key={index} signalData={signalModule} path={this.props.path+"."+index}/>;
                    });
                    return (<div className="signalsListContainer">
                            <h4>Signals processors</h4>
                            <button id="new-signal-button" onClick={this._handleNewModuleClick}>New Module</button>
                            <ul>
                                {signalsModules}
                            </ul>
                        </div>);
                }
            });

        return SignalsList;
    });

