class TracksView extends BaseObject{
    constructor(){
        super();
        this.$el = $("#tracks-view-container");
    }

    render(){
        this.$el.text("Hello world!");
    }
}