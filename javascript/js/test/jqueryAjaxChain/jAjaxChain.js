/// <reference path="../../libs/jq/jquery-1.9.1.min.js" />

(function () {
    function ajaxChain() {
        this.ajaxs = [];
        this._complete = true;
        this._timer = null;
        this.duration = 100;
        this._nextops = null;
        this._index = 0;
    }

    ajaxChain.prototype = {
        add: function (fn) {
            this.ajaxs.push(fn);
        },
        createNext: function (res) {
            var me = this;
            var next = me.ajaxs[me._index];
            me._index += 1;
            if (next) {
                var ops = next(res);
                var oldsuc = ops.success;
                if (!oldsuc)
                    oldsuc = function () {
                    };
                var newsuc = function (_res) {
                    me.createNext(_res);
                };

                ops.success = function (__res) {
                    me._nextops = null;
                    oldsuc(__res);
                    newsuc(__res);
                };
                var oldcom = ops.complete;
                if (!oldcom)
                    oldcom = function () {
                    };
                var newcom = function () {
                    me._complete = true;
                };
                ops.complete = function () {
                    oldcom();
                    newcom();
                };
                me._nextops = ops;
            }
            else {
                me.clear();
            }
        },
        clear: function () {
            if (this._timer) {
                clearInterval(this._timer);
                this._timer = null;
            }
            this._complete = true;
            this._nextops = null;
            this._index = 0;
        },
        run: function () {
            var me = this;
            me._timer = setInterval(function () {
                if (me._complete === true) {
                    me._complete = false;
                    if (!me._nextops) {
                        me.createNext(null);
                    }
                    $.ajax(me._nextops);
                }
            }, me.duration);
        }
    };

    $.ajaxChain = function () { return new ajaxChain(); };
})();