if(!Date.now){Date.now=function(){return new Date();};}if(!Function.prototype.bind){Function.prototype.bind=function(e){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
}var a=Array.prototype.slice.call(arguments,1),d=this,c=function(){},b=function(){return d.apply(this instanceof c&&e?this:e,a.concat(Array.prototype.slice.call(arguments)));
};c.prototype=this.prototype;b.prototype=new c();return b;};}if(!Object.prototype.equal){Object.prototype.equal=function(c){var b=this;
if(typeof(b)!=typeof(c)){return false;}for(var a in b){if(typeof(a)==="object"){if(b[a].equal(c[a])==false){return false;
}}else{if(b[a]!=c[a]){return false;}}}return true;};}if(!Object.prototype.extend){Object.prototype.extend=function(b){for(var a in b){this[a]=b[a];
}};}if(!String.format){String.format=function(d,b){var a;var c=d;for(a=1;a<arguments.length;a++){c=c.replace(new RegExp("\\{"+(a-1)+"\\}","g"),arguments[a]);
}return c;};}