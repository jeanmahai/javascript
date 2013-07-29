(function () {

    if (!$.loadingConfig) {
        /*
        url;
        */
        $.loadingConfig = function (cfg) {
            $(window).data("__loading__config__", cfg);
        };
    }

    $.fn.extend({
        loading: function () {
            var cfg = $(window).data("__loading__config__");
            if (!cfg) cfg = {};

            var obj = $(this).data("__loading__");
            if (obj) return;

            var ww = $(window).width();
            var wh = $(window).height();

            var dom_conver = $("<div></div>");
            dom_conver.css({
                width: ww,
                height: wh,
                position: "fixed",
                top: 0,
                left: 0,
                opacity: 0.8,
                backgroundColor: "white",
                zIndex: 99999
            });
            dom_conver.appendTo(document.body);

            var dom_loading = $("<div>loading</div>");
            dom_loading.css({
                position: "fixed",
                zIndex: 100000,
                backgroundColor: "blue"
            });
            dom_loading.appendTo(document.body);
            var lw = dom_loading.outerWidth();
            var lh = dom_loading.outerHeight();
            dom_loading.css({
                top: wh / 2 - lh / 2 - lh / 2,
                left: ww / 2 - lw / 2 - lw / 2
            });

            $(this).data("__loading__", { d1: dom_conver, d2: dom_loading });
        },
        loaded: function () {
            var obj = $(this).data("__loading__");
            if (obj) {
                if (obj.d1) obj.d1.remove();
                if (obj.d2) obj.d2.remove();
            }
            $(this).removeData("__loading__");
        }
    });
})();
