<?php

namespace app\admin\controller\clents;

use app\common\controller\Backend;

use think\Controller;
use think\Request;
use think\session;
use think\Db;
/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Clientstaff extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('ClientStaff');
    }

    /**
     * 查看
     */
    public function index()
    {

		$admin = Session::get('admin');
		$user_account = $admin->username;
		$password  = $admin->password;
        $license = Db::table('wa_license')->where(array('user_account'=>$user_account))->find();

        if($license==null){

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
		        return $this->view->fetch();
		        die();

        }

        if ($this->request->isAjax())
        {

            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

	            $total = $this->model
	                    ->where($where)
	                    ->where('license',$license['license'])
	                    ->order($sort, $order)
	                    ->count();

	            $list = $this->model
	                    ->where($where)
	                    ->where('license',$license['license'])
	                    ->order($sort, $order)
	                    ->limit($offset, $limit)
	                    ->select();

            $result = array("total" => $total, "rows" => $list);

            return json($result);
	              
        }
        return $this->view->fetch();
    }
}
