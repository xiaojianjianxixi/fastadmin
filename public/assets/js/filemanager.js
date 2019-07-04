/*
@license
Webix FileManager v.5.1.0
This software is covered by Webix Trial License.
Usage without proper license is prohibited.
(c) XB Software Ltd.
*/
!
function(e) {
	function t(i) {
		if (n[i]) return n[i].exports;
		var o = n[i] = {
			exports: {},
			id: i,
			loaded: !1
		};
		return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
	}
	var n = {};
	return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
	"use strict";

	function i(e) {
		if (e && e.__esModule) return e;
		var t = {};
		if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
		return t["default"] = e, t
	}
	n(3), n(9), n(10), n(11);
	var o = n(18),
		a = i(o),
		r = n(19),
		s = i(r),
		c = n(20),
		l = i(c),
		u = n(21),
		f = i(u),
		d = n(23),
		h = i(d),
		v = n(24),
		g = i(v),
		p = n(25),
		m = i(p),
		w = n(26),
		b = i(w),
		_ = n(48),
		x = i(_);
	webix.protoUI({
		name: "filemanager",
		$init: function(e) {
			var t = this;
			this.$view.className += " webix_fmanager", webix.extend(this.data, webix.TreeStore, !0), this.data.provideApi(this, !0), webix.extend(e, this.defaults), b.init(this, e), l.init(this), f.init(this), e.legacyUploader = e.legacyUploader || webix.isUndefined(XMLHttpRequest) || webix.isUndefined((new XMLHttpRequest).upload), this.$ready.push(function() {
				t._beforeInit(), t.callEvent("onComponentInit", [])
			}), webix.UIManager.tabControl = !0, webix.extend(e, b.getUI(this, e))
		},
		handlers_setter: function(e) {
			for (var t in e) {
				var n = e[t];
				if ("string" == typeof n) if (n.indexOf("->") != -1) {
					var i = n.split("->");
					n = webix.proxy(i[0], i[1])
				} else "upload" != t && "download" != t && (n = webix.proxy("post", n));
				e[t] = n
			}
			return e
		},
		_beforeInit: function() {
			a.init(this), x.init(this), this.config.scheme || this.define("scheme", {
				init: function(e) {
					var t = this.getItem(e.id);
					t && t.$count && (e.type = "folder")
				}
			}), this.attachEvent("onAfterLoad", function() {
				if (!this.getCursor()) {
					var e = this.config.defaultSelection;
					e = e ? e.call(this) : this.getFirstChildId(0), this.setCursor(e)
				}
			}), this.attachEvent("onFolderSelect", function(e) {
				this.setCursor(e)
			}), this.attachEvent("onBeforeDragIn", function(e) {
				var t = e.target;
				if (t) for (var n = e.source, i = 0; i < n.length; i++) for (; t;) {
					if (t == n[i]) return !1;
					t = this._getParentId(t)
				}
				return !0
			})
		},
		_getParentId: function(e) {
			if (!this.getItem(e)) {
				var t = this.$$(this.config.mode),
					n = t.getItem(e);
				return n && n.parent && this.getItem(n.parent) ? n.parent : null
			}
			return webix.TreeStore.getParentId.apply(this, arguments)
		},
		getMenu: function() {
			return this._contextMenu
		},
		getPath: function(e) {
			return h.getPath(this, e)
		},
		getPathNames: function(e) {
			return h.getPathNames(this, e)
		},
		setPath: function(e) {
			return h.setPath(this, e)
		},
		_getLocation: function(e) {
			var t, n = "";
			if (this.getItem(e.id) || e.parent && this.getItem(e.parent)) {
				e.parent ? (t = this.getPathNames(e.parent), t.shift()) : (t = this.getPathNames(e.id), t.shift(), t.pop());
				for (var i = [], o = 0; o < t.length; o++) i.push(t[o].value);
				n = "/" + i.join("/")
			} else if (e.location) n = e.location;
			else if ("string" == typeof e.id) {
				var a = e.id.split("/");
				a.pop(), n = "/" + a.join("/")
			}
			return n
		},
		getSearchData: function(e, t) {
			var n = [];
			return this.data.each(function(e) {
				var i = this.config.templateName(e);
				i.toLowerCase().indexOf(t.toLowerCase()) >= 0 && n.push(webix.copy(e))
			}, this, !0, e), n
		},
		showSearchResults: function(e) {
			var t = this.getCursor();
			if (this.config.handlers.search) f.loadSearchData(this, this.config.handlers.search, t, e);
			else {
				var n = this.getSearchData(t, e);
				f.parseSearchData(this, n)
			}
		},
		hideSearchResults: function(e) {
			if (this.$searchResults && (this.callEvent("onHideSearchResults", []), this.$searchResults = !1, !e)) {
				var t = this.getCursor();
				this.blockEvent(), this.setCursor(null), this.unblockEvent(), this.setCursor(t)
			}
		},
		goBack: function(e) {
			return e = e ? -1 * Math.abs(e) : -1, l.changeCursor(this, e)
		},
		goForward: function(e) {
			return l.changeCursor(this, e || 1)
		},
		levelUp: function(e) {
			e = e || this.getCursor(), e && (e = this.getParentId(e), this.setCursor(e))
		},
		markCopy: function(e) {
			e && (webix.isArray(e) || (e = [e]), this._moveData = e, this._copyFiles = !0)
		},
		markCut: function(e) {
			e && (webix.isArray(e) || (e = [e]), this._moveData = e, this._copyFiles = !1)
		},
		pasteFile: function(e) {
			if (webix.isArray(e) && (e = e[0]), e) {
				e = e.toString();
				var t = this.getActiveView().getItem(e);
				(this.data.branch[e] && "folder" == this.getItem(e).type || t && "folder" == t.type) && this._moveData && (this._copyFiles ? this.copyFile(this._moveData, e) : this.moveFile(this._moveData, e))
			}
		},
		download: function(e) {
			var t = this.config.handlers.download;
			t && webix.send(t, {
				action: "download",
				source: e
			})
		},
		fileExists: function(e, t, n) {
			var i = !1;
			return this.data.eachChild(t, webix.bind(function(t) {
				e != t.value || n && t.id == n || (i = t.id)
			}, this)), i
		},
		_refreshActiveFolder: function() {
			this.$skipDynLoading = !0, this.$$(this.config.mode).$skipBinding = !1, this.refreshCursor()
		},
		_setFSId: function(e) {
			var t = this.getParentId(e.id) + "/" + e.value;
			e.id != t && this.data.changeId(e.id, t)
		},
		_changeChildIds: function(e) {
			this.data.eachSubItem(e, webix.bind(function(e) {
				e.value && this._setFSId(e)
			}, this))
		},
		_callbackRename: function(e, t) {
			var n = this.getItem(e);
			n.value != t && (n.value = t, this._refreshActiveFolder(), this.callEvent("onItemRename", [e]))
		},
		_moveFile: function(e, t, n) {
			var i = n ? "copy" : "move",
				o = [];
			e.reverse();
			for (var a = 0; a < e.length; a++) if (this.getItem(e[a])) {
				var r = this.move(e[a], 0, this, {
					parent: t,
					copy: !! n
				});
				o.push(r)
			}
			this._refreshActiveFolder();
			var s = this.config.handlers[i];
			s && g.makeSaveRequest(this, s, {
				action: i,
				source: e.join(","),
				temp: o.join(","),
				target: t.toString()
			}, function(e, t) {
				if (t && webix.isArray(t)) for (var n = e.temp.split(","), i = 0; i < t.length; i++) t[i].id && t[i].id != n[i] && this.data.pull[n[i]] && (this.data.changeId(n[i], t[i].id), this.config.fsIds && this._changeChildIds(t[i].id), t[i].value && this._callbackRename(t[i].id, t[i].value));
				this._updateDynSearch()
			})
		},
		_updateDynSearch: function() {
			this.$searchResults && this.$searchValue && this.showSearchResults(this.$searchValue)
		},
		copyFile: function(e, t) {
			this.moveFile(e, t, !0)
		},
		moveFile: function(e, t, n) {
			var i, o, a;
			for ("string" == typeof e && (e = e.split(",")), webix.isArray(e) || (e = [e]), t ? this.data.branch[t] || "folder" == this.getItem(t.toString()).type || (t = this.getParentId(t)) : t = this.getCursor(), a = !0, t = t.toString(), i = 0; i < e.length; i++) o = e[i].toString(), a = a && this._isMovingAllowed(o, t);
			a ? this._moveFile(e, t, !! n) : this.callEvent(n ? "onCopyError" : "onMoveError", [])
		},
		deleteFile: function(e, t) {
			"string" == typeof e && (e = e.split(",")), webix.isArray(e) || (e = [e]);
			for (var n = 0; n < e.length; n++) {
				var i = e[n];
				this.$$(this.config.mode).isSelected(i) && this.$$(this.config.mode).unselect(i), i == this.getCursor() && this.setCursor(this.getFirstId()), i && this.remove(i)
			}
			this._refreshActiveFolder();
			var o = this.config.handlers.remove;
			o ? (t && (t = webix.bind(t, this)), g.makeSaveRequest(this, o, {
				action: "remove",
				source: e.join(",")
			}, t)) : t && t.call(this)
		},
		_createFolder: function(e, t) {
			this.add(e, 0, t), e.source = e.value, e.target = t, this._refreshActiveFolder();
			var n = this.config.handlers.create;
			n && (e.action = "create", g.makeSaveRequest(this, n, e, function(e, t) {
				t.id && (e.id != t.id && this.data.changeId(e.id, t.id), this.config.fsIds && this._changeChildIds(t.id), t.value && this._callbackRename(t.id, t.value))
			}))
		},
		createFolder: function(e) {
			if ("string" == typeof e && (e = e.split(",")), webix.isArray(e) && (e = e[0]), e) {
				e = "" + e;
				var t = this.getItem(e);
				this.data.branch[e] || "folder" == t.type || (e = this.getParentId(e));
				var n = this.config.templateCreate(t);
				e = "" + e, this._createFolder(n, e)
			}
		},
		editFile: function(e) {
			webix.isArray(e) && (e = e[0]), this.getActiveView() && this.getActiveView().edit && this.getActiveView().edit(e)
		},
		renameFile: function(e, t, n) {
			var i = this.getItem(e);
			n = n || "value", i && (i[n] = t), this.refresh(i.id), this._refreshActiveFolder(), this.callEvent("onFolderSelect", [this.getCursor()]);
			var o = this.config.handlers.rename;
			if (o) {
				var a = {
					source: e,
					action: "rename",
					target: t
				};
				g.makeSaveRequest(this, o, a, function(e, t) {
					t.id && this.getItem(e.source) && (e.source != t.id && this.data.changeId(e.source, t.id), this.config.fsIds && this._changeChildIds(t.id), t.value && this._callbackRename(t.id, t.value)), this._updateDynSearch()
				})
			}
		},
		_isMovingAllowed: function(e, t) {
			for (; t;) {
				if (t == e || !this.data.branch[t] && "folder" != this.getItem(t.toString()).type) return !1;
				t = this.getParentId(t)
			}
			return !0
		},
		getActiveView: function() {
			return this._activeView || this.$$("tree") || null
		},
		getActive: function() {
			var e = this.getSelectedFile();
			return e ? e : this.getCursor()
		},
		getCurrentFolder: function() {
			return this.$$("tree").getSelectedId()
		},
		getSelectedFile: function() {
			var e = null,
				t = this.$$(this.config.mode).getSelectedId();
			if (t) if (webix.isArray(t)) {
				e = [];
				for (var n = 0; n < t.length; n++) e.push(t[n].toString())
			} else e = t.toString();
			return e
		},
		_openFolder: function(e) {
			this.callEvent("onBeforeLevelDown", [e]) && (this.setCursor(e), this.callEvent("onAfterLevelDown", [e]))
		},
		_runFile: function(e) {
			this.callEvent("onBeforeRun", [e]) && (this.download(e), this.callEvent("onAfterRun", [e]))
		},
		_onFileDblClick: function(e) {
			e = e.toString();
			var t = this.getItem(e);
			if (t) this.data.branch[e] || "folder" == t.type ? this._openFolder(e) : this._runFile(e);
			else if (this.$$(this.config.mode).filter) if (t = this.$$(this.config.mode).getItem(e), "folder" != t.type) this._runFile(e);
			else {
				var n = t && t.parents ? t.parents : h.getParentFolders(e);
				n.length && this.openFolders(n).then(webix.bind(function() {
					this._openFolder(e)
				}, this))
			}
		},
		openFolders: function(e) {
			return f.openFolders(this, e)
		},
		_addElementHotKey: function(e, t, n) {
			var i = webix.UIManager.addHotKey(e, t, n);
			(n || this).attachEvent("onDestruct", function() {
				webix.UIManager.removeHotKey(i, t, n)
			})
		},
		clearBranch: function(e) {
			f.clearBranch(this, e)
		},
		parseData: function(e) {
			f.parseData(this, e)
		},
		_getDynMode: function() {
			return f.getDynMode(this)
		},
		loadDynData: function(e, t, n, i) {
			f.loadDynData(this, e, t, n, i)
		},
		getUploader: function() {
			return x.getUploader(this)
		},
		uploadFile: function(e, t) {
			return x.uploadFile(this, e, t)
		},
		hideTree: function() {
			this.callEvent("onBeforeHideTree", []) && (m.hideTree(this), this.callEvent("onAfterHideTree", []))
		},
		showTree: function() {
			this.callEvent("onBeforeShowTree", []) && (m.showTree(this), this.callEvent("onAfterShowTree", []))
		},
		defaults: s.values
	}, webix.ProgressBar, webix.IdSpace, webix.ui.layout, webix.TreeDataMove, webix.TreeDataLoader, webix.DataLoader, webix.EventSystem, webix.Settings)
}, , , function(e, t) {
	"use strict"
}, , , , , , function(e, t) {
	"use strict";
	webix.type(webix.ui.tree, {
		name: "FileTree",
		css: "webix_fmanager_tree",
		dragTemplate: webix.template("#value#"),
		icon: function(e) {
			for (var t = "", n = 1; n < e.$level; n++) t += "<div class='webix_tree_none'></div>";
			return t += e.webix_child_branch && !e.$count ? "<div class='webix_tree_child_branch webix_fmanager_icon webix_tree_close'></div>" : e.$count > 0 ? e.open ? "<div class='webix_fmanager_icon webix_tree_open'></div>" : "<div class='webix_fmanager_icon webix_tree_close'></div>" : "<div class='webix_tree_none'></div>"
		},
		folder: function(e) {
			return e.$count && e.open ? "<div class='webix_fmanager_icon webix_folder_open'></div>" : "<div class='webix_fmanager_icon webix_folder'></div>"
		}
	}), webix.type(webix.ui.dataview, {
		name: "FileView",
		css: "webix_fmanager_files",
		height: 110,
		margin: 10,
		width: 150,
		template: function(e, t) {
			var n = "webix_fmanager_data_icon",
				i = t.templateName(e, t);
			return "<div class='webix_fmanager_file'><div class='" + n + "'>" + t.templateIcon(e, t) + "</div>" + i + "</div>"
		}
	})
}, function(e, t) {
	"use strict";
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
}, function(e, t, n) {
	"use strict";
	n(12), n(13), n(14), n(15), n(16), n(17)
}, function(e, t) {
	"use strict";
	webix.protoUI({
		name: "filelist"
	}, webix.EditAbility, webix.ui.list)
}, function(e, t) {
	"use strict";
	webix.protoUI({
		name: "filemenu"
	}, webix.ContextHelper, webix.ui.submenu)
}, function(e, t) {
	"use strict";
	webix.protoUI({
		name: "filetree",
		$dragHTML: function(e, t) {
			var n = webix.DragControl.getContext(),
				i = this.type,
				o = i.dragTemplate(e, i),
				a = webix.html.getTextSize(o),
				r = webix.html.offset(this.$view),
				s = t.x - r.x;
			return n.x_offset = s > a.width ? -a.width / 4 : -s, n.y_offset = -a.height / 2, "<div class='webix_tree_item webix_fmanager_drag' style='width:auto'>" + o + "</div>"
		}
	}, webix.EditAbility, webix.ui.tree)
}, function(e, t) {
	"use strict";
	webix.protoUI({
		name: "filetable",
		$dragHTML: function(e, t) {
			var n = webix.DragControl.getContext(),
				i = this.getColumnIndex("value"),
				o = this.config.columns[i].template(e, this.type),
				a = webix.html.getTextSize(o),
				r = webix.html.offset(this.$view),
				s = t.x - r.x;
			n.x_offset = s > a.width ? -a.width / 4 : -s, n.y_offset = -a.height / 2;
			var c = "<div class='webix_dd_drag webix_fmanager_drag' >";
			return c += "<div style='width:" + (a.width + 40) + "px'>" + o + "</div>", c + "</div>"
		}
	}, webix.ui.datatable)
}, function(e, t) {
	"use strict";
	webix.protoUI({
		name: "fileview"
	}, webix.EditAbility, webix.ui.dataview)
}, function(e, t) {
	"use strict";
	webix.protoUI({
		name: "path",
		defaults: {
			layout: "x",
			separator: ",",
			scroll: !1
		},
		$skin: function() {
			this.type.height = webix.skin.$active.buttonHeight || webix.skin.$active.inputHeight
		},
		$init: function() {
			this.$view.className += " webix_path"
		},
		value_setter: function(e) {
			return this.setValue(), e
		},
		setValue: function(e) {
			this.clearAll(), e && ("string" == typeof e && (e = e.split(this.config.separator)), this.parse(webix.copy(e)))
		},
		getValue: function() {
			return this.serialize()
		}
	}, webix.ui.list)
}, function(e, t) {
	"use strict";

	function n() {
		return [{
			id: "copy",
			batch: "item",
			method: "markCopy",
			icon: "fm-copy",
			value: webix.i18n.filemanager.copy
		}, {
			id: "cut",
			batch: "item",
			method: "markCut",
			icon: "fm-cut",
			value: webix.i18n.filemanager.cut
		}, {
			id: "paste",
			method: "pasteFile",
			icon: "fm-paste",
			value: webix.i18n.filemanager.paste
		}, {
			$template: "Separator"
		}, {
			id: "create",
			method: "createFolder",
			icon: "fm-folder",
			value: webix.i18n.filemanager.create
		}, {
			id: "remove",
			batch: "item",
			method: "deleteFile",
			icon: "fm-delete",
			value: webix.i18n.filemanager.remove
		}, {
			id: "edit",
			batch: "item",
			method: "editFile",
			icon: "fm-edit",
			value: webix.i18n.filemanager.rename
		}, {
			id: "upload",
			method: "uploadFile",
			event: "UploadDialog",
			icon: "fm-upload",
			value: webix.i18n.filemanager.upload
		}]
	}
	function i(e) {
		e.attachEvent("onComponentInit", function() {
			return o(e)
		});
		var t = e.config.templateName,
			i = n(),
			a = {
				view: "filemenu",
				id: "actions",
				width: 200,
				padding: 0,
				autofocus: !1,
				css: "webix_fmanager_actions",
				template: function(e, n) {
					var i = t(e, n),
						o = e.icon.indexOf("fm-") == -1 ? "fa-" + e.icon : e.icon;
					return "<span class='webix_fmanager_icon " + o + "'></span> " + i
				},
				data: i
			};
		e.callEvent("onViewInit", ["actions", a]), e._contextMenu = e.ui(a), e.attachEvent("onDestruct", function() {
			e._contextMenu.destructor()
		})
	}
	function o(e) {
		var t = e.getMenu();
		t && (t.attachEvent("onItemClick", function(n, i) {
			var o = this.getItem(n),
				a = e[o.method] || e[n];
			if (a) {
				var r = e.getActive();
				if (e.callEvent("onbefore" + (o.event || o.method || n), [r])) {
					"upload" == n && e.config.legacyUploader || (e._uploadPopup && e._uploadPopup.hide(), t.hide());
					var s = [r];
					"upload" == n && (i = webix.html.pos(i), s.push(i)), webix.delay(function() {
						a.apply(e, s), e.callEvent("onafter" + (o.event || o.method || n), [])
					})
				}
			}
		}), t.attachEvent("onBeforeShow", function(e) {
			t.filter(""), t.hide();
			var n = t.getContext();
			return n && n.obj && !n.id && n.obj.unselectAll(), !n || !n.obj || n.obj.callEvent("onBeforeMenuShow", [n.id, e])
		}))
	}
	t.__esModule = !0, t.init = i
}, function(e, t) {
	"use strict";
	t.__esModule = !0;
	var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
	function(e) {
		return typeof e
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
	};
	t.values = {
		modes: ["files", "table"],
		mode: "table",
		handlers: {},
		structure: {},
		fsIds: !0,
		templateName: webix.template("#value#"),
		templateSize: function(e) {
			for (var t = e.size, n = webix.i18n.filemanager.sizeLabels, i = 0; t / 1024 > 1;) t /= 1024, i++;
			var o = parseInt(t, 10) == t,
				a = webix.Number.numToStr({
					decimalDelimiter: webix.i18n.decimalDelimiter,
					groupDelimiter: webix.i18n.groupDelimiter,
					decimalSize: o ? 0 : webix.i18n.groupSize
				});
			return a(t) + "" + n[i]
		},
		templateType: function(e) {
			var t = webix.i18n.filemanager.types;
			return t && t[e.type] ? t[e.type] : e.type
		},
		templateDate: function(e) {
			var t = e.date;
			return "object" != ("undefined" == typeof t ? "undefined" : n(t)) && (t = new Date(1e3 * parseInt(e.date, 10))), webix.i18n.fullDateFormatStr(t)
		},
		templateCreate: function() {
			return {
				value: "newFolder",
				type: "folder",
				date: new Date
			}
		},
		templateIcon: function(e, t) {
			return "<div class='webix_fmanager_icon fm-" + (t.icons[e.type] || t.icons.file) + "'></div>"
		},
		uploadProgress: {
			type: "icon",
			hide: !1
		},
		icons: {
			folder: "folder",
			excel: "file-excel",
			pdf: "file-pdf",
			pp: "file-powerpoint",
			text: "file-text",
			video: "file-video",
			image: "file-image",
			code: "file-code",
			audio: "file-audio",
			archive: "file-archive",
			doc: "file-word",
			file: "file"
		}
	}
}, function(e, t) {
	"use strict";

	function n(e) {
		e._cursorHistory = webix.extend([], webix.PowerArray, !0), e.$ready.push(function() {
			return i(e)
		})
	}
	function i(e) {
		e.attachEvent("onAfterLoad", function() {
			if (!e.config.disabledHistory) {
				var t = window.location.hash;
				t && 0 === t.indexOf("#!/") && e.setPath(t.replace("#!/", ""))
			}
		}), e.attachEvent("onAfterCursorChange", function(t) {
			e._historyIgnore || (e._historyCursor || e._cursorHistory.splice(1), e._cursorHistory[this._historyCursor] != t && (20 == e._cursorHistory.length && e._cursorHistory.splice(0, 1), e._cursorHistory.push(t), e._historyCursor = this._cursorHistory.length - 1)), e._historyIgnore = !1, e.config.disabledHistory || o(e, t), e.callEvent("onHistoryChange", [t, e._cursorHistory, e._historyCursor])
		})
	}
	function o(e, t) {
		t = t || e.getCursor(), window.history && window.history.replaceState ? window.history.replaceState({
			webix: !0,
			id: e.config.id,
			value: t
		}, "", "#!/" + t) : window.location.hash = "#!/" + t
	}
	function a(e, t) {
		if (e._cursorHistory.length > 1) {
			var n = e._historyCursor + t;
			n > -1 && n < e._cursorHistory.length && (e._historyIgnore = !0, e._historyCursor = n, e.setCursor(e._cursorHistory[n]))
		}
		return e.getCursor()
	}
	t.__esModule = !0, t.init = n, t.changeCursor = a
}, function(e, t, n) {
	"use strict";

	function i(e) {
		if (e && e.__esModule) return e;
		var t = {};
		if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
		return t["default"] = e, t
	}
	function o(e) {
		e.attachEvent("onBeforeCursorChange", function() {
			return e.$skipDynLoading = !1, !0
		}), a(e)
	}
	function a(e) {
		e.dataParser = {
			files: function(e, t) {
				this.config.noFileCache ? s(this, e.id) : e.webix_files = 0, c(this, t)
			},
			branch: function(e, t) {
				this.config.noFileCache ? s(this, e.id) : (e.webix_branch = 0, e.webix_child_branch = 0), c(this, t)
			}
		}
	}
	function r(e, t, n, i, o) {
		if (e.showProgress(), e.callEvent("onBeforeDynLoad", [t, n, i, o])) {
			var a = {
				success: function(t, a) {
					e.hideProgress();
					var r = e.data.driver.toObject(t, a);
					o && (n.open = !0), e.callEvent("onBeforeDynParse", [n, r, i]) && (e.dataParser[i].call(e, n, r), e.callEvent("onAfterDynParse", [n, r, i]))
				},
				error: function() {
					e.hideProgress(), e.callEvent("onDynLoadError", [])
				}
			};
			if (t.load) return t.load(null, a, {
				action: i,
				source: n.id
			})
		}
	}
	function s(e, t) {
		var n = [];
		e.data.eachChild(t, function(t) {
			e.data.branch[t.id] || "folder" == t.type || n.push(t.id)
		}, e, !0);
		for (var i = 0; i < n.length; i++) e.remove(n[i])
	}
	function c(e, t) {
		e.parse(t), e.$skipDynLoading = !0, e._refreshActiveFolder(), e.$skipDynLoading = !1
	}
	function l(e, t) {
		var n, i, o, a = webix.promise.defer();
		if (n = f(e), n && t.length) {
			for (i = 0; i < t.length; i++) {
				if (o = e.getItem(t[i]), !o || o["webix_" + n]) return u(e, t.slice(i), n, a), a;
				o.open = !0, e.$$("tree") && e.$$("tree").refresh(t[i])
			}
			a.resolve(t[i])
		} else a.reject();
		return a
	}
	function u(e, t, n, i) {
		var o = e.getItem(t[0]);
		e.showProgress();
		var a = e.config.handlers[n],
			r = {
				success: function(a, r) {
					e.hideProgress();
					var s = e.data.driver.toObject(a, r);
					if (e.callEvent("onBeforeDynParse", [o, s, n])) {
						o.open = !0, e.dataParser[n].call(e, o, s);
						var c = t.shift();
						t.length && "folder" == e.getItem(t[0]).type ? u(e, t, n, i) : (e.refreshCursor(), i.resolve(c)), e.callEvent("onAfterDynParse", [o, s, n])
					}
				}
			};
		if (a.load) return a.load(null, r, {
			action: n,
			source: t[0]
		})
	}
	function f(e) {
		for (var t in e.dataParser) if (e.config.handlers[t]) return t;
		return null
	}
	function d(e, t, n, i) {
		var o = {
			action: "search",
			source: n,
			text: i
		};
		if (e.callEvent("onBeforeSearchRequest", [n, o])) {
			var a = {
				success: function(t, n) {
					e.hideProgress();
					var o = e.data.driver.toObject(t, n);
					h(e, o), e.$searchValue = i
				},
				error: function() {
					e.hideProgress()
				}
			};
			if (t.load) return t.load(null, a, o)
		}
	}
	function h(e, t) {
		e.callEvent("onShowSearchResults", []), e.$searchResults = !0;
		var n = e.$$(e.config.mode);
		n && n.filter && (n.clearAll(), e.sortState && e.sortState.view == n.config.id && (t = g.sortData(e.sortState.sort, t)), n.parse(t))
	}
	t.__esModule = !0, t.init = o, t.loadDynData = r, t.clearBranch = s, t.parseData = c, t.openFolders = l, t.getDynMode = f, t.loadSearchData = d, t.parseSearchData = h;
	var v = n(22),
		g = i(v)
}, function(e, t) {
	"use strict";

	function n(e, t) {
		for (var n = webix.DataStore.prototype.sorting.create(e), i = [], o = [], a = 0; a < t.length; a++)"folder" == t[a].type ? i.push(t[a]) : o.push(t[a]);
		return i.sort(n), o.sort(n), i.concat(o)
	}
	t.__esModule = !0, t.sortData = n
}, function(e, t) {
	"use strict";

	function n(e, t) {
		t = t || e.getCursor();
		for (var n = []; t && e.getItem(t);) n.push(t), t = e.getParentId(t);
		return n.reverse()
	}
	function i(e, t) {
		t = t || e.getCursor();
		for (var n = null, i = []; t && e.getItem(t);) n = e.getItem(t), i.push({
			id: t,
			value: e.config.templateName(n)
		}), t = e.getParentId(t);
		return i.reverse()
	}
	function o(e, t) {
		for (var n = t; n && e.getItem(n);) e.callEvent("onPathLevel", [n]), n = e.getParentId(n);
		if (e.getItem(t)) t != e.getCursor() && (e.setCursor(t), e.callEvent("onPathComplete", [t]));
		else {
			var i = a(t);
			e.openFolders(i).then(function() {
				e.setCursor(t), e.callEvent("onPathComplete", [t])
			})
		}
	}
	function a(e) {
		var t, n, i = [];
		if ("string" == typeof e) for (n = e.replace(/^\//, "").split("/"), t = 0; t < n.length; t++) i.push(n.slice(0, t + 1).join("/"));
		return i
	}
	t.__esModule = !0, t.getPath = n, t.getPathNames = i, t.setPath = o, t.getParentFolders = a
}, function(e, t) {
	"use strict";

	function n(e, t, n, r) {
		if (e.callEvent("onBeforeRequest", [t, n]) && (i(e), t.load)) {
			var s = {
				success: function(t, i) {
					var a = e.data.driver.toObject(t, i);
					o(e), e.callEvent("onSuccessResponse", [n, a]) && r && r.call(e, n, a)
				},
				error: function(t) {
					e.callEvent("onErrorResponse", [n, t]) && a(e, t)
				}
			};
			t.load(null, s, webix.copy(n))
		}
	}
	function i(e, t) {
		e._saveMessageDate = new Date, e._saveMessage || (e._saveMessage = webix.html.create("DIV", {
			"class": "webix_fmanager_save_message"
		}, ""), e.$view.style.position = "relative", webix.html.insertBefore(e._saveMessage, e.$view));
		var n = "";
		n = t ? webix.i18n.filemanager.errorResponse : webix.i18n.filemanager.saving, e._saveMessage.innerHTML = n
	}
	function o(e) {
		e._saveMessage && (webix.html.remove(e._saveMessage), e._saveMessage = null)
	}
	function a(e) {
		var t = e.data.url;
		if (t) {
			var n = e.data.driver;
			i(e, !0), webix.ajax().get(t, {
				success: function(i, o) {
					var a = n.toObject(i, o);
					a && (a = n.getDetails(n.getRecords(a)), e.clearAll(), e.parse(a), e.data.url = t)
				},
				error: function() {}
			})
		}
	}
	t.__esModule = !0, t.makeSaveRequest = n, t.errorHandler = a
}, function(e, t) {
	"use strict";

	function n(e) {
		e.$$("treeLayout") && (e.$$("treeLayout").hide(), e.$$("resizer") && e.$$("resizer").hide(), e.$$("sidePanel") && e.$$("sidePanel").show())
	}
	function i(e) {
		e.$$("treeLayout") && (e.$$("treeLayout").show(), e.$$("resizer") && e.$$("resizer").show(), e.$$("sidePanel") && e.$$("sidePanel").hide())
	}
	t.__esModule = !0, t.hideTree = n, t.showTree = i
}, function(e, t, n) {
	"use strict";

	function i(e) {
		if (e && e.__esModule) return e;
		var t = {};
		if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
		return t["default"] = e, t
	}
	function o(e, t) {
		e.structure = {
			mainLayout: I.init(e),
			toolbar: X.init(e),
			menu: S.init(e),
			back: f.init(e),
			forward: $.init(e),
			up: Z.init(e),
			path: B.init(e),
			search: T.init(e),
			bodyLayout: h.init(e),
			treeLayout: j.init(e),
			sidePanel: V.init(e),
			treeToolbar: O.init(e),
			showTree: q.init(e),
			hideTree: q.init(e),
			expandAll: b.init(e),
			collapseAll: g.init(e),
			tree: Y.init(e),
			modeViews: {
				config: function(t) {
					return M.init(e, t)
				}
			},
			modes: {
				config: function(t) {
					return F.init(e, t)
				}
			},
			files: {
				config: x.init(e)
			},
			table: {
				config: U.init(e)
			},
			columns: {
				config: m.init(e)
			}
		}, l(e, t)
	}
	function a(e, t, n) {
		var i, o, s, c, l = "",
			u = ["rows", "cols", "elements", "cells", "columns", "options", "data"];
		for (s = 0; s < u.length; s++) t[u[s]] && (l = u[s], i = t[l]);
		if (i) for ("string" == typeof i && e.structure[i] && (t[l] = r(e, e.structure[i], n), i = t[l]), s = 0; s < i.length; s++) o = null, "string" == typeof i[s] && (o = c = i[s], e.structure[c] ? (i[s] = r(e, webix.extend({}, e.structure[c]), n), i[s].id = c) : i[s] = {}), a(e, i[s], n), o && (n.on && n.on.onViewInit && n.on.onViewInit.apply(this, [o, i[s]]), webix.callEvent("onViewInit", [o, i[s], this]))
	}
	function r(e, t, n) {
		var i = t.config || t;
		return "function" == typeof i ? i.call(e, n) : webix.copy(i)
	}
	function s() {
		return "undefined" != typeof SVGRect
	}
	function c(e, t) {
		var n = e.structure.mainLayout,
			i = webix.extend({}, n.config || n);
		return a(e, i, t), t.on && t.on.onViewInit && t.on.onViewInit.apply(e, [t.id || "mainLayout", i]), webix.callEvent("onViewInit", [t.id || "mainLayout", i, e]), s() || (t.css = t.css ? t.css + " webix_nosvg" : "webix_nosvg"), i
	}
	function l(e, t) {
		var n, i, o = t.structure;
		if (o) for (i in o) o.hasOwnProperty(i) && (n = webix.copy(o[i]), e.structure[i] && e.structure[i].config ? e.structure[i].config = n.config || n : e.structure[i] = n.config || n)
	}
	t.__esModule = !0, t.init = o, t.getViews = a, t.getCellConfig = r, t.getUI = c;
	var u = n(27),
		f = i(u),
		d = n(28),
		h = i(d),
		v = n(29),
		g = i(v),
		p = n(30),
		m = i(p),
		w = n(31),
		b = i(w),
		_ = n(32),
		x = i(_),
		y = n(33),
		$ = i(y),
		E = n(34),
		I = i(E),
		C = n(35),
		S = i(C),
		D = n(36),
		F = i(D),
		A = n(37),
		M = i(A),
		P = n(38),
		B = i(P),
		k = n(39),
		T = i(k),
		R = n(40),
		V = i(R),
		L = n(41),
		U = i(L),
		H = n(42),
		j = i(H),
		z = n(43),
		O = i(z),
		N = n(44),
		q = i(N),
		K = n(45),
		X = i(K),
		W = n(46),
		Y = i(W),
		G = n(47),
		Z = i(G)
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "button",
			type: "htmlbutton",
			css: "webix_fmanager_back",
			label: '<div class="webix_fmanager_bar_icon "></div>',
			width: 37,
			tooltip: webix.i18n.filemanager.back
		}
	}
	function i(e) {
		e.$$("back") && (e.$$("back").attachEvent("onItemClick", function() {
			e.callEvent("onBeforeBack", []) && (e.goBack(), e.callEvent("onAfterBack", []))
		}), e.attachEvent("onHistoryChange", function(t, n, i) {
			i ? e.$$("back").enable() : e.$$("back").disable()
		}))
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n() {
		return {
			css: "webix_fmanager_body",
			cols: ["sidePanel", "treeLayout",
			{
				view: "resizer",
				id: "resizer",
				width: 3
			}, "modeViews"]
		}
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "button",
			type: "htmlbutton",
			css: "webix_fmanager_collapse",
			label: '<div class="webix_fmanager_bar_icon "></div>',
			width: 30,
			tooltip: webix.i18n.filemanager.collapseTree
		}
	}
	function i(e) {
		e._getDynMode() && e.$$("collapseAll") && e.$$("collapseAll").hide(), e.$$("collapseAll") && e.$$("tree") && e.$$("collapseAll").attachEvent("onItemClick", function() {
			e.$$("tree").closeAll()
		})
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		var t = webix.i18n.filemanager;
		return [{
			id: "value",
			header: t.name,
			fillspace: 3,
			sort: "string",
			template: function(e, t) {
				var n = t.templateName(e, t);
				return t.templateIcon(e, t) + n
			},
			editor: "text"
		}, {
			id: "date",
			header: t.date,
			fillspace: 2,
			sort: "int",
			template: function(e, t) {
				return t.templateDate(e, t)
			}
		}, {
			id: "type",
			header: t.type,
			fillspace: 1,
			sort: "string",
			template: function(e, t) {
				return t.templateType(e)
			}
		}, {
			id: "size",
			header: t.size,
			fillspace: 1,
			sort: "int",
			css: {
				"text-align": "right"
			},
			template: function(e, t) {
				return "folder" == e.type ? "" : t.templateSize(e)
			}
		}, {
			id: "location",
			header: t.location,
			fillspace: 2,
			sort: "string",
			template: function(t) {
				return e._getLocation(t)
			},
			hidden: !0
		}]
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "button",
			type: "htmlbutton",
			css: "webix_fmanager_expand",
			label: '<div class="webix_fmanager_bar_icon "></div>',
			width: 30,
			tooltip: webix.i18n.filemanager.expandTree
		}
	}
	function i(e) {
		e._getDynMode() && e.$$("expandAll") && e.$$("expandAll").hide(), e.$$("expandAll") && e.$$("tree") && e.$$("expandAll").attachEvent("onItemClick", function() {
			e.$$("tree").openAll()
		})
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n() {
		return {
			view: "fileview",
			type: "FileView",
			select: "multiselect",
			editable: !0,
			editaction: !1,
			editor: "text",
			editValue: "value",
			drag: !0,
			navigation: !0,
			tabFocus: !0,
			onContext: {}
		}
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "button",
			type: "htmlbutton",
			css: "webix_fmanager_forward",
			label: '<div class="webix_fmanager_bar_icon "></div>',
			width: 37,
			tooltip: webix.i18n.filemanager.forward
		}
	}
	function i(e) {
		e.$$("forward") && (e.$$("forward").attachEvent("onItemClick", function() {
			e.callEvent("onBeforeForward", []) && (e.goForward(), e.callEvent("onAfterForward", []))
		}), e.attachEvent("onHistoryChange", function(t, n, i) {
			1 == n.length || i == n.length - 1 ? e.$$("forward").disable() : e.$$("forward").enable()
		}))
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n() {
		var e = {
			type: "clean",
			rows: ["toolbar", "bodyLayout"]
		};
		return "undefined" == typeof SVGRect && (e.css = "webix_nosvg"), e
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "button",
			type: "htmlbutton",
			label: '<div class="webix_fmanager_bar_icon "></div>',
			css: "webix_fmanager_menu",
			icon: "bars",
			width: 37,
			tooltip: webix.i18n.filemanager.actions
		}
	}
	function i(e) {
		var t = e.$$("menu");
		t && (t.attachEvent("onItemClick", function() {
			e.callEvent("onBeforeMenu", []) && (e.getMenu().setContext({
				obj: e.getActiveView(),
				id: e.getActive()
			}), e.getMenu().show(t.$view), e.callEvent("onAfterMenu", []))
		}), e.config.readonly && (t.hide(), e.$$("menuSpacer") && e.$$("menuSpacer").hide()))
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e, t) {
		e.attachEvent("onComponentInit", function() {
			return i(e)
		});
		var n = {
			view: "segmented",
			width: 70,
			options: [{
				id: "files",
				width: 32,
				value: '<div class="webix_fmanager_bar_icon webix_fmanager_files_mode "></div>',
				tooltip: webix.i18n.filemanager.iconsView
			}, {
				id: "table",
				width: 32,
				value: '<div class="webix_fmanager_bar_icon webix_fmanager_table_mode "></div>',
				tooltip: webix.i18n.filemanager.tableView
			}],
			css: "webix_fmanager_modes",
			value: t.mode
		};
		return n
	}
	function i(e) {
		e.$$("modes") && e.$$("modes").attachEvent("onBeforeTabClick", function(t) {
			var n = e.$$("modes").getValue();
			return !(!e.callEvent("onBeforeModeChange", [n, t]) || !e.$$(t)) && (e.config.mode = t, e.$$(t).show(), e.callEvent("onAfterModeChange", [n, t]), !0)
		})
	}
	t.__esModule = !0, t.init = n
}, function(e, t, n) {
	"use strict";

	function i(e) {
		if (e && e.__esModule) return e;
		var t = {};
		if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
		return t["default"] = e, t
	}
	function o(e, t) {
		return e.attachEvent("onComponentInit", function() {
			return a(e)
		}), {
			animate: !1,
			cells: t.modes ? webix.copy(t.modes) : []
		}
	}
	function a(e) {
		var t, n, i = e.$$(e.config.mode),
			o = e.config.modes;
		if (i && (i.show(), e.attachEvent("onBeforeCursorChange", function() {
			var t = e.$$(e.config.mode);
			return t && t.unselect(), !0
		}), e.attachEvent("onAfterCursorChange", function() {
			var t = e.$$(e.config.mode);
			t && t.editStop()
		})), o) for (t = 0; t < o.length; t++) n = e.$$(o[t]), n && n.filter && r(e, n)
	}
	function r(e, t) {
		s(e, t), l(e, t), f(e, t);
		var n = e.getMenu();
		n && !e.config.readonly && u(e, t, n), e.config.readonly && (t.define("drag", !1), t.define("editable", !1))
	}
	function s(e, t) {
		e.data.attachEvent("onClearAll", function() {
			return t.clearAll()
		}), e.data.attachEvent("onIdChange", function(e, n) {
			t.data.pull[e] && t.data.changeId(e, n)
		}), t.attachEvent("onBeforeSelect", function() {
			t.$skipBinding = !0
		}), e.attachEvent("onBeforeCursorChange", function() {
			t.$skipBinding = !1
		}), e.attachEvent("onAfterCursorChange", function() {
			t.$skipBinding = !1
		}), t.bind(e, "$data", function(n, i) {
			var o;
			if (t.$skipBinding) return !1;
			if (!n) return t.clearAll();
			if (!e.$searchResults) {
				if (!e.$skipDynLoading) for (var a in e.dataParser)!o && n["webix_" + a] && (o = e.config.handlers[a], o && (e.$skipDynLoading = !0, e.loadDynData(o, n, a)));
				c(e, t, i, n)
			}
		})
	}
	function c(e, t, n, i) {
		var o = [].concat(webix.copy(n.data.getBranch(i.id))).concat(i.files || []);
		e.sortState && e.sortState.view == t.config.id && (o = h.sortData(e.sortState.sort, o)), t.data.importData(o, !0)
	}
	function l(e, t) {
		t.type.icons = e.config.icons, t.type.templateIcon = e.config.templateIcon, t.type.templateName = e.config.templateName, t.type.templateSize = e.config.templateSize, t.type.templateDate = e.config.templateDate, t.type.templateType = e.config.templateType
	}
	function u(e, t, n) {
		t.on_context.webix_view = function(e, t) {
			t = this.locate(e.target || e.srcElement), t || (n.setContext && n.setContext({
				obj: webix.$$(e)
			}), n.show(e), webix.html.preventEvent(e))
		}, n.attachTo(t), t.attachEvent("onBeforeMenuShow", function() {
			var t = n.getContext(),
				i = "";
			if (t.id && (i = "folder" === e.getItem(t.id).type ? "folder" : "file"), n.filter(function(t) {
				var n = !0;
				return t.batch && (n = i ? t.batch == i || "item" == t.batch : "empty" == t.batch), e.config.menuFilter && (n = n && e.config.menuFilter(t)), n
			}), n.count() && t.id) {
				webix.UIManager.setFocus(this);
				var o = this.getSelectedId(),
					a = !1;
				if (webix.isArray(o)) for (var r = 0; !a && r < o.length; r++)"" + o[r] == "" + t.id && (a = !0);
				!a && this.exists(t.id) && this.select(t.id)
			}
			return n.count() > 0
		}), t.attachEvent("onAfterMenuShow", function(e) {
			if (e) {
				for (var t = this.getSelectedId(!0), n = !1, i = 0; i < t.length && !n; i++) t[i].toString() == e.toString() && (n = !0);
				n || this.select(e.toString()), webix.UIManager.setFocus(this)
			} else this.unselect()
		})
	}
	function f(e, t) {
		t.attachEvent("onAfterSelect", function(t) {
			e.getItem(t) && e.callEvent("onItemSelect", [t])
		}), t.attachEvent("onItemDblClick", function(t) {
			e._onFileDblClick(t)
		}), e._addElementHotKey("tab", function(e) {
			if (!e.getSelectedId()) {
				var t = e.getFirstId();
				t && e.select(t)
			}
		}, t), t.attachEvent("onFocus", function() {
			e._activeView = this, webix.html.removeCss(this.$view, "webix_blur")
		}), t.attachEvent("onBlur", function() {
			e.getMenu() && e.getMenu().isVisible() || webix.html.addCss(t.$view, "webix_blur")
		}), t.attachEvent("onBeforeEditStop", function(e, t) {
			return this.getTopParentView().callEvent("onBeforeEditStop", [t.id || t.row, e, t, this])
		}), t.attachEvent("onAfterEditStop", function(e, t) {
			var n = this.getTopParentView();
			n.callEvent("onAfterEditStop", [t.id || t.row, e, t, this]) && (t.column && "value" != t.column ? t.column && (n.getItem(t.id || t.row)[t.column] = e.value) : n.renameFile(t.id || t.row, e.value))
		}), t.attachEvent("onBeforeDrop", function(t) {
			return e.callEvent("onBeforeDrop", [t]) && t.from && e.moveFile(t.source, t.target), !1
		}), t.attachEvent("onBeforeDrag", function(t, n) {
			return !e.config.readonly && e.callEvent("onBeforeDrag", [t, n])
		}), t.attachEvent("onBeforeDragIn", function(t, n) {
			return !e.config.readonly && e.callEvent("onBeforeDragIn", [t, n])
		}), e._addElementHotKey("enter", function(t) {
			for (var n = t.getSelectedId(!0), i = 0; i < n.length; i++) e._onFileDblClick(n[i]);
			if (webix.UIManager.setFocus(t), n = t.getSelectedId(!0), !n.length) {
				var o = t.getFirstId();
				o && t.select(o)
			}
		}, t)
	}
	t.__esModule = !0, t.init = o;
	var d = n(22),
		h = i(d)
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "path",
			borderless: !0
		}
	}
	function i(e) {
		e.$$("path") && (e.attachEvent("onFolderSelect", function(t) {
			e.$$("path").setValue(e.getPathNames(t))
		}), e.$$("path").attachEvent("onItemClick", function(t) {
			var n = e.$$("path").getIndexById(t),
				i = e.$$("path").count() - n - 1;
			if (e.$searchResults && e.hideSearchResults(), i) {
				for (t = e.getCursor(); i;) t = e.getParentId(t), i--;
				e.setCursor(t)
			}
			e.callEvent("onAfterPathClick", [t])
		}), e.data.attachEvent("onClearAll", function() {
			e.$$("path").clearAll()
		}))
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "search",
			gravity: .3,
			minWidth: 80,
			css: "webix_fmanager_search",
			icon: " webix_fmanager_icon"
		}
	}
	function i(e) {
		var t = e.$$("search");
		t && (e.attachEvent("onHideSearchResults", function() {
			t.setValue("")
		}), e.attachEvent("onBeforeCursorChange", function() {
			e.$searchResults && e.hideSearchResults(!0)
		}), t.attachEvent("onTimedKeyPress", function() {
			if (9 != this._code) {
				var n = t.getValue();
				n ? e.callEvent("onBeforeSearch", [n]) && (e.showSearchResults(n), e.callEvent("onAfterSearch", [n])) : e.$searchResults && e.hideSearchResults()
			}
		}), t.attachEvent("onKeyPress", function(e) {
			this._code = e
		}), e.attachEvent("onAfterModeChange", function() {
			e.$searchResults && e.showSearchResults(t.getValue())
		}))
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			hidden: !0,
			css: "webix_fmanager_panel",
			type: "clean",
			rows: [{
				height: 34,
				paddingY: 1,
				paddingX: 0,
				view: "form",
				cols: [{
					view: "button",
					id: "showTree",
					type: "htmlbutton",
					css: "webix_fmanager_toggle",
					label: '<div class="webix_fmanager_bar_icon "></div>',
					width: 30,
					tooltip: webix.i18n.filemanager.showTree
				}]
			}, {
				template: " "
			}]
		}
	}
	function i(e) {
		e.$$("showTree") && e.$$("showTree").attachEvent("onItemClick", function() {
			e.showTree()
		})
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "filetable",
			css: "webix_fmanager_table",
			columns: "columns",
			headerRowHeight: 34,
			editable: !0,
			editaction: !1,
			select: "multiselect",
			drag: !0,
			navigation: !0,
			resizeColumn: !0,
			tabFocus: !0,
			onContext: {}
		}
	}
	function i(e) {
		e.$$("table") && (e.attachEvent("onHideSearchResults", function() {
			e.$$("table").isColumnVisible("location") && e.$$("table").hideColumn("location")
		}), e.attachEvent("onShowSearchResults", function() {
			e.$$("table").isColumnVisible("location") || e.$$("table").showColumn("location")
		}), e.$$("table").attachEvent("onBeforeEditStart", function(e) {
			return "object" == ("undefined" == typeof e ? "undefined" : o(e)) || (this.edit({
				row: e,
				column: "value"
			}), !1)
		}), e.$$("table").data.attachEvent("onBeforeSort", function(t, n, i, o) {
			if (e.sortState = {
				view: e.$$("table").config.id,
				sort: o
			}, e.$searchResults && e.$$("search")) return e.showSearchResults(e.$$("search").getValue()), !1
		}), e.data.attachEvent("onClearAll", function() {
			e.sortState = null
		}))
	}
	t.__esModule = !0;
	var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
	function(e) {
		return typeof e
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
	};
	t.init = n
}, function(e, t) {
	"use strict";

	function n() {
		return {
			rows: ["treeToolbar", "tree"]
		}
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n() {
		return {
			css: "webix_fmanager_tree_toolbar",
			height: 34,
			paddingX: 8,
			paddingY: 1,
			margin: 7,
			cols: ["hideTree",
			{
				id: "treeSpacer"
			}, "expandAll", "collapseAll"]
		}
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "button",
			type: "htmlbutton",
			css: "webix_fmanager_toggle",
			label: '<div class="webix_fmanager_bar_icon "></div>',
			width: 30,
			tooltip: webix.i18n.filemanager.hideTree
		}
	}
	function i(e) {
		e.$$("hideTree") && e.$$("hideTree").attachEvent("onItemClick", function() {
			e.hideTree()
		})
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n() {
		return {
			css: "webix_fmanager_toolbar",
			paddingX: 10,
			paddingY: 5,
			margin: 7,
			cols: ["menu",
			{
				id: "menuSpacer",
				width: 75
			}, {
				margin: 0,
				cols: ["back", "forward"]
			}, "up", "path", "search", "modes"]
		}
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			width: 251,
			view: "filetree",
			id: "tree",
			select: !0,
			filterMode: {
				showSubItems: !1,
				openParents: !1
			},
			type: "FileTree",
			navigation: !0,
			editor: "text",
			editable: !0,
			editaction: !1,
			drag: !0,
			tabFocus: !0,
			onContext: {}
		}
	}
	function i(e) {
		var t, n = e.$$("tree");
		if (n) {
			n.type.icons = e.config.icons, n.sync(e, function() {
				this.filter(function(e) {
					return e.$count || "folder" == e.type
				})
			}), n.on_click.webix_tree_child_branch = function(t, n) {
				var i = e.config.handlers.branch;
				i && e.loadDynData(i, this.getItem(n), "branch", !0)
			}, e.attachEvent("onBeforeDynParse", function() {
				t = n.getState()
			}), e.attachEvent("onAfterDynParse", function(e, i, o) {
				t && (n.setState(t), t = null), "branch" == o && e.open && n.open(e.id)
			}), n.attachEvent("onAfterSelect", function(t) {
				e.callEvent("onFolderSelect", [t])
			}), e.attachEvent("onAfterCursorChange", function(e) {
				e && (n.select(e), n.showItem(e))
			}), n.attachEvent("onItemClick", function() {
				e.$searchResults && e.hideSearchResults()
			}), e.attachEvent("onItemRename", function(e) {
				n.refresh(e)
			}), n.attachEvent("onItemDblClick", function(e) {
				this.isBranchOpen(e) ? this.close(e) : this.open(e)
			}), n.attachEvent("onBlur", function() {
				e.getMenu() && e.getMenu().isVisible() || webix.html.addCss(this.$view, "webix_blur")
			}), n.attachEvent("onFocus", function() {
				e._activeView = n, webix.html.removeCss(n.$view, "webix_blur"), e.$$(e.config.mode).unselect()
			}), e.attachEvent("onPathComplete", function(e) {
				n.showItem(e)
			}), e.config.readonly || (e.getMenu() && e.getMenu().attachTo(n), n.attachEvent("onBeforeMenuShow", function(t) {
				var n = e.getMenu(),
					i = n.getContext(),
					o = "";
				return i.id && this.getParentId(i.id) && (o = "folder" === e.getItem(i.id).type ? "folder" : "file"), n.filter(function(t) {
					var n = !0;
					return t.batch && (n = o ? t.batch == o || "item" == t.batch : "empty" == t.batch), e.config.menuFilter && (n = n && e.config.menuFilter(t)), n
				}), this.select(t), webix.UIManager.setFocus(this), n.count() > 0
			})), n.attachEvent("onBeforeEditStop", function(t, i) {
				return e.callEvent("onBeforeEditStop", [i.id, t, i, n])
			}), n.attachEvent("onAfterEditStop", function(t, i) {
				e.callEvent("onAfterEditStop", [i.id, t, i, n]) && e.renameFile(i.id, t.value)
			}), n.attachEvent("onBeforeDrag", function(t, n) {
				return !e.config.readonly && e.callEvent("onBeforeDrag", [t, n])
			}), n.attachEvent("onBeforeDragIn", function(t, n) {
				return !e.config.readonly && e.callEvent("onBeforeDragIn", [t, n])
			}), n.attachEvent("onBeforeDrop", function(t, n) {
				return e.callEvent("onBeforeDrop", [t, n]) && t.from && (e.moveFile(t.source, t.target), e.callEvent("onAfterDrop", [t, n])), !1
			});
			var i = function() {
					n && webix.UIManager.setFocus(n)
				};
			e.attachEvent("onAfterBack", i), e.attachEvent("onAfterForward", i), e.attachEvent("onAfterLevelUp", i), e.attachEvent("onAfterPathClick", i), e.config.readonly && (n.define("drag", !1), n.define("editable", !1))
		}
	}
	t.__esModule = !0, t.init = n
}, function(e, t) {
	"use strict";

	function n(e) {
		return e.attachEvent("onComponentInit", function() {
			return i(e)
		}), {
			view: "button",
			type: "htmlbutton",
			css: "webix_fmanager_up",
			label: '<div class="webix_fmanager_bar_icon "></div>',
			width: 37,
			tooltip: webix.i18n.filemanager.levelUp
		}
	}
	function i(e) {
		e.$$("up") && e.$$("up").attachEvent("onItemClick", function() {
			e.callEvent("onBeforeLevelUp", []) && (e.levelUp(), e.callEvent("onAfterLevelUp", []))
		})
	}
	t.__esModule = !0, t.init = n
}, function(e, t, n) {
	"use strict";

	function i(e) {
		if (e && e.__esModule) return e;
		var t = {};
		if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
		return t["default"] = e, t
	}
	function o(e) {
		var t = {};
		return t = e ? {
			view: "uploader",
			css: "webix_upload_select_ie",
			type: "iconButton",
			icon: "check",
			label: webix.i18n.filemanager.select,
			formData: {
				action: "upload"
			},
			urlData: {}
		} : {
			view: "uploader",
			apiOnly: !0,
			formData: {
				action: "upload"
			},
			urlData: {}
		}
	}
	function a(e) {
		var t = e.config.legacyUploader,
			n = o(t);
		n && (t ? s(e, webix.copy(n)) : (e._uploader = webix.ui(n), e.attachEvent("onDestruct", function() {
			e._uploader.destructor()
		}))), r(e)
	}
	function r(e) {
		var t = l(e);
		if (t) {
			t.config.upload = e.config.handlers.upload;
			var n = e.config.modes;
			if (n && !e.config.readonly) for (var i = 0; i < n.length; i++) e.$$(n[i]) && t.addDropZone(e.$$(n[i]).$view);
			t.attachEvent("onBeforeFileAdd", function(n) {
				var i = "" + c(e);
				return t.config.formData.target = i, t.config.urlData.target = i, t.config.upload = e.config.handlers.upload, e.callEvent("onBeforeFileUpload", [n])
			}), t.attachEvent("onAfterFileAdd", function(n) {
				e._uploaderFolder = null, n.oldId = n.id, e.add({
					id: n.id,
					value: n.name,
					type: n.type,
					size: n.size,
					date: Math.round((new Date).valueOf() / 1e3)
				}, -1, t.config.formData.target), e.config.uploadProgress && e.showProgress(e.config.uploadProgress), e._refreshActiveFolder()
			}), t.attachEvent("onUploadComplete", function(t) {
				e._uploadPopup && (e.getMenu().hide(), e._uploadPopup.hide()), e.hideProgress(), e.callEvent("onAfterFileUpload", [t])
			}), t.attachEvent("onFileUpload", function(t) {
				t.oldId && e.data.changeId(t.oldId, t.id), t.value && (e.getItem(t.id).value = t.value), e.getItem(t.id).type = t.type, e._refreshActiveFolder()
			}), t.attachEvent("onFileUploadError", function(t, n) {
				d.errorHandler(e, n), e.hideProgress()
			})
		}
	}
	function s(e, t) {
		t || (t = o(e.config.legacyUploader)), e._uploadPopup = webix.ui({
			view: "popup",
			padding: 0,
			width: 250,
			body: t  
		}), e._uploader = e._uploadPopup.getBody(), e.attachEvent("onDestruct", function() {
			e._uploadPopup.destructor()
		})
	}
	function c(e) {
		return e._uploaderFolder || e.getCursor()
	}
	function l(e) {
		return e._uploader
	}
	function u(e, t, n) {
		e.data.branch[t] || "folder" == e.getItem(t).type || (t = e.getParentId(t)), e._uploaderFolder = t, e._uploadPopup ? (e._uploadPopup.destructor(), s(e), r(e), e._uploadPopup.show(n, {
			x: 20,
			y: 5
		})) : e._uploader && e._uploader.fileDialog()
	}
	t.__esModule = !0, t.init = a, t.getUploader = l, t.uploadFile = u;
	var f = n(24),
		d = i(f)
}]);