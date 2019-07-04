<?php

namespace app\api\controller;

use app\common\controller\Api;
use app\common\controller\CryptAES;
use think\Db;
use EasyWeChat\Server\BadRequestException;

class Index extends Api
{
	//版本号比较函数
	public function versionCompare($a, $b)
	{   
	    // a,b已存在、非空字符串或者非零
	    if (empty($a) || empty($b)) 
	        return "errmsg：不可为空。";
	
	    // 字符串必须为用'.'隔开的数字串
	    $rule = "/^\d+(\.\d+)*$/";
	    $aMat = preg_match($rule, $a);
	    $bMat = preg_match($rule, $b);
	    if (!$aMat || !$bMat) 
	        return "errmsg: 必须为用'.'隔开的数字串。";
	
	    // 移除最后的.0
	    $a = explode(".", rtrim($a, ".0")); 
	    $b = explode(".", rtrim($b, ".0")); 
	
	    foreach ($a as $depth => $aVal)
	    { 
	        if (isset($b[$depth])){ 
	            if ($aVal > $b[$depth]) return '>'; 
	            else if ($aVal < $b[$depth]) return '<';
	        }else{
	            return '>'; 
	        }
	    }
	    return (count($a) < count($b)) ? '<' : '=';
	} 

	//AES加解密函数
	//data 需要加密的数据包,type:0加密,1解密,keystr:秘钥串
	private function aesencryption($data,$type,$keyStr){
	//$keyStr = 'E756284DDFA7FFC249903110AC67B4CC';
                    $aes = new CryptAES();
                    $aes->set_key($keyStr);
                    $aes->require_pkcs5();
		if((int)$type==0){
                    $encText = $aes->encrypt($data);
		return $encText;
		}else{	
                    $decString = $aes->decrypt($encText);
		return $decString;
		}
		}

    public function index()
    {
        return json(['code' => 0]);
    }

