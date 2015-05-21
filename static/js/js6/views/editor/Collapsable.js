define(["react"],
    function(React){

    var Collapsable = React.createClass({
        getInitialState(){
            return {collapsed: false,
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

        render: function(){
            var additional_classes = this.state.collapsed ? " collapsed" : "";
            var classes = "collapsable-content"+additional_classes;
            var backgroundColor = "rgba(" + this.state.backgroundColor.join(",") + ",.1)";
            var inlineStyles = {backgroundColor: backgroundColor};
            return (<li className="collapsable" style={inlineStyles}>
                <strong onClick={this.handleCollapseItem} className="bg-primary collapsing-switch">{this.props.itemName}</strong>
                <div className={classes}>
                    {this.props.children}
                </div>
            </li>);
        }
    });

    return Collapsable;

});