/// <reference path="../../js/Box2dWeb-2.1.a.3.js" />
/// <reference path="../../js/AnimationFrame.js" />

//#region short name
var b2body = Box2D.Dynamics.b2Body;
var b2bodyDef = Box2D.Dynamics.b2BodyDef;
var b2fixture = Box2D.Dynamics.b2Fixture;
var b2fixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2world = Box2D.Dynamics.b2World;
var b2vec = Box2D.Common.Math.b2Vec2;
var b2debugDraw = Box2D.Dynamics.b2DebugDraw;
var b2polygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2circle = Box2D.Collision.Shapes.b2CircleShape;
//#endregion

//#region B2Config
function B2Config(gravity,step,drawScale,velocityInteration,positionInteration,doSleep) {
    this.gravity = gravity;
    this.step = step;
    this.drawScale = drawScale;
    this.velocityInteration = velocityInteration;
    this.positionInteration = positionInteration;
    this.doSleep = doSleep;
}

B2Config.prototype = {
    setGravity: function (x, y) {
        this.gravity = new b2vec(x, y);
    }
};
//#endregion

//#region simulation
function Simulation(ctx, config) {
    //config data
    this.config = config;
    //draw context
    this.ctx = ctx;
    //world
    this.world = new b2world(config.gravity,config.doSleep);
    //debug draw
    this.debugDraw = new b2debugDraw();
    this.debugDraw.SetDrawScale(config.drawScale);
    this.debugDraw.SetSprite(ctx);
    this.debugDraw.SetFillAlpha(0.5);
    this.debugDraw.SetAlpha(0.8);
    this.debugDraw.SetFlags(b2debugDraw.e_shapeBit | b2debugDraw.e_centerOfMassBit);
    this.world.SetDebugDraw(this.debugDraw);
}

Simulation.prototype = {
    loop: function () {
        this.world.Step(this.config.step, this.config.velocityInteration, this.config.positionInteration);
        this.world.DrawDebugData();
        this.world.ClearForces();
        requestAnimationFrame(this.loop.bind(this));
    },
    createBodyDef: function (centerX, centerY, type) {
        var bodyDef = new b2bodyDef();
        bodyDef.type = type;
        bodyDef.position.Set(centerX / this.config.drawScale, centerY / this.config.drawScale);
        return bodyDef;
    },
    createBody: function (bodyDef, fixtureDef) {
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        return body;
    },
    createRect: function (width, height) {
        var shape = new b2polygonShape();
        shape.SetAsBox(width / 2 / this.config.drawScale, height / 2 / this.config.drawScale);
        return shape;
    },
    createCircle: function (radius) {
        var circle = new b2circle(radius / this.config.drawScale);
        return circle;
    }
};
//#endregion