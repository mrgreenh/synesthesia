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
        }

        return EditorActions;

    });