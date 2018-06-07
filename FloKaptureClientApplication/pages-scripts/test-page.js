$(document).ready(function () {
    appCommon.actionAuditLog({
        type: "GET",
        endPoint: "Home/GetStatus",
        headers: { "X-Auth": "Yogesh Sonawane 1" }
    }).then(function (d) {
        console.log(d.data);
    }).catch(function (e) {
        console.log(e);
    });
    /*
     * This example is for uploading Documents/Files/Images...
     */
    var docUploader = new DocumentUploader();
    docUploader.createInstance("#documentUpload", "multiple", "Select document(s) to upload", "*.*");
    docUploader.uploadButton.click(function () {
        var dialog = docUploader.msgObj.bootBoxLoading("Uploading Documents...");
        var config = {
            type: "POST",
            endPoint: "Documents/UploadDocuments?userId=2&fileName=Shubhangi",
            headers: { "X-Auth": "Yogesh Sonawane" },
            uploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                percentCompleted = isNaN(percentCompleted) ? 0 : percentCompleted;
                var upload = "Uploading... " + percentCompleted + " %";
                docUploader.msgObj.inlineMessage(upload, "success");
            }
        };
        var dataToSend = {};
        dataToSend.MethodDocs = {
            MethodName: "Method 1",
            MethodStatementId: 1234,
            FileId: 2342,
            UserId: 2
        };
        config.dataToSend = dataToSend;
        docUploader.uploadDocs(config).then(function () {
            dialog.modal("hide");
            docUploader.msgObj.bootBoxAlert("Documents uploaded successfully.");
        }).catch(function () {
            dialog.modal("hide");
            docUploader.msgObj.bootBoxAlert("Error occured while uploading document(s).");
        });
    });
    var diagram = new DiagramUtility("#mf-diagram", {
        width: 5000,
        height: 360,
        backBrush: "#FFFFFF",
        gridLines: true,
        nodes: [],
        links: [],
        legends: [{ title: "Starting Point", bgColor: "#ffcc00" }, { title: "Object", bgColor: "#a4361a" }, { title: "Decision", bgColor: "#ff6600" }, { title: "All Statements", bgColor: "#00ffff" }]
    });
    diagram.setTitle("Current");
});

document.addEventListener("copy", function (e) {
    alert("Bhau, copy naka karu!!!");
    console.log(e);
});