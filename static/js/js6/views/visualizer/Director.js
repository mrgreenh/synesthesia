class Director extends Synesthesia{
    constructor(){
        this.$el = $("#stage-container");
        this.layers = [];
        //Load the configuration that describes classes and track data
        //Then start doing your thing
        $.when(this._loadNextTrackData(), this._loadStageConfig()).then((trackData, configData) => {
            this._config = configData[0];
            this._trackData = trackData[0];
            this._startTrack();
        });
    }

    _startTrack(){
        var layersBasePath = "views/visualizer/layers/";
        var layersClasses = [layersBasePath + "Layer"];
        this._trackData.layersData.forEach(elem => {
            var layerClazz = this._getLayerClassName(elem);
            var layerClassPath = layersBasePath + layerClazz;
            if (!_(layersClasses).contains(layerClassPath))
                layersClasses.push(layerClassPath);
        });
        console.log(layersClasses);
        require( layersClasses, () => {
            //Initialized in order so their canvases get appended in the right order
            this._trackData.layersData.forEach(elem => {
                this._initializeLayer(elem);
            });
        });

    }

    _getLayerClassName(layerData) {
        var layerClazz = layerData.type + "Layer";
        return layerClazz;
    }

    _initializeLayer(layerData){
        var className = this._getLayerClassName(layerData);
        try{
            var layer = new window[className]();
            this.layers.push(layer);
        }catch(ex){
            console.warn("Could not initialize layer "+className);
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
}