/// <reference path="40models/00Region.js" />


function Simulation() {
    partial.call(this, Simulation);

    //world很大,不需要关注world的大小
    //this.width = 800;
    //this.height = 600;
    this.camera = null;
    //#region debug
    this.viewCount = 0;
    //#endregion
}

Simulation.prototype = {
    setCamera: function (camera) {
        this.camera = camera;
        this.camera.body = this.create(camera);
        /*
        this.camera.setMoveRegion(new Simulation.Region(camera.getWidth()/2,
            this.width- camera.getWidth()/2,
            camera.getHeight()/2,
            this.height-camera.getHeight()/2));
            */
    }
};






