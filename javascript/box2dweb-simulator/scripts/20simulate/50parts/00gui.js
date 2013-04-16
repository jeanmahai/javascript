/// <reference path="../../00javascript-extend/javascript-extend-all.js" />
/// <reference path="../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="../00simulation.js" />
/// <reference path="../20simulation-utility.js" />

par(Simulation, function () {
    var fn = function () {
        //this.guis = [];
    };
    fn.prototype = {
        createGUI: function (gui) {
            //this.guis.push(gui);
            var canvasPos = this.getCanvasPos();
            var x = canvasPos.x + gui.position.x;
            var y = canvasPos.y + gui.position.y;
            gui.element.css({ top: y, left: x });
            $(document.body).append(gui.element);
        }
    };
    return fn;
});