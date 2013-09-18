if (!Array.prototype.remove) {
    /*
    删除,
    
    {function},function返回true表示需要删除,否则不删除
    {deep},指定是否删除之后是否继续循环,true:是,false:否
    */
    Array.prototype.remove = function (fn, deep) {
        if (fn) {
            for (var i = 0; i < this.length; i++) {
                if (fn(this[i]) == true) {
                    this[i] = this[this.length - 1];
                    this.pop();
                    if (deep && deep==false) {
                        break;
                    }
                }
            }
        }
    };
}
else {
    if (console) {
        console.warn("function [Array.prototype.remove] 已经存在");
    }
}

