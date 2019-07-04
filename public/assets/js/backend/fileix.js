define(['webix', 'jquery', 'filemanager'], function ($, jq, filemanager) {

    var Controller = {
        index: function () {

            jq.getJSON('fileix/parms', function (data) {
                h = data.ix_height;
                d = jq.getJSON('fileix/lst');

                webix.ready(function () {

                    webix.ui({
                        view: "filemanager",
                        id: "files", height: h, container: "my_box",
                        handlers: {
                            "files": "fileix/data",
                            "search": "fileix/data",
                            "upload": "fileix/data",
                            "download": "fileix/data",
                            "copy": "fileix/data",
                            "move": "fileix/data",
                            "remove": "fileix/data",
                            "rename": "fileix/data",
                            "create": "fileix/data"
                        }
                    }).show();
                    $$("files").parse(d);

                    $$("files").attachEvent("onBeforeRun", function (id) {
                        webix.confirm({
                            text: "您要下载本文件么?",
                            ok: "下载",
                            cancel: "取消",
                            callback: function (result) {
                                if (result)
                                    $$("files").download(id);
                            }
                        });
                        return false;
                    });
                });
            });
        }
    };

    webix.i18n.filemanager = {
		actions: "Actions",
		back: "Back",
		forward: "Forward",
		levelUp: "Level Up",
		name: "Name",
		size: "Size",
		type: "Type",
		date: "Date",
		copy: "Copy",
		cut: "Cut",
		paste: "Paste",
		upload: "Upload",
		remove: "Delete",
		create: "Create Folder",
		rename: "Rename",
		location: "Location",
		select: "Select Files",
		sizeLabels: ["B", "KB", "MB", "GB"],
		iconsView: "Icons View",
		tableView: "Table View",
		hideTree: "Hide Tree",
		showTree: "Show Tree",
		collapseTree: "Collapse Tree",
		expandTree: "Expand Tree",
		saving: "Saving...",
		errorResponse: "Error: changes were not saved!",
		replaceConfirmation: "The folder already contains files with such names. Would you like to replace existing files ?",
		createConfirmation: "The folder with such a name already exists. Would you like to replace it ?",
		renameConfirmation: "The file with such a name already exists. Would you like to replace it ?",
		yes: "Yes",
		no: "No",
		types: {
			folder: "Folder",
			doc: "Document",
			excel: "Excel",
			pdf: "PDF",
			pp: "PowerPoint",
			text: "Text File",
			video: "Video File",
			image: "Image",
			code: "Code",
			audio: "Audio",
			archive: "Archive",
			file: "File"
		}
	}
    return Controller;
});
