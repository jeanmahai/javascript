/// <reference path="../simulation.js" />
/// <reference path="../javascript-partial.js" />

par(Simulation, function () {
    var input = function () {
        this.keys = new Array(255);
        this.mouseButtons = new Array(3);
        this.__initInput();
    };
    input.prototype = {
        __initInput: function () {
            var me = this;
            //console.info("init input");
            window.addEventListener("keydown", function (evt) {
                me.keys[evt.keyCode] = true;
            }, false);

            window.addEventListener("keyup", function (evt) {
                me.keys[evt.keyCode] = false;
            }, false);

            window.addEventListener("mousedown", function (evt) {
                me.mouseButtons[evt.button] = true;
            }, false);

            window.addEventListener("mouseup", function (evt) {
                me.mouseButtons[evt.button] = false;
            }, false);

            me.clearKeys();
            me.clearMouseButton();
        },
        clearKeys: function () {
            var i = 0;
            for (; i < this.keys.length; i++) {
                this.keys[i] = false;
            }
        },
        clearMouseButton: function () {
            var i = 0;
            for (; i < this.mouseButtons.length; i++) {
                this.mouseButtons[i] = false;
            }
        },
        isKeyDown: function (keyCode) {
            return this.keys[keyCode];
        },
        isMouseLeftButtonDown: function () {
            return this.mouseButtons[0];
        },
        isMouseMiddleButtonDown: function () {
            return this.mouseButtons[1];
        },
        isMouseRightButtonDown: function () {
            return this.mouseButtons[2];
        }
    };
    return input;
});


Simulation.MOUSEBUTTON = {
    left: 0,
    middle: 1,
    right: 2
};