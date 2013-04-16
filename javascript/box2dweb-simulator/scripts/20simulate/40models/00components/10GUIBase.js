/// <reference path="../../00simulation.js" />
/// <reference path="../../20simulation-utility.js" />
/// <reference path="../../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="../../../00javascript-extend/javascript-extend-all.js" />
/// <reference path="../../30enum/00user-data-type.js" />
/// <reference path="../UserData.js" />
/// <reference path="00ComponentBase.js" />
/// <reference path="../../30enum/00user-data-type.js" />
/// <reference path="../10GUIUserData.js" />

//GUI 使用自定义的userData.render,便于控制按需更新和局部刷新
Simulation.Components.GUIBase = function () {
    Simulation.Components.ComponentBase.apply(this, arguments);
    //this.bodyDef.type = Simulation.enumBodyType.static;

    var images = arguments[0] || null;
    var userData;
    if (images) {
        userData = new Simulation.GUIUserData(images);
    }
    else {
        userData = new Simulation.GUIUserData([]);
    }
    this.bodyDef.userData = userData;

    //this.bodyDef.userData.type = Simulation.enumUserDataType.gui;
    //this.position = new Box2D.Common.Math.b2Vec2(0, 0);
    //this.width = 0;
    //this.height = 0;
};
Simulation.Components.GUIBase.prototype = new Simulation.Components.ComponentBase();
