
Simulation.GUIUserData = function () {
    Simulation.UserData.apply(this, arguments);
    this.type = Simulation.enumUserDataType.gui;
    this.width = 0;
    this.height = 0;
    this.hw = 0;
    this.hh = 0;
};
Simulation.GUIUserData.prototype = new Simulation.UserData();
/*
Simulation.GUIUserData.prototype.render = function(ctx) {
};
*/