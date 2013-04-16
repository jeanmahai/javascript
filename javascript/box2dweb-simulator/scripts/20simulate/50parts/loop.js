/// <reference path="../simulation.js" />
/// <reference path="../javascript-partial.js" />
/// <reference path="animate.js" />
/// <reference path="event.js" />
/// <reference path="box2dweb.js" />
/// <reference path="../simulation.config.js" />

par(Simulation, function () {
    var fn = function () {
    };
    fn.prototype = {
        _update: function () {
            var me = this;
            //#region 处理自定义handler
            var handler;
            var i = 0;
            for (; i < me.handlers.length; i++) {
                handler = me.handlers[i];
                if (handler) {
                    handler.handler();
                }
                if (handler instanceof Simulation.OneHandler) {
                    me.handlers[i] = null;
                }
                if (handler instanceof Simulation.TimeHandler) {
                    if (!handler.start) {
                        handler.start = Date.now();
                    }
                    if ((Date.now() - handler.start) > handler.duration) {
                        me.handlers[i] = null;
                    }
                }
            }
            //#endregion
            me.world.Step(Simulation.config.FPS, Simulation.config.velocityInterations, Simulation.config.positionInterations);
            //重新计算camera的位置
            this.camera.update();
            me._render();
            //#region debug
            this.viewCount = this.camera.getViewCount();
            //#endregion
            this.camera.reset();
            me.world.ClearForces();
            me._animate(me._update.bind(me));
        },
        start: function () {
            this._update();
        },
        stop: function () {
            this._cancelAnimate();
        }
    };

    return fn;
});