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

            _update(path, value){
                this.setProp(this._trackData, path, value);
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

            _load(){
                $.ajax("/get_current_track").then((data) => {
                    this._trackData = data;
                    this.triggerEvent(EditorConstants.STORE_EVENTS.LOAD, this._trackData);
                });
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
                }

                return true;
            }

        }
        
        var trackStoreGlobalInstance = new TrackStore();
        editorDispatcher.register(_.bind(trackStoreGlobalInstance.handleAction, trackStoreGlobalInstance));

        return trackStoreGlobalInstance;
});