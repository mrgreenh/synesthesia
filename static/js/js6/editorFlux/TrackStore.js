define([
    "utils/BaseObject",
    "editorFlux/EditorConstants",
    "editorFlux/EditorDispatcher"
    ], function(BaseObject, EditorConstants, editorDispatcher){


        class TrackStore extends BaseObject{

            constructor(){
                super();
                this._trackData = {};
            }

            _persistData(){
                $.ajax("/update_current_track", {
                    method: "POST",
                    data: JSON.stringify({trackData: this._trackData}),
                    contentType: "application/json",
                    dataType:"json"
                }).then((data) => {
                    if(data && data.status == 200)
                        this.triggerEvent(EditorConstants.STORE_EVENTS.CHANGE, data.track_data);
                });
            }

            _update(path, value){
                this.setProp(this._trackData, path, value);
                this._persistData();
            }

            _load(){
                $.ajax("/get_current_track").then((data) => {
                    this._trackData = data;
                    this.triggerEvent(EditorConstants.STORE_EVENTS.LOAD, this._trackData);
                });
            }

            _createLayer(){
                if(!_.isArray(this._trackData.layersData)) this._trackData.layersData = [];
                this._trackData.layersData.push({
                    name: "New layer",
                    actors: [],
                    type: "Three3DLayer"
                });
                this._persistData();
            }

            _createActor(layerIndex){
                var layerData = this._trackData.layersData[layerIndex];
                if(!_.isArray(layerData.actors)) layerData.actors = [];
                layerData.actors.push({
                    name: "New Actor",
                    inputChannels: [],
                    className: "ThreeCubeActor"
                });
                this._persistData();
            }

            _createInput(layerIndex, actorIndex){
                var layerData = this._trackData.layersData[layerIndex];
                var actorData = layerData.actors[actorIndex];
                if(!_.isArray(actorData.inputChannels)) actorData.inputChannels = [];
                actorData.inputChannels.push({
                    name: "New Input"
                });
                this._persistData();
            }

            handleAction(payload){
                var action = payload.action;
                switch(action.actionType){
                    case EditorConstants.ACTIONS.UPDATE_FIELD:
                        this._update(action.path, action.value);
                        break;
                    case EditorConstants.ACTIONS.LOAD_TRACK:
                        this._load();
                        break;
                    case EditorConstants.ACTIONS.CREATE_LAYER:
                        this._createLayer();
                        break;
                    case EditorConstants.ACTIONS.CREATE_ACTOR:
                        this._createActor(action.layerIndex)
                        break;
                    case EditorConstants.ACTIONS.CREATE_INPUT:
                        this._createInput(action.layerIndex, action.actorIndex);
                        break;
                }

                return true;
            }

        }
        
        var trackStoreGlobalInstance = new TrackStore();
        editorDispatcher.register(_.bind(trackStoreGlobalInstance.handleAction, trackStoreGlobalInstance));

        return trackStoreGlobalInstance;
});