define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {


    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'usercenter/appvar/index',
                    add_url: 'usercenter/appvar/add',
                    edit_url: 'usercenter/appvar/edit',
                    del_url: 'usercenter/appvar/del',
                    multi_url: 'usercenter/appvar/multi',
                    table: 'app_ver',
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
                    /*    {field: 'id', title: __('Id')},*/
                /*        {field: 'apk_name', title: __('Apk_name')},*/
                    {field: 'ver_no', title: __('Ver_no')},
                        {field:'apk_path', title: __('Apk_path'), formatter: Table.api.formatter.resolve},
                      /*  {field: 'xml_path', title: __('Xml_path')},*/

                        {field: 'platform', title: __('Platform'), formatter: Table.api.formatter.platform},
            /*            {field: 'others_path', title: __('Others_path')},*/
                         {field: 'time', title: __('Time'), formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
           var url = $('#add-form').prop('action');
           url = url.replace(/add$/ , 'Appadds');
           $('#add-form').prop('action', url);
           $(document).on("click", "#tijiao", function (e) {

                var ver_no =  $("#ver_no").val();
                var platform =  $("#platform").val();
                var xml_path =  $("#xml_path").val();
                var apk_path =  $("#apk_path").val();
                var intro = $("#intro").val();

                if(ver_no==""){
                    Toastr.error('请输入版本号');
                    return false;
                }
                if(platform==""){
                    Toastr.error('请请选择平台');
                    return false;
                }
                if(apk_path==""){
                    Toastr.error('请上传apk');
                    return false;
                }
                if(xml_path==""){
                    Toastr.error('请上传XML');
                    return false;
                }
                if(intro==""){
                    Toastr.error('请输入更新内容');
                    return false;
                }
                $("#add-form").submit();
            })          
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"),undefined, undefined, function(ret){
                    if(ret.type=="apk"){
                        $("#apk_path").val(ret.downapkPath);
                        return false;
                    }
                    if(ret.type=="xml"){
                        $("#xml_path").val(ret.downapkPath);
                        return false;
                    }
                    if(ret.type=="400"){
                         Toastr.error("上传文件大小不能超过200M");
                         return false;
                    }
                    if(ret.type=="401"){
                         Toastr.error(ret.msg);
                         return false;
                    }
                    if(ret.type=="404"){
                         Toastr.error("没有上传文件");
                         return false;
                    }
                    if(ret.type=="other"){
                       $("#others_path").val(ret.downapkPath);
                        return false;
                    }




                });
            }
        }
    };
    return Controller;
});
