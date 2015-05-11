class Layer extends Synesthesia{
    constructor(layerData, config){
        this.type = layerData.type;
        this._layerConfig = config.layers[this.type];
        this._actorsData = layerData["actors"]; 
        
        this._baseDependencyPath = "vendor/layers_dependencies/";
        this._dependencies = this._layerConfig.dependencies;
        $.when(
            this._loadDependencies(this._baseDependencyPath, this._dependencies),
            this._loadActorsClasses()
            ).then(_.bind(this.notifyInitialization, this));

    }

    _loadActorsClasses(){
        var baseActorDependencyPath = "views/visualizer/actors/";
        this._actorsClasses = this._actorsData.map(function(elem){
            return this._getActorClass(elem.className);
        }, this);
        this._actorsClasses.unshift("Actor");
        var dfd = $.Deferred();
        this._loadDependencies(baseActorDependencyPath, this._actorsClasses).done(dfd.resolve);
        return dfd.promise();
    }

    render($stageElement){
        this._initializeActors();
        this.width = $stageElement.width();
        this.height = $stageElement.height();
    }
    
    _getActorClass(className){
        return className + "Actor";
    }

    isItInitializedYet(){
        if(!this._initDfd) this._initDfd = $.Deferred();
        return this._initDfd.promise();
    }

    notifyInitialization(){
        if(this._initDfd) this._initDfd.resolve();
    }
}
