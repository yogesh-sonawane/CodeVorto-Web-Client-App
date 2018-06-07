function FileUploader() {
    this.baseAddress = $.fn.baseAddress();
    this.axios = window.axios;
}
FileUploader.prototype = {
    createInstance: function (id, placeHolder, accept) {
        accept = accept || ".zip,.gz,.7z";
        var outer = $("<div />").attr({ "class": "" });
        var file = $("<input />").attr({ type: "file", "accept": accept, id: "fileUpload" });
        var input = $("<input />").attr({
            "placeholder": placeHolder, id: "TxtSelectedFiles", "class": "form-control",
            type: "text", style: 'margin-right: 5px; width: 85%;'
        });
        input.click(function () {
            $("#fileUpload").click();
        });
        var fileDiv = $("<div />").attr({ "class": "file-upload" });
        fileDiv.append(file);
        outer.append(input).append(fileDiv);
        $("#" + id).append(outer); //.append($("<div />").attr({ id: "dvMsg" }));

        file.on("change", function () {
            var files = this.files;
            input.val(files.length + " file(s) selected");
        });
    },
    progressHandling: function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#pMessage";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    },
    uploadFiles: function (endpoint, dataToAppend) {
        var files = $("#fileUpload")[0].files;
        var output = document.getElementById("dvMsg");
        if (files.length <= 0) {
            var msg = "Please select path to upload sources / documents in ZIP format...";
            msgObj.showMessage(output.id, msg, "error");
            return false;
        }
        var fileName;
        var data = new FormData();
        $.each(files, function (v, file) {
            data.append(file.name, file);
            dataToAppend.DeltaWorkspace.ZipFolderName = file.name;
            fileName = file.name;
        });
        $.each(dataToAppend, function (n, v) {
            data.append(n, JSON.stringify(v));
        });

        var config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                percentCompleted = isNaN(percentCompleted) ? 0 : percentCompleted;
                var upload = "Uploading... " + percentCompleted + " %";
                msgObj.showMessage(output.id, upload, "success");
            }
        };
        var uploadEndpoint = this.baseAddress + endpoint + "&fileName=" + fileName;
        this.axios.post(uploadEndpoint, data, config).then(function (response) {
            if (response.status === 200) {
                var sMsg = "File uploaded successfully";
                msgObj.showMessage(output.id, sMsg, "success");
                var jobMsg = "Job has been submitted for processing in background. <br /> You will be redirected to Dashboard page in 5 seconds";
                msgObj.showMessage("pMessage", jobMsg, "success");
                setTimeout(function () { window.location = "dashboard.html"; }, 5000);
            } else if (response.status === 400) {
                msgObj.showMessage(output.id, response.responseText, "error");
            }
        }).catch(function (err) {
            var rData = err.response !== undefined ? err.response.data : null;
            var eMsg = (rData !== undefined && rData !== null) ? rData.Message : err.message;
            msgObj.showMessage("pMessage", eMsg, "error");
        });
        return true;
    }
};

