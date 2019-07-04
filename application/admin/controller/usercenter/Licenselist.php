<?php

namespace app\admin\controller\usercenter;

use app\common\controller\Backend;

use think\Controller;
use think\Request;
use think\Db;
/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Licenselist extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('License');
    }

    public function update_s()
    {
       $id = $_POST['row']['id'];
	   $license = $_POST['row']['license'];
       $data['homekey'] = trim(strip_tags($_POST['row']['homekey']));
       $data['companyname'] = trim(strip_tags($_POST['row']['companyname']));
       $data['servertype'] = trim(strip_tags($_POST['row']['servertype']));
       $data['effectivetime'] = trim(strip_tags($_POST['row']['effectivetime']));
       $data['remark'] = trim(strip_tags($_POST['row']['remark']));
       $data['textpsword'] = trim(strip_tags($_POST['row']['textpsword']));
       $data['appID'] = trim(strip_tags($_POST['row']['appID']));
       $data['AppSecret'] = trim(strip_tags($_POST['row']['AppSecret']));
       $salt = md5(rand());
       $data['pami_ID'] = md5(md5($data['appID'].$salt));
       $data['passwd']  = md5($salt.$data['textpsword']);
       $data['salt'] = $salt;

       $data['plat_push'] = trim(strip_tags($_POST['row']['plat_push']));
       $data['openpush'] = trim(strip_tags($_POST['row']['openpush']));
       $data['AESkey'] = trim(strip_tags($_POST['row']['AESkey']));
       $data['plat_push_path'] = trim(strip_tags($_POST['row']['plat_push_path']));
       $data['plat_appkey'] = trim(strip_tags($_POST['row']['plat_appkey']));
       $data['plat_content'] = trim(strip_tags($_POST['row']['plat_content']));

       if($data['appID']!==""){
            if(empty($data['AppSecret'])){
               $return  = [
                    'code' => 0,
                    'msg' => '请填写AppSecret'
                ];
                echo json_encode($return);
                die();
           }
           $old_appIDdata = Db::table('wa_license')->where(array('license'=>$license))->find();

//    如果开启了第三方推送，判断他有没有填第三方参数
            if($data['openpush'] == 1){
                if(empty($data['AESkey'])){
                    $return  = [
                        'code' => 0,
                        'msg' => '请填写AESkey'
                    ];
                    echo json_encode($return);
                    die();
                }
                if(empty($data['plat_push_path'])){
                    $return  = [
                        'code' => 0,
                        'msg' => '请填写第三方推送的url地址'
                    ];
                    echo json_encode($return);
                    die();
                }
                if(empty($data['plat_appkey'])){
                    $return  = [
                        'code' => 0,
                        'msg' => '请填写Signkey'
                    ];
                    echo json_encode($return);
                    die();
                }
                if(empty($data['plat_content'])){
                    $return  = [
                        'code' => 0,
                        'msg' => '请填写第三方签名参数'
                    ];
                    echo json_encode($return);
                    die();
                }
            }

//APPID 和　AppSecret  没有改变PAMI_ID 不允许改变

           if($old_appIDdata['appID']==$data['appID'] && $old_appIDdata['AppSecret']==$data['AppSecret'])
           {
                $newdata['homekey'] = $data['homekey'];
                $newdata['companyname'] = $data['companyname'];
                $newdata['servertype'] = $data['servertype'];
                $newdata['effectivetime'] = $data['effectivetime'];
                $newdata['remark'] = $data['remark'];
                $newdata['textpsword'] = $data['textpsword'];
                $newdata['passwd'] =  $data['passwd'];
                $newdata['salt'] = $data['salt'];

                $newdata['plat_push'] = $data['plat_push'];
                $newdata['openpush'] = $data['openpush'];
                $newdata['AESkey'] = $data['AESkey'];
                $newdata['plat_push_path'] = $data['plat_push_path'];
                $newdata['plat_appkey'] = $data['plat_appkey'];
                $newdata['plat_content'] = $data['plat_content'];

                $res = Db::table('wa_license')->where(array('id'=>$id,'license'=>$license))->update($newdata);
                if($res)
                {
                    $return  = [
                        'code' => 1,
                        'msg' => 'success'
                    ];
                    echo json_encode($return);
                    die();
                }else{
                    $return = [
                        'code' => 0,
                        'msg' => 'up date tabel error'
                    ];
                    echo json_encode($return);
                    die();
                }
           }
       }
       

//pami_ID更新后login_session/bind_phone表对应更新
       $old_pami_ID = Db::table('wa_license')->where(array('license'=>$license))->field('pami_ID')->find()['pami_ID'];

       $res = Db::table('wa_license')->where(array('id'=>$id,'license'=>$license))->update($data);
       if($res){
            if($old_pami_ID){
                $savepami_id = [
                    'pami_ID'=>$data['pami_ID'] 
                ];
               $security_login = Db::table('wa_login_session')->where(array('pami_ID'=>$old_pami_ID))->field('pami_ID')->select();
               if($security_login){
                $reslogin_session_1  = Db::table('wa_login_session')->where(array('pami_ID'=>$old_pami_ID))->update($savepami_id);

                if(!$reslogin_session_1){
                    $return  = [
                            'code' => 0,
                            'msg' => 'update pami_id sessiontable  error'
                        ];
                        echo json_encode($return);
                        die();
                    }
               }
               $security_phone = Db::table('wa_phone_bind')->where(array('pami_ID'=>$old_pami_ID))->field('pami_ID')->select();
               if($security_phone){
                $reslogin_session_2 = Db::table('wa_phone_bind')->where(array('pami_ID'=>$old_pami_ID))->update($savepami_id);
                    if(!$reslogin_session_2){
                            $return  = [
                                'code' => 0,
                                'msg' => 'update  phone_bind error'
                            ];
                            echo json_encode($return);
                            die();
                    }
               }
               

               if($old_appIDdata){
//license更新appID后 原登录的客户端强制退出
                    if($old_appIDdata['appID']!==$data['appID']){

                      $del = Db::table('wa_login_session')->where(array('pami_ID'=>$data['pami_ID']))->delete();
                        //清空redis
                      $redis = new \Redis();//连接本地的 Redis 服务
                      $redis->connect('127.0.0.1', 6379);
                      $redis->flushall();          
                      if($del){
                            $return  = [
                                'code' => 1,
                                'msg' => 'success'
                            ];
                            echo json_encode($return);
                            die();
                      }else{
                          
                            $return  = [
                                'code' => 0,
                                'msg' => 'delete login_session eror'
                            ];
                            echo json_encode($return);
                            die();
                      }
                    }

               }


            }else{
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
                'msg' => 'update wa_license error'
            ];
            echo json_encode($return);
            die();
       }

            $return  = [
                'code' => 1,
                'msg' => 'success'
            ];
            echo json_encode($return);
            die();



    }

    public function choosetype(){
        
        $license  = input('license');

        $appIDdata = Db::table('wa_license')->where(array('license'=>$license))->field('appID')->find();
     
        if($appIDdata){
            $appID = $appIDdata['appID'];
        }else{
            $return  = [
                'code' => 0,
                'msg' => 'license no bind appid'
            ];
            echo json_encode($return);
            die();
        }

        $unbundling_model_id = Db::table('wa_Template_push')->where(array('type'=>'unbundling','appID'=>$appID))->find();

        $Customer_model_id = Db::table('wa_Template_push')->where(array('type'=>'Customer','appID'=>$appID))->find();
        $attention_model_id = Db::table('wa_Template_push')->where(array('type'=>'attention','appID'=>$appID))->find();
        $Sign_model_id = Db::table('wa_Template_push')->where(array('type'=>'Sign','appID'=>$appID))->find();
        $Operation_model_id = Db::table('wa_Template_push')->where(array('type'=>'Operation','appID'=>$appID))->find();
        $binding_model_id = Db::table('wa_Template_push')->where(array('type'=>'binding','appID'=>$appID))->find();
        $this->assign('license',$license);
        $this->assign('unbundling_model_id',$unbundling_model_id['model_id']);
        $this->assign('Customer_model_id',$Customer_model_id['model_id']);
        $this->assign('attention_model_id',$attention_model_id['model_id']);
        $this->assign('Sign_model_id',$Sign_model_id['model_id']);
        $this->assign('binding_model_id',$binding_model_id['model_id']);
        $this->assign('Operation_model_id',$Operation_model_id['model_id']);
        return $this->view->fetch();
    }
    
    public function wechatmodelID(){
        $data['model_id'] =strip_tags(trim($_POST['model_id']));
        $data['title'] =strip_tags(trim($_POST['title']));
        $data['industry'] = strip_tags(trim($_POST['industry']));
        $data['detailinto'] = strip_tags(trim($_POST['detailinto']));
        $data['exampe'] = strip_tags(trim($_POST['detailinto']));
        $data['type'] = strip_tags(trim($_POST['type']));
        $license = strip_tags(trim($_POST['license']));

        if($license=='' && $data['type']==''){
            $return  = [
                'code' => 0,
                'msg' => 'license or type no post'
               ];
            echo json_encode($return);
            die();
        }

        $appIDdata = Db::table('wa_license')->where(array('license'=>$license))->field('appID')->find();

        if($appIDdata){
            $data['appID'] = $appIDdata['appID'];
        }else{
            $return  = [
                'code' => 0,
                'msg' => 'license no bind appid'
               ];
            echo json_encode($return);
            die();
        }

        $check_type = Db::table('wa_Template_push')->where(array('type'=>$data['type'],'appID'=>$data['appID']))->find();
        
        if($check_type){
            $res_up = Db::table('wa_Template_push')->where(array('type'=>$data['type'],'appID'=>$data['appID']))->update($data);
        }else{
            $res_up = Db::table('wa_Template_push')->insert($data);
        }

        if($res_up){
            $return  = [
                'code' => 1,
                'msg' => 'success'
               ];
            echo json_encode($return);
            die();
        }else{
            $return  = [
                'code' => 0,
                'msg' => 'error'
               ];
            echo json_encode($return);
            die();
        }
    }
}