    public function appver(){

    //http://192.168.1.124/fastadmin/public/api/index/appver?&version=1.1.1.1&license=20e54a3966f5a15266ac38bc44def997f3a0ea98&plat=Android&branch_name=usb_socketDoor
    $license = $_GET["license"];
    $version = $_GET["version"];
    $plat = $_GET["plat"];
    $branch_name = $_GET["branch_name"];

    if(empty($license))
    {
        echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no get license'
                )
            );
        die();
    }

    if(empty($version))
    {
        echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no get version'
                )
            );
        die();
    }

    if(empty($plat))
    {
        echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no get plat'
                )
            );
        die();
    }

    if(empty($branch_name))
    {
        echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no get branch_name'
                )
            );
        die();
    }

        $branchdata = Db::table('wa_apk_branch')->where(array('branch_name'=>$branch_name))->find();
  
        $apk_branch_id = $branchdata['id'];

        if($apk_branch_id=="")
        {
            echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no find  that branch'
                )
            );
            die();
        }

        $apk_plat = Db::table('wa_apk_plat')->where(array('apk_plat'=>$plat))->find();
        $plat_id = $apk_plat['id'];
        if($plat_id=="")
        {
            echo json_encode(
                array(
                    'status' => 0,
                    'msg' => 'no find  that plat'
                )
            );
            die();
        }


        $user = Db::table('wa_license')->where(array('license'=>$license))->find();

        if($user==null)
        {

            $inspect = array('msg'=>'500','status'=>'check license no right');//license不对用户验证身份失败

         }else{
		
		//本地新版查询
                $appnewest = Db::table('wa_apk')->where(array('platform'=>$plat_id,'branchid'=>$apk_branch_id))->order('time desc')->limit(1)->select();
		$newest_version=$appnewest[0]['version'];
		$compare_result=$this->versionCompare($newest_version,$version);
		if($compare_result=='>'){
		//需要更新
                    $path = dirname($_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME']).$appnewest[0]['apk_path'];
                    $path2 = dirname($_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME']).$appnewest[0]['attachments'];
                    $arr = array('msg'=>'yes',
                                     'mandatory'=>$appnewest[0]['mandatory'],
                                     'version'=>$appnewest[0]['version'],
                                     'new_ver_url'=>$path,
                                     'attachments'=>$path2,
                                     'filemd5apk'=>$appnewest[0]['filemd5apk'],
                                     'filemd5other'=>$appnewest[0]['filemd5other']
                                    );//有版本需要更新

                    $jsondata = json_encode($arr);
			$keyStr = 'E756284DDFA7FFC249903110AC67B4CC';
			$encry_data=$this->aesencryption($jsondata,0,$keyStr);
                 $inspect = [
                        'msg'=>'yes',
                        'attr'=>$encry_data
                    ];
 

			}
		else{

			$inspect = array('msg'=>'no','copyright'=>'pami');//没有版本需要更新
				}
	/*
		//客户端发送的旧版本查询
                //$appold = Db::table('wa_apk')->where(array('version'=>$version,'platform'=>$plat_id,'branchid'=>$apk_branch_id))->limit(1)->select();
		//本地新版查询
                $appnew = Db::table('wa_apk')->where(array('platform'=>$plat_id,'branchid'=>$apk_branch_id))->order('time desc')->limit(1)->select();
         if (!$appnew){
                      $inspect = array('msg'=>'no','copyright'=>'pami');//没有版本需要更新
        		$json = json_encode($inspect);
        		echo $json;
        		die();

			} 
        if($appold){
            $bb = $appold[0]['version'];
            $aa = $appnew[0]['version']; 
               $result=$this->versionCompare() 
                if($aa!==$bb)
                {//有版本需要更新
                    $path = dirname($_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME']).$appnew[0]['apk_path'];
                    $path2 = dirname($_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME']).$appnew[0]['attachments'];
                    $arr = array('msg'=>'yes',
                                     'mandatory'=>$appnew[0]['mandatory'],
                                     'version'=>$appnew[0]['version'],
                                     'new_ver_url'=>$path,
                                     'attachments'=>$path2,
                                     'filemd5apk'=>$appnew[0]['filemd5apk'],
                                     'filemd5other'=>$appnew[0]['filemd5other']
                                    );//有版本需要更新

                    $jsondata = json_encode($arr);
                    
                    //AES加密
                    //密钥  
                    $keyStr = 'E756284DDFA7FFC249903110AC67B4CC';
                    $aes = new CryptAES();  
                    $aes->set_key($keyStr);  
                    $aes->require_pkcs5();  
                    $encText = $aes->encrypt($jsondata);  
                    $decString = $aes->decrypt($encText);

                    $inspect = [
                        'msg'=>'yes',
                        'attr'=>$encText
                    ];

                }else{//无版本需要更新

                      $inspect = array('msg'=>'no','copyright'=>'pami');//没有版本需要更新

                }
            }else{
                $aa = $appnew[0]['version'];
                $path = dirname($_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME']).$appnew[0]['apk_path'];
                $path2 = dirname($_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME']).$appnew[0]['attachments'];
                $arr = array('msg'=>'yes',
                                 'mandatory'=>$appnew[0]['mandatory'],
                                 'version'=>$appnew[0]['version'],
                                 'new_ver_url'=>$path,
                                 'attachments'=>$path2,
                                 'filemd5apk'=>$appnew[0]['filemd5apk'],
                                 'filemd5other'=>$appnew[0]['filemd5other']
                                );//有版本需要更新

                $jsondata = json_encode($arr);
                
                //AES加密
                //密钥  
                $keyStr = 'E756284DDFA7FFC249903110AC67B4CC';
                $aes = new CryptAES();  
                $aes->set_key($keyStr);  
                $aes->require_pkcs5();  
                $encText = $aes->encrypt($jsondata);  
                $decString = $aes->decrypt($encText);

                $inspect = [
                    'msg'=>'yes',
                    'attr'=>$encText
                ];
            }

	*/
        }

        $json = json_encode($inspect);
        echo $json;
        die();
    }

}
