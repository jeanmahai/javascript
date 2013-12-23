/// <reference path="../../libs/jq/jquery-1.9.1.min.js" />
$.fn.extend({
    formatData: function () {
        var data = {};
        var val;
        $(this).find("[name]").each(function () {
            var self = $(this);
            if (self.is("select")) {
                val = self.find("option:selected").val();
            }
            else {
                val = self.val();
            }
            data[self.attr("name")] = val;
        });
        return data;
    },
    request: function (cfg) {
        if (!$(this).is("form")) return;
        var self = $(this);
        var params = {
            dataType: "JSON"
        };
        $.extend(params, cfg);
        params.type = self.attr("method");
        params.url = self.attr("action");
        params.data = self.formatData();
        $.ajax(params);
    }
});