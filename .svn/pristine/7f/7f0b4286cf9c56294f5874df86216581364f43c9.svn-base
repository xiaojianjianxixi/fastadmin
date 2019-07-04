<?php

namespace app\admin\controller\upgrade;

use app\common\controller\Backend;
use app\admin\model\ClientType as ClientTypeModel;
use app\admin\model\ApkPlat as ApkPlatModel;
use app\admin\model\AppType as AppTypeModel;

use think\Controller;
use think\Request;
use think\Db;
/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Information extends Backend
{
    protected $model = null;
    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('ClientType');
    }

    public function addclient_type()
    {
            if ($this->request->ispost()) {
                $data = $this->request->post();

                $repeatname  = Db::table('wa_client_type')->where(array('client_type'=>$data['row']['client_type']))->select();

                $client_type = $data['row']['client_type'];
                if ($client_type == '') {
                    $this->code = -1;
                    $this->msg = '请填写产品属性';
                } else {
                    if (!empty($repeatname)) {
                        $this->code = -1;
                        $this->msg = '重复的产品属性';
                    } else {
                        $add = [
                            'client_type' => $data['row']['client_type']
                        ];
                        $result = Db::table('wa_client_type')->insert($add);
                        if ($result) {
                            $this->code=1;
                            $this->msg = '添加成功';
                        }
                    }
                }
            }
            
            return $this->view->fetch();
    }

    public function editclient_type()
    {       
            $ids = input('ids');

            if($this->request->ispost())
            {
         
                $data = $this->request->post();
     
                $exist = Db::table('wa_client_type')->where(array('id'=>$ids))->select();
                if($exist)
                {
                    $client_type = input('row.client_type');
                    $chekc = $this->model->where(array('client_type'=>$client_type))->find();
                    if($chekc)
                    {
                        $result = [
                            'code' => -1,
                            'msg' => '该产品属性已存在'
                        ];
                        echo json_encode($result);
                        die();
                    }
                    $result  = Db::table('wa_client_type')->where(array('id'=>$ids))->update($data['row']);
                    if($result){
                        $this->code=1;
                        $this->msg = '修改成功';
                    }else{
                        $this->code=-1;
                        $this->msg = '您还没有做出修改';
                    }
                }
            }
            $client_type = input('client_type');
            if($ids)
            {
                $row = Db::table('wa_client_type')->where(array('id'=>$ids))->find();
                $this->assign('row',$row);

            }else{
                $this->code=-1;
            }
            return $this->view->fetch();
    }

    public function delclient_type()
    {
        $ids = input('ids');

        if($ids)
        {
            // $check = Db::table('wa_client_type')->where(array('id'=>$ids))->delete();
            $check = ClientTypeModel::destroy($ids);
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

    public function apk_plat_index()
    {

        list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $total = Db::table('wa_apk_plat')
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = Db::table('wa_apk_plat')
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();

        $result = array("total" => $total, "rows" => $list);

        return json($result);
    }

    public function addapk_plat()
    {
        if ($this->request->ispost())
        {
            $data = $this->request->post();

            $repeatname  = Db::table('wa_apk_plat')->where(array('apk_plat'=>$data['row']['apk_plat']))->select();

            $apk_plat = $data['row']['apk_plat'];
            if ($apk_plat == '') {
                $this->code = -1;
                $this->msg = '请填写apk平台类型';
            } else if(!empty($repeatname)){
                $this->code=-1;
                $this->msg='重复的apk平台类型';
            }else{
                $add = [
                    'apk_plat' => $data['row']['apk_plat']
                ];
                $result = Db::table('wa_apk_plat')->insert($add);
                if($result){
                    $this->code=1;
                }
            }
        }
        return $this->view->fetch();

    }

    public function editapk_plat()
    {       
        $ids = input('ids');

        if($this->request->ispost())
        {
     
            $data = $this->request->post();
 
            $exist = Db::table('wa_apk_plat')->where(array('id'=>$ids))->select();
            if($exist)
            {

                $apk_plat = input('row.apk_plat');
                $chekc = Db::table('wa_apk_plat')->where(array('apk_plat'=>$apk_plat))->find();
                if($chekc)
                {
                    $result = [
                        'code' => -1,
                        'msg' => '该apk平台已存在'
                    ];
                    echo json_encode($result);
                    die();
                }
                $result  = Db::table('wa_apk_plat')->where(array('id'=>$ids))->update($data['row']);
                if($result){
                    $this->code=1;
                }else{
                    $this->code=-1;
                    $this->msg = '您还没有做出修改';
                }
            }
        }
        $client_type = input('wa_apk_plat');
        if($ids)
        {
            $row = Db::table('wa_apk_plat')->where(array('id'=>$ids))->find();
            $this->assign('row',$row);

        }else{
            $this->code=-1;
        }


        return $this->view->fetch();
    }

    public function delapk_plat()
    {
        $ids = input('ids');
        if($ids)
        {
            // $check = Db::table('wa_apk_plat')->where(array('id'=>$ids))->delete();
            $check = ApkPlatModel::destroy($ids);
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

    public function app_type_index()
    {

        list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $total = Db::table('wa_app_type')
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = Db::table('wa_app_type')
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();

        $result = array("total" => $total, "rows" => $list);

        return json($result);
    }

    public function addapp_type()
    {
        if ($this->request->ispost())
        {
            $data = $this->request->post();

            $repeatname  = Db::table('wa_app_type')->where(array('app_type'=>$data['row']['app_type']))->select();

            $app_type = $data['row']['app_type'];
            if ($app_type == '') {
                $this->code = -1;
                $this->msg = '请填写软件类型';
            } else if(!empty($repeatname)){
                $this->code = -1;
                $this->msg = '重复的软件类型';
            }else{
                $add = [
                    'app_type' => $data['row']['app_type']
                ];
                $result = Db::table('wa_app_type')->insert($add);
                if($result){
                    $this->code = 1;
                    $this->msg = '添加成功';
                }
            }
        }
        return $this->view->fetch();
    }

    public function editapp_type()
    {       
        $ids = input('ids');

        if($this->request->ispost())
        {
     
            $data = $this->request->post();
 
            $exist = Db::table('wa_app_type')->where(array('id'=>$ids))->select();
            if($exist)
            {
  
                $app_type = input('row.app_type');
                $chekc = Db::table('wa_app_type')->where(array('app_type'=>$app_type))->find();
                if($chekc)
                {
                    $result = [
                        'code' => -1,
                        'msg' => '该软件属性已存在'
                    ];
                    echo json_encode($result);
                    die();
                }
                $result  = Db::table('wa_app_type')->where(array('id'=>$ids))->update($data['row']);
                if($result){
                    $this->code=1;
                }else{
                    $this->code=-1;
                    $this->msg = '您还没有做出修改';
                }
            }
        }
        $client_type = input('wa_app_type');
        if($ids)
        {
            $row = Db::table('wa_app_type')->where(array('id'=>$ids))->find();
            $this->assign('row',$row);

        }else{
            $this->code=-1;
        }


        return $this->view->fetch();
    }

    public function delapp_type()
    {
        $ids = input('ids');
        if($ids)
        {
            // $check = Db::table('wa_app_type')->where(array('id'=>$ids))->delete();
            $check = AppTypeModel::destroy($ids);
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
