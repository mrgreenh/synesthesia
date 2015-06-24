define([
    "views/visualizer/Synesthesia",
    "utils/constants"
    ], function(Synesthesia, constants){

    class TimeKeeper extends Synesthesia{
        constructor(){
            super();
        }

        ignite(){
            this._frame = 0;
            this._incrementFrame();
        }

        _incrementFrame(){
            this.triggerEvent(constants.EVENTS.TIME.INCREMENT);
            this._frame++;
            window.requestAnimationFrame(_.bind(this._incrementFrame, this));
        }
    }

    return TimeKeeper;

});