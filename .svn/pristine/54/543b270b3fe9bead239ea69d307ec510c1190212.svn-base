define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'clents/userinfo/index',
                    add_url: 'clents/userinfo/add',
                    edit_url: 'clents/userinfo/edit',
                    del_url: 'clents/userinfo/del',
                    multi_url: 'clents/userinfo/multi',
                    table: 'userinfo',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [

                        {field: 'id', title: __('Id')},
                        {field: 'headimgurl', title: __('头像链接'),formatter: Controller.api.formatter.showbigimg},
                        {field: 'openid', title: __('Openid')},
                        {field: 'nickname', title: __('Nickname')},
                        {field: 'sex', title: __('性别'),formatter: Controller.api.formatter.showsex},
                        {field: 'language', title: __('语言')},
                        {field: 'city', title: __('市区')},
                        {field: 'province', title: __('省份')},
                        {field: 'country', title: __('国家')},
                        {field: 'subscribe_time', title: __('订阅时间'), formatter: Table.api.formatter.datetime},
                        {field: 'appID', title: __('AppID')},
                    
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
                  var onerror =  "onerror = src='http://devwechat.techpami.com/thinkphpApi/public/images/user_large.jpg'"
                  return '<div class="wechat-img-wrap"><img src="'+ value +'" class="wechat-img" '+ onerror +'><img src="'+ value +'" class="wechat-big-img" '+ onerror +'></div>'
                },
                showsex: function (value, row, index) {
                    if ( value == 1 ) {
                        return '男'
                    }
                    if ( value == 2 ) {
                        return '女'
                    }

                    return ''
                }
            }
        }
    };
    return Controller;
});