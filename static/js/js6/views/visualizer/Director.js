class Director extends Synesthesia{
    constructor(){
        this.$el = $("#stage-container");
        this.layers = [];
        this._config;
        this._trackData;
        //Load the configuration that describes classes and track data
        //Then start doing your thing
        $.when(this._loadNextTrackData(), this._loadStageConfig()).then((trackData, configData) => {
            this._config = configData[0];
            this._trackData = trackData[0];
            this._startTrack();
        });
    }

    _startTrack(){
        var layersClasses = _(this._trackData.layersData).map(elem => {
            return elem.type;
        });
        layersClasses.unshift("Layer");
        Synesthesia.loadLayersSynesthesiaClasses(layersClasses).done(this._initializeLayers.bind(this));
    }

    _initializeLayers(){
        if(!this._layersInitsPromises) this._layersInitsPromises = [];
        this._trackData.layersData.forEach(elem => {
            this._layersInitsPromises.push(this._initializeLayer(elem));
        });
        $.when.apply($, this._layersInitsPromises).done(_.bind(this._renderLayers, this));
    }

    _initializeLayer(layerData){
        var className = layerData.type;
        try{
            var layer = new window[className](layerData, this._config);
            //Layers instances are kept in an array, as their order affects overlapping
            this.layers.push(layer);
            var layerInitPromise = layer.isItInitializedYet();
            this._layersInitsPromises.push(layerInitPromise);
            return layerInitPromise;
        }catch(ex){
            console.warn("Could not initialize layer "+className);
            console.log(ex.stack);
            console.log(ex);
        }
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