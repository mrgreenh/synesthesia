define([
    "utils/BaseObject",
    "react",
    "views/editor/EditorForm",
    "editorFlux/EditorConstants"
    ], function(BaseObject, React, EditorForm, EditorConstants){
    class EditorView extends BaseObject{
        constructor(){
            super();
            this.$el = $("#editor-view-container");
        }

        events(eventName){
            switch(eventName){
                case EditorConstants.STORE_EVENTS.LOAD:
                    var newData = arguments[1];
                    this._trackData = newData;
                    this.render();
                    break;
            }
        }

        render(){
            if(this._trackData)
                React.render(
                    <EditorForm trackData={this._trackData} />, this.$el[0]
                );
        }
    }

    return EditorView;
});