document.addEventListener("DOMContentLoaded", function () {
    const userLogin = new UserLogin();
    var validBrowser = userLogin.appCommon.checkBrowser();
    if (!validBrowser) return false;
    BtnLogin.addEventListener("click", function () {
        userLogin.appCommon.ajax.jQueryGet({ method: "get", url: window.baseAddress() + "home/getstatus" }).then(function (res) {
            console.log(res);
            userLogin.userLogin({
                method: "POST",
                url: window.apiBaseAddress() + "Token",
                data: {
                    "grant_type": "password",
                    "username": document.getElementById("TxtUserName").value,
                    "password": document.getElementById("TxtPassword").value
                }
            }).then(function (userInfo) {
                console.log(userInfo);
                window.location.href = "landing.html";
            }).catch(function (e) {
                console.log(e);
            });;
            userLogin.appCommon.checkBrowser();
        }).catch(function (e) {
            console.log(e);
        });
    });
    return true;
});