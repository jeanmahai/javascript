if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
}
else {
    if(console) {
        console.warn("function [String.prototy.trim] 已经存在");
    }
}