/*
@summary
----为javascript使用命名空间
@param
----namespace{string},命名空间名称+class名称(function名称)
----cls{function},定义class或者function或者object,并将其返回
@return
----
*/
function using(namespace, cls) {
    var strs = namespace.split(".");
    var win = window;
    var i = 0;
    var n;
    var fn;
    var s = [];
    while (i < strs.length) {
        n = strs[i];
        s.push(n);
        if (!win[n]) {
            win[n] = {};
        }
        if (i == strs.length - 1) {
            fn = cls();
            if (typeof (fn) === "function") {
                win[n][fn.name] = fn;
                return;
            }
        }
        win = win[n];
        i++;
    }
}