/*
定义simulation的静态方法

一般的计算都使用box2d中的值
即:simulation.getBox2dValue;simulation.getBox2dVec2

但是在绘制body时,需要把body的box2d值转换成canvas展示的值
即:simulation.getBox2dValue
*/

//获取box2d中的模拟值
Simulation.getBox2dValue = function (v) {
    return v / Simulation.config.drawScale;
};
//获取box2d中的模拟值,返回b2Vec2
Simulation.getBox2dVec2 = function (x, y) {
    var result = new Box2D.Common.Math.b2Vec2(Simulation.getBox2dValue(x), Simulation.getBox2dValue(y));
    return result;
};
Simulation.getBox2dVec2Arr = function (vecArr) {
    var i = 0;
    for (; i < vecArr.length; i++) {
        vecArr[i].x = Simulation.getBox2dValue(vecArr[i].x);
        vecArr[i].y = Simulation.getBox2dValue(vecArr[i].y);
    }
    return vecArr;
};
//获取canvas中的展示值
Simulation.getCanvasValue = function (v) {
    return v * Simulation.config.drawScale;
};

Simulation.newFixtureDef = function () {
    var fixdef = new Box2D.Dynamics.b2FixtureDef();
    fixdef.density = 1.0;
    fixdef.restitution = 0.2;
    fixdef.friction = 0.5;
    return fixdef;
};
Simulation.newBodyDef = function () {

    return new Box2D.Dynamics.b2BodyDef();
};

/*
获得html element的 position
@params element{HtmlElement} required
@return {object}{x:value,y:value}
*/
Simulation.getElementPosition = function (element) {
    var elem = element, tagname = "", x = 0, y = 0;
    while ((typeof (elem) == "object") && (typeof (elem.tagName) != "undefined")) {
        y += elem.offsetTop;
        x += elem.offsetLeft;
        tagname = elem.tagName.toUpperCase();
        if (tagname == "BODY")
            elem = 0;
        if (typeof (elem) == "object") {
            if (typeof (elem.offsetParent) == "object")
                elem = elem.offsetParent;
        }
    }
    return { x: x, y: y };
};
