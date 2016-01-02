define([
            "utils/constants",
            "views/visualizer/Synesthesia",
            "views/visualizer/actors/Actor",
            "views/visualizer/layers/Three3DLayer",
            "views/visualizer/InputBuffer",
            "views/visualizer/TimeKeeper",
            "react",
            "views/visualizer/OfflineRenderingControls"
],
function(constants, Synesthesia, Actor, Three3DLayer, InputBuffer, TimeKeeper, React, OfflineRenderingControls){
    class Director extends Synesthesia{
        constructor(isOffline){
            super();
            this.$el = $("#stage-container");
            this._isOffline = isOffline;
            if(isOffline){
                this._inputSnapshots = [];
                this._isRecording = true;
                this.$el.append($("<div></div>").addClass("recording-ui-container"));
                this._recordingUIContainer = this.$el.find(".recording-ui-container");
            }
            this.layers = [];
            this._config;
            this._trackData;

            //Load the configuration that describes classes and track data
            //Then start doing your thing
            $.when(this._loadNextTrackData(), this._loadStageConfig()).then((trackData, configData) => {
                this._config = configData[0];
                this._trackData = trackData[0];
                this._inputBuffer = new InputBuffer(this._trackData);
                this._timeKeeper = new TimeKeeper(this._isOffline, this._config.offlineRenderingSettings);

                this.observe(this._timeKeeper, constants.EVENTS.TIME.INCREMENT);
                this.observe(this._timeKeeper, constants.EVENTS.TIME.INCREMENT_OFFLINE);
                this._startTrack();
            });
        }

        events(eventName){
            switch(eventName){
                case constants.EVENTS.TIME.INCREMENT:
                    this._renderFrame();
                    break;
                case constants.EVENTS.TIME.INCREMENT_OFFLINE:
                    if(this._isRecording)
                        this._recordFrame();
                    else
                        this._renderFrameToFile();
                    break;
            }
        }

        _recordFrame(){
            var inputSnapshots = this._inputBuffer.getSnapshot();
            this._inputSnapshots.push(inputSnapshots);
        }

        _startTrack(){
            var layersBasePath = "views/visualizer/layers/";
            var layersClasses = _(this._trackData.layersData).pluck("type");
            layersClasses.unshift("Layer");
            Synesthesia.loadDependencies(layersBasePath, layersClasses).done(this._initializeLayers.bind(this));
        }

        _initializeLayers(){
            if(!this._layersInitsPromises) this._layersInitsPromises = [];
            this._trackData.layersData.forEach(elem => {
                this._layersInitsPromises.push(this._initializeLayer(elem));
            });
            $.when.apply($, this._layersInitsPromises).done(function(){
                this._renderLayers();
                this._timeKeeper.ignite();
            }.bind(this));
        }

        _renderFrame(){
            this.layers.forEach((layer) => {
                layer.renderFrame();
            });
        }

        _initializeLayer(layerData){
            var className = layerData.type;
            var layerDfd = $.Deferred();
            Synesthesia.loadDependencies("views/visualizer/layers/", [className]).done((layerClass) => {
                var layer = new layerClass(layerData, this._config, this._inputBuffer);
                //Layers instances are kept in an array, as their order affects overlapping
                this.layers.push(layer);
                layer.initialize().done(() => {
                    layerDfd.resolve();
                });
            });
            return layerDfd;
        }

        _loadNextTrackData(){
            return $.ajax({
                url: "/get_current_track"
            });
        }

        _loadStageConfig(){
            return $.ajax({
                url: "/get_stage_config"
            });
        }

        _renderLayers() {
            this.layers.forEach(layer => {
                layer.render(this.$el);
            });
            if(this._isOffline)
                this._renderOfflineControls();
        }

        _onStartRenderingClick(){
            this._isRecording = false;
            console.log(this._inputSnapshots);
            this._renderOfflineControls();
            this._inputBuffer.stopMidiListening();
        }

        _renderFrameToFile(){
            if(this._inputSnapshots.length){
                var currentInputSnapshot = this._inputSnapshots.splice(0,1)[0];
                this._inputBuffer.setSnapshot(currentInputSnapshot);
                this._renderFrame();
                this._saveFrameToFiles();                
            }

            this._renderOfflineControls();
        }

        _saveFrameToFiles(){
            console.log("Take the snapshot of each layer and send it to the server");
        }

        _renderOfflineControls(){
            var additionalMessage = this._inputSnapshots.length ? "" : "Nothing to render";
            React.render(
                    <OfflineRenderingControls
                    isRecording={this._isRecording}
                    onStartRenderingClick={_.bind(this._onStartRenderingClick, this)}
                    additionalMessage={additionalMessage}/>,
                    this._recordingUIContainer[0]
                );
        }
    }

    return Director;
});