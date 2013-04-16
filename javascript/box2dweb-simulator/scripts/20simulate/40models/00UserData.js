/// <reference path="../simulation.js" />
/// <reference path="../enum/repetition.js" />
/// <reference path="../enum/user-data-type.js" />
/// <reference path="../../00javascript-extend/javascript-extend-all.js" />

/*

1.切片动画类
图片数组
合成图片
2.非切片动画类
单个图片
图片数据
合成图片

图片的绘制方式:[平铺][保持原样][拉伸]

每种类型的UserData都使用继承实现
*/
Simulation.UserData = function () {
    var images = arguments[0] || new Simulation.ImageSource("__null__",new Image());
    this.Image = [];
    if (images instanceof Array) {
        this.Image = images;
    }
    else {
        this.Image.push(images);
    }
    //设置图片的平铺模式,枚举值[Simulation.repetition]
    this.repetition = Simulation.repetition.norepeat;
    //类型
    this.type = Simulation.enumUserDataType.body;
};
Simulation.UserData.prototype = {
};
