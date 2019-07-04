define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'clents/guestlog/index',
                    add_url: 'clents/guestlog/add',
                    edit_url: 'clents/guestlog/edit',
                    del_url: 'clents/guestlog/del',
                    multi_url: 'clents/guestlog/multi',
                    table: 'guest_log',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [

                        {field: 'guestname', title: __('名字')},
                        {field: 'license', title: __('License')},
                        {field: 'openid', title: __('Openid')},
                        {field: 'entryname', title: __('Entryname')},
                        {field: 'result', title: __('消息推送结果'), formatter: Table.api.formatter.success},
                        {field: 'guest_time', title: __('Guest_time'), formatter: Table.api.formatter.datetime},


                    ]
                ],
                pageList: [10, 25]
            });

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
            }
        }
    };
    return Controller;
});
