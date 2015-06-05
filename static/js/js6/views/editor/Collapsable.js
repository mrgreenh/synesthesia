define([
    "react",
    "editorFlux/EditorActions"
    ],
    function(React, EditorActions){

    var Collapsable = React.createClass({
        getInitialState(){
            return {collapsed: true,
                    backgroundColor: this._getBackgroundColor()};
        },

        _getBackgroundColor: function(){
          var rgb = [];
          for(var i=0; i<3; i++){
              rgb.push(parseInt(Math.min(255, Math.random()*255)));
          }
          return rgb;
        },

        handleCollapseItem: function(e){
            this.setState({collapsed: !this.state.collapsed});
        },

        handleDeleteItem: function(e){
            //Assuming it's an item of a list, last step of the path will be the index
            var fullPath = this.props.path;
            var steps = fullPath.split(".");
            var index = steps[steps.length - 1];
            steps.splice(steps.length - 1, 1);
            var pathToArray = steps.join(".");
            EditorActions.deleteItem(pathToArray, index);
        },

        render: function(){
            var additional_classes = this.state.collapsed ? " collapsed" : "";
            var classes = "collapsable-content"+additional_classes;
            var backgroundColor = "rgba(" + this.state.backgroundColor.join(",") + ",.1)";
            var inlineStyles = {backgroundColor: backgroundColor};
            var deleteButton = this.props.deletable ? <button onClick={this.handleDeleteItem}>&Oslash;</button> : undefined;

            return (<li className="collapsable" style={inlineStyles}>
                <strong onClick={this.handleCollapseItem} className="bg-primary collapsing-switch">{this.props.itemName}</strong>
                {deleteButton}
                <div className={classes}>
                    {this.props.children}
                </div>
            </li>);
        }
    });

    return Collapsable;

});