"use strict";

require.config({
    baseUrl: "/static/js/",
    paths: {
        jquery: "vendor/jquery",
        views: "js5/views",
        utils: "js5/utils",
        underscore: "vendor/underscore"
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