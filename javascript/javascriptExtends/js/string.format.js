if(!String.format) {
    String.format = function (str, params) {
        var i;
        var result=str;
        for (i = 1; i < arguments.length; i++) {
            result = result.replace(new RegExp("\\{"+(i-1)+"\\}", "g"), arguments[i]); 
        }
        return result;
    };
}
else {
    if(console) {
        console.warn("function [String.format] was existed.");
    }
}