/// <reference path="../../jq/jquery-1.9.1.min.js" />
/// <reference path="../../jq/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js" />

(function () {
    if (!window.jui) window.jui = {};

    var _dialog_container = $("<div></div>");


    //#region alert
    jui.alert = function (message, title, ok, alwayShow, ops) {
        _dialog_container.text(message);
        var btns = {
            "确定": function () {
                if (ok && typeof ok == "function") {
                    ok();
                }
                $(this).dialog("close");
            }
        };
        if (ops) {
            ops.title = title || "系统信息";
            ops.buttons = btns;
        }
        else {
            ops = {
                title: title || "系统信息",
                modal: true,
                buttons: btns
            };
        }
        if (alwayShow == true) {
            _dialog_container.clone().dialog(ops);
        }
        else {
            _dialog_container.dialog(ops);
        }
    };
    //#endregion


    //#region confirm
    jui.confirm = function (message, title, yes, no, alwayShow, ops) {
        _dialog_container.text(message);
        var btns = {
            "确定": function () {
                if (yes && typeof yes == "function") {
                    yes();
                }
                $(this).dialog("close");
            },
            "取消": function () {
                if (no && typeof no == "function") {
                    no();
                }
                $(this).dialog("close");
            }
        };
        if (ops) {
            ops.title = title || "系统信息";
            ops.buttons = btns;
        } else {
            ops = {
                title: title || "系统信息",
                modal: true,
                buttons: btns
            };
        }
        if (alwayShow == true) {
            _dialog_container.clone().dialog(ops);
        } else {
            _dialog_container.dialog(ops);
        }
    };
    //#endregion
})();