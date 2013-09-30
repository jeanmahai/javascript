
$.fn.extend({
    /*
    {
    my:center/left/right/top/bottom (default:center)
    at:center/top/bottom/left/right (default:center)
    of:jquery object (default:window)
    }
    */
    jposition: function (obj) {
        if (!obj) obj = {};
        if (!obj.my) obj.my = "center";
        if (!obj.at) obj.at = "center";
        if (!obj.of) obj.of = $(window);
        if (!obj.mask) obj.mask = false;
        var me = $(this);
        var h2 = me.height() / 2;
        var w2 = me.width() / 2;
        var css = {
            position: "absolute"
        };
        //at
        if (obj.at === "center") {
            css.top = (obj.of.offset() ? obj.of.offset().top : 0) + obj.of.height() / 2;
            css.left = (obj.of.offset() ? obj.of.offset().left : 0) + obj.of.width() / 2;
        }
        //my
        if (obj.my === "center") {
            css.top -= h2;
            css.left -= w2;
        }

        me.css(css);
        return me;
    }
});