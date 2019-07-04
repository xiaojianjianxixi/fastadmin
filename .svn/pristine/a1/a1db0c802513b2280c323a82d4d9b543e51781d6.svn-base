define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'upgrade/applist/index',
                    add_url: 'upgrade/applist/addplus',
                    edit_url: 'upgrade/applist/edit',
                    del_url: 'upgrade/applist/del',
                    multi_url: 'upgrade/applist/multi',
                    table: 'apk',
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
                        // {field: 'id', title: __('Id')},
                        {field: 'version', title: __('Version')},
                        {field: 'apk_path', title: __('Apk存储路径')},                 
                        {field: 'apkplat.0.apk_plat', title: __('平台')},
                        {field: 'mandatory', title: __('强制性升级')},
                        {field: 'clienttype.0.client_type', title: __('产品属性')},
                        {field: 'apptype.0.app_type', title: __('软件类型')},

                        // {field: 'branchid', title: __('分支')},
                        {field: 'apkbranch.0.branch_name', title: __('分支'), operate: '='},

                        {field: 'attachments', title: __('Attachments')},
                        {field: 'time', title: __('Time'), formatter: Table.api.formatter.datetime},
                        // {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        addplus: function () {
            var url = $('#add-form').prop('action');

            url = url.replace(/addplus$/ , 'addapk');
            $('#add-form').prop('action', url);
            $(document).on("click", "#tijiao", function (e)　{
 
                var version =  $("#version").val(); //版本号
                var platform =  $("#platform").val();//平台
                var apk_path = $("#c-upyun").val(); //apk
                var intro = $("#intro").val(); //更新内容
                var branchid = $("#branchid").val();//分支
                var plus = $("#plus").val();//类型
                var client_type = $("#client_type").val();//产品属性

                if(version==""){
                    Toastr.error('请输入版本号');
                    return false;
                }
                var myReg =/^\d+(\.\d+)*$/;  
                if (!myReg.test(version)) {  
                    
                    Toastr.error('版本号必须为用"."隔开的数字串');
                    return false;  
                }  
                if(platform=='0' || platform=='请选择'){
                     Toastr.error('请请选择平台');
                     return false;
                 }
                if(branchid=='0' || branchid=='请选择'){
                    Toastr.error('请请选择分支');
                    return false;
                }
                if(plus=='0' || plus=='请选择'){
                    Toastr.error('请请选择类型');
                    return false;
                }
                if(client_type=='0' || client_type=='请选择'){
                    Toastr.error('请请选择产品属性');
                    return false;
                }

                if(apk_path==''){
                    Toastr.error('请上传apk');
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
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});