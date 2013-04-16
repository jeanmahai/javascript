/// <reference path="../../00javascript-extend/javascript-extend-all.js" />
/// <reference path="../00simulation.js" />
/// <reference path="../20simulation-utility.js" />
/// <reference path="../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />


par(Simulation, function () {
    var sprite = function () {
        this.canvas1 = null;
        this.ctx1 = null;

        this.canvas2 = null;
        this.ctx2 = null;

        this.canvas3 = null;
        this.ctx3 = null;
    };
    sprite.prototype = {
        //分层canvas,
        //参数container>div,position:relative
        //canvas,position:absolute;z-index:1  background 按需重绘
        //canvas,position:absolute;z-index:2  Box2d 需要经常重绘
        //canvas,position:absolute;z-index:3  GUI 按需重绘
        setup: function (container) {
            container.style.position = "relative";
            var width = parseInt(container.style.width);
            var height = parseInt(container.style.height);
            this.canvas1 = this._createCanvas(width, height, 1);
            this.ctx1 = this.canvas1.getContext("2d");
            container.appendChild(this.canvas1);

            this.canvas2 = this._createCanvas(width, height, 2);
            this.ctx2 = this.canvas2.getContext("2d");
            container.appendChild(this.canvas2);

            this.canvas3 = this._createCanvas(width, height, 3);
            this.ctx3 = this.canvas3.getContext("2d");
            container.appendChild(this.canvas3);
            /*
            this.canvas2 = canvas;
            if (canvas.getContext) {
            this.ctx2 = canvas.getContext("2d");
            }
            else {
            throw "argument type error.canvas is not a available canvas";
            }
            */
        },
        getCanvasPos: function () {
            var pos = Simulation.getElementPosition(this.canvas2);
            var b2pos = new Box2D.Common.Math.b2Vec2(pos.x, pos.y);
            return b2pos;
        },
        _createCanvas: function (width, height, index) {
            var canvas = document.createElement("canvas");
            canvas.style.position = "absolute";
            canvas.style.top = "0px";
            canvas.style.left = "0px";
            canvas.style.zIndex = index;
            canvas.width = width;
            canvas.height = height;
            return canvas;
        }
    };

    return sprite;
});