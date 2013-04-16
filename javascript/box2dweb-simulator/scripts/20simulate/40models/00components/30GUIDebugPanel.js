/// <reference path="../../../00javascript-extend/javascript-extend-all.js" />
/// <reference path="../../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="../../00simulation.js" />
/// <reference path="../../20simulation-utility.js" />
/// <reference path="00ComponentBase.js" />
/// <reference path="10GUIBase.js" />
/// <reference path="20GUIPanel.js" />

Simulation.Components.GUIDebugPanel = function () {
    Simulation.Components.GUIPanel.apply(this, arguments);
    this.messages = [];
};
Simulation.Components.GUIDebugPanel.prototype = new Simulation.Components.GUIPanel();
Simulation.Components.GUIDebugPanel.prototype.bindMsg = function (template, datsSource) {
    
};