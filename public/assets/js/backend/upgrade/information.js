define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            var param1 = {
                index_url: 'upgrade/information/index',
                add_url: 'upgrade/information/addclient_type',
                edit_url: 'upgrade/information/editclient_type',
                del_url: 'upgrade/information/delclient_type',
            }
            var param2 = {
                index_url: 'upgrade/information/index',
                add_url: 'upgrade/information/addapk_plat',
                edit_url: 'upgrade/information/editapk_plat',
                del_url: 'upgrade/information/delapk_plat',
            }
            var param3 = {
                index_url: 'upgrade/information/index',
                add_url: 'upgrade/information/addapp_type',
                edit_url: 'upgrade/information/editapp_type',
                del_url: 'upgrade/information/delapp_type',
            }
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'upgrade/information/index',
                }
            });

            var table1 = $("#table1");
            var table2 = $("#table2");
            var table3 = $("#table3");

            // 初始化表格
            table1.bootstrapTable({
                url: param1.index_url,
                sortName: 'id',
                columns: [
                    [
                        { field: 'state', checkbox: true },
                        { field: 'id', title: __('Id') },
                        { field: 'client_type', title: __('产品属性') },
                        { field: 'operate', title: __('Operate'), events: Controller.api.events.operate(param1), formatter: Controller.api.operate(param1) }
                    ]
                ]
            });

            // 初始化表格
            table2.bootstrapTable({
                url: 'upgrade/information/apk_plat_index',
                sortName: 'id',
                columns: [
                    [
                        {field: 'state', checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'apk_plat', title: __('平台类型')},
                        {field: 'operate', title: __('Operate'), events: Controller.api.events.operate(param2), formatter: Controller.api.operate(param2)}
                    ]
                ]
            });


            // 初始化表格
            table3.bootstrapTable({
                url: 'upgrade/information/app_type_index',
                sortName: 'id',
                columns: [
                    [
                        {field: 'state', checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'app_type', title: __('软件类型')},
                        {field: 'operate', title: __('Operate'), events: Controller.api.events.operate(param3), formatter: Controller.api.operate(param3)}
                    ]
                ]
            });

          //为表格绑定事件
          Table.api.bindevent(table1, '#toolbar1', param1);
          Table.api.bindevent(table2, '#toolbar2', param2);
          Table.api.bindevent(table3, '#toolbar3', param3);

          // 隐藏高级搜索按钮
          $(":button[name='advancedSearch']").hide();

        },
        addclient_type: function () {
            $(document).on("click", "#addclient_type", function (e)　{
                console.log('111')
                var clienttype =  $("#c-client_type").val();

                if(clienttype == ""){
                    Toastr.error('请填写产品属性');
                    return false;
                }
                //  $("#add-form1").submit();
             })
            Controller.api.bindevent();
        },
        addapk_plat:function(){
            $(document).on("click", "#addapp_type", function (e)　{
                var appplat =  $("#c-apk_plat").val();
                console.log(appplat)
                if(appplat == ""){
                    Toastr.error('请填写apk平台类型');
                    return false;
                }
                 $("#add-form2").submit();
             })
            Controller.api.bindevent();
        },
        addapp_type:function(){
            $(document).on("click", "#addapk_plat", function (e)　{
                var apptype =  $("#c-app_type").val();

                if(apptype == ""){
                    Toastr.error('请填写软件属性');
                    return false;
                }
                 $("#add-form3").submit();
             })
            Controller.api.bindevent();
        },
        editclient_type: function () {
            Controller.api.bindevent();
        },
        editapk_plat: function () {
            Controller.api.bindevent();
        },
        editapp_type: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
               Form.api.bindevent($("form[role=form]"));
            },
            operate: function (param) {
                return function (value, row, index, table) {
                    var showweigh = true;
                    var showedit = true;
                    var showdel = true;
                    var showdetail = true
                    if (typeof Table.defaults != 'undefined') {
                        // var options = table.bootstrapTable('getOptions');
                        if (param.del_url == '' || !param.del_url)
                            showdel = false;
                        if (param.edit_url == '' || !param.edit_url)
                            showedit = false;
                        if (param.detail_url == '' || !param.detail_url) {
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
                }
            },
            events: {
                operate: function (param) {

                    return {
                        'click .btn-editone': function (e, value, row, index) {
                            var options = $(this).closest('table').bootstrapTable('getOptions');
                            Backend.api.open(param.edit_url + "/ids/" + row.id, __('Edit'));
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
                    }
                }
            }
        },
    };
    return Controller;
});