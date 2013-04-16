if (!Object.prototype.extend) {
    Object.prototype.extend = function (obj) {
        for (var i in obj) {
            this[i] = obj[i];
        }
    };
}