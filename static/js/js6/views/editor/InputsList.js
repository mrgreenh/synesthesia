define([
        "react",
        "views/editor/InputEditor"
    ], function(React, Synesthesia, BetterSelect, Collapsable, TextField){
        var InputsList = React.createClass({
                handleNewInputClick(){
                    alert("Cool magic stuff will start happening here.");
                },

                render: function(){
                    var inputsData = this.props.inputsData;
                    var layers = inputsData.map((input, index) => {
                       return <InputEditor inputData={input} key={index} path={this.props.path+"."+index}/>;
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

