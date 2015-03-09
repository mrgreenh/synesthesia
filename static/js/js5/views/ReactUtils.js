"use strict";

//----------------- BetterSelect by Brandon Tilley - http://stackoverflow.com/a/24472214
var BetterSelect = React.createClass({
    displayName: "BetterSelect",

    render: function render() {
        if (this.props.valueLink) {
            return this.transferPropsTo(React.createElement(
                "select",
                { value: this.props.valueLink.value,
                    valueLink: null, onChange: this.handleChange },
                this.props.children
            ));
        } else {
            return this.transferPropsTo(React.createElement(
                "select",
                { onChange: this.handleChange },
                this.props.children
            ));
        }
    },

    handleChange: function handleChange(e) {
        var selectedValue;
        if (this.props.multiple) {
            // We have to iterate the `options` elements
            // to figure out which ones are selected.
            selectedValue = [];
            var options = e.target.options;
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    selectedValue.push(options[i].value);
                }
            }
        } else {
            selectedValue = e.target.value;
        }

        // Fire onChange manually if it exists since we overwrote it
        this.props.onChange && this.props.onChange(e);

        // Finally, manually take care of any valueLink passed
        if (this.props.valueLink) {
            this.props.valueLink.requestChange(selectedValue);
        }
    }
});