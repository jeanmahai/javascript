
Simulation.Handler = function (fn) {
    this.id = newguid();
    this.handler = fn;
};
//只执行一次
Simulation.OneHandler = function (fn) {
    Simulation.Handler.call(this, fn);
    this.oneTime = true;
};
//执行持续时间,默认16ms,及1/60帧
Simulation.TimeHandler = function (fn, duration) {
    Simulation.Handler.call(this, fn);
    this.start = null;
    this.duration = duration || 16;
};