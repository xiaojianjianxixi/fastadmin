<?php

namespace app\admin\model;

use think\Model;

class Recognition extends Model
{

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;

    // 关联license表
    public function license()
    {
        return $this->hasMany('License', 'license', 'license');
    }

}
