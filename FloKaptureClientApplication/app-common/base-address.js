﻿(function (w) {
    var apiPort = 8888;
    w.baseAddress = function () {
        var hostName = w.location.hostname;
        var protocol = w.location.protocol;
        var baseUrl = `${protocol}//${hostName}:${apiPort}/api/`;  // protocol + "//" + hostName + ":8888/api/";
        return baseUrl;
    };
    w.apiBaseAddress = function() {
        var hostName = w.location.hostname;
        var protocol = w.location.protocol;
        var baseUrl = `${protocol}//${hostName}:${apiPort}/`;  // protocol + "//" + hostName + ":8888/api/";
        return baseUrl;
    };
}(this));

// Try it for multiple requests before placing it on page.
// Once comfirmed remove all logs inside. These are just for testing purpose.
document.addEventListener("DOMContentLoaded", function () {
    var XmlHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = function (flags) {
        // This is the portion where we can show loading image...
        // No need to check whether loading image is already visible or not. Just show it.
        var httpRequest = new XmlHttpRequest(flags);
        return httpRequest;
    };
    var ajaxOpen = XmlHttpRequest.prototype.open;
    var loadingElement = document.getElementById("loading-modal");
    // This is going to hold all requests sequentially.
    // Each time if request is failed / successed then remove that from array...
    var xhrRequests = [];
    var checkRequests = function (requests) {
        loadingElement.setAttribute("class", "modal-show");
        if (requests.length > 0) return;
        // This is the portion where we can hide loading image...
        loadingElement.setAttribute("class", "modal-hide");
        console.log("All requests have been processed!!");
    };

    XmlHttpRequest.prototype.open = function (method, url, async) {
        // console.log('request started! ' + new Date().getUTCMilliseconds());
        loadingElement.setAttribute("class", "modal-show");
        xhrRequests.push({ Method: method, Async: async, Request: url });
       
        this.addEventListener("error", function () {
            console.log("Something went wrong!!");
            xhrRequests.shift();
            checkRequests(xhrRequests);
        });
        /*
        this.onprogress = function () {
            console.log('Loading... Ready state: ', this.readyState); // readyState will be 3
        };
        this.addEventListener('readystatechange', function () {
            if (this.readyState === 1 && this.OPENED) {
                // This is where we can set Request header...
                // Following line is just for illustration.
                this.setRequestHeader('x-auth', 'Token 123');
            } else if (this.readyState === 4 && this.status === 200) {
                // Request processed successfully...
            }
        });
        */
        this.addEventListener("load", function (xhr) {
            var target = xhr.target;
            console.log("Request processed successfully!!. Status is: " + target.status);
            xhrRequests.shift();
            checkRequests(xhrRequests);
        });

        return ajaxOpen.apply(this, arguments);
    };
});
