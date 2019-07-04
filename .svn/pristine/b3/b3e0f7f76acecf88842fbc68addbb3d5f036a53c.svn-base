<?php

namespace app\admin\controller\usercenter;

use app\common\controller\Backend;

use think\Controller;
use think\Request;
use fast\Random;
use think\Db;
/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Userauth extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('License');
    }

    public function update(){

        if ($this->request->isPost())
        {
        	$email = trim(strip_tags($_POST['email']))."@techpami.com";
        	$password = $_POST['password'];trim(strip_tags($_POST['password']));
        	$agpassword = $_POST['agpassword'];trim(strip_tags($_POST['agpassword']));
          $Homekey = $_POST['Homekey'];trim(strip_tags($_POST['Homekey']));

          $companyname = trim(strip_tags($_POST['companyname']));
          $effectivetime = trim(strip_tags($_POST['effectivetime']));
          $servertype = trim(strip_tags($_POST['servertype']));
          $textpsword = trim(strip_tags($_POST['textpsword']));

          $APPID = trim(strip_tags($_POST['APPID']));
          $AppSecret = trim(strip_tags($_POST['AppSecret']));
          $remark = $_POST['remark'];

          // $AESkey = trim(strip_tags($_POST['AESkey']));
          // $plat_push_path = trim(strip_tags($_POST['plat_push_path']));
          // $AESkey = trim(strip_tags($_POST['plat_push_path']));

          // $AESkey = $_POST['plat_content'];

          if($_POST['openpush'] == "1"){
            $plat_push = $_POST['plat_push'];trim(strip_tags($_POST['plat_push']));
            $openpush = $_POST['openpush'];trim(strip_tags($_POST['openpush']));
            $AESkey = $_POST['AESkey'];trim(strip_tags($_POST['AESkey']));
            $plat_push_path = $_POST['plat_push_path'];trim(strip_tags($_POST['plat_push_path']));
            $plat_appkey = $_POST['plat_appkey'];trim(strip_tags($_POST['plat_appkey']));
            $plat_content = $_POST['plat_content'];trim(strip_tags($_POST['plat_content']));

            if(empty($AESkey)){
              $return  = [
                 'code' => 404,
                 'msg' => 'AESkey 需要填写'
                ];
              echo json_encode($return);
              die();
            }
            if(empty($plat_push_path)){
              $return  = [
                 'code' => 404,
                 'msg' => '第三方URL 需要填写'
                ];
              echo json_encode($return);
              die();
            }
            if(empty($plat_appkey)){
              $return  = [
                 'code' => 404,
                 'msg' => '第三方签名key 需要填写'
                ];
              echo json_encode($return);
              die();
            }
            if(empty($plat_content)){
              $return  = [
                 'code' => 404,
                 'msg' => '第三方参数 需要填写'
                ];
              echo json_encode($return);
              die();
            }
          }
          
      		if($email==null){
	      		$return  = [
	           	 'code' => 404,
	           	 'msg' => 'Email 需要填写'
	           	];
	        	echo json_encode($return);
	        	die();
      		}

          if(empty($companyname)){
            $return  = [
               'code' => 404,
               'msg' => '公司名称 需要填写'
              ];
            echo json_encode($return);
            die();
          }

          if(empty($effectivetime)){
            $return  = [
               'code' => 404,
               'msg' => 'no effectivetime'
              ];
            echo json_encode($return);
            die();
          }

          if(empty($servertype)){
            $return  = [
               'code' => 404,
               'msg' => 'no servertype'
              ];
            echo json_encode($return);
            die();
          }

          if(empty($textpsword)){
            $return  = [
               'code' => 404,
               'msg' => 'no textpsword'
              ];
            echo json_encode($return);
            die();
          }

      	   $return = $this->valid_email($email);
      	   if($return==false){
      	   		 $return  = [
	           	 'code' => 404,
	           	 'msg' => 'Email 格式不正确'
	           	];
	        	echo json_encode($return);
	        	die();
      	   }
      	   if($password!==$agpassword){

		          $return  = [
	           	 'code' => 404,
	           	 'msg' => '两次输入的密码不一致'
	           	];
	        	echo json_encode($return);
	        	die();
      	   }

			$re = Db::table('wa_license')->where(array('user_account'=>$email))->find();
			if(isset($re)){
      		    $return  = [
	           	 'code' => 404,
	           	 'msg' => '该email已经激活'
	           	];
	        	echo json_encode($return);
	        	die();
			}

		    if(strlen($password)<6||strlen($password)>20){

	            $return  = [
	           	 'code' => 404,
	           	 'msg' => '密码要在6到20位之间'
	           	];
	        	echo json_encode($return);
	        	die();
          }
          $salt = md5(rand());
            if(!$APPID==""){
              $pamiID = md5(md5($APPID.$salt));
            }

            $apikey = sha1($email.time().$salt);
            $apisecret = sha1($password.time().$salt);
            $license = sha1($apikey.time().$salt);
            $password_1 = md5($salt.$password);
            $pamiID  = isset($pamiID)? $pamiID : "";
            $add = [
              'homekey' => $Homekey,
            	'salt'=> $salt,
            	'apikey'=> $apikey,
            	'apisecret' => $apisecret,
            	'license'=> $license,
            	'time'=>time(),
            	'user_account' =>$email,
            	'passwd' => $password_1,
              'companyname'=>$companyname,
              'effectivetime'=>$effectivetime,
              'textpsword'=>$textpsword,
              'appID'=>$APPID,
              'AppSecret'=>$AppSecret,
              'servertype'=>$servertype,
              'remark'=>$remark,
              'pami_ID'=> $pamiID,
            ];
            if($_POST['openpush'] == "1"){
              $palt = [
              'plat_push' => $plat_push,
              'openpush' => $openpush,
              'AESkey' => $AESkey,
              'plat_push_path' => $plat_push_path,
              'plat_appkey' => $plat_appkey,
              'plat_content' => $plat_content
              ];
              $add = array_merge($add,$palt);
            }
            $row = Db::table('wa_license')->insert($add);

           if($row = 1){
//添加license表成功后添加admin表
    
                $params['salt'] = Random::alnum();
                $params['password'] = md5(md5($password) . $params['salt']);
                $params['username'] = $email;
                $params['nickname'] = $companyname;
                $params['avatar'] = '/assets/img/avatar.png';
                $params['createtime'] = time();
                $params['updatetime'] = time();
                $params['status'] = 'normal';

                $adminID = Db::table('wa_admin')->insertGetId($params);
                
                $GRPUP_TYPE = [
                  'uid'=>$adminID,
                  'group_id'=>'2'
                ];

                $group = Db::table('wa_auth_group_access')->insert($GRPUP_TYPE);
                
                if($group){
                  $return  = [
                     'code' => 1,
                     'msg' => 'success'
                    ];
                  echo json_encode($return);
                  die();

                }

           }else{

           	$return  = [
           	 'code' => 0,
           	 'msg' => 'Error'
           	];
        	echo json_encode($return);
        	die();
           }

        }
        return;
    }




    function valid_email($email)
	{
	    if (preg_match('/^[A-Za-z0-9]+([._\-\+]*[A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z0-9]+$/', $email)) {
	        return true;
	    } else {
	        return false;
	    }
	}


}
