define(['jquery', 'bootstrap', 'backend', 'table', 'form','addtabs'], function ($, undefined, Backend, Table, Form,addtabs) {

    var Controller = {
        index: function () {
            // 页签切换
            $('.addtab').addtabs({iframeHeight: "100%"})

            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'usercenter/licenselist/index',
                    add_url: null,
                    edit_url: 'usercenter/licenselist/edit',
                    del_url: null,
                    multi_url: 'clents/licenselist/multi',
                    table: 'license',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                        {field: 'state', checkbox: true},
                        {field: 'companyname', title: __('Companyname')},
                        {field: 'license', title: __('License')},
                        {field: 'user_account', title: __('用户账号')},
                        {field: 'ip', title: __('Ip')},
                        {field: 'apikey', title: __('Apikey')},
                        {field: 'apisecret', title: __('Apisecret')},
                        {field: 'time', title: __('时间'), formatter: Table.api.formatter.datetime},
                    
                    ]
                ],
                pageList: [10, 25]
            })
            // setTimeout(function () {} , 5000);
            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            },
            formatter: {
              operate: function (value, row, index) {
                var html = [];
                html.push('<a href="javascript:;" class="btn btn-success btn-editone btn-xs"><i class="fa fa-pencil"></i></a>');
                html.push('<a title="公司详情" addtabs="comdetail_'+ row.id +'" href="/fastadmin/public/admin/exmaple/example/comdetail/?id='+ row.id +'" url="/fastadmin/public/admin/exmaple/example/comdetail/?id='+ row.id +'" class="btn btn-success btn-detail btn-xs addtab"><i class="fa fa-indent"></i></a>')
                return '<div style="white-space: nowrap">'+ html.join(' ') + '</div>';
              }
            }
        }
    };
    return Controller;
});