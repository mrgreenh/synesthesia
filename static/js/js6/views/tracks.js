class TracksView extends BaseObject{
    constructor(){
        super();
        this.$el = $("#tracks-view-container");
        this._bindDOMEvents();
    }

    _bindDOMEvents(){
        this.$("#tracks-list li").on("click", _.bind(this.expandTrackView, this));
        this.$("#edit-track").on("click", _.bind(this.editTrack, this));
    }

    render(){
        //Should render a TracksListView and a TrackView
    }

    expandTrackView(toggle){
        this.$el.toggleClass("exploring", toggle);

    }
}