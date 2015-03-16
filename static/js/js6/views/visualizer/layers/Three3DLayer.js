class Three3DLayer extends Layer{
    constructor(layerData, config){
        super(layerData, config);
    }

    render($stageElement){
        super.render($stageElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize( this.width, this.height );
        //$(this.renderer.domElement).addClass("layer-canvas");
        $stageElement[0].appendChild( this.renderer.domElement );

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        this.camera.position.z = 5;
        this.camera.position.x = 1;
        this.camera.position.y = 1;

        this.renderFrame();

        alert("rendered three");
    }

    renderFrame(){
        //requestAnimationFrame( this.renderFrame );
        this.renderer.render( this.scene, this.camera );
    }
}