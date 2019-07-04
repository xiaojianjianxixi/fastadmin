define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'clents/recognition/index',
                    add_url: 'clents/recognition/add',
                    // edit_url: 'clents/recognition/edit',
                    del_url: 'clents/recognition/del',
                    multi_url: 'clents/recognition/multi',
                    table: 'recognition',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                        {field: 'imgpath', title: __('头像'), formatter: Table.api.formatter.showbigimg},
                        {field: 'id', title: __('Id')},
                        {field: 'sid', title: __('Sid')},
                        // {field: 'sid', title: __('用户id')},
                        {field: 'recog_id', title: __('识别Id')},
                        {field: 'recog_time', title: __('识别时间'), formatter: Table.api.formatter.datetime},
                        // {field: 'imgname', title: __('图片路径')},
                        // {field: 'entryid', title: __('入口Id')},
                        {field: 'firstone', title: __('第一排的人')},
                        {field: 'quality', title: __('图片质量')},
                        {field: 'img_w', title: __('图片长度')},
                        {field: 'img_h', title: __('图片高度')},
                        {field: 'license.0.companyname', title: __('公司名字')},
                        {field: 'license.0.license', title: __('License')},
                        // {field: 'license.0.license', title: __('公司认证编号')},
                        {field: 'fst_val', title: __('阈值')},
                        {field: 'time', title: __('时间'), formatter: Table.api.formatter.datetime},
        
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