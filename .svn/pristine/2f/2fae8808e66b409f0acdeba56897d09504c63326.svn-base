<?php

// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\Route;
define('wechatPath','http://devwechat.techpami.com');
define("CAPTCHA_ID", "2f1b5d0d41aee652ee6e731821129dea");
define("PRIVATE_KEY", "e9f474fe3dafeeb77f42dbac0c956d3e");

return [
    //别名配置,别名只能是映射到控制器且访问时必须加上请求的方法
//    '__alias__'   => [
//        'demo' => 'admin/Test',
//    ],
    '__pattern__' => [
        'name' => '\w+',
    ],
    '[hello]'     => [
        ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
        ':name' => ['index/hello', ['method' => 'post']],
    ],
//        域名绑定到模块
//        '__domain__'  => [
//            'admin' => 'admin',
//            'api'   => 'api',
//        ],
];

