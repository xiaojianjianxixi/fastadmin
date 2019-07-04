define(['jquery', 'bootstrap', 'backend', 'table', 'form','template','moment','addtabs'], function ($, undefined, Backend, Table, Form,Template,Moment, addtabs) {
      var Controller = {
          table: function () {
              // 初始化表格参数配置
              Table.api.init({
                  extend: {
                      index_url: 'usercenter/licenselist/index',
                      add_url: 'usercenter/licenselist/add',
                      edit_url: 'usercenter/licenselist/edit',
                      multi_url: 'usercenter/licenselist/multi',
                      del_url:"",
                      table: 'license',
                  }
              });
              var table = $("#table");

              Template.helper("Moment", Moment);
              // 初始化表格
              table.bootstrapTable({
                  url: $.fn.bootstrapTable.defaults.extend.index_url,
                  sortName: 'id',
                  templateView: true,
                  columns: [
                      [
                   /*       {field: 'state', checkbox: true},*/
                      /*    {field: 'id', title: __('Id')},*/
                          {field: 'user_account', title: __('User_account')},
                          {field: 'license', title: __('License')},
                       /*   {field: 'passwd', title: __('Passwd')},
                          {field: 'ip', title: __('Ip')},*/
                    /*      {field: 'salt', title: __('Salt')},*/
                          {field: 'apikey', title: __('Apikey'),formatter: Table.api.formatter.resolve},
                          {field: 'apisecret', title: __('Apisecret'), formatter: Controller.api.formatter.url},
                      /*    {field: 'webpath', title: __('Webpath')},*/
              /*            {field: 'dbname', title: __('Dbname')},
                          {field: 'mom_sid', title: __('Mom_sid')},*/
                          {field: 'time', title: __('Time'), formatter: Table.api.formatter.datetime},
                          {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                      ]
                  ],
                    //禁用默认搜索
                  search: true,
                  //启用普通表单搜索
                  commonSearch: false,
                  //可以控制是否默认显示搜索单表,false则隐藏,默认为false
                  searchFormVisible: false

              });
              //视图切换
              $(document).on("click", ".btn-toggle-view", function () {
                var options = table.bootstrapTable('getOptions');
                table.bootstrapTable('refreshOptions', {templateView: !options.templateView});
              });
              //查看详情
              $(document).on("click", ".btn-detail[data-id]", function () {
                  Backend.api.open('usercenter/licenselist/edit/ids/' + $(this).data('id'), __('edit'));
              });
              //编辑
              $(document).on('click','.btn-edit[data-id]', function (){
                  Backend.api.open('usercenter/licenselist/edit' + "/ids/" + $(this).data('id'), __('Edit'));
              })
              $(document).on('click','.btn-del[data-id]', function(){
                var that = this;
                var index = Backend.api.layer.confirm(
                        __('Are you sure you want to delete the %s selected item?', 1),
                        {icon: 3, title: __('Warning'), offset: 0, shadeClose: true},
                        function () {
                            Table.api.multi("del", $(that).data('id'), table, that);
                            Backend.api.layer.close(index);
                        }
                );
              })
              //获取选中项
              $(document).on("click", ".btn-selected", function () {
                  //在templateView的模式下不能调用table.bootstrapTable('getSelections')来获取选中的ID,只能通过下面的Table.api.selectedids来获取
                  Layer.alert(JSON.stringify(Table.api.selectedids(table)));
              });
              // 为表格绑定事件
              Table.api.bindevent(table);
          },
          tips: function () {
            $('.btn-success').on('click', () => Toastr.success('成功'))
            $('.btn-danger').on('click', () => Toastr.error('失败'))
            $('.btn-default').on('click', () => Backend.api.layer.confirm(
              '确认',
              {icon: 3, title: '警告', offset: 0, shadeClose: true},
              function () {
                  alert('callback')
              }
            ));
          },
          comlist: function () {
            // 页签切换
            $('.addtab').addtabs({iframeHeight: "100%"})
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'usercenter/licenselist/index',
                    add_url: 'usercenter/licenselist/add',
                    edit_url: 'usercenter/licenselist/edit',
                    multi_url: 'usercenter/licenselist/multi',
                    detail_url: '/fastadmin/public/admin/exmaple/example/comdetail',
                    del_url:"",
                    table: 'license',
                }
            });
            var table = $("#table");
            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                 /*       {field: 'state', checkbox: true},*/
                    /*    {field: 'id', title: __('Id')},*/
                        {field: 'com_name', title: '公司名称'},
                        {field: 'user_account', title: 'User_account'},
                        {field: 'license', title: 'License'},
                     /*   {field: 'passwd', title: __('Passwd')},
                        {field: 'ip', title: __('Ip')},*/
                  /*      {field: 'salt', title: __('Salt')},*/
                        {field: 'apikey', title: 'Apikey',formatter: Table.api.formatter.copyBlock},
                        {field: 'apisecret', title: 'Apisecret', formatter: Table.api.formatter.copyBlock},
                    /*    {field: 'webpath', title: __('Webpath')},*/
            /*            {field: 'dbname', title: __('Dbname')},
                        {field: 'mom_sid', title: __('Mom_sid')},*/
                        {field: 'com_name', title: '服务类型'},
                        {field: 'time', title: 'Time', formatter: Table.api.formatter.datetime},
                        {field: 'overdue', title: '是否过期'},
                        {field: 'operate', title: 'Operate', events: Table.api.events.operate, formatter: Controller.api.formatter.operate}
                    ]
                ],
                  //禁用默认搜索
                search: true,
                //启用普通表单搜索
                commonSearch: false,
                //可以控制是否默认显示搜索单表,false则隐藏,默认为false
                searchFormVisible: false

            });
            //编辑
            $(document).on('click','.btn-edit[data-id]', function (){
                Backend.api.open('usercenter/licenselist/edit' + "/ids/" + $(this).data('id'), __('Edit'));
            })
            $(document).on('click','.btn-detail[data-id]', function (){
                Backend.api.open('usercenter/licenselist/edit' + "/ids/" + $(this).data('id'), __('Edit'));
            })
            $(document).on('click','.btn-del[data-id]', function(){
              var that = this;
              var index = Backend.api.layer.confirm(
                      __('Are you sure you want to delete the %s selected item?', 1),
                      {icon: 3, title: __('Warning'), offset: 0, shadeClose: true},
                      function () {
                          Table.api.multi("del", $(that).data('id'), table, that);
                          Backend.api.layer.close(index);
                      }
              );
            })
            //获取选中项
            $(document).on("click", ".btn-selected", function () {
                //在templateView的模式下不能调用table.bootstrapTable('getSelections')来获取选中的ID,只能通过下面的Table.api.selectedids来获取
                Layer.alert(JSON.stringify(Table.api.selectedids(table)));
            });
            // 为表格绑定事件
            Table.api.bindevent(table);
          },
          wechatlist: function () {
              // 页签切换
              // 初始化表格参数配置
              Table.api.init({
                  extend: {
                      index_url: 'usercenter/licenselist/index',
                      add_url: 'usercenter/licenselist/add',
                      edit_url: 'usercenter/licenselist/edit',
                      multi_url: 'usercenter/licenselist/multi',
                      detail_url: '',
                      del_url:"",
                      table: 'license',
                  }
              });
              var table = $("#table");
              // 初始化表格
              table.bootstrapTable({
                  url: $.fn.bootstrapTable.defaults.extend.index_url,
                  sortName: 'id',
                  columns: [
                      [
                   /*       {field: 'state', checkbox: true},*/
                      /*    {field: 'id', title: __('Id')},*/
                          {field: 'com_name', title: '公司名称'},
                          {field: 'img', title: '头像', formatter: Controller.api.formatter.showbigimg},
                          {field: 'name', title: '昵称'},
                          {field: 'wechat_account', title: 'OpenID'},
                       /*   {field: 'passwd', title: __('Passwd')},
                          {field: 'ip', title: __('Ip')},*/
                    /*      {field: 'salt', title: __('Salt')},*/
                      /*    {field: 'webpath', title: __('Webpath')},*/
              /*            {field: 'dbname', title: __('Dbname')},
                          {field: 'mom_sid', title: __('Mom_sid')},*/
                          {field: 'time', title: '关注时间', formatter: Table.api.formatter.datetime},
                          {field: 'operate', title: 'Operate', events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                      ]
                  ],
                    //禁用默认搜索
                  search: true,
                  //启用普通表单搜索
                  commonSearch: false,
                  //可以控制是否默认显示搜索单表,false则隐藏,默认为false
                  searchFormVisible: false

              });
              //编辑
              $(document).on('click','.btn-edit[data-id]', function (){
                  Backend.api.open('usercenter/licenselist/edit' + "/ids/" + $(this).data('id'), __('Edit'));
              })
              $(document).on('click','.btn-detail[data-id]', function (){
                  Backend.api.open('usercenter/licenselist/edit' + "/ids/" + $(this).data('id'), __('Edit'));
              })
              $(document).on('click','.btn-del[data-id]', function(){
                var that = this;
                var index = Backend.api.layer.confirm(
                        __('Are you sure you want to delete the %s selected item?', 1),
                        {icon: 3, title: __('Warning'), offset: 0, shadeClose: true},
                        function () {
                            Table.api.multi("del", $(that).data('id'), table, that);
                            Backend.api.layer.close(index);
                        }
                );
              })
              //获取选中项
              $(document).on("click", ".btn-selected", function () {
                  //在templateView的模式下不能调用table.bootstrapTable('getSelections')来获取选中的ID,只能通过下面的Table.api.selectedids来获取
                  Layer.alert(JSON.stringify(Table.api.selectedids(table)));
              });
              // 为表格绑定事件
              Table.api.bindevent(table);
          },
          comdetail: function () {
            Table.api.init({
                extend: {
                    index_url: 'wechat/config/index',
                    add_url: 'usercenter/licenselist/add',
                    edit_url: '',
                    multi_url: 'usercenter/licenselist/multi',
                    detail_url: '',
                    del_url:"",
                    table: 'license',
                }
            });
            var guesttable = $("#guesttable")
            guesttable.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                 /*       {field: 'state', checkbox: true},*/
                        {field: 'id', title: __('Id')},
                        {field: 'com_name', title: '公司名称'},
                        {field: 'user_account', title: '识别人员'},
                        {field: 'license', title: '推送人员'},
                     /*   {field: 'passwd', title: __('Passwd')},
                        {field: 'ip', title: __('Ip')},*/
                  /*      {field: 'salt', title: __('Salt')},*/
                    /*    {field: 'webpath', title: __('Webpath')},*/
            /*            {field: 'dbname', title: __('Dbname')},
                        {field: 'mom_sid', title: __('Mom_sid')},*/
                        {field: 'time', title: '推送时间', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: 'Operate', events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ],
                  //禁用默认搜索
                search: true,
                //启用普通表单搜索
                commonSearch: false,
                //可以控制是否默认显示搜索单表,false则隐藏,默认为false
                searchFormVisible: false

            });
            // 员工表格
            Table.api.init({
                extend: {
                    index_url: 'usercenter/licenselist/index',
                    add_url: 'usercenter/licenselist/add',
                    edit_url: 'usercenter/licenselist/edit',
                    multi_url: 'usercenter/licenselist/multi',
                    detail_url: '',
                    del_url:"",
                    table: 'license',
                }
            });
            var table = $("#stafftable");
            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                 /*       {field: 'state', checkbox: true},*/
                    /*    {field: 'id', title: __('Id')},*/
                        {field: 'user_account', title: '姓名'},
                        {field: 'license', title: '手机号'},
                     /*   {field: 'passwd', title: __('Passwd')},
                        {field: 'ip', title: __('Ip')},*/
                  /*      {field: 'salt', title: __('Salt')},*/
                        {field: 'apikey', title: 'OpenID'},
                    /*    {field: 'webpath', title: __('Webpath')},*/
            /*            {field: 'dbname', title: __('Dbname')},
                        {field: 'mom_sid', title: __('Mom_sid')},*/
                        {field: 'com_name', title: '使用短信验证码数量'},
                        {field: 'time', title: '绑定时间', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: 'Operate', events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ],
                  //禁用默认搜索
                search: true,
                //启用普通表单搜索
                commonSearch: false,
                //可以控制是否默认显示搜索单表,false则隐藏,默认为false
                searchFormVisible: false

            });
            //微信推送表格
            var sendtable = $("#sendtable")
            sendtable.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                 /*       {field: 'state', checkbox: true},*/
                        {field: 'id', title: __('Id')},
                        {field: 'com_name', title: '公司名称'},
                        {field: 'user_account', title: '识别人员'},
                        {field: 'license', title: '推送人员'},
                     /*   {field: 'passwd', title: __('Passwd')},
                        {field: 'ip', title: __('Ip')},*/
                  /*      {field: 'salt', title: __('Salt')},*/
                    /*    {field: 'webpath', title: __('Webpath')},*/
            /*            {field: 'dbname', title: __('Dbname')},
                        {field: 'mom_sid', title: __('Mom_sid')},*/
                        {field: 'time', title: '推送时间', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: 'Operate', events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ],
                  //禁用默认搜索
                search: true,
                //启用普通表单搜索
                commonSearch: false,
                //可以控制是否默认显示搜索单表,false则隐藏,默认为false
                searchFormVisible: false
            });

            //编辑
            $(document).on('click','#stafftable .btn-edit[data-id]', function (){
                Backend.api.open('usercenter/licenselist/edit' + "/ids/" + $(this).data('id'), __('Edit'));
            })
            $(document).on('click','.btn-detail[data-id]', function (){
                Backend.api.open('usercenter/licenselist/edit' + "/ids/" + $(this).data('id'), __('Edit'));
            })
            $(document).on('click','.btn-del[data-id]', function(){
              var that = this;
              var index = Backend.api.layer.confirm(
                      __('Are you sure you want to delete the %s selected item?', 1),
                      {icon: 3, title: __('Warning'), offset: 0, shadeClose: true},
                      function () {
                          Table.api.multi("del", $(that).data('id'), table, that);
                          Backend.api.layer.close(index);
                      }
              );
            })
            //获取选中项
            $(document).on("click", ".btn-selected", function () {
                //在templateView的模式下不能调用table.bootstrapTable('getSelections')来获取选中的ID,只能通过下面的Table.api.selectedids来获取
                Layer.alert(JSON.stringify(Table.api.selectedids(table)));
            });
            // 为表格绑定事件
            Table.api.bindevent(table);
          },
          pushlist: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'usercenter/licenselist/index',
                    add_url: 'usercenter/licenselist/add',
                    edit_url: 'usercenter/licenselist/edit',
                    multi_url: 'usercenter/licenselist/multi',
                    detail_url: '',
                    del_url:"",
                    table: 'license',
                }
            });
            var table = $("#table");
            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                 /*       {field: 'state', checkbox: true},*/
                    /*    {field: 'id', title: __('Id')},*/
                        {field: 'com_name', title: '公司名称'},
                        {field: 'user_account', title: '识别人员'},
                        {field: 'license', title: '推送人员'},
                     /*   {field: 'passwd', title: __('Passwd')},
                        {field: 'ip', title: __('Ip')},*/
                  /*      {field: 'salt', title: __('Salt')},*/
                    /*    {field: 'webpath', title: __('Webpath')},*/
            /*            {field: 'dbname', title: __('Dbname')},
                        {field: 'mom_sid', title: __('Mom_sid')},*/
                        {field: 'time', title: '推送时间', formatter: Table.api.formatter.datetime}
                    ]
                ],
                  //禁用默认搜索
                search: true,
                //启用普通表单搜索
                commonSearch: false,
                //可以控制是否默认显示搜索单表,false则隐藏,默认为false
                searchFormVisible: false

            });
            //编辑
            $(document).on('click','.btn-edit[data-id]', function (){
                Backend.api.open('usercenter/licenselist/edit' + "/ids/" + $(this).data('id'), __('Edit'));
            })
            $(document).on('click','.btn-detail[data-id]', function (){
                Backend.api.open('usercenter/licenselist/edit' + "/ids/" + $(this).data('id'), __('Edit'));
            })
            $(document).on('click','.btn-del[data-id]', function(){
              var that = this;
              var index = Backend.api.layer.confirm(
                      __('Are you sure you want to delete the %s selected item?', 1),
                      {icon: 3, title: __('Warning'), offset: 0, shadeClose: true},
                      function () {
                          Table.api.multi("del", $(that).data('id'), table, that);
                          Backend.api.layer.close(index);
                      }
              );
            })
            //获取选中项
            $(document).on("click", ".btn-selected", function () {
                //在templateView的模式下不能调用table.bootstrapTable('getSelections')来获取选中的ID,只能通过下面的Table.api.selectedids来获取
                Layer.alert(JSON.stringify(Table.api.selectedids(table)));
            });
            // 为表格绑定事件
            Table.api.bindevent(table);
          },
          api: {
              bindevent: function () {
                  Form.api.bindevent($("form[role=form]"));
              },
              formatter: {
                url: function (value, row, index) {
                    return '<div class="input-group input-group-sm" style="width:250px;"><input type="text" class="form-control input-sm" value="' + value + '"><span class="input-group-btn input-group-sm"><a href="' + value + '" target="_blank" class="btn btn-default btn-sm"><i class="fa fa-link"></i></a></span></div>';
                },
                operate: function (value, row, index) {
                  var html = [];
                  html.push('<a href="javascript:;" class="btn btn-success btn-editone btn-xs"><i class="fa fa-pencil"></i></a>');
                  html.push('<a title="公司详情" addtabs="comdetail_'+ row.id +'" href="/fastadmin/public/admin/exmaple/example/comdetail/?id='+ row.id +'" url="/fastadmin/public/admin/exmaple/example/comdetail/?id='+ row.id +'" class="btn btn-success btn-detail btn-xs addtab"><i class="fa fa-indent"></i></a>')
                  return html.join(' ');
                },
                showbigimg: function (value, row, index) {
                  return '<div class="wechat-img-wrap"><img src="https://ws2.sinaimg.cn/large/006tNc79gy1fgphwokqt9j30dw0990tb.jpg" class="wechat-img"><img src="https://ws2.sinaimg.cn/large/006tNc79gy1fgphwokqt9j30dw0990tb.jpg" class="wechat-big-img"></div>'
                }
              }
          }
      };
      return Controller;
});
