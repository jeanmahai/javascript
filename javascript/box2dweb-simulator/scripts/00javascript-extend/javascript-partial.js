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