/// <reference path="../00simulation.js" />
/// <reference path="../20simulation-utility.js" />

Simulation.Region = function(minx, maxx, miny, maxy) {
    this.minX = minx;
    this.maxX = maxx;
    this.minY = miny;
    this.maxY = maxy;
};
Simulation.Region.parseb2Region = function (region) {
    region.minX = Simulation.getBox2dValue(region.minX);
    region.maxX = Simulation.getBox2dValue(region.maxX);
    region.minY = Simulation.getBox2dValue(region.minY);
    region.maxY = Simulation.getBox2dValue(region.maxY);
    return region;
};