"use strict";

require.config({
    baseUrl: "/static/js/",
    paths: {
        jquery: "/static/js/vendor/jquery",
        jsx_transformer: "/static/js/vendor/jsx_transformer",
        react: "/static/js/vendor/react_with_addons",
        views: "js5/views",
        utils: "js5/utils",
        underscore: "/static/js/vendor/underscore"
    },
    shim: {
        "underscore": {
            exports: "_"
        } },
    waitSeconds: 1
});

require(["jquery", "underscore", "jsx_transformer", "react", "views/editor/EditorView"], function ($, _, _jsx_, React, EditorView, Director) {
    var trackEditor = new EditorView(trackData);
    trackEditor.render();
});