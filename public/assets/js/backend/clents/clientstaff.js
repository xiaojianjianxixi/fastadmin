define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'clents/clientstaff/index',
                    add_url: 'clents/clientstaff/add',
                    edit_url: 'clents/clientstaff/edit',
                    del_url: 'clents/clientstaff/del',
                    multi_url: 'clents/clientstaff/multi',
                    table: 'client_staff',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                        {field: 'picpath', title: __('员工证件照'), formatter: Controller.api.formatter.showbigimg},
                        {field: 'name', title: __('Name')},

                        {field: 'birthday', title: __('Birthday'), formatter: Table.api.formatter.datetime},
                        {field: 'jointime', title: __('Jointime'), formatter: Table.api.formatter.datetime},
                        {field: 'gender', title: __('性别'), formatter: Table.api.formatter.sex},
                        {field: 'position', title: __('Position'), formatter: Table.api.formatter.noneValue},
                        {field: 'phone', title: __('Phone'), formatter: Table.api.formatter.noneValue},
                        {field: 'email', title: __('Email'), formatter: Table.api.formatter.noneValue},
                        {field: 'address', title: __('Address'), formatter: Table.api.formatter.noneValue},
                        {field: 'staff_type', title: __('身份'), formatter: Table.api.formatter.staffType},

                        {field: 'cor_depart', title: __('Cor_depart'), formatter: Table.api.formatter.noneValue},
                        {field: 'license', title: __('License')},
                        {field: 'addtime', title: __('Addtime'), formatter: Table.api.formatter.datetime},
                        {field: 'uptime', title: __('Uptime'), formatter: Table.api.formatter.datetime},
                        {field: 'is_leave', title: __('状态'), formatter: Table.api.formatter.leaver},
                        {field: 'is_del', title: __('是否删除') ,formatter: Table.api.formatter.isdel},

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
            },
            formatter: {
                showbigimg: function (value, row, index) {
                  var WECHAT_PATH = window.parent.WECHAT_PATH
                  var onerror =  "onerror = src='http://devwechat.techpami.com/thinkphpApi/public/images/user_large.jpg'"
                  return '<div class="wechat-img-wrap"><img src="'+ WECHAT_PATH +'/thinkphpApi'+ value +'" class="wechat-img" '+ onerror +'><img src="'+ WECHAT_PATH +'/thinkphpApi'+ value +'" class="wechat-big-img" '+ onerror +'></div>'
                }
            }
        }
    };
    return Controller;
});
