<?php

namespace app\admin\model;

use think\Model;

class Apk extends Model
{

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;

    // 关联apk_branch表
    public function apkbranch()
    {
        return $this->hasMany('ApkBranch', 'id', 'branchid');
    }
    // 关联apk_plat表
    public function apkplat()
    {
        return $this->hasMany('ApkPlat', 'id', 'platform');
    }
    // 关联app_type表
    public function apptype()
    {
        return $this->hasMany('AppType', 'id', 'plus');
    }
    // 关联client_type表
    public function clienttype()
    {
        return $this->hasMany('ClientType', 'id', 'client_type');
    }
    // 读取器，强制升级字段读取时修改
    public function getMandatoryAttr($value)
    {
        $status = [0=>'否',1=>'是'];
        return $status[$value];
    }
}
