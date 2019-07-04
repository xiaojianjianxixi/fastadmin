define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {


    var Controller = {
        index: function () {
            $("#password").on('input',function(){
              $("#textpsword").val($(this).val());
            });

            if($("#plat_push").attr("aria-pressed") == "false"){
                $("#plat").hide();
            }
            $("#plat_push").click(function(){
                $("#plat").toggle();
                if($("#plat_push").attr("aria-pressed") == "false"){
                    $("#plat_push").html('关闭')
                }
                else{
                    $("#plat_push").html('开启')
                }
            });

            $(document).on("click", ".btn-success", function (e) {
                var email = $("#email").val();
                var password = $("#password").val();
                var agpassword = $("#agpassword").val();
                var Homekey = $("#Homekey").val();
                var companyname = $("#companyname").val();
                var effectivetime = $("#effectivetime").val();
                var servertype = $("#servertype").val();
                var textpsword = $("#textpsword").val();
                var remark = $("#remark").val();
                var APPID = $("#APPID").val();
                var AppSecret  =$("#AppSecret").val();
                
                if(email==""){
                    Toastr.error('请输入用户名');
                    return false;
                }

                if(companyname==""){
                    Toastr.error('请输入公司名称');
                    return false;
                }

                if(effectivetime=="0"){
                    Toastr.error('请选择授权时长');
                    return false;
                }

                if(servertype=="0"){
                    Toastr.error('选择服务类型');
                    return false;
                }

                if(Homekey==""){
                    Toastr.error('请输入Homekey');
                    return false;
                }
                if(password==""){
                    Toastr.error('请输入密码');
                    return false;
                }
                if(agpassword==""){
                     Toastr.error('请再次输入密码');
                    return false;
                }
                if(password!==agpassword){
                    Toastr.error('两次输入密码不一致');
                    return false;
                }

                var openpush = 0
                var plat = $("#plat_push").attr("aria-pressed")
                if(plat == "true"){
                    var plat_push = 1
                    var openpush = 1
                    var AESkey = $("#AESkey").val();
                    var plat_push_path = $("#plat_push_path").val();
                    var plat_appkey = $("#plat_appkey").val();
                    var plat_content = $("#plat_content").val();

                    if(AESkey==""){
                        Toastr.error('请输入AESkey');
                        return false;
                    }
                    if(plat_push_path==""){
                        Toastr.error('请输入第三方推送url');
                        return false;
                    }
                    if(plat_appkey==""){
                        Toastr.error('请输入Signkey');
                        return false;
                    }
                    if(plat_content==""){
                        Toastr.error('请输入签名参数');
                        return false;
                    }
                }

                 $.ajax({
                        url: 'usercenter/userauth/update',
                        type: 'post',
                        dataType: 'json',
                        data: {email:email,password:password,agpassword:agpassword,Homekey:Homekey,
                            companyname:companyname,effectivetime:effectivetime,servertype:servertype,
                            textpsword:textpsword,APPID:APPID,AppSecret:AppSecret,remark:remark,
                            plat_push:plat_push,openpush:openpush,AESkey:AESkey,plat_push_path:plat_push_path,
                            plat_appkey:plat_appkey,plat_content:plat_content
                        },
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

            });
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
