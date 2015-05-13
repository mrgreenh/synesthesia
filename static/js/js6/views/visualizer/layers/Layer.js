define([
        "utils/oop",
        "views/visualizer/Synesthesia",
        "views/visualizer/actors/Actor",
        "views/visualizer/layers/Layer"
    ],
    function(BaseObject, Synesthesia, Actor, Layer){

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
                $.when(
                    Synesthesia.loadDependencies(this._baseDependencyPath, this._dependencies),
                    this._loadActorsClasses()
                    ).then(_.bind(this.notifyInitialization, this));
            }

            _loadActorsClasses(){
                var baseActorDependencyPath = "views/visualizer/actors/";
                this._actorsClasses = _(this._actorsData).pluck("className");
                this._actorsClasses.unshift("ThreeActor");
                this._actorsClasses.unshift("Actor");
                var dfd = $.Deferred();
                Synesthesia.loadDependencies(baseActorDependencyPath, this._actorsClasses).done(dfd.resolve);
                return dfd.promise();
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

        return Layer;
});

