/// <reference path="../simulation.js" />
/// <reference path="../javascript-partial.js" />
/// <reference path="../javascript-animate.js" />

par(Simulation, function () {
    var fn = function () {
        this.animateHandler = null;
    };
    fn.prototype = {
        _animate: function (f) {
            this.animateHandler = requestAnimationFrame(f);
        },
        _cancelAnimate: function () {
            var h = this.animateHandler;
            cancelRequestAnimationFrame(h);
        }
    };
    return fn;
});