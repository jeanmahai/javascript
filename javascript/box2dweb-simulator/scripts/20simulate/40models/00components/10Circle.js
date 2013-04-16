/// <reference path="../../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="00ComponentBase.js" />
/// <reference path="../../00simulation.js" />
/// <reference path="../../20simulation-utility.js" />


Simulation.Components.Circle = function () {
    Simulation.Components.ComponentBase.apply(this, arguments);
    var img = null;
    var images = arguments[0] || null;
    if (images instanceof Simulation.ImageSource) {
        img = images.image;
    }
    if (images instanceof Array && images.length > 0) {
        img = images[0].image;
    }
    var radius = Simulation.getBox2dValue(img.width / 2);
    this.fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
};

Simulation.Components.Circle.prototype = new Simulation.Components.ComponentBase();
/*
Simulation.Components.Circle.prototype.setRadius = function (r) {
    r = Simulation.getBox2dValue(r);
    this.fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(r);
};
*/