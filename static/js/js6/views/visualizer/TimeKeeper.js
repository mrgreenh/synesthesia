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
            this._ignitionTimestamp = new Date().getTime();
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

            var frameInterval = this._getNextFrameInterval();
            setTimeout(_.bind(this._incrementFrameOffline, this), frameInterval);
        }

        _getNextFrameInterval(){
            //This tries to compensate over time for javascript's problems with maintaining rythm
            var fps = 25;
            var idealFrameInterval = 1000/fps;
            var compensation = 5;

            var elapsedTime = new Date().getTime() - this._ignitionTimestamp;
            var idealFrameNumber = elapsedTime/idealFrameInterval;
            // console.log("Frame count error:"+(idealFrameNumber - this._frame));
            if((idealFrameNumber - this._frame) > 0){
                // console.log("compensating...")
                return idealFrameInterval - compensation;
            } else return idealFrameInterval;
        }
    }

    return TimeKeeper;

});