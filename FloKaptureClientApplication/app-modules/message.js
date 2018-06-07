// Please prefere this way of defining the module...
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Message = factory();
    }
}(typeof window !== "undefined" ? window : this, function () {
    "use strict";
    var _defaults = {
        success: "green",
        warning: "#fcf8e3",
        info: "#d9edf7",
        error: "red",
        "default": "green"
    };

    var Message = function (id) {
        this.id = id;
        this.bootBox = window.bootbox;
    };

    Message.prototype = {
        inlineMessage: function (msg, type) {
            var id = this.id;
            var color = _defaults[type] || _defaults["default"];
            var control = document.getElementById(id);
            if (!control) return;
            control.innerHTML = "";
            control.style["color"] = color;
            control.innerHTML = msg;
        },
        messageWithReplace: function (id, msg, type) {
            if (!id) return;
            var color = _defaults[type] || _defaults["default"];
            var control = document.getElementById(id);
            if (!control) return;
            control.innerHTML = "";
            control.style["color"] = color;
            control.innerHTML = msg;
        },
        alertMessage: function (msg) {
            alert(msg);
        },
        bootBoxAlert: function (msg, callback) {
            this.bootBox.alert({
                message: msg,
                callback: function (c) {
                    if (callback === "function") callback(c);
                }
            });
        },
        bootBoxConfirm: function (title, msg, callback) {
            this.bootBox.confirm({
                title: title,
                message: msg,
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancel'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Confirm'
                    }
                },
                callback: function (result) {
                    callback(result);
                }
            });
        },
        bootBoxLoading: function (title) {
            var dialog = this.bootBox.dialog({
                title: title,
                message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
            });
            return dialog;
        }
    };
    return Message;
    }));