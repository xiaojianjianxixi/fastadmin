<?php

namespace app\admin\controller;

use app\admin\model\AdminLog;
use app\common\controller\Backend;
use think\Config;
use think\Hook;
use think\Validate;
use think\Session;

/**
 * 后台首页
 * @internal
 */
class Index extends Backend
{

    protected $noNeedLogin = ['login', 'logout'];
    protected $noNeedRight = ['index'];
    protected $layout = '';

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 后台首页
     */
    public function index()
    {
        //
        $menulist = $this->auth->getSidebar([
            'dashboard'  => null,
            'auth'       => null,
            'auth/admin' => null,
            'auth/rule'  => null,
            'general'    => null,
        ]);
        $this->view->assign('menulist', $menulist);
        $this->view->assign('title', __('Home'));

  

        return $this->view->fetch();
    }

    /**
     * 管理员登录
     */
    public function login()
    {
        $url = $this->request->get('url', 'index/index');
        if ($this->auth->isLogin())
        {
            $this->error(__("You've logged in, do not login again"), $url);
            return;
        }
        if ($this->request->isPost())
        {
            $username = $this->request->post('username');
            $password = $this->request->post('password');
            $keeplogin = $this->request->post('keeplogin');
            $speedcode = $_POST['speedcode'];

            $token = $this->request->post('__token__');
            $rule = [
                'username'  => 'require|length:3,30',
                'password'  => 'require|length:3,30',
                '__token__' => 'token',
            ];
            $data = [
                'username'  => $username,
                'password'  => $password,
                '__token__' => $token,
            ];
          
            if($speedcode=='true')
            {
                $rule['captcha'] = 'require|captcha';
                $data['captcha'] = $this->request->post('captcha');
                $validate = new Validate($rule, [], ['username' => __('Username'), 'password' => __('Password'), 'captcha' => __('Captcha')]);
         
            }else{
                $validate = new Validate($rule, [], ['username' => __('Username'), 'password' => __('Password')]);
            }

            $result = $validate->check($data);
     
            if (!$result)
            {
                $this->error($validate->getError(), $url, ['token' => $this->request->token()]);
                return;
            }
            $result = $this->auth->login($username, $password, $keeplogin ? 86400 : 0);
            if ($result === true)
            {
                $this->success(__('Login successful'), $url);
                return;
            }
            else
            {
               $msg = $this->auth->getError();
               $msg = $msg ? $msg : __('Username or password is incorrect');
               $this->error($msg, $url, ['token' => $this->request->token()]);
            }
            return;
        }

        // 根据客户端的cookie,判断是否可以自动登录
        if ($this->auth->autologin())
        {
            $this->redirect($url);
        }
        $this->view->assign('title', __('Login'));
        return $this->view->fetch();
    }

    /**
     * 注销登录
     */
    public function logout()
    {
        $this->auth->logout();
        $this->success(__('Logout successful'), 'index/login');
        return;
    }

}
