/// <reference path="../../scripts/Box2dWeb-2.1.a.3.js" />
/// <reference path="../simulation.js" />
Simulation.Collide = function () {
    Box2D.Dynamics.b2ContactListener.call(this);
    this.beginCollide = null;
};
Simulation.Collide.prototype = new Box2D.Dynamics.b2ContactListener();
Simulation.Collide.prototype.BeginContact = function (contact) {
    var bodya = contact.GetFixtureA().GetBody();
    var bodyb = contact.GetFixtureB().GetBody();
    if (this.beginCollide) {
        this.beginCollide(bodya, bodyb);
    }
};