define([
    "views/visualizer/Synesthesia",
    "utils/constants"
    ], function(Synesthesia, constants){

    class TimeKeeper extends Synesthesia{
        constructor(isOffline, offlineRenderingSettings){
            super();

            this._offlineRenderingSettings = offlineRenderingSettings;
            this._isOffline = isOffline;
        }

        ignite(){
            this._frame = 0;
            if(this._isOffline)
                this._incrementFrameOffline();
            else
                this._incrementFrame();
        }

        _incrementFrame(){
            this.triggerEvent(constants.EVENTS.TIME.INCREMENT);
            this._frame++;
            window.requestAnimationFrame(_.bind(this._incrementFrame, this));
        }

        _incrementFrameOffline(){
            this.triggerEvent(constants.EVENTS.TIME.INCREMENT_OFFLINE);
            this._frame++;
            //TODO this might introduce a delay because 1000/60 gives decimal crap
            setTimeout(_.bind(this._incrementFrameOffline, this), 17);
        }
    }

    return TimeKeeper;

});