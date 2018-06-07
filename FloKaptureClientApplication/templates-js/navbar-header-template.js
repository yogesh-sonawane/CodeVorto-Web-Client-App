$(document).ready(function () {
    var appUser = appCookie.get("AppUser");
    appUser.UserName = appUser.UserName || "Yogesh Sonawane";
    $(".username").html(appUser.UserName);
    setTimeout(() => {
        var userName = document.getElementById("userName");
        userName.innerHTML = appUser.UserName;
    }, 5000);

    $("#aLogout").click(function() {
        window.logOut();
    });
});