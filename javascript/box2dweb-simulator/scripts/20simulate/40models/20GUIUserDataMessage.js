
Simulation.GUIUserDataMessage = function () {
    Simulation.GUIUserData.apply(this, arguments);
    this.dataSource = "";
    this.data = null;
    this.oldData = null;
    this.template = "";
};
Simulation.GUIUserDataMessage.prototype = new Simulation.GUIUserData();
//Simulation.GUIUserDataMessage.prototype