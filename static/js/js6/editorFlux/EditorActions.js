define([
    "utils/BaseObject",
    "editorFlux/EditorDispatcher",
    "editorFlux/EditorConstants"
    ], function(BaseObject, editorDispatcher, EditorConstants){

        class EditorActions{
            static updateField(path, value){
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.UPDATE_FIELD,
                        path: path,
                        value: value
                    }
                });
            }

            static loadTrack(){
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.LOAD_TRACK
                    }
                });
            }

            static createLayer(){
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.CREATE_LAYER
                    }
                });
            }

            static createActor(layerIndex){
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.CREATE_ACTOR,
                        layerIndex: layerIndex
                    }
                });
            }

            //For now we don't have unique ids, we can go by index
            static createInput(layerIndex, actorIndex){
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.CREATE_INPUT,
                        layerIndex: layerIndex,
                        actorIndex: actorIndex
                    }
                });
            }
        }

        return EditorActions;

    });