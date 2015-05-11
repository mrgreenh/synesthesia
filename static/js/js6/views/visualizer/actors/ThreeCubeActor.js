class ThreeCubeActor extends Actor{
    constructor(actorData, threeScene){
        super(actorData);
        this._scene = threeScene;
        this._material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    }

    renderFrame(){
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var cube = new THREE.Mesh( geometry, this._material );
        this._scene.add( cube );
    }
}