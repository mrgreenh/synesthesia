import Synesthesia from "views/visualizer/Synesthesia"
import Actor from "views/visualizer/actors/Actor"
import Layer from "views/visualizer/layers/Layer"
import Three3DLayer from "views/visualizer/layers/Three3DLayer"
import {getBabelCompiledClassName} from "utils/utilities"

class Director extends Synesthesia{
    constructor(){
        super()
        Synesthesia;
        Actor;
        Layer;
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
        this._initializeLayers();
    }

    _initializeLayers(){
        this._trackData.layersData.forEach(elem => {
            this._initializeLayer(elem);
        }, this);
        this._renderLayers();
    }

    _initializeLayer(layerData){
        var className = layerData.type;
        var layer = new window[getBabelCompiledClassName(className)](layerData, this._config);
        //Layers instances are kept in an array, as their order affects overlapping
        this.layers.push(layer);
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

export default Director;