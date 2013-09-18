/// <reference path="../jsext/string.format.js" />

function Url(url) {
    this.params = [];
    this.host = "";
    this.pageName = "";

    var s1 = url.split("?");
    if (s1.length >= 2) {
        this.host = s1[0];
        var s2 = s1[1].split("&");
        var s3;
        for (var i = 0; i < s2.length; i++) {
            s3 = s2[i].split("=");
            this.params.push({
                key: s3[0],
                value: s3[1]
            });
        }
    }
    else {
        this.host = s1[0];
    }
}

Url.prototype = {
    get: function (key) {
        var pas = this.params;
        var len = pas.length;
        var i;
        for (i = 0; i < len; i++) {
            if (pas[i].key === key) {
                return pas[i].value;
            }
        }
        return null;
    },
    set: function (key, value) {
        var pas = this.params;
        var len = pas.length;
        var i;
        for (i = 0; i < len; i += 1) {
            if (pas[i].key === key) {
                pas[i].value = value;
            }
        }
    },
    add: function (key, value) {
        this.params.push({ key: key, value: value });
    },
    remove: function (key) {
        var pas = this.params;
        var len = pas.length;
        var i;
        for (i = 0; i < len; i += 1) {
            if (pas[i].key === key) {
                pas[i] = pas[len - 1];
                pas.pop();
                break;
            }
        }
    },
    toString: function () {
        var strs = [];
        var me = this;
        var i;
        var pas = me.params;
        var len = pas.length;
        for (i = 0; i < len; i += 1) {
            if (pas[i]) {
                strs.push(String.format("{0}={1}", pas[i].key, pas[i].value));
            }
        }
        if (strs.length > 0) {
            return String.format("{0}?{1}", me.host, strs.join("&"));
        }
        return me.host;
    }
};