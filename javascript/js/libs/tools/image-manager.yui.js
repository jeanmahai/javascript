(function () {
    if (window.ImageManager) {
        throw "image manager is exists";
    }
    var imageManager = function () {
        /*
        item format:
        {
        key:key,
        src:src,
        image:new Image() 默认是null,只有当图片下载完后才有值
        }
        */
        this.images = [];
    };
    imageManager.prototype = {
        /*
        添加image:
        key:图片的key,唯一
        src:图片的url
        */
        add: function (key, src) {
            this.images.push({ key: key, src: src, image: null });
        },
        remove: function (key) {
            var i;
            for (i = 0; i < this.images.length; i++) {
                if (this.images[i].key === key) {
                    this.images[i] = this.images[this.images.length - 1];
                    this.images.pop();
                    return;
                }
            }
        },
        removeAll: function () {
            this.images = [];
        },
        get: function (key) {
            var i;
            for (i = 0; i < this.images.length; i++) {
                if (this.images[i].key === key) {
                    return this.images[i];
                }
            }
            return null;
        },
        /*
        {
        onItemLoading:
        onItemLoaded:
        onLoading:
        onLoaded:
        }
        */
        load: function (args) {
            if (args && args.onLoading) {
                args.onLoading();
            }
            var count = this.images.length;
            var index = 0;
            var img;
            var i;
            for (i = 0; i < this.images.length; i++) {
                img = new Image();
                if (args && args.onItemLoading) {
                    args.onItemLoading(this.images[i]);
                }
                img.src = this.images[i].src;
                img.tag = this.images[i];
                img.onload = function () {

                    this.tag.image = this;
                    if (args && args.onItemLoaded) {
                        args.onItemLoaded(this.tag);
                    }
                    delete this.tag;
                    index++;
                    if (index === count && args && args.onLoaded) {
                        args.onLoaded();
                    }
                };
            }
        }
    };

    window.ImageManager = new imageManager();
})();