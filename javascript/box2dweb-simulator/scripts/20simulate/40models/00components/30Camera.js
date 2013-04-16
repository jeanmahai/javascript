/// <reference path="../../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="00ComponentBase.js" />
/// <reference path="../../00simulation.js" />
/// <reference path="../../20simulation-utility.js" />
/// <reference path="10Polygon.js" />
/// <reference path="../UserData.js" />
/// <reference path="../../30enum/00user-data-type.js" />
/// <reference path="../00ImageSource.js" />
/// <reference path="../00Region.js" />

//camera 的大小和canvas的大小一样
//region{Simulation.Region}
Simulation.Components.Camera = function (width, height) {
    Simulation.Components.Rectangle.apply(this, arguments);
    this._width = width;
    this._height = height;
    //camera 中的可视数量
    this._viewCount = 0;
    //冗余数据,半宽/半高
    this._halfwidth = width / 2;
    this._halfheight = height / 2;
    this._lookatBody = null;
    this._followRegion = new Simulation.Region(0, 0, 0, 0);
    this.setFollowRegion(1 / 6, 1 / 6, 1 / 6, 1 / 6);
    this.body = null;


    this.setAsBox(width, height);
    this.setPosition(width / 2, height / 2);
    //camera第一次的位置,用于计算camera移动之后的偏移量
    this._originalb2Position = new Box2D.Common.Math.b2Vec2(Simulation.getBox2dValue(width / 2),
                                                                                                                    Simulation.getBox2dValue(height / 2)); //this.getb2Position();
    //user data
    var userData = new Simulation.UserData(new Simulation.ImageSource("__camera__", new Image())); //{id:"__camera__",image:new Image()}
    userData.type = Simulation.enumUserDataType.camera;
    this.setUserData(userData);

    this.fixedY = false;
    this.fixedX = false;
};
Simulation.Components.Camera.prototype = new Simulation.Components.Rectangle();
Simulation.Components.Camera.prototype.setFixedX = function (value) {
    this.fixedX = value;
};
Simulation.Components.Camera.prototype.setFixedY = function (value) {
    this.fixedY = value;
};
Simulation.Components.Camera.prototype.getWidth = function () {
    return this._width;
};
Simulation.Components.Camera.prototype.getHeight = function () {
    return this._height;
};
Simulation.Components.Camera.prototype.getViewCount = function () {
    return this._viewCount;
};
//region是相对于camera的中点的坐标
//左边(-),右边(+),上边(-),下边(+)
//按照百分比进行设置
Simulation.Components.Camera.prototype.setFollowRegion = function (left, right, top, bottom) {
    var region = new Simulation.Region(-this._width * left, this._width * right, -this._height * top, this._height * bottom);
    this._followRegion = region;
};
Simulation.Components.Camera.prototype.update = function () {
    if (!this._lookatBody) return;
    var camerab2Pos = this.getb2Position();
    var bodyPos = this.getCanvasPosition(this._lookatBody);
    if (!this.fixedX) {
        if (bodyPos.x < this._followRegion.minX) {
            camerab2Pos.x -= Simulation.getBox2dValue(this._followRegion.minX - bodyPos.x);
        }
        if (bodyPos.x > this._followRegion.maxX) {
            camerab2Pos.x += Simulation.getBox2dValue(bodyPos.x - this._followRegion.maxX);
        }
    }
    if (!this.fixedY) {
        if (bodyPos.y < this._followRegion.minY) {
            camerab2Pos.y -= Simulation.getBox2dValue(this._followRegion.minY - bodyPos.y);
        }
        if (bodyPos.y > this._followRegion.maxY) {
            camerab2Pos.y += Simulation.getBox2dValue(bodyPos.y - this._followRegion.maxY);
        }
    }
    this.body.SetPosition(camerab2Pos);
};
Simulation.Components.Camera.prototype.lookAt = function (body) {
    this._lookatBody = body;
};
Simulation.Components.Camera.prototype.cancelLookAt = function () {
    this._lookatBody = null;
};
Simulation.Components.Camera.prototype.getCanvasPosition = function (body) {
    var position = this.getb2Position(body);
    position.x = Simulation.getCanvasValue(position.x);
    position.y = Simulation.getCanvasValue(position.y);
    return position;
};
Simulation.Components.Camera.prototype.getb2Position = function (body) {
    if (!this.body) throw "camera's body don't found.";
    var cameraPosition = this.body.GetPosition();
    //#region 获得body在camera中的相对位置,坐标原点是以camera的中心为原点
    if (body) {
        var p = new Box2D.Common.Math.b2Vec2(0, 0);
        var bp = body.GetPosition();
        p.x = bp.x - cameraPosition.x;
        p.y = bp.y - cameraPosition.y;
        return p;
    }
    //#endregion

    //#region 获得camera在world中的位置
    return cameraPosition.Copy();
    //#endregion
};
//重置view count 为0
Simulation.Components.Camera.prototype.reset = function () {
    this._viewCount = 0;
};
//判断body是否要进行绘制,如果body和camera重叠,就绘制这个body
Simulation.Components.Camera.prototype.isRender = function (body) {
    var ud = body.GetUserData();
    if (!ud) return false;
    //如果body是camera就不绘制
    if (ud.type & Simulation.enumUserDataType.camera) {
        return false;
    }
    //判断body是否在camera中
    if (!this.isView(body)) {
        return false;
    }
    this._viewCount++;
    return true;
};
//判断body是否在camera的显示范围
Simulation.Components.Camera.prototype.isView = function (body) {
    var cameraAABB = this.body.GetFixtureList().GetAABB();
    var fixture = body.GetFixtureList();
    var aabb;
    while (fixture) {
        aabb = fixture.GetAABB();
        if (cameraAABB.Contains(aabb) || cameraAABB.TestOverlap(aabb)) {
            return true;
        }
        fixture = fixture.GetNext();
    }
    return false;
};
Simulation.Components.Camera.prototype.getb2Offset = function () {
    var result = new Box2D.Common.Math.b2Vec2(0, 0);
    var camerab2Pos = this.getb2Position();
    result.x = camerab2Pos.x - this._originalb2Position.x;
    result.y = camerab2Pos.y - this._originalb2Position.y;
    return result;
};



