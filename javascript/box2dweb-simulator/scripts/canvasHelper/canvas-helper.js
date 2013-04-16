/*对canvas操作的一些封装,方便使用*/
window["canvasHelper"] = {
    fillImage: function (ctx, image, points, repetition) {
        if (!(image instanceof Image)) throw "argument error,[image] is not a Image";
        if (!(points instanceof Array)) throw "argument error,[points] is not a Array";
        if (points.length <= 2) throw "argument error,[points]'s length<=2,min 3";
        var pattern = ctx.createPattern(image, repetition);
        ctx.fillStyle = pattern;
        var i = 0;
        ctx.beginPath();
        for (; i < points.length; i++) {
            if (0 === i) {
                ctx.moveTo(points[i].x, points[i].y);
                continue;
            }
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.fill();
    }
};