
/*
box2d的相关设置参见box2d API
*/
par(Simulation, function () {
    var fn = function () {
        this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10), true);
        this.setContactFilter(new Simulation.ContactFilter());
    };
    fn.prototype = {
        createBody: function (bodydef, fixdef) {
            var b = this.world.CreateBody(bodydef);
            b.CreateFixture(fixdef);
            return b;
        },
        create: function (component) {
            var body = this.world.CreateBody(component.bodyDef);
            body.CreateFixture(component.fixDef);
            return body;
        },
        setContactFilter: function (filter) {
            this.world.SetContactFilter(filter);
        },
        setContactListener: function (listener) {
            this.world.SetContactListener(listener);
        },
        /*
        根据x,y获得body,如果没有找到则返回null
        @params x{float} canvas中x坐标的值
        @params y{float} canvas中y坐标的值
        @return body||null
        */
        getBody: function (x, y) {
            //TODO
        }
    };
    return fn;
});