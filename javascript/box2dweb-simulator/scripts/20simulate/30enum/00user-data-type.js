/// <reference path="../simulation.js" />
/*
user data's type 用于区分自定义类型
相同的type发生碰撞
*/
Simulation.enumUserDataType = {
    //default value
    body: 0x1,
    //不和任何body发生碰撞,并且不需要绘制
    camera: 0x10,
    //gui不和任何body发生碰撞,需要在canvas3中进行绘制
    gui: 0x100
};