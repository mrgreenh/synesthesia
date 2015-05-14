import Synesthesia from "views/visualizer/Synesthesia"
import Actor from "views/visualizer/actors/Actor"

class Layer extends Synesthesia{
    static getLayerSpecificActorClass(){
        //Override if necessary
    }

    static getAvailableActorsClasses(){
        var dfd = $.Deferred();
        dfd.resolve([]);
        return dfd.promise();
    }

    constructor(layerData, config){
        super()
        this.type = layerData.type;
        this._layerConfig = config.layers[this.type];
        this._actorsData = layerData["actors"];
    }

    render($stageElement){
        this._initializeActors();
        this.width = $stageElement.width();
        this.height = $stageElement.height();
    }
}

export default Layer;