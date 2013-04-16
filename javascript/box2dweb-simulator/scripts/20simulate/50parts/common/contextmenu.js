/// <reference path="../simulation.js" />
/// <reference path="../javascript-partial.js" />

par(Simulation, function () {
    var fn = function () {
    };
    fn.prototype = {
        _preventContextmenu: function (evt) {
            evt.preventDefault();
        },
        disabledContextmenu: function () {
            var me = this;
            window.addEventListener("contextmenu", me._preventContextmenu, false);
        },
        enabledContextmenu: function () {
            var me = this;
            window.removeEventListener("contextmenu", me._preventContextmenu, false);            
        }
    };
    return fn;
});