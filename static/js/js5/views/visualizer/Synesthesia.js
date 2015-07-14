"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

define(["utils/BaseObject"], function (BaseObject) {
    var Synesthesia = (function (_BaseObject) {
        _inherits(Synesthesia, _BaseObject);

        _createClass(Synesthesia, null, [{
            key: "getLayersDefinitionsPath",
            value: function getLayersDefinitionsPath() {
                return "views/visualizer/layers/";
            }
        }, {
            key: "getActorsDefinitionsPath",
            value: function getActorsDefinitionsPath() {
                return "views/visualizer/actors/";
            }
        }, {
            key: "loadDependencies",
            value: function loadDependencies(basePath, dependencies, callback) {
                var toLoad = [];
                var normalizedDependencies = [];
                dependencies.forEach(function (dependency) {
                    var dependencyPath = basePath + dependency;
                    if (!_(toLoad).contains(dependencyPath)) {
                        toLoad.push(dependencyPath);
                        normalizedDependencies.push(dependency);
                    }
                });
                console.log(toLoad);
                var dfd = $.Deferred();
                require(toLoad, dfd.resolve);
                return dfd.promise();
            }
        }, {
            key: "getLayerAvailableActors",
            value: function getLayerAvailableActors(layerClassName) {
                var dfd = $.Deferred();
                require([Synesthesia.getLayersDefinitionsPath() + layerClassName], function (classDefinition) {
                    classDefinition.getAvailableActorsClasses().done(function (classesList) {
                        dfd.resolve(classesList);
                    });
                });
                return dfd.promise();
            }
        }, {
            key: "getActorSpecificParameters",
            value: function getActorSpecificParameters(actorClassName) {
                var dfd = $.Deferred();
                require([Synesthesia.getActorsDefinitionsPath() + actorClassName], function (actorClass) {
                    var specificParameters = actorClass.getActorParameters();
                    dfd.resolve(specificParameters);
                });
                return dfd.promise();
            }
        }]);

        function Synesthesia() {
            _classCallCheck(this, Synesthesia);

            _get(Object.getPrototypeOf(Synesthesia.prototype), "constructor", this).call(this);
            //This should include scene awareness maybe?
        }

        return Synesthesia;
    })(BaseObject);

    return Synesthesia;
});