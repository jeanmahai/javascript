/// <reference path="../../00simulation.js" />
/// <reference path="../../20simulation-utility.js" />
/// <reference path="../../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="../../../00javascript-extend/javascript-extend-all.js" />
/// <reference path="00ComponentBase.js" />
/// <reference path="10Polygon.js" />

Simulation.Components.Rectangle = function () {
    Simulation.Components.Polygon.apply(this, arguments);

    var bodydefconfig = arguments[1] || null;
    if (bodydefconfig) {
        for (var i in bodydefconfig) {
            if ("size" === i) {
                this.setAsBox(bodydefconfig[i].width, bodydefconfig[i].height);
                break;
            }
        }
    }
};
Simulation.Components.Rectangle.prototype = new Simulation.Components.Polygon();
Simulation.Components.Rectangle.prototype.setAsBox = function (width, height) {
    this.fixDef.shape.SetAsBox(Simulation.getBox2dValue(width / 2),
        Simulation.getBox2dValue(height / 2));
};
