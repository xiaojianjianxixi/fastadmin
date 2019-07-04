<?php

namespace app\admin\controller\upgrade;

use app\common\controller\Backend;
use app\admin\model\Apk as ApkModel;

use think\Controller;
use think\Request;
use think\Db;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Applist extends Backend
{

    protected $model = null;
    
    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Apk');
    }

    protected $relationSearch = true;
    public function index()
    {
        if ($this->request->isAjax())
        {
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                    ->with("apkbranch")
                    ->where($where)
                    ->order($sort, $order)
                    ->count();
            $list = $this->model
                    ->with("apkbranch")
                    ->with("apkplat")
                    ->with("apptype")
                    ->with("clienttype")
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }

    public function addplus()
    {
        $apk_plat = Db::table('wa_apk_plat')->select();
        $app_type = Db::table('wa_app_type')->select();
        $apk_branch = Db::table('wa_apk_branch')->select();

        $client_type = Db::table('wa_client_type')->select();
        $this->assign('apk_plat',$apk_plat);
        $this->assign('app_type',$app_type);
        $this->assign('apk_branch',$apk_branch);
        $this->assign('client_type',$client_type);
        return $this->view->fetch();
    }    

    public function addapk()
    {

        $data['version']     = $this->request->post('version');
        $data['mandatory']   = $this->request->post('mandatory');
        $data['platform']    = $this->request->post('platform');
        $data['branchid']    = $this->request->post('branchid');
        $data['plus']        = $this->request->post('plus');
        $data['client_type'] = $this->request->post('client_type');
        $data['apk_path']    = $this->request->post('apk_path');
        $data['attachments'] = $this->request->post('others_path');
        $data['intro']       = $this->request->post('intro');
        $data['time']        = time();

        // 字符串必须为用'.'隔开的数字串
        $rule = "/^\d+(\.\d+)*$/";
        $aMat = preg_match($rule, $data['version']);
        if(!$aMat)
        {
            $result = [
                'code' => -1,
                'msg' => '版本号必须为用'.'隔开的数字串。'
            ];
            echo json_encode($result);
            die();
        }

        if(empty($data['platform']) || empty($data['branchid']) || empty($data['plus']) || empty($data['client_type'])
        || empty($data['client_type']) || empty($data['apk_path'])  || empty($data['intro']))
        {
            $result = [
                'code' => -1,
                'msg' => '参数不全'
            ];
            echo json_encode($result);
            die();
        }


        if(isset($data['apk_path'])){
            $filemd5apk = dirname($_SERVER['SCRIPT_FILENAME']).$data['apk_path'];

            if(!file_exists($filemd5apk))
            {
                $result = [
                    'code' => -1,
                    'msg' => '文件保存错误,文件不存在'
                ];
                echo json_encode($result);
                die();
          
            }

            $data['filemd5apk'] = md5_file($filemd5apk);
            $data['absolute_path_apk']  = $filemd5apk;
        }
        if(isset($data['attachments'])){
            $filemd5other = dirname($_SERVER['SCRIPT_FILENAME']).$data['attachments'];
            if(!file_exists($filemd5other))
            {
                $result = [
                    'code' => -1,
                    'msg' => '文件保存错误,文件不存在'
                ];
                echo json_encode($result);
                die();
            }
            $data['filemd5other'] = md5_file($filemd5other);
            $data['absolute_path_other']  = $filemd5other;
        }

        $chekc = $this->model->where(array('version'=>$data['version'],'branchid'=>$data['branchid']))->find();
        if($chekc)
        {
            $result = [
                'code' => -1,
                'msg' => '重复的版本号与分支'
            ];
            echo json_encode($result);
            die();
        }
        $result = $this->model->create($data);

        if($result)
        {
            $this->code = 1;
        }else{
            $this->code =-1;
        }
        
    }
    
    public function upfaileapk()
    {

        if($_FILES['file']){
    
            //$Suffix = end(explode(".", $_FILES['file']['name']));
            //var_dump(explode('.', $_FILES['file']['name']));die();

            $Suffix = substr(strrchr($_FILES['file']['name'], '.'), 1);
                     
                if ($Suffix=='apk')
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
                                $this->msg = '上传成功';
                                $this->data = [
                                    'type' => 'apk',
                                    'url' => $downapkPath
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

    public function upfailother()
    {

        if($_FILES['file']){
    
            // $Suffix = explode(".", $_FILES['file']['name']);
            // $size = $Suffix[1];
             $Suffix = substr(strrchr($_FILES['file']['name'], '.'), 1);
             $size = $Suffix;

                        if ($_FILES['file']['size'] / (1024 * 1024) > 200) 
                        {
                            $this->code = 1;
                            $this->data = [
                            'type' => '400',
                            'msg' => '上传文件大小不能超过200M'
                            ];
                         
                        }
                        $apkName = time() . rand(1, 10000) . "."."$size";
                        $LOAD = dirname($_SERVER['SCRIPT_FILENAME']);
              
                        $uploadDir = $LOAD ."/"."uploads"."/"."app"."/".'otherfile'."/" . date('Y-m-d', time());

                        if (!is_dir($uploadDir)){
    
                            if(!is_dir($LOAD ."/"."uploads")){
                                mkdir($LOAD ."/"."uploads");
                            }
                            if(!is_dir($LOAD ."/"."uploads"."/"."app")){
                                mkdir($LOAD ."/"."uploads"."/"."app");
                            }
                            if(!is_dir($LOAD ."/"."uploads"."/"."app"."/".'otherfile')){
                                mkdir($LOAD ."/"."uploads"."/"."app"."/".'otherfile');
                            }
                            mkdir($uploadDir);
                        }
                        $apkPath = $uploadDir . '/' . $apkName;
                        $uploadAPKRes = move_uploaded_file($_FILES['file']['tmp_name'], $apkPath);
                        if($uploadAPKRes){
                                $downapkPath = "/uploads"."/"."app"."/".'otherfile'."/" . date('Y-m-d', time())."/".$apkName;
                                $this->code = 1;
                                $this->msg = '上传成功';
                                $this->data = [
                                    'type' => 'apk',
                                    'url' => $downapkPath
                                ];
                        }else{
                            $this->code = -1;
                            $this->msg = '上传失败';
                        }

            }else{
                $this->code = -1;
                $this->data = [
                'type' => '404',
                'msg'=> '没有上传文件'
                ];
            }
    
    
    }

    public function del($ids = '')
    {
        $ids = input('ids');

        if($ids)
        {
            // $check = Db::table('wa_apk_branch')->where(array('id'=>$ids))->delete();
            $check = ApkModel::destroy($ids);
            if($check){
                $this->code=1;
            }else{
                $this->code=-1;
                $this->msg='删除失败';
            }
        }else{
            $this->code=-1;
            $this->msg='no get ids';
        }
    }
}
