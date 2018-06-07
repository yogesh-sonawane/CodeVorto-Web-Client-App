// Please prefere this way of defining the module...
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["appUtils"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.appCommon = factory();
    }
}(typeof window !== "undefined" ? window : this, function () {
    "use strict";
    var AppCommon = function () {
        this.ajax = ajaxConfig;
        this.appCookie = appCookie;
        this.msgObj = new Message();
    };
    AppCommon.prototype = {
        actionAuditLog: async function (config) {
            return await this.ajax.ajaxGetAsync(config);
        },
        checkBrowser: function () {
            var isIE = false || !!document.documentMode;
            if (isIE) return false;
            var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
            if (isOpera) return false;
            var isFirefox = typeof window.InstallTrigger !== "undefined";
            if (isFirefox) return true;
            var isSafari = /constructor/i.test(window.HTMLElement) ||
                (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })
                    (!window['safari'] || window.safari.pushNotification);
            if (isSafari) return false;
            var isEdge = !!window.StyleMedia;
            if (isEdge) return true;
            var isChrome = !!window.chrome && !!window.chrome.webstore;
            var isBlink = isChrome && !!window.CSS;
            if (isBlink) return true;
            if (isChrome) return true;
            return false;
            // if (isIE) this.msgObj.messageWithReplace("LoginForm", "Please use certified browsers to use this product.<br /><br /> Valid browsers are Microsoft Edge and Chrome.", "error");
            /*
            var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
            if (isOpera) this.msgObj.messageWithReplace("LoginForm", "Please use certified browsers to use this product.<br /><br /> Valid browsers are Microsoft Edge and Chrome.", "error");
            var isFirefox = typeof window.InstallTrigger !== "undefined";
            if (isFirefox) this.msgObj.messageWithReplace("LoginForm", "Please use certified browsers to use this product.<br /><br /> Valid browsers are Microsoft Edge and Chrome.", "error");
            var isSafari = /constructor/i.test(window.HTMLElement) ||
                (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })
                    (!window['safari'] || window.safari.pushNotification);
            if (isSafari) this.msgObj.messageWithReplace("LoginForm", "Please use certified browsers to use this product.<br /><br /> Valid browsers are Microsoft Edge and Chrome.", "error");
            var isEdge = !isIE && !!window.StyleMedia;
            var isChrome = !!window.chrome && !!window.chrome.webstore;
            var isBlink = (isChrome || isOpera) && !!window.CSS;
            */
        }
    };
    return new AppCommon();
}));