define([
        "react",
        "views/editor/InputEditor",
        "views/editor/EditorMixins",
        "editorFlux/EditorActions"
    ], function(React, InputEditor, EditorMixins, EditorActions){
        var InputsList = React.createClass({
                mixins: [EditorMixins.TrackPathsParser],

                handleNewInputClick(){
                    EditorActions.createInput(this._getLayerIndex(), this._getActorIndex());
                },

                render: function(){
                    var inputsData = this.props.inputsData;
                    var inputs = inputsData.map((input, index) => {
                       return <InputEditor inputData={input} targetParameters={this.props.targetParameters} key={index} path={this.props.path+"."+index}/>;
                    });
                    return (<div className="inputsListContainer">
                            <h3>Inputs</h3>
                            <button id="new-input-button" onClick={this.handleNewInputClick}>New Input</button>
                            <ul>
                                {inputs}
                            </ul>
                        </div>);
                }
            });

        return InputsList;
    });

