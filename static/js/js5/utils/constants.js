"use strict";

define(function () {
    return {
        EVENTS: {
            TIME: {
                INCREMENT: "event:time:increment",
                INCREMENT_OFFLINE: "event:time:increment_offline"
            },
            MIDI: {
                NOTE: "event:midi:note"
            }
        },
        INPUTS: {
            SOURCE_PARAMETERS: ["value", "intensity", "velocity"]
        }
    };
});