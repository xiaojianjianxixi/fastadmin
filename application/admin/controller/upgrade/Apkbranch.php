<?php

namespace app\admin\controller\upgrade;

use app\common\controller\Backend;
use app\admin\model\ApkBranch as ApkBranchModel;

use think\Controller;
use think\Request;
use think\Db;
use GuzzleHttp\json_encode;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Apkbranch extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('ApkBranch');
    }

    public function add()
    {
            if ($this->request->ispost()) {
                
                $data['branch_name'] = input('post.row.branch_name');
                $data['time'] = strtotime(input('post.row.time'));
                $data['uptime'] = strtotime(input('post.row.uptime'));
                $data['intos'] = input('post.row.intos');

                if(empty($data['branch_name']))
                {
                    $result = [
                        'code' => -1,
                        'msg' => '请填写分支名称'
                    ];
                    echo json_encode($result);
                    die();
                }
                if(empty($data['intos']))
                {
                    $result = [
                        'code' => -1,
                        'msg' => '请填写分支描述'
                    ];
                    echo json_encode($result);
                    die();
                }
                if(empty($data['time']) || empty($data['uptime']))
                {
                    $result = [
                        'code' => -1,
                        'msg' => '参数不全'
                    ];
                    echo json_encode($result);
                    die();
                }
                $chekc = $this->model->where(array('branch_name'=>$data['branch_name']))->find();
                if($chekc)
                {
                    $result = [
                        'code' => -1,
                        'msg' => '分支名称重复,请重新填写'
                    ];
                    echo json_encode($result);
                    die();
                }

                $result = $this->model->create($data);
                if($result)
                {
                    $this->code = 1;
                    $this->msg = '添加成功';
                }else{
                    $this->code = -1;
                    $this->msg = '添加失败';
                }

            }
            
            return $this->view->fetch();
    }

    public function edit($ids = '')
    {       

        $ids = input('ids');

        if($this->request->ispost())
        {
     
            $data = $this->request->post();

            $exist = Db::table('wa_apk_branch')->where(array('id'=>$ids))->select();
            $branch_name = input('row.branch_name');
            
            if($exist)
            {
                $chekc = $this->model->where(array('branch_name'=>$branch_name))->find();
                if($chekc)
                {
                    $result = [
                        'code' => -1,
                        'msg' => '该分支名称已存在'
                    ];
                    echo json_encode($result);
                    die();
                }
                $result  = Db::table('wa_apk_branch')->where(array('id'=>$ids))->update($data['row']);
                if($result){
                    $this->code=1;
                    $this->msg = '修改成功';
                }else{
                    $this->code=-1;
                    $this->msg = '您还没有做出修改';
                }
            }
        }
        $branch_name = input('branch_name');
        if($ids)
        {
            $row = Db::table('wa_apk_branch')->where(array('id'=>$ids))->find();
            $this->assign('row',$row);

        }else{
            $this->code=-1;
        }
        return $this->view->fetch();
    }

    public function del($ids = '')
    {
        $ids = input('ids');

        if($ids)
        {
            // $check = Db::table('wa_apk_branch')->where(array('id'=>$ids))->delete();
            $check = ApkBranchModel::destroy($ids);
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
