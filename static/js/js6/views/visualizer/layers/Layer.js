class Layer extends Synesthesia{
    constructor(layerData, config){
        this.type = layerData.type;
        this._layerConfig = config.layers[this.type];

        this._baseDependencyPath = "vendor/layers_dependencies/";
        this._dependencies = this._layerConfig.dependencies;

        this._loadDependencies(this._baseDependencyPath, this._dependencies, this.notifyInitialization);
    }

    render($stageElement){
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
