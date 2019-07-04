define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'upgrade/apkbranch/index',
                    add_url: 'upgrade/apkbranch/add',
                    edit_url: 'upgrade/apkbranch/edit',
                    del_url: 'upgrade/apkbranch/del',
                    multi_url: 'upgrade/apkbranch/multi',
                    table: 'apk_branch',
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
                        {field: 'id', title: __('Id')},
                        {field: 'branch_name', title: __('Branch_name')},
                        {field: 'time', title: __('Time'), formatter: Table.api.formatter.datetime},
                        {field: 'uptime', title: __('Uptime'), formatter: Table.api.formatter.datetime},
                        {field: 'intos', title: __('Intos')},
                        {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
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