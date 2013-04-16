if (!Array.prototype.each) {
    Array.prototype.each = function (fn) {
        if (fn) {
            for (var i = 0; i < this.length; i++) {
                fn(this[i]);
            }
        }
        else {
            throw "Array.prototype.each 需要一个[function]参数";
        }
    };
}
else {
    if (console) {
        console.warn("function [Array.prototype.each] 已经存在");
    }
}

