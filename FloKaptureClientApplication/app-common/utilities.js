// Please prefere this way of defining the module...
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["appUtils"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.appUtils = factory();
    }
}(typeof window !== "undefined" ? window : this, function () {
    "use strict";
    var Utilities = function () {};
    Utilities.prototype = {
        getParameterByName: function (name) {
            var pName = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp(`[\\?&]${pName}=([^&#]*)`);
            var results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        downloadFile: function (filePath) {
            var element = document.createElement("a");
            element.style.display = "none";
            element.href = filePath;
            element.target = "_blank";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    };
    return new Utilities();
}));