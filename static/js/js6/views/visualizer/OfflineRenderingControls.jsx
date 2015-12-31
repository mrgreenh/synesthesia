define([
        "react",
    ], function(React){

        var OfflineRenderingControls = React.createClass({

            render: function(){
                var recordingStatus = this.props.isRecording ? "Now recording." : "Now rendering";
                return (
                    <div className="offline-rendering-controls">
                        <p>{recordingStatus}</p>
                        <a onClick={this.props.onStartRenderingClick}>Start Rendering</a>
                    </div>);
            }
        });

        return OfflineRenderingControls;
});
