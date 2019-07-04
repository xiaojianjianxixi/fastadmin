define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'clents/phonebind/index',
                    add_url: 'clents/phonebind/add',
                    edit_url: 'clents/phonebind/edit',
                    del_url: 'clents/phonebind/del',
                    multi_url: 'clents/phonebind/multi',
                    table: 'phone_bind',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                        {field: 'sid', title: __('Sid')},
                        {field: 'phone', title: __('手机号码')},
                        {field: 'status', title: __('状态'), formatter: Controller.api.formatter.bindStatus},
                        {field: 'license.0.companyname', title: __('公司名字')},
                        {field: 'license.0.license', title: __('License')},
                        {field: 'time', title: __('时间'), formatter: Table.api.formatter.datetime},

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
                return val == 0 ? '绑定' : '解除绑定'
              }
            }
        }
    };
    return Controller;
});
