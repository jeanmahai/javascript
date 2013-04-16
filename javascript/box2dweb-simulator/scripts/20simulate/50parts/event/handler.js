/// <reference path="../simulation.js" />
/// <reference path="../javascript-partial.js" />
/// <reference path="../javascript-extend.js" />
/// <reference path="animate.js" />

par(Simulation, function () {
    var fn = function () {
        this.handlers = [];
    };
    fn.prototype = {
        clearHandlers: function () {
            this.handlers = [];
        },
        addHandler: function (h) {
            this.handlers.push(h);
        },
        removeHandler: function (id) {
            var i = 0;
            for (; i < this.handlers.length; i++) {
                if (this.handlers[i].id == id) {
                    this.handlers[i] = this.handlers[this.handlers.length - 1];
                    this.handlers.pop();
                    break;
                }
            }
        }
    };

    return fn;
});