if(!Object.prototype.copy) {
    Object.prototype.copy = function (deep) {
        var obj = {};
        for (var i in this) {
            if (deep) {
                obj[i] = this[i];
            }
            else {
                if (typeof (this[i]) == "function") {
                    continue;
                }
                else {
                    obj[i] = this[i];
                }
            }
        }
        return obj;
    };
}