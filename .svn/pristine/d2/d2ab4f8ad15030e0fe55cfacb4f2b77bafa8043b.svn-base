<?php

namespace app\admin\controller\usercenter;

use app\common\controller\Backend;

use think\Controller;
use think\Request;
use think\Db;
use think\Session;
/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Appvar extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('AppVer');
    }


     public function index()
    {
    	$admin = Session::get('admin');
		$user_account = $admin->username;
		$password  = $admin->password;
        $license = Db::table('wa_license')->where(array('user_account'=>$user_account))->find();

        if($license==NULL){
        	$Tag = 1;
    	   
        }else{
        	$Tag = 0;
        }

        if ($this->request->isAjax())
        {
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                    ->where($where)
                    ->order($sort, $order)
                    ->count();
            $list = $this->model
                   
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();

            $result = array("total" => $total, "rows" => $list);
            return json($result);
        }     

        $this->assign('Tag',$Tag);
        return $this->view->fetch();
    }



	public function upfaileapk()
	{

		if($_FILES['file']){

			$Suffix = explode(".", $_FILES['file']['name']);
				if ($Suffix[1]=='apk')
				{
						if ($_FILES['file']['size'] / (1024 * 1024) > 200) 
						{
							$this->code = 1;
							$this->data = [
							'type' => '400',
							'msg' => '上传文件大小不能超过200M'
							];
						
						}
						$apkName = time() . rand(1, 10000) . ".apk";
						$LOAD = dirname($_SERVER['SCRIPT_FILENAME']);
						$uploadDir = $LOAD ."/"."uploads"."/"."app"."/".'apk'."/" . date('Y-m-d', time());
						if (!is_dir($uploadDir)){

							if(!is_dir($LOAD ."/"."uploads")){
								mkdir($LOAD ."/"."uploads");
							}
							if(!is_dir($LOAD ."/"."uploads"."/"."app")){
								mkdir($LOAD ."/"."uploads"."/"."app");
							}
							if(!is_dir($LOAD ."/"."uploads"."/"."app"."/".'apk')){
								mkdir($LOAD ."/"."uploads"."/"."app"."/".'apk');
							}
							mkdir($uploadDir);
						}
						$apkPath = $uploadDir . '/' . $apkName;
						$uploadAPKRes = move_uploaded_file($_FILES['file']['tmp_name'], $apkPath);
						if($uploadAPKRes){
								$downapkPath = "/uploads"."/"."app"."/".'apk'."/" . date('Y-m-d', time())."/".$apkName;
								$this->code = 1;
								$this->data = [

									'type' => 'apk',
									'downapkPath' => $downapkPath
								];
					
						}
				}else{
					$this->code = 1;
					$this->data = [
					'type' => '401',
					'msg'=> '请上传apk文件'
					];
		
				}

			}else{
				$this->code = 1;
				$this->data = [
				'type' => '404',
				'msg'=> '没有上传文件'
				];
		
			}


	}


	public function upfailexml()
	{

		if($_FILES['file']){

			$Suffix = explode(".", $_FILES['file']['name']);

				if ($Suffix[1]=='xml')
				{
						if ($_FILES['file']['size'] / (1024 * 1024) > 200) 
						{
							$this->code = 1;
							$this->data = [
							'type' => '400',
							'msg' => '上传文件大小不能超过200M'
							];
				        }
						$apkName = time() . rand(1, 10000) . ".xml";
						$LOAD = dirname($_SERVER['SCRIPT_FILENAME']);
						$uploadDir = $LOAD ."/"."uploads"."/"."app"."/".'xml'."/" . date('Y-m-d', time());
						if (!is_dir($uploadDir)){

							if(!is_dir($LOAD ."/"."uploads")){
								mkdir($LOAD ."/"."uploads");
							}
							if(!is_dir($LOAD ."/"."uploads"."/"."app")){
								mkdir($LOAD ."/"."uploads"."/"."app");
							}
							if(!is_dir($LOAD ."/"."uploads"."/"."app"."/".'xml')){
								mkdir($LOAD ."/"."uploads"."/"."app"."/".'xml');
							}
							mkdir($uploadDir);
						}
						$apkPath = $uploadDir . '/' . $apkName;
						$uploadAPKRes = move_uploaded_file($_FILES['file']['tmp_name'], $apkPath);
						if($uploadAPKRes){
								$downapkPath = "/uploads"."/"."app"."/".'xml'."/" . date('Y-m-d', time())."/".$apkName;
							    $this->code = 1;
					            $this->data = [
					            	'type' => 'xml',
					                'downapkPath' => $downapkPath
					            ];
					       
						}
				}else{
					$this->code = 1;
		            $this->data = [
		            	'type' => '401',
		            	'msg'=> '请上传xml文件'
		            ];
				}

			}else{
					$this->code = 1;
		            $this->data = [
		          	  'type' => '404',
		              'msg'=> '没有上传文件'
		            ];
			}
    }


	public function upotherfaile()
	{

	    if($_FILES['file']){

				if ($_FILES['file']['size'] / (1024 * 1024) > 200) 
					{
						$this->code = 1;
						$this->data = [
						'type' => '400',
						'msg' => '上传文件大小不能超过200M'
						];
			     	}
		    	$Suffix = explode(".", $_FILES['file']['name']);
		    	$file_type = $Suffix[1];

				$fileName = time() . rand(1, 10000) .".". $file_type;
				$LOAD = dirname($_SERVER['SCRIPT_FILENAME']);
				$uploadDir = $LOAD ."/"."uploads"."/"."app"."/".'other'."/" . date('Y-m-d', time());
				if (!is_dir($uploadDir)){

					if(!is_dir($LOAD ."/"."uploads")){
						mkdir($LOAD ."/"."uploads");
					}
					if(!is_dir($LOAD ."/"."uploads"."/"."app")){
						mkdir($LOAD ."/"."uploads"."/"."app");
					}
					if(!is_dir($LOAD ."/"."uploads"."/"."app"."/".'other')){
						mkdir($LOAD ."/"."uploads"."/"."app"."/".'other');
					}
					mkdir($uploadDir);
				}

				$apkPath = $uploadDir . '/' . $fileName;
				$uploadAPKRes = move_uploaded_file($_FILES['file']['tmp_name'], $apkPath);
				if($uploadAPKRes){
						$downapkPath = "/uploads"."/"."app"."/".'xml'."/" . date('Y-m-d', time())."/".$fileName;
					    $this->code = 1;
			            $this->data = [
			            	'type' => 'other',
			                'downapkPath' => $downapkPath
			            ];
				}
		    }else{
						$this->code = 1;
			            $this->data = [
			          	  'type' => '404',
			              'msg'=> '没有上传文件'
			            ];

		    }

   }

   public function Appadds()
   {
   		
	   	if($_POST){

			$adddata['ver_no'] = trim($_POST['ver_no']);
			$adddata['platform'] = $_POST['platform'];
			$adddata['apk_path'] = $_POST['apk_path'];
			$adddata['xml_path'] = $_POST['xml_path'];
			$adddata['others_path'] = $_POST['others_path'];
			$adddata['intro'] = strip_tags($_POST['intro']);
			$adddata['apk_name'] = basename($_POST['apk_path']);
			$adddata['time'] = time();

			// 字符串必须为用'.'隔开的数字串
			$rule = "/^\d+(\.\d+)*$/";
			$aMat = preg_match($rule, $adddata['ver_no']);
			if($aMat)
			{
				$this->code = -1;
	            $this->data = [
	          	  'type' => '401',
	              'msg'=> '必须为用'.'隔开的数字串。'
	            ];
				die();
			}

			if(empty($adddata['platform']))
			{
				$this->code = -1;
	            $this->data = [
	          	  'type' => '401',
	              'msg'=> '请选择平台'
	            ];
				die();	
			}
			

			$return = Db::table('wa_app_ver')->insert($adddata);

			if($return==1){
				$this->code = 1;
				die();
			}else{
				$this->code = -1;
	            $this->data = [
	          	  'type' => '401',
	              'msg'=> '上传错误'
				];
				die();

			}			

	   	}else{
				$this->code = -1;
	            $this->data = [
	          	  'type' => '401',
	              'msg'=> '上传错误'
				];
				die();
	   	}
	   



   }





}
