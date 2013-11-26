/// <reference path="window.cancelRequestAnimationFrame.js" />
/// <reference path="window.requestAnimationFrame.js" />


function PhotoPlayer() {
    this.downloadedImages = [];
    this.imagesUrl = [];
    //this.cacheCount = 5;
    this.minCount = 5;
    this.canvas = null;
    this.ctx = null;
    this.startTime = Date.now();
    this.duration = 1000;//1s
}

PhotoPlayer.prototype = {
    setImagesUrl: function (urls) {
        this.imagesUrl = urls.split(",");
    },
    setCacheCount: function (count) {
        this.cacheCount = count;
    },
    setCanvas: function (c) {
        this.canvas = c;
        this.ctx = this.canvas.getContext("2d");
    },
    downloadImage: function () {
        var me = this;
        if (me.imagesUrl.length <= 0) return;
        var img = new Image();
        img.onload = function () {
            me.downloadedImages.push(this);
            me.downloadImage();
        };
        img.onerror = function () {
        };
        img.src = me.imagesUrl.shift();
    },
    drawCache: function (image) {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        return canvas;
    }
};