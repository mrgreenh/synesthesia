define([
        "views/visualizer/Synesthesia",
        "views/visualizer/actors/Actor"
    ],
    function(Synesthesia, Actor){

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
                super();
                this.type = layerData.type;
                this._layerConfig = config.layers[this.type];
                this._actorsData = layerData["actors"]; 
            }

            initialize(){
                var initDfd = $.Deferred();
                this._loadActorsClasses().done(function(){
                    this._actorsClassesDefinitions = arguments;
                    this._actorsClassesByName = _.object(this._actorsClasses, this._actorsClassesDefinitions);
                    initDfd.resolve();
                }.bind(this));
                return initDfd.promise();
            }

            _loadActorsClasses(){
                var baseActorDependencyPath = "views/visualizer/actors/";
                this._actorsClasses = _(this._actorsData).pluck("className");
                var dfd = $.Deferred();
                Synesthesia.loadDependencies(baseActorDependencyPath, this._actorsClasses).done(dfd.resolve);
                return dfd.promise();
            }

            render($stageElement){
                this._initializeActors();
                this.width = $stageElement.width();
                this.height = $stageElement.height();
            }            
        }

        return Layer;
});

