"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["utils/BaseObject", "editorFlux/EditorConstants", "editorFlux/EditorDispatcher"], function (BaseObject, EditorConstants, editorDispatcher) {
    var TrackStore = (function (_BaseObject) {
        function TrackStore() {
            _classCallCheck(this, TrackStore);

            _get(Object.getPrototypeOf(TrackStore.prototype), "constructor", this).call(this);
            this._trackData = {};
        }

        _inherits(TrackStore, _BaseObject);

        _createClass(TrackStore, [{
            key: "_update",
            value: function _update(path, value) {
                var _this = this;

                this.setProp(this._trackData, path, value);
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
            key: "_load",
            value: function _load() {
                var _this2 = this;

                $.ajax("/get_current_track").then(function (data) {
                    _this2._trackData = data;
                    _this2.triggerEvent(EditorConstants.STORE_EVENTS.LOAD, _this2._trackData);
                });
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