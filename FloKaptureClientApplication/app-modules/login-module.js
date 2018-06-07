var floKapture = floKapture || {};
const UserLogin = floKapture.UserLogin = function () {
    this.appCommon = appCommon;
    this.msgObj = new Message();
};

UserLogin.prototype = {
    userLogin: (postData) => new Promise(function (resolve, reject) {
        this.appCommon.ajax.jQueryPost(postData).then((d) => {
            var token = d.data["access_token"];
            this.appCommon.ajax.jQueryGet({
                method: "GET",
                responseType: "application/json",
                url: "https://127.0.0.1:8888/api/Values/GetValue",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "bearer " + token);
                }
            }).then(function (res) {
                resolve(res);
            }, function (e) {
                reject(e);
            });
        }, function (e) {
            reject(e);
        });
    }),
    showForgotPassword: function () {
        // Show Forgot password modal dialog here...
    }
};