/// <reference path="../../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="00ComponentBase.js" />
/// <reference path="../../00simulation.js" />
/// <reference path="../../20simulation-utility.js" />

Simulation.Components.Polygon = function () {
    Simulation.Components.ComponentBase.apply(this,arguments);
    this.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
};
Simulation.Components.Polygon.prototype = new Simulation.Components.ComponentBase();
/*
Simulation.Components.Polygon.prototype.setAsBox = function (width, height) {
    this.fixDef.shape.SetAsBox(Simulation.getBox2dValue(width / 2),
        Simulation.getBox2dValue(height / 2));
};
*/
//NOT TEST
//Array<b2Vec2>
Simulation.Components.Polygon.prototype.setVertices = function (vertices) {
    vertices = Simulation.getBox2dVec2Arr(vertices);
    this.fixDef.shape.SetAsArray(vertices, vertices.length);
};
//NOT TEST
//b2Vec2
Simulation.Components.Polygon.prototype.setAsEdge = function (v1, v2) {
    v1.x = Simulation.getBox2dValue(v1.x);
    v1.y = Simulation.getBox2dValue(v1.y);
    v2.x = Simulation.getBox2dValue(v2.x);
    v2.y = Simulation.getBox2dValue(v2.y);
    this.fixDef.shape.SetAsEdge(v1, v2);
};