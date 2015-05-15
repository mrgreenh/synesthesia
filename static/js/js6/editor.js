require.config({
    baseUrl: "static/js/vendor",
    paths: {
        jquery: "jquery",
        views: "../js5/views",
        utils: "../js5/utils"
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
"/vendor/react_with_addons_0.12.2.js",
"views/editor",
"views/ReactUtils",
"views/editorForm",
"views/actorEditorForm",
"views/visualizer/Director"
], function($, _, Director){
    var trackEditor = new EditorView();
    trackEditor.render();
});