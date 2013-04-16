/// <reference path="../../../00javascript-extend/javascript-extend-all.js" />
/// <reference path="../../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="../../00simulation.js" />
/// <reference path="../../20simulation-utility.js" />
/// <reference path="00ComponentBase.js" />
/// <reference path="10GUIBase.js" />
/// <reference path="../../30enum/00enum-body-type.js" />

Simulation.Components.GUIMessage = function () {
    Simulation.Components.GUIBase.apply(this, arguments);
    this.setSize(100, 100);
    this.bodyDef.userData.width = 100;
    this.bodyDef.userData.height = 100;
    this.bodyDef.userData.hw = 50;
    this.bodyDef.userData.hh = 50;
    //this.bodyDef.type = Simulation.enumBodyType.static;
    this.setPosition(50, 50);
    //#region message user data
    var images = arguments[0] || null;
    var userData;
    if (images) {
        userData = new Simulation.GUIUserDataMessage(images);
    }
    else {
        userData = new Simulation.GUIUserDataMessage([]);
    }
    this.bodyDef.userData = userData;
    //#endregion
    
};
Simulation.Components.GUIMessage.prototype = new Simulation.Components.GUIBase();
Simulation.Components.GUIMessage.prototype.bind = function (temp, dataSource) {
    this.bodyDef.userData.template = temp;
    this.bodyDef.userData.dataSource = dataSource;
};
Simulation.Components.GUIMessage.prototype.isChanged = function () {
    this.bodyDef.userData.data = eval(this.bodyDef.userData.dataSource);
    if (this.bodyDef.userData.data === this.bodyDef.userData.oldData) return false;
    this.bodyDef.userData.oldData = this.bodyDef.userData.data;
    return true;
};
Simulation.Components.GUIMessage.prototype.setSize = function (width, height) {
    this.bodyDef.userData.width = width;
    this.bodyDef.userData.height = height;
    this.bodyDef.userData.hw = width / 2;
    this.bodyDef.userData.hh = height / 2;
    this.fixDef.shape.SetAsBox(Simulation.getBox2dValue(width / 2),
        Simulation.getBox2dValue(height / 2));
};