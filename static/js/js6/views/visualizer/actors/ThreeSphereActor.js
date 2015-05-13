class ThreeSphereActor extends ThreeActor{
    static getActorParameters(){
        return super.getActorParameters().concat(["radius"]);
    }

    renderFrame(){
        var geometry = new THREE.SphereGeometry(150, 100, 100);
        var sphere = new THREE.Mesh(geometry, this._material);
        this._scene.add( sphere );
    }
}