define([
            "utils/constants",
            "views/visualizer/Synesthesia",
            "views/visualizer/actors/Actor",
            "views/visualizer/layers/Three3DLayer",
            "views/visualizer/InputBuffer",
            "views/visualizer/TimeKeeper"
],
function(constants, Synesthesia, Actor, Three3DLayer, InputBuffer, TimeKeeper){
    class Director extends Synesthesia{
        constructor(){
            super();
            this.$el = $("#stage-container");
            this.layers = [];
            this._config;
            this._trackData;

            //Load the configuration that describes classes and track data
            //Then start doing your thing
            $.when(this._loadNextTrackData(), this._loadStageConfig()).then((trackData, configData) => {
                this._config = configData[0];
                this._trackData = trackData[0];
                this._inputBuffer = new InputBuffer(this._trackData);
                this._timeKeeper = new TimeKeeper();

                this.observe(this._timeKeeper, constants.EVENTS.TIME.INCREMENT);
                this._startTrack();
            });
        }

        events(eventName){
            switch(eventName){
                case constants.EVENTS.TIME.INCREMENT:
                    this._renderFrame();
                    break;
            }
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
        }
    }

    return Director;
});