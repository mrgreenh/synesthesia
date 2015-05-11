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
        this.type = layerData.type;
        this._layerConfig = config.layers[this.type];
        this._actorsData = layerData["actors"]; 
        
        this._baseDependencyPath = "vendor/layers_dependencies/";
        this._dependencies = this._layerConfig.dependencies;
        Synesthesia.loadDependencies(this._baseDependencyPath, this._dependencies).done(_.bind(this.notifyInitialization, this));

    }

    render($stageElement){
        this._initializeActors();
        this.width = $stageElement.width();
        this.height = $stageElement.height();
    }
    
    isItInitializedYet(){
        if(!this._initDfd) this._initDfd = $.Deferred();
        return this._initDfd.promise();
    }

    notifyInitialization(){
        if(this._initDfd) this._initDfd.resolve();
    }
}
