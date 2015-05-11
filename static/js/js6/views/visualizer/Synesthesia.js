class Synesthesia extends BaseObject{
    constructor(){
        //This should include scene awareness maybe?
    }

    _loadDependencies(basePath, dependencies, callback){
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
}