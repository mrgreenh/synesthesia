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

            constructor(layerData, config, inputBuffer){
                super(layerData, config, inputBuffer);
                this.type = layerData.type;
                this._layerConfig = config.layers[this.type];
                this._actorsData = layerData["actors"]; 
                this._actorsOptions = {} //Override with stuff like three scene or canvas context

                this._actorsClassesByName = {};
                this._actorsClassesDefinitions = [];

                this._inputBuffer = inputBuffer;
            }

            initialize(){
                var initDfd = $.Deferred();
                this._loadActorsClasses().done(function(){
                    var normalizedActorsClasses = [];
                    //loadDependencies normalizes the list of classes it gets passed in this same way
                    this._actorsClasses.forEach((className) => {
                            if(!_.contains(normalizedActorsClasses, className)) normalizedActorsClasses.push(className);
                    });
                    for(var i in normalizedActorsClasses){
                        var currentClass = normalizedActorsClasses[i];
                        this._actorsClassesByName[currentClass] = arguments[i];
                        this._actorsClassesDefinitions.push(arguments[i]);
                    }
                    initDfd.resolve();
                }.bind(this));
                return initDfd.promise();
            }

            _loadActorsClasses(){
                var baseActorDependencyPath = "views/visualizer/actors/";
                this._actorsClasses = _(this._actorsData).pluck("className");
                var dfd = $.Deferred();
                Synesthesia.loadDependencies(baseActorDependencyPath, this._actorsClasses).done(function(){
                    var classes = [];
                    for(var i in _.range(arguments.length)){
                        classes.push(arguments[i]);   
                    }

                    dfd.resolve.apply($, classes);
                }.bind(this));
                return dfd.promise();
            }

            _initializeActors(){
                this._actorsInstances = this._actorsData.map(function(actorData){
                    return new this._actorsClassesByName[actorData.className](
                            actorData,
                            this._inputBuffer,
                            this._actorsOptions
                        );
                }.bind(this));
            }

            render($stageElement){
                this._initializeActors();
                this.width = $stageElement.width();
                this.height = $stageElement.height();
            }

            getFrameData(){
                //To be overridden
            }
        }

        return Layer;
});

