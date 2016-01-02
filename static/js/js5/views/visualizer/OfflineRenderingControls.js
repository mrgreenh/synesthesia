"use strict";

define(["react"], function (React) {

    var OfflineRenderingControls = React.createClass({
        displayName: "OfflineRenderingControls",

        render: function render() {
            var recordingStatus = this.props.isRecording ? "Now recording." : "Now rendering";
            return React.createElement(
                "div",
                { className: "offline-rendering-controls" },
                React.createElement(
                    "p",
                    null,
                    recordingStatus
                ),
                React.createElement(
                    "a",
                    { onClick: this.props.onStartRenderingClick },
                    "Start Rendering"
                ),
                React.createElement(
                    "p",
                    null,
                    this.props.additionalMessage
                )
            );
        }
    });

    return OfflineRenderingControls;
});