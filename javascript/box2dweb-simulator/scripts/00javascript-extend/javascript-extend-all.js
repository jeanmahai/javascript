if (!Date.now) {
    Date.now = function () {
        return new Date();
    };
}
//ecma262 && javascript 1.8 以上支持Function.bind
//from https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNop = function () { },
            fBound = function () {
                return fToBind.apply(this instanceof fNop && oThis
                                       ? this
                                       : oThis,
                                     aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNop.prototype = this.prototype;
        fBound.prototype = new fNop();
        return fBound;
    };
}
/**
 * Created with JetBrains WebStorm.
 * User: jeanma
 * Date: 12-8-28
 * Time: 下午3:23
 * To change this template use File | Settings | File Templates.
 */

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (a, b) {
        window.setTimeout(a, 1000 / 60);
    };
})();

window.cancelRequestAnimationFrame = (function () {
    return window.cancelAnimationFrame
        || window.webkitCancelRequestAnimationFrame
        || window.mozCancelRequestAnimationFrame
        || window.oCancelRequestAnimationFrame
        || window.msCancelRequestAnimationFrame
        || clearTimeout;
})();

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

    window["newguid"] = newguid;
})();
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
/*
实现分部类定义

定义时,如果prototype(及方法)名称以(__)开头的话,将视为临时方法,及只在初始化进行执行,后续不在需要,在执行完成后会删除此方法,
目的是为了减小instance,因此在定义私有prototype(方法)时,请用(_)开头



Example:
function animal() {
    this.weight = 100;
    //必须继承于partial
    partial.call(this,animal);
}
animal.prototype = {
    displayWeight: function () {
        console.info(this.weight);
    }
};

par(animal, function () {
    function p() {
        this.name = "hello world";
    }
    p.prototype = {
        displayName: function () {
            console.info(this.name);
        }
    };
    return p;
});

 var p = new animal();
*/

function par(cls, fn) {
    if (!cls.parts) {
        cls.parts = [];
    }

    //append prototype
    fn = fn();
    var i;
    for (i in fn.prototype) {
        if (typeof (fn.prototype[i]) === "function") {
            if (cls.prototype[i] != null && console) {
                console.warn("prototype(" + i + "):已经存在");
            }
            else {
                cls.prototype[i] = fn.prototype[i];
            }
        }
    }

    //append property
    cls.parts.push(fn);
}

function partial(cls) {
    var i;
    for (i = 0; i < cls.parts.length; i++) {
        cls.parts[i].call(this);
    }

    //optimize
    var reg = /^__[0-9a-zA-Z]+$/;
    var j;
    for(j in cls.prototype) {
        if (reg.test(j)) {
            delete cls.prototype[j];
        }
    }
}
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
if (!Object.prototype.extend) {
    Object.prototype.extend = function (obj) {
        for (var i in obj) {
            this[i] = obj[i];
        }
    };
}
if(!String.format) {
    String.format = function (str, params) {
        var i;
        var result=str;
        for (i = 1; i < arguments.length; i++) {
            result = result.replace(new RegExp("\\{"+(i-1)+"\\}", "g"), arguments[i]); 
        }
        return result;
    };
}
