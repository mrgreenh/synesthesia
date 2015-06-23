define([
        "views/visualizer/actors/Actor",
        "views/visualizer/layers/Layer",
        "/static/js/vendor/layers_dependencies/three.min.js"
],function(Actor, Layer, _THREE_){

    class Three3DLayer extends Layer{
        static getAvailableActorsClasses(){
            //Even if right now it's not, one day this will be async
            //It will ask the server to check what classes are in the actors folder
            //Because adding actors will be part of creative processes that should not require code change to the main app
            var dfd = $.Deferred();
            dfd.resolve([
                    "ThreeCubeActor",
                    "ThreeSphereActor"
                ]);
            return dfd;
        }

        constructor(layerData, config){
            super(layerData, config);
        }

        render($stageElement){
            this._scene = new THREE.Scene();
            super.render($stageElement);
            this._camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );
            this._renderer = new THREE.WebGLRenderer({ alpha: true });
            this._renderer.setSize( this.width, this.height );
            //$(this._renderer.domElement).addClass("layer-canvas");
            $stageElement[0].appendChild( this._renderer.domElement );

            this._camera.position.z = 5;
            this._camera.position.x = 1;
            this._camera.position.y = 1;

            this.renderFrame();
        }

        renderFrame(){
            //requestAnimationFrame( this.renderFrame );
            this._actorsInstances.forEach(actorInstance => {
                actorInstance.renderFrame();
            });
            this._renderer.render( this._scene, this._camera );
        }

        _initializeActors(){
            this._actorsInstances = this._actorsData.map(function(actorData){
                return new this._actorsClassesByName[actorData.className](
                        actorData,
                        this._scene,
                        this._inputBuffer;
                    );
            }.bind(this));
        }

    }

    return Three3DLayer;
});