if (!Object.prototype.equal) {
    Object.prototype.equal = function (obj) {
        var me = this;

        if (typeof (me) != typeof (obj)) {
            return false;
        }

        for (var i in me) {
            if (typeof (i) === "object") {
                if (me[i].equal(obj[i]) == false) {
                    return false;
                }
            }
            else {
                if (me[i] != obj[i]) {
                    return false;
                }
            }
        }
        return true;
    };
}