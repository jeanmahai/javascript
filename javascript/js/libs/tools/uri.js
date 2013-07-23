function uri(url) {
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

uri.prototype = {
    get: function (key) {
        for (var i = 0; i < this.params.length; i++) {
            if (this.params[i].key === key) {
                return this.params[i].value;
            }
        }
        return null;
    },
    set: function (key, value) {
        for (var i = 0; i < this.params.length; i++) {
            if (this.params[i].key === key) {
                this.params[i].value = value;
            }
        }
    }
};