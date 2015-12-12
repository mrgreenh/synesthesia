"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["utils/BaseObject", "editorFlux/EditorDispatcher", "editorFlux/EditorConstants"], function (BaseObject, editorDispatcher, EditorConstants) {
    var EditorActions = (function () {
        function EditorActions() {
            _classCallCheck(this, EditorActions);
        }

        _createClass(EditorActions, null, [{
            key: "updateField",
            value: function updateField(path, value) {
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.UPDATE_FIELD,
                        path: path,
                        value: value
                    }
                });
            }
        }, {
            key: "loadTrack",
            value: function loadTrack() {
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.LOAD_TRACK
                    }
                });
            }
        }, {
            key: "deleteItem",
            value: function deleteItem(pathToArray, index) {
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.DELETE_ITEM,
                        pathToArray: pathToArray,
                        index: index
                    }
                });
            }
        }, {
            key: "createLayer",
            value: function createLayer() {
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.CREATE_LAYER
                    }
                });
            }
        }, {
            key: "createActor",
            value: function createActor(layerIndex, actorClass) {
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.CREATE_ACTOR,
                        layerIndex: layerIndex,
                        actorClass: actorClass
                    }
                });
            }
        }, {
            key: "createInput",

            //For now we don't have unique ids, we can go by index
            value: function createInput(layerIndex, actorIndex) {
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.CREATE_INPUT,
                        layerIndex: layerIndex,
                        actorIndex: actorIndex
                    }
                });
            }
        }, {
            key: "createSignal",
            value: function createSignal(layerIndex, actorIndex, inputIndex, moduleName) {
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.CREATE_SIGNAL,
                        layerIndex: layerIndex,
                        actorIndex: actorIndex,
                        inputIndex: inputIndex,
                        moduleName: moduleName
                    }
                });
            }
        }, {
            key: "moveActor",
            value: function moveActor(path, direction) {
                editorDispatcher.dispatch({
                    action: {
                        actionType: EditorConstants.ACTIONS.MOVE_ACTOR,
                        path: path,
                        direction: direction
                    }
                });
            }
        }]);

        return EditorActions;
    })();

    return EditorActions;
});