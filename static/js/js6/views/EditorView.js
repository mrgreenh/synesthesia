class EditorView extends BaseObject{
    constructor(trackData){
        super();
        this.$el = $("#editor-view-container");
        this._trackData = trackData;
    }

    render(){
        React.render(
            <EditorForm trackData={this._trackData} />, this.$el[0]
        );
    }
}