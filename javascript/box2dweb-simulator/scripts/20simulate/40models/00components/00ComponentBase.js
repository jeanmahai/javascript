/// <reference path="../../../10libs/box2dweb/Box2dWeb-2.1.a.3.js" />
/// <reference path="../../00simulation.js" />
/// <reference path="../../20simulation-utility.js" />
/// <reference path="../../30enum/enumBodyType.js" />
/// <reference path="../00UserData.js" />
/// <reference path="../../30enum/00repetition.js" />

Simulation.Components = {};
//images
//bodydef config
//fixdef config
//userData config
Simulation.Components.ComponentBase = function () {
    this.bodyDef = new Box2D.Dynamics.b2BodyDef();
    this.bodyDef.type = Simulation.enumBodyType.static;
    this.fixDef = new Box2D.Dynamics.b2FixtureDef();
    this.fixDef.density = 1.0;
    this.fixDef.friction = 0.5;
    this.fixDef.restitution = 0.2;

    var images = arguments[0] || null;
    var userData;
    if (images) {
        userData = new Simulation.UserData(images);
    }
    else {
        userData = new Simulation.UserData([]);
    }
    this.bodyDef.userData = userData;

    this.bodyDef.userData.repetition = Simulation.repetition.norepeat;

    var bodydefConfig = arguments[1] || null;
    if (bodydefConfig) {
        for (var i in bodydefConfig) {
            if ("position" === i) {
                this.setPosition(bodydefConfig[i].x, bodydefConfig[i].y);
                continue;
            }
            /*
            if ("repetition" === i) {
                this.bodyDef.userData.repetition = bodydefConfig[i];
                continue;
            }
            */
            this.bodyDef[i] = bodydefConfig[i];
        }
    }

    var fixdefConfig = arguments[2] || null;
    if (fixdefConfig) {
        for (var j in fixdefConfig) {
            this.fixDef[j] = fixdefConfig[j];
        }
    }

    var userDataConfig = arguments[3] || null;
    if (userDataConfig) {
        for (var k in userDataConfig) {
            this.bodyDef.userData[k] = userDataConfig[k];
        }
    }
};

Simulation.Components.ComponentBase.prototype = {
    setUserData: function (userData) {
        this.bodyDef.userData = userData;
    },
    //Simulation.repetition
    setRepeat: function (repeat) {
        this.bodyDef.userData.repetition = repeat;
    },
    //set BodyDef's position
    setPosition: function (x, y) {
        x = Simulation.getBox2dValue(x);
        y = Simulation.getBox2dValue(y);
        this.bodyDef.position.Set(x, y);
    },
    //Simulation.enumBodyType
    setType: function (type) {
        this.bodyDef.type = type;
    }
};