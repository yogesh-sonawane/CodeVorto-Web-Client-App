// Please prefere this way of defining the module...
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.leftMenu = factory();
    }
}(typeof window !== "undefined" ? window : this, function () {
    "use strict";
    var LeftMenuTemplate = function () { };
    var prototypes = {};
    prototypes.goToPage = function (pageUrl) {
        window.top.location.href = pageUrl;
    };
    prototypes.navigateTo = function (element) {
        window.top.location.href = element.dataset.link;
    };
    prototypes.openWin = function (element, projectId, fileId) {
        projectId = projectId || 0;
        fileId = fileId || 0;
        window.open(element.dataset.link + "?projectId=" + projectId + "&fileId=" + fileId, "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
    }
    LeftMenuTemplate.prototype = prototypes;

    return new LeftMenuTemplate();
}));

$(document).ready(function () {
    $(".aLink").click(function (e) {
        leftMenu.navigateTo(e.target);
    });

    $(".popup-win").click(function (e) {
        leftMenu.openWin(e.target);
    });

    $("#aLogout").click(function() {
        window.localStorage.clear();
        window.location.href = "login.html";
    });
});