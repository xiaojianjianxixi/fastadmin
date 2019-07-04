<?php

namespace app\admin\controller\exmaple;

use app\common\controller\Backend;

use think\Controller;
use think\Request;

/**
 * 文章管理
 *
 * @icon fa fa-circle-o
 */
class Example extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Article');
    }


    public function table(){
        return  $this->view->fetch();
    }
    public function tips(){
        return  $this->view->fetch();
    }
    public function showData(){
        return  $this->view->fetch();
    }
    public function tab_compontent(){
        return  $this->view->fetch();
    }
    public function css_color(){
        return  $this->view->fetch();
    }
    public function comlist () {
      return $this->view->fetch();
    }
    public function comdetail () {
      return $this->view->fetch();
    }
    public function wechatlist () {
      return $this->view->fetch();
    }
    public function pushlist () {
      return $this->view->fetch();
    }
}
