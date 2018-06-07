// Please prefere this way of defining the module...
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.appCookie = factory();
    }
}(typeof window !== "undefined" ? window : this, function () {
    "use strict";
    var AppCookies = {
        setCookie: function (name, value, exDays) {
            if (!name) return;
            exDays = exDays || 2;
            value = value || {};
            var d = new Date();
            d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            var objValue = JSON.stringify(value);
            document.cookie = name + "=" + encodeURIComponent(objValue) + ";" + expires + ";path=/";
        },

        set: function (name, value, options) {
            if (!name) return;
            value = value || {};
            var objValue = JSON.stringify(value);
            var data = [objValue];
            if (options) {
                var d = new Date();
                if ('expDays' in options) data.push('expires=' + d.setTime(d.getTime() + (options.expDays * 24 * 60 * 60 * 1000)));
                if ('domain' in options) data.push('domain=' + options.domain);
                if ('path' in options) data.push('path=' + options.path);
                if ('secure' in options && options.secure) data.push('secure');
            }
            var cookieData = data.join(";");
            var appCookies = name + "=" + encodeURIComponent(cookieData);
            document.cookie = appCookies;
        },
        get: function (name) {
            var cName = encodeURIComponent(name);
            var docCookies = decodeURIComponent(document.cookie);
            var cookies = docCookies.split(/; */);
            if (!cookies) return {};
            for (var c = 0; c <= cookies.length; c++) {
                var v = cookies[c];
                if (!v) continue;
                var values = cookies[c].split("=");
                var key = values.shift();
                if (key !== cName) continue;
                var cValue = values.pop();
                var cookieValue = JSON.parse(cValue);
                return cookieValue;
            }
            return {};
        },
        clearOne: function (name, options) {
            if (!options) options = {};
            options.expiry = -86400;
            this.set(name, {}, options);
        },
        clearAll: function () {
            document.cookie.split(";").forEach(function (c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            (function () {
                document.cookie.split(";").forEach(function (c) {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
            })();

            var docCookies = decodeURIComponent(document.cookie);
            var cookies = docCookies.split(/; */);
            if (!cookies) return [];
            for (var k = 0; k <= cookies.length; k++) {
                var cookie = cookies[k];
                if (!cookie) continue;
                var values = cookie.split("=");
                var key = values.shift();
                if (key === "") continue;
                this.set(key, {}, { expDays: -86400 });
            }
            return true;
        }
    };

    return AppCookies;
}));