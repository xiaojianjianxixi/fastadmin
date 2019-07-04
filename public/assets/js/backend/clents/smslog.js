define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'clents/smslog/index',
                    add_url: 'clents/smslog/add',
                    edit_url: 'clents/smslog/edit',
                    del_url: 'clents/smslog/del',
                    multi_url: 'clents/smslog/multi',
                    table: 'sms_log',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [

                        {field: 'phone', title: __('手机号码')},
                        {field: 'sms', title: __('Sms')},
                        {field: 'result', title: __('发送结果'), formatter: Table.api.formatter.success},
                        {field: 'status', title: __('状态'), formatter: Controller.api.formatter.bindStatus},
                        {field: 'time', title: __('Time'), formatter: Table.api.formatter.datetime},

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
            },
            formatter: {
              bindStatus: function (val, row, index) {
                return val == 0 ? '未验证' : '已验证'
              }
            }
        }
    };
    return Controller;
});
