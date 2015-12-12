"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["utils/BaseObject", "editorFlux/EditorConstants", "editorFlux/EditorDispatcher", "vendor/signaljs/dist/signal"], function (BaseObject, EditorConstants, editorDispatcher, Signal) {
    var TrackStore = (function (_BaseObject) {
        _inherits(TrackStore, _BaseObject);

        function TrackStore() {
            _classCallCheck(this, TrackStore);

            _get(Object.getPrototypeOf(TrackStore.prototype), "constructor", this).call(this);
            this._trackData = {};
        }

        _createClass(TrackStore, [{
            key: "_persistData",
            value: function _persistData() {
                var _this = this;

                $.ajax("/update_current_track", {
                    method: "POST",
                    data: JSON.stringify({ trackData: this._trackData }),
                    contentType: "application/json",
                    dataType: "json"
                }).then(function (data) {
                    if (data && data.status == 200) _this.triggerEvent(EditorConstants.STORE_EVENTS.CHANGE, data.track_data);
                });
            }
        }, {
            key: "_update",
            value: function _update(path, value) {
                this.setProp(this._trackData, path, value);
                this._persistData();
            }
        }, {
            key: "_load",
            value: function _load() {
                var _this2 = this;

                $.ajax("/get_current_track").then(function (data) {
                    _this2._trackData = data;
                    _this2.triggerEvent(EditorConstants.STORE_EVENTS.LOAD, _this2._trackData);
                });
            }
        }, {
            key: "_createLayer",
            value: function _createLayer() {
                if (!_.isArray(this._trackData.layersData)) this._trackData.layersData = [];
                this._trackData.layersData.push({
                    name: "New layer",
                    actors: [],
                    type: prompt("Insert layer type", "Three3DLayer")
                });
                this._persistData();
            }
        }, {
            key: "_createActor",
            value: function _createActor(layerIndex, actorClass) {
                var layerData = this._trackData.layersData[layerIndex];
                if (!_.isArray(layerData.actors)) layerData.actors = [];
                layerData.actors.push({
                    name: "New Actor",
                    inputChannels: [],
                    className: actorClass
                });
                this._persistData();
            }
        }, {
            key: "_createInput",
            value: function _createInput(layerIndex, actorIndex) {
                var layerData = this._trackData.layersData[layerIndex];
                var actorData = layerData.actors[actorIndex];
                if (!_.isArray(actorData.inputChannels)) actorData.inputChannels = [];
                actorData.inputChannels.push({
                    "inputChannel": "1",
                    "targetParameter": "posX",
                    "sourceParameter": "value",
                    "inputType": "note",
                    "inputBus": "default_bus",
                    "name": "New Input",
                    "signalsList": []
                });
                this._persistData();
            }
        }, {
            key: "_createSignal",
            value: function _createSignal(layerIndex, actorIndex, inputIndex, moduleName) {
                var layerData = this._trackData.layersData[layerIndex];
                var actorData = layerData.actors[actorIndex];
                var inputData = actorData.inputChannels[inputIndex];
                if (!_.isArray(inputData.signalsList)) inputData.signalsList = [];

                var modulesList = Signal.getModulesList();
                var moduleConfigurationSchema = Signal.getConfigurationSchemaForModule(moduleName);

                var defaultModuleConfiguration = {};
                for (var k in moduleConfigurationSchema) {
                    defaultModuleConfiguration[k] = moduleConfigurationSchema[k];
                }

                defaultModuleConfiguration.name = moduleName;
                inputData.signalsList.push(defaultModuleConfiguration);

                this._persistData();
            }
        }, {
            key: "_deleteItem",
            value: function _deleteItem(pathToArray, index) {
                var items = this.getProp(this._trackData, pathToArray);
                items.splice(index, 1);
                this.setProp(this._trackData, pathToArray, items);

                this._persistData();
            }
        }, {
            key: "_moveAction",
            value: function _moveAction(path, direction) {
                var pathToActors = path.split(".");
                var currentIndex = parseInt(pathToActors.splice(-1, 1));
                var actors = this.getProp(this._trackData, pathToActors.join("."));
                var movingActor = actors.splice(currentIndex, 1)[0];
                var newIndex = direction == "up" ? currentIndex - 1 : currentIndex + 1;
                actors.splice(newIndex, 0, movingActor);
                this._persistData();
            }
        }, {
            key: "handleAction",
            value: function handleAction(payload) {
                var action = payload.action;
                switch (action.actionType) {
                    case EditorConstants.ACTIONS.UPDATE_FIELD:
                        this._update(action.path, action.value);
                        break;
                    case EditorConstants.ACTIONS.LOAD_TRACK:
                        this._load();
                        break;
                    case EditorConstants.ACTIONS.CREATE_LAYER:
                        this._createLayer();
                        break;
                    case EditorConstants.ACTIONS.CREATE_ACTOR:
                        this._createActor(action.layerIndex, action.actorClass);
                        break;
                    case EditorConstants.ACTIONS.CREATE_INPUT:
                        this._createInput(action.layerIndex, action.actorIndex);
                        break;
                    case EditorConstants.ACTIONS.CREATE_SIGNAL:
                        this._createSignal(action.layerIndex, action.actorIndex, action.inputIndex, action.moduleName);
                        break;
                    case EditorConstants.ACTIONS.MOVE_ACTION:
                        this._moveAction(action.path, action.direction);
                        break;
                    case EditorConstants.ACTIONS.DELETE_ITEM:
                        this._deleteItem(action.pathToArray, action.index);
                        break;
                }

                return true;
            }
        }]);

        return TrackStore;
    })(BaseObject);

    var trackStoreGlobalInstance = new TrackStore();
    editorDispatcher.register(_.bind(trackStoreGlobalInstance.handleAction, trackStoreGlobalInstance));

    return trackStoreGlobalInstance;
});