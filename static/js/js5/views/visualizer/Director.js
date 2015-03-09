"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Director = (function (Synesthesia) {
    function Director() {
        _classCallCheck(this, Director);

        //Anything you might like for initialization
        this._loadNextTrackData;
    }

    _inherits(Director, Synesthesia);

    return Director;
})(Synesthesia);