define(['jquery', 'bootstrap', 'backend', 'config', 'toastr', 'moment', 'bootstrap-table', 'bootstrap-table-lang', 'bootstrap-table-mobile', 'bootstrap-table-export', 'bootstrap-table-advancedsearch', 'bootstrap-table-commonsearch','bootstrap-table-template'], function ($, undefined, Backend, Config, Toastr, Moment) {
    var Table = {
        list: {},
        // Bootstrap-table 基础配置
        defaults: {
            url: '',
            sidePagination: 'server',
            method: 'get',
            toolbar: "#toolbar",
            search: true,
            cache: false,
            advancedSearch: true,
            commonSearch: false,
            titleForm: '', //为空则不显示标题，不定义默认显示：普通搜索
            idTable: 'advancedTable',
            showExport: true,
            exportDataType: "all",
            exportTypes: ['json', 'xml', 'csv', 'txt', 'doc', 'excel'],
            pageSize: 10,
            pageList: [10, 25, 50],
            pagination: true,
            clickToSelect: true,
            showRefresh: false,
            locale: 'zh-CN',
            showToggle: true,
            showColumns: true,
            sortName: 'id',
            sortOrder: 'desc',
            paginationFirstText: __("First"),
            paginationPreText: __("Previous"),
            paginationNextText: __("Next"),
            paginationLastText: __("Last"),
            mobileResponsive: true,
            cardView: true,
            checkOnInit: true,
            extend: {
                index_url: null,
                add_url: null,
                edit_url: null,
                del_url: null,
                multi_url: null,
                dragsort_url: 'ajax/weigh',
            }
        },
        // Bootstrap-table 列配置
        columnDefaults: {
            align: 'center',
            valign: 'middle',
        },
        config: {
            firsttd: 'tbody tr td:first-child:not(:has(div.card-views))',
            toolbar: '.toolbar',
            refreshbtn: '.btn-refresh',
            addbtn: '.btn-add',
            editbtn: '.btn-edit',
            delbtn: '.btn-del',
            multibtn: '.btn-multi',
            disabledbtn: '.btn-disabled',
            editonebtn: '.btn-editone',
            dragsortfield: 'weigh',
        },
        api: {
            init: function (defaults, columnDefaults, locales) {
                defaults = defaults ? defaults : {};
                Table.defaults = Object.assign(Table.defaults,defaults);
                columnDefaults = columnDefaults ? columnDefaults : {};
                locales = locales ? locales : {};
                // 写入bootstrap-table默认配置
                $.extend(true, $.fn.bootstrapTable.defaults, Table.defaults, defaults);
                // 写入bootstrap-table column配置
                $.extend($.fn.bootstrapTable.columnDefaults, Table.columnDefaults, columnDefaults);
                // 写入bootstrap-table locale配置
                $.extend($.fn.bootstrapTable.locales[Table.defaults.locale], {
                    formatAdvancedSearch: function () {
                        return __('Advanced search');
                    },
                    formatAdvancedSubmitButton: function () {
                        return __("Submit");
                    },
                    formatAdvancedResetButton: function () {
                        return __("Reset");
                    },
                    formatAdvancedCloseButton: function () {
                        return __("Close");
                    }
                }, locales);
                $.extend($.fn.bootstrapTable.defaults,Table.defaults);
            },
            // 绑定事件
            bindevent: function (table, barID, params) {
                //Bootstrap-table的父元素,包含table,toolbar,pagnation
                var parenttable = table.closest('.bootstrap-table');
                //Bootstrap-table配置
                var options = table.bootstrapTable('getOptions');
                options.extend = params ? params : options.extend; 
                //Bootstrap操作区
                var toolbar = barID ? $(barID) : $(options.toolbar, parenttable);

                //当刷新表格时
                table.on('load-error.bs.table', function (status, res) {
                    Toastr.error(__('Unknown data format'));
                });
                //当刷新表格时
                table.on('refresh.bs.table', function (e, settings, data) {
                    $(Table.config.refreshbtn, toolbar).find(".fa").addClass("fa-spin");
                });
                //当双击单元格时
                table.on('dbl-click-row.bs.table', function (e, row, element, field) {
                    $(Table.config.editonebtn, element).trigger("click");
                });
                //当内容渲染完成后
                table.on('post-body.bs.table', function (e, settings, json, xhr) {
                    $(Table.config.refreshbtn, toolbar).find(".fa").removeClass("fa-spin");

                    // 挺拽选择,需要重新绑定事件
                    require(['drag', 'drop'], function () {
                        $(Table.config.firsttd, table).drag("start", function (ev, dd) {
                            return $('<div class="selection" />').css('opacity', .65).appendTo(document.body);
                        }).drag(function (ev, dd) {
                            $(dd.proxy).css({
                                top: Math.min(ev.pageY, dd.startY),
                                left: Math.min(ev.pageX, dd.startX),
                                height: Math.abs(ev.pageY - dd.startY),
                                width: Math.abs(ev.pageX - dd.startX)
                            });
                        }).drag("end", function (ev, dd) {
                            $(dd.proxy).remove();
                        });
                        $(Table.config.firsttd, table).drop("start", function () {
                            Table.api.toggleattr(this);
                        }).drop(function () {
                            Table.api.toggleattr(this);
                        }).drop("end", function () {
                            Table.api.toggleattr(this);
                        });
                        $.drop({
                            multi: true
                        });
                    });
                });

                // 处理选中筛选框后按钮的状态统一变更
                table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                    $(Table.config.disabledbtn, toolbar).toggleClass('disabled', !table.bootstrapTable('getSelections').length);
                });
                table.on('click', '.copy-block', function () {
                  try {
                    $(this).prev()[0].select()
                    if(document.execCommand('copy')){
                      Toastr.success('复制成功')
                    } else {
                      Toastr.error('复制失败,请检查浏览器版本')
                    }
                  } catch (e) {
                      Toastr.error('复制失败,请检查浏览器版本')
                  }

                })
                // 刷新按钮事件
                $(toolbar).on('click', Table.config.refreshbtn, function () {
                    table.bootstrapTable('refresh');
                });
                // 添加按钮事件
                $(toolbar).on('click', Table.config.addbtn, function () {
                    var ids = Table.api.selectedids(table);
                    Backend.api.open(options.extend.add_url + "/ids/" + ids.join(","), __('Add'));
                });
                // 编辑按钮事件
                $(toolbar).on('click', Table.config.editbtn, function () {
                    var ids = Table.api.selectedids(table);
                    //循环弹出多个编辑框
                    $.each(ids, function (i, j) {
                        Backend.api.open(options.extend.edit_url + "/ids/" + j, __('Edit'));
                    });
                });
                // 批量操作按钮事件
                $(toolbar).on('click', Table.config.multibtn, function () {
                    var ids = Table.api.selectedids(table);
                    Table.api.multi($(this).data("action"), ids, table, this);
                });
                // 批量删除按钮事件
                $(toolbar).on('click', Table.config.delbtn, function () {
                    var that = this;
                    var ids = Table.api.selectedids(table);
                    var index = Backend.api.layer.confirm(
                            __('Are you sure you want to delete the %s selected item?', ids.length),
                            {icon: 3, title: __('Warning'), offset: 0, shadeClose: true},
                            function () {
                                Table.api.multi("del", ids, table, that);
                                Backend.api.layer.close(index);
                            }
                    );
                });
                // 拖拽排序
                require(['dragsort'], function () {
                    //绑定拖动排序
                    $("tbody", table).dragsort({
                        itemSelector: 'tr',
                        dragSelector: "a.btn-dragsort",
                        dragEnd: function () {
                            var data = table.bootstrapTable('getData');
                            var current = data[parseInt($(this).data("index"))];
                            //改变的值和改变的ID集合
                            var ids = $.map($("tbody tr:visible", table), function (tr) {
                                return data[parseInt($(tr).data("index"))].id;
                            });
                            var changeid = current.id;
                            var pid = typeof current.pid != 'undefined' ? current.pid : '';
                            var options = {
                                url: table.bootstrapTable('getOptions').extend.dragsort_url,
                                data: {
                                    ids: ids.join(','),
                                    changeid: changeid,
                                    pid: pid,
                                    field: Table.config.dragsortfield,
                                    orderway: table.bootstrapTable('getOptions').sortOrder,
                                    table: table.bootstrapTable('getOptions').extend.table
                                }
                            };
                            Backend.api.ajax(options, function (data) {
                                Toastr.success(__('Operation completed'));
                                table.bootstrapTable('refresh');
                            });
                        },
                        placeHolderTemplate: ""
                    });
                });

                var id = table.attr("id");
                Table.list[id] = table;
                return table;
            },
            // 批量操作请求
            multi: function (action, ids, table, element) {
                var options = table.bootstrapTable('getOptions');
                var url = action == "del" ? options.extend.del_url : options.extend.multi_url;
                url = url + "/ids/" + ($.isArray(ids) ? ids.join(",") : ids);
                var options = {url: url, data: {action: action, ids: ids, params: element ? $(element).data("params") : ''}};
                Backend.api.ajax(options, function (data) {
                    Toastr.success(__('Operation completed'));
                    table.bootstrapTable('refresh');
                });
            },
            // 单元格元素事件
            events: {
                operate: {
                    'click .btn-editone': function (e, value, row, index) {
                        var options = $(this).closest('table').bootstrapTable('getOptions');
                        Backend.api.open(options.extend.edit_url + "/ids/" + row.id, __('Edit'));
                    },
                    'click .btn-delone': function (e, value, row, index) {
                        var that = this;
                        var top = $(that).offset().top - $(window).scrollTop();
                        var left = $(that).offset().left - $(window).scrollLeft() - 260;
                        if (top + 154 > $(window).height()) {
                            top = top - 154;
                        }
                        if ($(window).width() < 480) {
                            top = left = undefined;
                        }
                        var index = Backend.api.layer.confirm(
                                __('Are you sure you want to delete this item?'),
                                {icon: 3, title: __('Warning'), offset: [top, left], shadeClose: true},
                                function () {
                                    var table = $(that).closest('table');
                                    Table.api.multi("del", row.id, table, that);
                                    Backend.api.layer.close(index);
                                }
                        );

                    }
                },
                activeBtn: {
                    'click .getActive': function (e, value, row, index) {
                        var options = $(this).closest('table').bootstrapTable('getOptions');
                        Backend.api.open(options.extend.getActive_url + "/ids/" + row.id + "/license/" + row.license,'激活');                    
                    }
                }
            },
            // 单元格数据格式化
            formatter: {
                icon: function (value, row, index) {
                    if (!value)
                        return '';
                    value = value.indexOf(" ") > -1 ? value : "fa fa-" + value;
                    //渲染fontawesome图标
                    return '<i class="' + value + '"></i> ' + value;
                },
                image: function (value, row, index) {
                    return '<img class="img-rounded img-sm" src="' + (value.indexOf("http") === 0 ? '' : Config.upload.cdnurl) + value + '" />';
                },
                status: function (value, row, index, custom) {
                    //颜色状态数组,可使用red/yellow/aqua/blue/navy/teal/olive/lime/fuchsia/purple/maroon
                    var colorArr = {normal: 'success', hidden: 'grey', deleted: 'danger', locked: 'info'};
                    //如果有自定义状态,可以按需传入
                    if (typeof custom !== 'undefined') {
                        colorArr = $.extend(colorArr, custom);
                    }
                    var color = value && typeof colorArr[value] !== 'undefined' ? colorArr[value] : 'primary';
                    value = value[0].toUpperCase() + value.substr(1);
                    //渲染状态
                    var html = '<span class="text-' + color + '"><i class="fa fa-circle"></i> ' + __(value) + '</span>';
                    return html;
                },
                url: function (value, row, index) {
                    return '<a href="' + value + '" target="_blank" class="label bg-green">' + value + '</a>';
                },
                flag: function (value, row, index) {
                    var flagstext = __('Flags');
                    var flagscolor = {t: 'red', i: 'blue', r: 'green', h: 'yellow'};
                    if (!value)
                        return value;
                    //渲染Flag
                    var html = [];
                    var arr = value.split(',');
                    arr.forEach(function (value) {
                        html.push('<span class="label bg-' + (typeof flagscolor[value] != 'undefined' ? flagscolor[value] : 'primary') + '">' + (typeof flagstext[value] !== 'undefined' ? flagstext[value] : '') + '</span>');
                    });
                    return html.join(' ');
                },
                datetime: function (value, row, index) {
                    if(value == 0){
                      return '无'
                    } else {
                      return value ? Moment(parseInt(value) * 1000).format("YYYY-MM-DD HH:mm:ss") : __('None');
                    }
                },
                operate: function (value, row, index, table) {
                    var showweigh = true;
                    var showedit = true;
                    var showdel = true;
                    var showdetail = true
                    if (typeof Table.defaults != 'undefined') {
                        // var options = table.bootstrapTable('getOptions');
                        var options = Table.defaults;
                        if (options.extend.del_url == '' || !options.extend.del_url)
                            showdel = false;
                        if (options.extend.edit_url == '' || !options.extend.edit_url)
                            showedit = false;
                        if (options.extend.detail_url == '' || !options.extend.detail_url) {
                            showdetail = false;
                        }
                    }
                    showweigh = typeof row[Table.config.dragsortfield] != 'undefined' ? true : false;
                    //行操作
                    var html = [];
                    if (showweigh)
                        html.push('<a href="javascript:;" class="btn btn-primary btn-dragsort btn-xs"><i class="fa fa-arrows"></i></a>');

                    if (showedit)
                        html.push('<a href="javascript:;" class="btn btn-success btn-editone btn-xs"><i class="fa fa-pencil"></i></a>');
                    if (showdel)
                        html.push('<a href="javascript:;" class="btn btn-danger btn-delone btn-xs"><i class="fa fa-trash"></i></a>');
                    if (showdetail)
                        html.push('<a href="javascript:;" class="btn btn-success btn-detail btn-xs addtab"><i class="fa fa-indent"></i></a>')
                    return html.join(' ');
                },
                resolve: function(value,row,index){
                  return Table.api.formatter.url(window.location.toString().match(/.*public/)[0] + value);
                },
                platform: function(value,row,index){
                    return value==0 ? "安卓" : (value == 1 ? "ios" : "其他");
                },
                success: function (value, row, index){
                  return value == "0" ? "成功" : "失败"
                },
                identity: function (value, row, index){
                  return value == "0" ? "公司" : "员工"
                },
                copyBlock: function (value, row, index){
                  return '<div class="input-group input-group-sm" style="width:250px;"><input type="text" readonly class="form-control input-sm" value="' + value + '"><span class="input-group-btn input-group-sm copy-block"><a href="javascript:void(0)" class="btn btn-default btn-sm"><i class="fa fa-clone"></i></a></span></div>';
                },
                sexWechat: function (value, row, index) {
                  if (value == "0") {
                    return "未知"
                  } else {
                    return value == "1" ? "男" : "女"
                  }
                },
                sex: function (value, row, index) {
                    return value == "0" ? "男" : "女"
                },
                leaver: function (value, row ,index){
                    return value == "0" ? "在职" : "已离职"
                },
                isdel: function (value, row ,index){
                    return value == "0" ? "否" : "是"
                },
                staffType: function (value, row, index) {
                  switch (value) {
                    case 0:
                      return '员工'
                    case 1:
                      return '访客'
                    case 2:
                      return 'vip'
                    default:
                      return '未知'
                  }
                },
                noneValue: function (value, row, index) {
                  return (value == '' || value == 0) ? '无' : value
                },
                btn: function (value, row, index) {
                    return '<a href="javascript:;" class="btn btn-success getActive">激活</a>'
                },
                showbigimg: function (value, row, index) {
                  var WECHAT_PATH = window.parent.WECHAT_PATH
                  return '<div class="wechat-img-wrap"><img src="'+ WECHAT_PATH +'/thinkphpApi'+ value +'" class="wechat-img"><img src="'+ WECHAT_PATH +'/thinkphpApi'+ value +'" class="wechat-big-img"></div>'
                }
            },
            // 获取选中的条目ID集合
            selectedids: function (table) {
                return $.map(table.bootstrapTable('getSelections'), function (row) {
                    return row.id
                });
            },
            // 切换复选框状态
            toggleattr: function (table) {
                $("input[type='checkbox']", table).trigger('click');
            }
        },
    };
    return Table;
});
