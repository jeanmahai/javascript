if (!Array.prototype.remove) {
    /*删除,包含一个入参{function},function返回null表示需要删除,否则不删除*/
    Array.prototype.remove = function (fn) {
        if (fn) {
            for (var i = 0; i < this.length; i++) {
                if (fn(this[i]) == null) {
                    this[i] = this[this.length - 1];
                    this.pop();
                }
            }
        }
        else {
            throw "Array.prototype.remove 需要一个[function]参数";
        }
    };
}
else {
    if (console) {
        console.warn("function [Array.prototype.remove] 已经存在");
    }
}

