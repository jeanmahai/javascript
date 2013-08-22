/// <reference path="../jq/jquery-1.9.1.min.js" />
/*
demo

$(selector).jpop();
//执行方法
$(selector).jpop("open");
$(selector).jpop("close");
//设置属性
$(selector).jpop("ops",prop name,value);
//读取属性
$(selector).jpop("ops",prop name);
*/
(function () {
    function jpop(dom, ops) {
        if (!dom) return;
        var win = $(window);
        dom.css({
            position: "fixed",
            top: (win.height() - dom.outerHeight()) / 2,
            left: (win.width() - dom.outerWidth()) / 2,
            zIndex: 99999,
            display: "none"
        });
        this.dom = dom;
        var me = this;
        this.ops = {
            mask: true,
            animation: "",
            onHiding: $.noop,
            onShowing: $.noop,
            domClose: dom.find("[data-role=close]")
        };
        $.extend(me.ops, ops);
        if (me.ops.domClose) {
            me.ops.domClose.bind("click", function () {
                me.hide();
            });
        }
        me.overlay = $("<div></div>").css({
            backgroundColor: "gray",
            position: "fixed",
            top: 0,
            left: 0,
            opacity: 0.8,
            width: win.width(),
            height: win.height(),
            display: "none",
            zIndex: 99990
        }).appendTo(document.body);
    }

    jpop.prototype = {
        show: function (callback) {
            var me = this;
            var ops = me.ops;
            if (ops.onShowing) {
                ops.onShowing();
            }
            if (ops.mask) {
                me.overlay.show();
            }
            me.dom.show();

            if (callback) {
                callback();
            }
        },
        hide: function (callback) {
            var me = this;
            var ops = me.ops;
            if (ops.onHiding) {
                ops.onHiding();
            }
            if (ops.mask) {
                me.overlay.hide();
            }
            me.dom.hide();
            if (callback) {
                callback();
            }
        }
    };

    window["jpop"] = jpop;
})();

