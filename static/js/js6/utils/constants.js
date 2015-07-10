define(function(){
    return {
        EVENTS: {
            TIME: {
                INCREMENT: "event:time:increment"
            },
            MIDI:{
                NOTE: "event:midi:note"
            }
        },
        INPUTS: {
                SOURCE_PARAMETERS: ["value", "intensity", "velocity"]
            }
    }
});