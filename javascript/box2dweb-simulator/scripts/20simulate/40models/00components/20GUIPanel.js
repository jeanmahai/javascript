/// <reference path="../../../00javascript-extend/javascript-extend-all.js" />
/// <reference path="../../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />

/// <reference path="../../00simulation.js" />
/// <reference path="../../20simulation-utility.js" />
/// <reference path="00ComponentBase.js" />
/// <reference path="10GUIBase.js" />
/// <reference path="../../30enum/00enum-body-type.js" />

Simulation.Components.GUIPanel = function () {
    Simulation.Components.GUIBase.apply(this, arguments);

    this.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    this.setSize(100, 100);
    this.bodyDef.userData.width = 100;
    this.bodyDef.userData.height = 100;
    this.bodyDef.userData.hw = 50;
    this.bodyDef.userData.hh = 50;
    this.bodyDef.type = Simulation.enumBodyType.static;
    this.setPosition(50, 50);
};
Simulation.Components.GUIPanel.prototype = new Simulation.Components.GUIBase();
Simulation.Components.GUIPanel.prototype.setSize = function (width, height) {
    this.bodyDef.userData.width = width;
    this.bodyDef.userData.height = height;
    this.bodyDef.userData.hw = width / 2;
    this.bodyDef.userData.hh = height / 2;
    this.fixDef.shape.SetAsBox(Simulation.getBox2dValue(width / 2),
        Simulation.getBox2dValue(height / 2));
};
