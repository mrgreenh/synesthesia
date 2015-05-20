require.config({
    baseUrl: "/static/js/",
    paths: {
        jquery: "/static/js/vendor/jquery",
        jsx_transformer: "/static/js/vendor/jsx_transformer",
        react: "/static/js/vendor/react_with_addons",
        views: "js5/views",
        utils: "js5/utils",
        editorFlux: "js5/editorFlux",
        underscore: "/static/js/vendor/underscore"
    },
    shim: {
        'underscore': {
            exports: '_'
        },
    },
    waitSeconds: 1
});

require([
"jquery",
"underscore",
"jsx_transformer",
"react",
"views/editor/EditorView",
"editorFlux/EditorActions",
"editorFlux/TrackStore",
"editorFlux/EditorConstants"
], function($, _, _jsx_, React, EditorView, EditorActions, trackStore, EditorConstants){
    var trackEditor = new EditorView();
    trackStore.addObserver(trackEditor, EditorConstants.STORE_EVENTS.LOAD);
    EditorActions.loadTrack();
});