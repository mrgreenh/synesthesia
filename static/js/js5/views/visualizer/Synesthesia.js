"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Synesthesia = (function (BaseObject) {
    function Synesthesia() {
        _classCallCheck(this, Synesthesia);
    }

    _inherits(Synesthesia, BaseObject);

    _prototypeProperties(Synesthesia, null, {
        _loadDependencies: {
            value: function _loadDependencies(basePath, dependencies, callback) {
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
            },
            writable: true,
            configurable: true
        }
    });

    return Synesthesia;
})(BaseObject);

//This should include scene awareness maybe?