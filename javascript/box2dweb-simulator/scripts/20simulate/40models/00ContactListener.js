/// <reference path="../00simulation.js" />
/// <reference path="../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="../30enum/00user-data-type.js" />

Simulation.ContactListener = function () {
    Box2D.Dynamics.b2ContactListener.call(this);
};
Simulation.ContactListener.prototype = new Box2D.Dynamics.b2ContactListener();
Simulation.ContactListener.prototype.BeginContact = function (contact) {
    var fixa = contact.GetFixtureA();
    var fixb = contact.GetFixtureB();
    var ua = fixa.GetBody().GetUserData();
    var ub = fixb.GetBody().GetUserData();
    var type = ua.type | ub.type;
    //if (type & Simulation.enumUserDataType.camera) {
        //Simulation.ContactListener.getNotCamera(ua, ub).isRender = true;
        //console.info("camera");
    //}
};
/*
Simulation.ContactListener.getNotCamera = function (ua, ub) {
    if (ua.type & Simulation.enumUserDataType.camera) {
        return ub;
    }
    return ua;
};
*/