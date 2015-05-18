define([
        "utils/BaseObject"
    ], function(BaseObject){

        class Synesthesia extends BaseObject{
            static getLayersDefinitionsPath(){
                return "views/visualizer/layers/";
            }

            static getActorsDefinitionsPath(){
                return "views/visualizer/actors/";
            }

            static loadDependencies(basePath, dependencies, callback){
                var toLoad = [];
                var normalizedDependencies = [];
                dependencies.forEach(dependency => {
                    var dependencyPath = basePath + dependency;
                    if (!_(toLoad).contains(dependencyPath)){
                        toLoad.push(dependencyPath);
                        normalizedDependencies.push(dependency);
                    }
                });
                console.log(toLoad);
                var dfd = $.Deferred();
                require( toLoad, dfd.resolve);
                return dfd.promise();
            }

            static getLayerAvailableActors(layerClassName){
                var dfd = $.Deferred();
                require([Synesthesia.getLayersDefinitionsPath() + layerClassName], function(classDefinition){
                    classDefinition.getAvailableActorsClasses().done(function(classesList){
                        dfd.resolve(classesList);
                    });
                });
                return dfd.promise();
            }

            static getActorSpecificParameters(actorClassName){
                var dfd = $.Deferred();
                require([Synesthesia.getActorsDefinitionsPath() + actorClassName], function(actorClass){
                    var specificParameters = actorClass.getActorParameters();
                    dfd.resolve(specificParameters);
                })
                return dfd.promise();
            }

            constructor(){
                super();
                //This should include scene awareness maybe?
            }
        }

        return Synesthesia;
});