/// <reference path="../00simulation.js" />
/// <reference path="../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="../30enum/00user-data-type.js" />


Simulation.ContactFilter = function () {
    Box2D.Dynamics.b2ContactFilter.call(this);
};

Simulation.ContactFilter.prototype = new Box2D.Dynamics.b2ContactFilter();
Simulation.ContactFilter.prototype.ShouldCollide = function (fa, fb) {
    var uda = fa.GetBody().GetUserData();
    var udb = fb.GetBody().GetUserData();
    var type = uda.type | udb.type;
    //camera不参与碰撞
    if (type & Simulation.enumUserDataType.camera) {
        return false;
    }
    //gui 不参与碰撞
    if (type & Simulation.enumUserDataType.gui) {
        return false;
    }
    return true;
};
/*
Simulation.ContactFilter.getNotCamera = function (uda, udb) {
    if (uda.type & Simulation.enumUserDataType.camera) {
        return udb;
    }
    return uda;
}; 
*/