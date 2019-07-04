<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 * 控制台
 *
 * @icon fa fa-dashboard
 * @remark 用于展示当前系统中的统计数据、统计报表及重要实时数据
 */
class Dashboard extends Backend
{

    /**
     * 查看
     */
    public function index()
    {
        $seventtime = \fast\Date::unixtime('day', -7);
        $paylist = $createlist = [];
        for ($i = 0; $i < 7; $i++)
        {
            $day = date("Y-m-d", $seventtime + ($i * 86400));
            $createlist[$day] = mt_rand(20, 200);
            $paylist[$day] = mt_rand(1, mt_rand(1, $createlist[$day]));
        }
        $this->view->assign([
            'totaluser'          => 0,
            'totalviews'         => 0,
            'totalorder'         => 0,
            'totalorderamount'   => 0,
            'todayuserlogin'     => 0,
            'todayusersignup'    => 0,
            'todayorder'         => 0,
            'todayunsettleorder' => 0,
            'sevendnu'           => '0%',
            'sevendau'           => '0%',
            'paylist'            => $paylist,
            'createlist'         => $createlist,
        ]);


        return $this->view->fetch();
    }

}
