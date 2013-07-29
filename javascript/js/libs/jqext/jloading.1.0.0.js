(function () {

    if (!$.loadingConfig) {
        /*
        url;
        */
        $.loadingConfig = function (cfg) {
            $.data("__loding__config__", cfg);
        };
    }

    $.fn.extend({
        loading: function () {
            var cfg = $.data("__loading__config__");
            if (!cfg) cfg = { };

            var dom_conver = $("<div></div>");
            dom_conver.css({
                width: $(window).width(),
                height: $(window).height(),
                position: "fixed",
                top: 0,
                left: 0,
                opacity: 0.5,
                backgroundColor: "white"
            });
            dom_conver.appendTo(document.body);

            var dom_loading = $("<div></div>");
            dom_loading.css({
                position: "fixed",
                background:"url("+cfg.url||""+")"
            });

            $(this).data("__loading__", { d1: dom_conver, d2: dom_loading });
        },
        loaded: function () {
            var obj = $(this).data("__loading__");
            if (obj) {
                if (obj.d1) obj.d1.remove();
                if (obj.d2) obj.d2.remove();
            }
        }
    });
})();
