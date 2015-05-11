class Synesthesia extends BaseObject{
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

    static loadLayersSynesthesiaClasses(layersClasses){
        var dfd = $.Deferred();
        var layersBasePath = "views/visualizer/layers/";
        var actorsBasePath = "views/visualizer/actors/"
        this.loadDependencies(layersBasePath, layersClasses).done(() => {
            layersClasses.forEach(layerClass => {
                var layerSpecificActorClass = window[layerClass].getLayerSpecificActorClass();
                window[layerClass].getAvailableActorsClasses().done(actorsClasses => {
                    var dependencies = layerSpecificActorClass ? [layerSpecificActorClass].concat(actorsClasses) : actorsClasses;
                    dependencies.unshift("Actor");
                    this.loadDependencies(actorsBasePath, dependencies).done(() => {
                        dfd.resolve();
                    });                    
                });
            });
        });
        return dfd.promise();
    }

    constructor(){
        //This should include scene awareness maybe?
    }
}