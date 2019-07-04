<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use think\Config;

class Index extends Frontend
{

    protected $layout = 'bootstrap';

    public function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        $this->redirect('admin/index/login');
    }

    public function news()
    {
        $newslist = \app\common\model\Page::where('category_id', 1)->order('weigh', 'desc')->select();
        return jsonp(['newslist' => $newslist, 'new' => count($newslist), 'url' => 'http://www.fastadmin.net?ref=news']);
    }

}
