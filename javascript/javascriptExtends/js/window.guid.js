(function () {
    function g() {
        return ((Math.random() * 0x1000000000) | 0).toString(16).substr(1);
    }
    function newguid() {
        var result = [];
        var i;
        var count = 3;
        result.push(g());
        count--;
        for (i = 0; i < count; i++) {
            result.push(g());
        }
        return result.join("");
    }
    if (!window["newguid"]) {
        window["newguid"] = newguid;
    }
    else {
        if (console) {
            console.warn("function [window.newguid] 已经存在");
        }
    }
})();