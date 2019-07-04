<?php

namespace app\api\controller;

use app\common\controller\Api;
use think\Db;
use EasyWeChat\Server\BadRequestException;

class Logup extends Api
{
    //app日志上传
    public function logupload(){

        $license = trim($_POST['license']);
        $version = trim($_POST['version']);
        $foldermark = trim($_POST['foldermark']);
        $deviceid = trim($_POST['deviceid']);
        $file = $_FILES;
        \think\Log::record($file,'file:');
        \think\Log::record($license,'license:');
        \think\Log::record($version,'version:');
        \think\Log::record($foldermark,'foldermark:');
        if(empty($license) || strlen($license)!==40){
            echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'license no right'
                )
            );
            die();
        }

        if(empty($deviceid)){
            echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no post deviceid'
                )
            );
            die();
        }
        if(empty($version)){
            echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no post version'
                )
            );
            die();
        }
        if(empty($foldermark)){
            echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no post foldermark'
                )
            );
            die();
        }
        if(empty($_FILES)){
            echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no log file upload'
                )
            );
            die();
        }
        //校验license
        $user = Db::table('wa_license')->where(array('license'=>$license))->find();
        \think\Log::record($user,'校验license:');
        if(!$user){
          
            echo json_encode(array('status'=>'500','msg'=>'check license no right'));
            die();
        }
        
        //上传日志文件
        if($_FILES['file']){

                if($_FILES['file']['size'] / (1024 * 1024) > 100) 
                {
                    echo json_encode(
                        array(
                            'status' => 0,
                            'msg' => 'Upload files over 100M'
                        )
                    );
                    die();
                }
                $Suffix = explode(".", $_FILES['file']['name']);
                $file_type = $Suffix[1];
                if($file_type!=='txt'){
                    echo json_encode(
                        array(
                            'status' => 0,
                            'msg' => 'file type no txt'
                        )
                    );
                    die();  
                }
                
                $fileName = date('Y-m-d-H:i:s',time()).".".$file_type;
                $LOAD = dirname($_SERVER['SCRIPT_FILENAME']);//绝对路径

                $uploadDir = $LOAD ."/"."uploads"."/"."applog"."/".$license."/".$deviceid."/".$foldermark;
             //   $downloadlink = wechatPath."/public/uploads/applog/".$foldermark.'/'.$fileName;
                if (!is_dir($uploadDir)){

                    if(!is_dir($LOAD ."/"."uploads")){
                        mkdir($LOAD ."/"."uploads");
                    }
                    if(!is_dir($LOAD ."/"."uploads"."/"."applog")){
                        mkdir($LOAD ."/"."uploads"."/"."applog");
                    }
                    
                    if(!is_dir($LOAD ."/"."uploads"."/"."applog/".$license)){
                        mkdir($LOAD ."/"."uploads"."/"."applog/".$license);
                    }

                    if(!is_dir($LOAD ."/"."uploads"."/"."applog/".$license."/".$deviceid)){
                        mkdir($LOAD ."/"."uploads"."/"."applog/".$license."/".$deviceid);
                    }
                    mkdir($uploadDir);
                }

            $applogPath = $uploadDir . '/' . $fileName;
            $uploadlogRes = move_uploaded_file($_FILES['file']['tmp_name'], $applogPath);
            if(!$uploadlogRes){
                echo json_encode(
                    array(
                        'status' => 0,
                        'msg' => 'uploads file error'
                    )
                );
                die();
            }

            echo json_encode(
                array(
                    'status' => 1,
                    'msg' => 'Successful operation'
                )
            );
            die();

        }else{
            echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'uploads file  error'
                )
            );
            die();
        }

    }



}