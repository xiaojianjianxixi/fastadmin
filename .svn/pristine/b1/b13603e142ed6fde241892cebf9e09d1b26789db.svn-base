define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'clents/staff/index',
                    add_url: 'clents/staff/add',
                    edit_url: 'clents/staff/edit',
                    del_url: 'clents/staff/del',
                    multi_url: 'clents/staff/multi',
                    table: 'staff',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'sid',
                columns: [
                    [

                        {field: 'picpath', title: __('Picpath') ,formatter: Controller.api.formatter.showbigimg},
                        {field: 'sid', title: __('Sid')},
                        {field: 'name', title: __('Name')},
                        {field: 'addtime', title: __('Addtime'), formatter: Table.api.formatter.datetime},
                        {field: 'uptime', title: __('Uptime'), formatter: Table.api.formatter.datetime},
                        {field: 'birthday', title: __('Birthday'), formatter: Controller.api.formatter.showbirthday},
                      
                        {field: 'position', title: __('Position')},
                        {field: 'phone', title: __('Phone') ,formatter: Controller.api.formatter.showPhone},
                        {field: 'email', title: __('Email') ,formatter: Controller.api.formatter.showEmail},
                        {field: 'address', title: __('Address') ,formatter: Controller.api.formatter.showAddress},

                        {field: 'cor_depart', title: __('Cor_depart') ,formatter: Controller.api.formatter.showcordepart},
                        {field: 'license', title: __('License')},

                        {field: 'openid', title: __('Openid')},
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
                },
                showbirthday: function (value, row, index) {
                    if ( value == 0 ) {
                        return ''
                    }
                    if ( value < 1 ) {
                        return ''
                    }
                    if ( value.toString().length > 10 ){
                        return value
                    }
                    
                    var date = new Date();
                    date.setTime(value * 1000);
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    // var h = date.getHours();
                    // h = h < 10 ? ('0' + h) : h;
                    // var minute = date.getMinutes();
                    // var second = date.getSeconds();
                    // minute = minute < 10 ? ('0' + minute) : minute;
                    // second = second < 10 ? ('0' + second) : second;
                    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second; 
                    return y + '-' + m + '-' + d
                },
                showPhone: function (value, row, index) {
                    if ( value == 0 ) {
                        return ''
                    }
                    return value
                },
                showEmail: function (value, row, index) {
                    if ( value == 0 ) {
                        return ''
                    }
                    return value
                },
                showAddress: function (value, row, index) {
                    if ( !isNaN(value) ) {
                        return ''
                    }
                    return value
                },
                showcordepart: function (value, row, index) {
                    if ( value == 0 ) {
                        return ''
                    }
                    return value
                },
            }
  
        }
    };
    return Controller;
});