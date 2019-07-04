define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'usercenter/licenselist/index',
                    add_url: 'usercenter/licenselist/add',
                    edit_url: 'usercenter/licenselist/edit',
                    del_url: 'usercenter/licenselist/del',
                    multi_url: 'usercenter/licenselist/multi',
                    getActive_url: 'usercenter/licenselist/choosetype',
                    table: 'license',
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
                        {field: 'companyname', title: __('Companyname')},
                        {field: 'license', title: __('License'),formatter :Table.api.formatter.copyBlock},
                        {field: 'user_account', title: __('用户账号')},
                        {field: 'ip', title: __('Ip')},
                        {field: 'apikey', title: __('Apikey'),formatter: Table.api.formatter.copyBlock},

                        {field: '', title: __('微信推送激活'),formatter: Table.api.formatter.btn, events: Table.api.events.activeBtn},
                        {field: 'appID', title: __('AppID')},
                        {field: 'time', title: __('Time'), formatter: Table.api.formatter.datetime},
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
          var url = $('#edit-form').prop('action');
           url = url.replace(/edit$/ , 'update_s');
          var id =  $('#c-appID').val()
          var secret =  $('#c-AppSecret').val();  

           $('#edit-form').prop('action', url);
            $(document).on("click", "#tijiao",function (e) {
      
                if(id != $('#c-appID').val() || secret != $('#c-AppSecret').val()) {
                    var index = Backend.api.layer.confirm(
                        __('确定更新？更新后PamiID会改变，请谨慎操作'),
                        {icon: 3, title: __('Warning'), shadeClose: true},
                        function () {
                            $("#edit-form").submit();
                        }
                    );
                } else {
                    $("#edit-form").submit();
                }
                 
            })
            Controller.api.bindevent();
        },
        choosetype: function (){
//解除绑定通知提交          
            $(document).on("click", "#unbundling_submit",function (e) {
           
                var model_id = $("#unbundling_model_id").val();
                var title = $("#unbundling_title").val();
                var industry = $("#unbundling_industry").val();
                var detailinto = $("#unbundling_detailinto").val();
                var exampe = $("#unbundling_exampe").val();
                var unbundling = $("#unbundling").val();
                var license = $("#license").val();

                if(model_id==''){
                    Toastr.error('请输入模板ID');
                    return false;
                }
                
                $.ajax({
                    url: 'usercenter/licenselist/wechatmodelID',
                    type: 'post',
                    dataType: 'json',
                    data: {model_id:model_id,title:title,industry:industry,detailinto:detailinto,exampe:exampe,type:unbundling,license:license},
                    success: function (ret) {
                        console.log(ret);
                        if (ret.code === 1){
                           Toastr.success('授权成功');
                           return false;
                        }
                        if(ret.code === 404){
                            Toastr.error(ret.msg);
                            return false;
                        }
                    }
                });
           })
 //客户到访通知提交
            $(document).on("click", "#Customer_submit",function (e) {
                    
                var model_id = $("#Customer_model_id").val();
                var title = $("#Customer_title").val();
                var industry = $("#Customer_industry").val();
                var detailinto = $("#Customer_detailinto").val();
                var exampe = $("#Customer_exampe").val();
                var Customer = $("#Customer").val();
                var license = $("#license").val();

                if(model_id==''){
                    Toastr.error('请输入模板ID');
                    return false;
                }
                
                $.ajax({
                    url: 'usercenter/licenselist/wechatmodelID',
                    type: 'post',
                    dataType: 'json',
                    data: {model_id:model_id,title:title,industry:industry,detailinto:detailinto,exampe:exampe,type:Customer,license:license},
                    success: function (ret) {
                        console.log(ret);
                        if (ret.code === 1){
                        Toastr.success('授权成功');
                        return false;
                        }
                        if(ret.code === 404){
                            Toastr.error(ret.msg);
                            return false;
                        }
                    }
                });
            }) 
// 关注成功通知-----
            $(document).on("click", "#attention_submit",function (e) {
                                
                var model_id = $("#attention_model_id").val();
                var title = $("#attention_title").val();
                var industry = $("#attention_industry").val();
                var detailinto = $("#attention_detailinto").val();
                var exampe = $("#attention_exampe").val();
                var attention = $("#attention").val();
                var license = $("#license").val();
                if(model_id==''){
                    Toastr.error('请输入模板ID');
                    return false;
                }
                $.ajax({
                    url: 'usercenter/licenselist/wechatmodelID',
                    type: 'post',
                    dataType: 'json',
                    data: {model_id:model_id,title:title,industry:industry,detailinto:detailinto,exampe:exampe,type:attention,license:license},
                    success: function (ret) {
                        console.log(ret);
                        if (ret.code === 1){
                        Toastr.success('授权成功');
                        return false;
                        }
                        if(ret.code === 404){
                            Toastr.error(ret.msg);
                            return false;
                        }
                    }
                });
            })  
// 签到提醒
            $(document).on("click", "#Sign_submit",function (e) {
                if(model_id==''){
                    Toastr.error('请输入模板ID');
                    return false;
                }                     
                var model_id = $("#Sign_model_id").val();
                var title = $("#Sign_title").val();
                var industry = $("#Sign_industry").val();
                var detailinto = $("#Sign_detailinto").val();
                var exampe = $("#Sign_exampe").val();
                var Sign = $("#Sign").val();
                var license = $("#license").val();

                $.ajax({
                    url: 'usercenter/licenselist/wechatmodelID',
                    type: 'post',
                    dataType: 'json',
                    data: {model_id:model_id,title:title,industry:industry,detailinto:detailinto,exampe:exampe,type:Sign,license:license},
                    success: function (ret) {
                        console.log(ret);
                        if (ret.code === 1){
                        Toastr.success('授权成功');
                        return false;
                        }
                        if(ret.code === 404){license
                            Toastr.error(ret.msg);
                            return false;
                        }
                    }
                });
            }) 
// 操作成功通知
            $(document).on("click", "#Operation_submit",function (e) {
                if(model_id==''){
                    Toastr.error('请输入模板ID');
                    return false;
                }                       
                var model_id = $("#Operation_model_id").val();
                var title = $("#Operation_title").val();
                var industry = $("#Operation_industry").val();
                var detailinto = $("#Operation_detailinto").val();
                var exampe = $("#Operation_exampe").val();
                var Operation = $("#Operation").val();
                var license = $("#license").val();

                $.ajax({
                    url: 'usercenter/licenselist/wechatmodelID',
                    type: 'post',
                    dataType: 'json',
                    data:  {model_id:model_id,title:title,industry:industry,detailinto:detailinto,exampe:exampe,type:Operation,license:license},
                    success: function (ret) {
                        console.log(ret);
                        if (ret.code === 1){
                        Toastr.success('授权成功');
                        return false;
                        }
                        if(ret.code === 404){
                            Toastr.error(ret.msg);
                            return false;
                        }
                    }
                });
            }) 
// 绑定成功提醒 
            $(document).on("click", "#binding_submit",function (e) {
                if(model_id==''){
                    Toastr.error('请输入模板ID');
                    return false;
                }                         
                var model_id = $("#binding_model_id").val();
                var title = $("#binding_title").val();
                var industry = $("#binding_industry").val();
                var detailinto = $("#binding_detailinto").val();
                var exampe = $("#binding_exampe").val();
                var binding = $("#binding").val();
                var license = $("#license").val();

                $.ajax({
                    url: 'usercenter/licenselist/wechatmodelID',
                    type: 'post',
                    dataType: 'json',
                    data: {model_id:model_id,title:title,industry:industry,detailinto:detailinto,exampe:exampe,type:binding,license:license},
                    success: function (ret) {
                        console.log(ret);
                        if (ret.code === 1){
                        Toastr.success('授权成功');
                        return false;
                        }
                        if(ret.code === 404){
                            Toastr.error(ret.msg);
                            return false;
                        }
                    }
                });
            })
            $('.emptyRed').on('input', function (e) {
                if(this.value.trim() == '') {
                    $(this).css('border-color', '#e74c3c')
                } else {
                    $(this).css('border-color', '#d2d6de')
                }
            })                
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
                
            }
        }
    };
    return Controller;
});