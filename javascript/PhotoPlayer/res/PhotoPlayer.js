/// <reference path="window.cancelRequestAnimationFrame.js" />
/// <reference path="window.requestAnimationFrame.js" />


function PhotoPlayer() {
    this.downloadedImages = [];
    this.imagesUrl = [];
    this.cacheCount = 5;
}

PhotoPlayer.prototype = {
    setImagesUrl: function (urls) {
        this._urls = urls.split(",");
    },
    setCacheCount: function (count) {
        this.cacheCount = count;
    },
    downloadImage: function () {
        var me = this;
        if (me.downloadedImages.length < me.cacheCount) {
            var img = new Image();
            img.onload = function () {
                me.downloadedImages.push(this);
                me.downloadImg();
            };
            img.onerror = function () {
            };
            img.src = me.imagesUrl.shift();
        }
        requestAnimationFrame(me.downloadImage);
    },
    startDownloadImages: function () {
        var me = this;
        if (me.downloadedImages.length < me.cacheCount) {
            me.downloadImage();
        }
        requestAnimationFrame(me.startDownloadImages);
    }
};