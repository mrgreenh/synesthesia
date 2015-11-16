define([
    "utils/BaseObject",
    "editorFlux/EditorConstants",
    "editorFlux/EditorDispatcher",
    "vendor/signaljs/dist/signal",
    ], function(BaseObject, EditorConstants, editorDispatcher, Signal){


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
                    type: prompt("Insert layer type", "Three3DLayer")
                });
                this._persistData();
            }

            _createActor(layerIndex, actorClass){
                var layerData = this._trackData.layersData[layerIndex];
                if(!_.isArray(layerData.actors)) layerData.actors = [];
                layerData.actors.push({
                    name: "New Actor",
                    inputChannels: [],
                    className: actorClass
                });
                this._persistData();
            }

            _createInput(layerIndex, actorIndex){
                var layerData = this._trackData.layersData[layerIndex];
                var actorData = layerData.actors[actorIndex];
                if(!_.isArray(actorData.inputChannels)) actorData.inputChannels = [];
                actorData.inputChannels.push({
                    "inputChannel": "1",
                    "targetParameter": "posX",
                    "sourceParameter": "value",
                    "inputType": "note",
                    "inputBus": "default_bus",
                    "name": "New Input",
                    "signalsList": []
                });
                this._persistData();
            }

            _createSignal(layerIndex, actorIndex, inputIndex, moduleName){
                var layerData = this._trackData.layersData[layerIndex];
                var actorData = layerData.actors[actorIndex];
                var inputData = actorData.inputChannels[inputIndex];
                if(!_.isArray(inputData.signalsList)) inputData.signalsList = [];

                var modulesList = Signal.getModulesList();
                var moduleConfigurationSchema = Signal.getConfigurationSchemaForModule(moduleName);

                var defaultModuleConfiguration = {}
                for(let k in moduleConfigurationSchema){
                    defaultModuleConfiguration[k] = moduleConfigurationSchema[k];
                }

                defaultModuleConfiguration.name = moduleName;
                inputData.signalsList.push(defaultModuleConfiguration);

                this._persistData();
            }

            _deleteItem(pathToArray, index){
                var items = this.getProp(this._trackData, pathToArray);
                items.splice(index, 1);
                this.setProp(this._trackData, pathToArray, items);

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
                        this._createActor(action.layerIndex, action.actorClass);
                        break;
                    case EditorConstants.ACTIONS.CREATE_INPUT:
                        this._createInput(action.layerIndex, action.actorIndex);
                        break;
                    case EditorConstants.ACTIONS.CREATE_SIGNAL:
                        this._createSignal(
                            action.layerIndex,
                            action.actorIndex,
                            action.inputIndex,
                            action.moduleName)
                        break;
                    case EditorConstants.ACTIONS.DELETE_ITEM:
                        this._deleteItem(action.pathToArray, action.index);
                        break;
                }

                return true;
            }

        }
        
        var trackStoreGlobalInstance = new TrackStore();
        editorDispatcher.register(_.bind(trackStoreGlobalInstance.handleAction, trackStoreGlobalInstance));

        return trackStoreGlobalInstance;
});