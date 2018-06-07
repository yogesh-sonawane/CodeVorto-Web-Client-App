var floKapture = floKapture || {};
const Landing = floKapture.Landing = function () {
    this.appCommon = appCommon;
};

Landing.prototype = {
    getTickersCount: function (projectId) {
        this.appCommon.ajax.ajaxTest({ endPoint: "Test/Test", projectId: projectId });
        this.appCommon.msgObj.bootBox.prompt("This is required: ", function(res) {
            console.log(res);
        });
    }
};