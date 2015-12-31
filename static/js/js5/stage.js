"use strict";

require.config({
    baseUrl: "/static/js/",
    paths: {
        jquery: "vendor/jquery",
        views: "js5/views",
        utils: "js5/utils",
        underscore: "vendor/underscore",
        jsx_transformer: "/static/js/vendor/jsx_transformer",
        react: "/static/js/vendor/react_with_addons"
    },
    shim: {
        "underscore": {
            exports: "_"
        }
    },
    waitSeconds: 1
});

require(["jquery", "underscore", "views/visualizer/Director"], function ($, _, Director) {
    var director = new Director(renderingMode);
});