var DocumentUploader = function () {
    this.baseAddress = window.baseAddress();
    this.ajax = ajaxConfig;
    this.uploadButton = undefined;
    this.msgObj = undefined;
};
DocumentUploader.prototype = {
    createInstance: function (id, multiple, placeHolder, accept) {
        var instance = this.initialize(id, multiple, placeHolder, accept);
        return instance;
    },
    initialize: function (id, multiple, placeHolder, accept) {
        var tdId = id.split('#')[1];
        var _wrapper = $(id);
        _wrapper.html("");
        $(id).attr("style", "display: inline");
        accept = accept || ".zip,.gz,.7z";
        var fileUploadId = tdId + "-fileUpload";
        var selectedFiles = tdId + "-selected-files";
        var btnId = tdId + "-btnUpload";
        var controlWrapper = $("<div />").attr({ "class": "col-md-12", "style": "padding: 2px 0 0 0;" });
        var table = $("<table />").attr({ "style": "width: 100%;" });
        var row = $("<tr />");
        var txtInput = $("<input />").attr({ "type": "text", "placeholder": placeHolder, id: selectedFiles, class: "form-control selected-files", "style": "margin-right: 5px; width: 99%;" });
        row.append($("<td />").append($("<div />").append(txtInput)));
        var fileType = $("<input />").attr({ "type": "file", "accept": accept, id: fileUploadId, "multiple": multiple });
        var fileUpload = $("<td />").attr({ "style": "width: 18%; vertical-align: top;" })
            .append($("<div />").attr({ "class": "file-upload" }).append(fileType));
        row.append(fileUpload);
        var docUploadButton = $("<button />").attr({ "class": "btn btn-success", type: "button", id: btnId }).html("Upload");
        row.append($("<td />").append($("<div />").append(docUploadButton)));
        table.append(row);
        txtInput.click(function () { fileType.trigger("click"); });
        fileType.on("change", function () { var files = this.files; txtInput.val(files.length + " file(s) selected"); });

        controlWrapper.append(table);
        var msgDv = tdId + "-status";
        $(id).append(controlWrapper);
        var statusRow = $("<div />").attr({ id: msgDv, class: "col-md-12", style: "padding: 0;" }).html("");
        $(id).append(statusRow);
        this.msgObj = new Message(msgDv);
        this.selectedFiles = txtInput;
        this.uploadButton = docUploadButton;
        this.fileControl = fileType;
        this.statusRow = statusRow;
        return this;
    },
    progressHandling: function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        $(this.statusRow + " .progress-bar").css("width", + percent + "%");
        $(this.statusRow + " .status").text(percent + " %");
    },
    uploadDocuments: function (endpoint, dataToAppend, callback) {
        dataToAppend = dataToAppend || {};
        var endPoint = this.baseAddress + endpoint;
        var files = this.fileControl.prop("files");
        var outputId = this.statusRow.attr("id"); // document.getElementById("dvMsg");
        if (files.length <= 0) {
            var msg = "Please select documents/notes/images to upload";
            msgObj.showMessage(outputId, msg, "error");
            return false;
        }
        var fileName;
        var data = new FormData();
        dataToAppend.MethodDocs = dataToAppend.MethodDocs || {};
        dataToAppend.MethodDocs.DocumentNames = [];
        $.each(files, function (v, file) {
            data.append(file.name, file);
            dataToAppend.MethodDocs.DocumentNames.push(file.name);
            fileName = file.name;
        });
        $.each(dataToAppend, function (n, v) {
            data.append(n, JSON.stringify(v));
        });

        var config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                percentCompleted = isNaN(percentCompleted) ? 0 : percentCompleted;
                var upload = `Uploading... ${percentCompleted} %`;
                msgObj.showMessage(outputId, upload, "success");
            }
        };
        var uploadEndpoint = endPoint + "&fileName=" + fileName;
        this.ajax.ajaxPostAsync(uploadEndpoint, data, config).then(function (response) {
            if (response.status === 200) {
                var sMsg = "File uploaded successfully";
                msgObj.showMessage(outputId, sMsg, "success");
                setTimeout(function () { callback(); }, 2000);
            } else if (response.status === 400) {
                msgObj.showMessage(outputId, response.responseText, "error");
            }
        }).catch(function (err) {
            var rData = err.response !== undefined ? err.response.data : null;
            var eMsg = (rData !== undefined && rData !== null) ? rData.Message : err.message;
            msgObj.showMessage(outputId, eMsg, "error");
        });
        return true;
    },
    uploadDocs: async function (config) {
        config.dataToSend = config.dataToSend || {};
        var files = this.fileControl.prop("files");
        if (files.length <= 0) {
            var msg = "Please select documents/notes/images to upload";
            this.msgObj.inlineMessage(msg, "error");
            return Promise.reject(msg);
        }
        var fileName;
        var data = new FormData();
        config.dataToSend.MethodDocs = config.dataToSend.MethodDocs || {};
        config.dataToSend.MethodDocs.DocumentNames = [];
        $.each(files, function (v, file) {
            data.append(file.name, file);
            config.dataToSend.MethodDocs.DocumentNames.push(file.name);
            fileName = file.name;
        });
        $.each(config.dataToSend, function (n, v) {
            data.append(n, JSON.stringify(v));
        });
        config.data = data;
        return await this.ajax.ajaxPostAsync(config);
    }
};