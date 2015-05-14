import Layer from "views/visualizer/layers/Layer"
import getBabelCompiledClassName from "utils/utilities"

class Three3DLayer extends Layer{
    static getLayerSpecificActorClass(){
        return "ThreeActor";
    }

    static getAvailableActorsClasses(){
        return [
                "ThreeCubeActor",
                "ThreeSphereActor"
            ];
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
        this._actorsInstances = this._actorsData.map(actorData => {
            return new window[getBabelCompiledClassName(actorData.className)](
                    actorData,
                    this._scene
                );
        });
    }

}

export default Three3DLayer;