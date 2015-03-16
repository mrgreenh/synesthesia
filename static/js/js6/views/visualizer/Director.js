class Director extends Synesthesia{
    constructor(){
        this.$el = $("#stage-container");
        this._loadNextTrackData().done(data => {
            this._trackData = data;
            this._startTrack();
        });
    }

    _startTrack(){
        this._trackData.layersData.forEach(elem => {
            this._initializeLayer(elem);
        });
    }

    _initializeLayer(layerData){
        //Get the layer's type to require() and initialize the right class
        //The layer's class might have more require() to do for the libs
    }

    _loadNextTrackData(){
        return $.ajax({
            url: "/get_current_track"
        });
    }
}