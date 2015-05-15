"use strict";

require.config({
    baseUrl: "static/js/vendor",
    paths: {
        jquery: "jquery",
        views: "../js5/views",
        utils: "../js5/utils"
    },
    shim: {
        "underscore": {
            exports: "_"
        } },
    waitSeconds: 1
});

require(["jquery", "underscore", "views/visualizer/Director"], function ($, _, Director) {
    var director = new Director();
});