// Please prefere this way of defining the module...
/*
 * This is global AJAX Request handler.
 * Every request should contain a object with following format
 * const config = {
     * method: string, // Either any of CRUD like "GET" or "POST"
     * endPoint: string // without baseAddress,
     * url: endPoint (string), // This is just to distinguish between complete URL including baseAddress and without baseAddress.
     * headers: {},
     * data: {}, // For requests other than GET type
     * uploadProgress: function(){} // Function to show progress.
 * }
 *
 * Every response must be handled with then() and catch() chains. OR then(function(response){} // for success, function(error){} // for exceptions / errors)
 */
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["axiosConfig"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.ajaxConfig = factory();
    }
}(typeof window !== "undefined" ? window : this, function () {
    var AxiosConfig = function () {
        this.ajax = window.axios.create({
            baseURL: window.baseAddress()
        });
        this.ajaxGetAsync = async function (config) {
            return await this.ajax.get(config.endPoint, config);
        };
        this.ajaxGet = function (config) {
            return new Promise((resolve, reject) => {
                return this.ajax.get(config.endPoint).then(function (res) { resolve(res); }).catch(function (err) {
                    reject(err);
                });
            });
        };
        this.ajaxPostAsync = async function (config) {
            return await this._ajaxPost(config);
        }
        this.ajaxPost = function (config) {
            return new Promise((resolve, reject) => {
                this._ajaxPost(config).then(function (res) { resolve(res); }).catch(function (e) { reject(e); });
            });
        };
        this._ajaxPost = async function (config) {
            const res = await this.ajax({ method: config.type, headers: config.headers, data: config.data, url: config.endPoint, onUploadProgress: config.uploadProgress });
            return res;
        };
        this.ajaxDeleteAsync = async function (config) {
            await this.ajax.delete(config.endPoint, config);
        };
        this.ajaxDelete = function (config) {
            return new Promise((resolve, reject) => {
                this.ajax.delete(config.endPoint, config).then(function (res) { resolve(res); }).catch(function (e) { reject(e); });
            });
        };
        this.ajaxPutAsync = async function (config) {
            return await this.axios.put(config.endPoint, config);
        };
        this.ajaxPut = function (config) {
            return new Promise((resolve, reject) => {
                this.ajax.put(config.endPoint, config).then(function (res) { resolve(res); }).catch(function (e) { reject(e); });
            });
        };
        this.ajaxPatchAsync = async function (config) {
            return await this.ajax.patch(config.endPoint, config);
        };
        this.ajaxPatch = function (config) {
            return new Promise((resolve, reject) => {
                this.ajax.patch(config.endPoint, config).then(function (res) { resolve(res); }).catch(function (e) { reject(e); });
            });
        };
        this.jQueryPost = function (config) {
            return new Promise((resolve, reject) => {
                jQuery.ajax(config).then(function (d) {
                    var res = {};
                    res.data = d;
                    resolve(res);
                }, function () {
                    reject();
                });
            });
        };
        this.jQueryGet = function (config) {
            return new Promise((resolve, reject) => {
                jQuery.ajax(config).then(function (d) {
                    var res = {};
                    res.data = d;
                    resolve(res);
                }, function (e) {
                    reject(e);
                });
            });
        };
        this.ajaxTest = function (config) {
            console.log(config);
        };
    };
    return new AxiosConfig();
}));