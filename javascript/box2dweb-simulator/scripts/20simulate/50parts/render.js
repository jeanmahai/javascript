/// <reference path="../00simulation.js" />
/// <reference path="../20simulation-utility.js" />
/// <reference path="../30enum/00user-data-type.js" />
/// <reference path="../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />

/*
TODO 绘制优化
只绘制在camera中的body.
实现方法:为camera添加包围盒,即把camera绑定在body上,body上shape的大小和camera的大小相同,
为UserData添加属性isRender,true绘制,false不进行绘制;
当其他body和camera发生碰撞时,不发生碰撞反应,但是设置和camera碰撞的body的UserData.isRender=true,
在绘制完成之后重置isRender=false;
TODO
绘制图片不使用drawImage,使用createPattern,然后使用fillrect,进行贴图
*/
par(Simulation, function () {
    var fn = function () {
    };
    fn.prototype = {
        //update:当camera lookAt某个body时,并且已满足跟随策略,camera将进行重新计算位置.
        _render: function () {
            this._clearCanvas2();
            //this._clearCanvas3();
            var b = this.world.GetBodyList();
            while (b != null) {
                if (this.camera.isRender(b)) {
                    this._draw(b);
                }
                b = b.GetNext();
            }
        },
        //根据camera的位置计算出body的偏移位置,确保能正确的绘制camera中body
        _getPosInCamera: function (body) {
            var bodyPos = body.GetPosition();
            var camerab2Offset = this.camera.getb2Offset();
            return {
                x: bodyPos.x - camerab2Offset.x,
                y: bodyPos.y - camerab2Offset.y
            };
        },
        _draw: function (body) {

            var ud = body.GetUserData();
            if (ud) {
                //#region DEBUG DRAW GUI
                if (ud.type & Simulation.enumUserDataType.gui) {
                    this._defaultDrawGUI(body);
                    return;
                }
                //#endregion
                this._drawUserData(body);
            }
            else {
                //默认方式,不包含UserData,只绘制shape的线框
                this._defaultDraw(body);
            }

        },
        _defaultDrawGUI: function (body) {
            //以camera的position做为坐标原点
            var bodyPos = body.GetPosition();
            var px = Simulation.getCanvasValue(bodyPos.x);
            var py = Simulation.getCanvasValue(bodyPos.y);
            var userData = body.GetUserData();
            var left = px - userData.hw;
            var top = py - userData.hh;
            var a = body.GetAngle();
            var fixture = body.GetFixtureList();
            var shape;
            while (fixture) {
                shape = fixture.GetShape();
                //TODO clear shape
                this.ctx3.clearRect(left, top, userData.width, userData.height);
                this._drawShape(this.ctx3, shape, px, py, a);
                fixture = fixture.GetNext();
            }
        },
        _drawUserData: function (body) {
            var fixture = body.GetFixtureList();
            while (fixture) {
                this._drawb2Shape(fixture.GetShape(), body);
                fixture = fixture.GetNext();
            }
        },
        _drawb2Shape: function (shape, body) {
            if (shape instanceof Box2D.Collision.Shapes.b2PolygonShape) {
                this._drawb2PolygonShape(shape, body);
            }
            if (shape instanceof Box2D.Collision.Shapes.b2CircleShape) {
                this._drawb2CircleShape(shape, body);
            }
        },
        _drawb2CircleShape: function (shape, body) {
            var radius = Simulation.getCanvasValue(shape.GetRadius());
            var p = this._getPosInCamera(body);
            var px = Simulation.getCanvasValue(p.x);
            var py = Simulation.getCanvasValue(p.y);
            var angle = body.GetAngle();

            var ud = body.GetUserData();
            var pattern = this.ctx2.createPattern(ud.Image[0].image, ud.repetition);

            this.ctx2.save();
            this.ctx2.translate(px, py);
            this.ctx2.rotate(angle);
            this.ctx2.arc(0, 0, radius, 0, Math.PI * 2);
            this.ctx2.translate(-radius, -radius);
            this.ctx2.fillStyle = pattern;
            this.ctx2.fill();
            this.ctx2.restore();
        },
        _drawb2PolygonShape: function (shape, body) {
            var p = this._getPosInCamera(body);
            var px = Simulation.getCanvasValue(p.x);
            var py = Simulation.getCanvasValue(p.y);
            var angle = body.GetAngle();
            var vertices = shape.GetVertices();

            var i = 0;
            var ud = body.GetUserData();
            var pattern = this.ctx2.createPattern(ud.Image[0].image, ud.repetition);

            this.ctx2.save();
            this.ctx2.translate(px, py);
            this.ctx2.rotate(angle);
            this.ctx2.beginPath();
            for (; i < vertices.length; i++) {
                if (0 === i) {
                    this.ctx2.moveTo(Simulation.getCanvasValue(vertices[i].x), Simulation.getCanvasValue(vertices[i].y));
                    continue;
                }
                this.ctx2.lineTo(Simulation.getCanvasValue(vertices[i].x), Simulation.getCanvasValue(vertices[i].y));
            }
            this.ctx2.closePath();
            this.ctx2.fillStyle = pattern;
            this.ctx2.fill();
            this.ctx2.restore();

        },



        _defaultDraw: function (body) {
            //绘制body的shape
            var p = this._getPosInCamera(body);
            var px = Simulation.getCanvasValue(p.x);
            var py = Simulation.getCanvasValue(p.y);
            var a = body.GetAngle();
            var fixture = body.GetFixtureList();
            var shape;
            while (fixture) {
                shape = fixture.GetShape();
                this._drawShape(this.ctx2, shape, px, py, a);
                fixture = fixture.GetNext();
            }
        },
        _drawShape: function (ctx, shape, x, y, a) {
            var c = ctx;
            c.save();
            c.translate(x, y);
            if (shape instanceof Box2D.Collision.Shapes.b2PolygonShape) {
                var vertices = shape.GetVertices();
                var i;
                c.beginPath();
                for (i = 0; i < vertices.length; i++) {
                    if (0 === i) {
                        c.moveTo(Simulation.getCanvasValue(vertices[i].x), Simulation.getCanvasValue(vertices[i].y));
                        continue;
                    }
                    c.lineTo(Simulation.getCanvasValue(vertices[i].x), Simulation.getCanvasValue(vertices[i].y));
                }
                c.closePath();
            }
            if (shape instanceof Box2D.Collision.Shapes.b2CircleShape) {
                var r = shape.GetRadius();
                r = Simulation.getCanvasValue(r);
                c.beginPath();
                c.arc(0, 0, r, 0, Math.PI * 2);
                c.closePath();
            }

            c.globalAlpha = 0.5;
            c.fillStyle = "green";
            c.fill();
            c.globalAlpha = 0.8;
            c.strokeStyle = "green";
            c.stroke();
            c.rotate(a);
            c.restore();
        },
        _clearCanvas2: function () {
            this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
        },
        _clearCanvas3: function () {
            this.ctx3.clearRect(0, 0, this.canvas3.width, this.canvas3.height);
        }
    };
    return fn;
});