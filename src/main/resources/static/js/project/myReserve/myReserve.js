layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块

}).use(['index', 'user', 'table', 'layer', 'form', 'upload', 'laydate', 'element'], function () {
    var table = layui.table;
    var form = layui.form;
    var $ = layui.$;
    var layer = layui.layer;
    var upload = layui.upload;
    var laydate = layui.laydate;
    var element = layui.element;
    var carousel = layui.carousel;
    var device = layui.device();
    var userId = -1;  //代表没有登录
    let userData = layui.sessionData('userSession');
    if (userData.user != "undefined" && userData.user != null) {
        userId = userData.user.id;
    }

    //我的预定
    reserveTable = {
        id: "bookOrderTable"
        , elem: '#bookOrderTable'
        , url: "http://localhost:9001/bookOrder/queryBookOrderByUserId?userId=" + userId
        , title: '预定订单信息表'
        , cellMinWidth: 80
        , cols: [
            [{type: 'numbers', title: '序号', align: 'center'}
                , {title: '操作', minWidth: 120, templet: '#barDemo', align: "center"}
                , {field: 'id', title: 'ID', hide: true, width: 80, unresize: true, sort: true, align: 'center'}
                , {field: 'orderNum', title: '订单号', minWidth: 260, align: 'center'}
                , {field: 'roomId', title: '房间号', width: 80, templet: '#roomIdTpl', align: 'center'}
                , {field: 'sumMonery', title: '总金额', width: 100, templet: '#amountMoneyTpl', align: 'center'}
                , {
                field: 'status', title: '订单状态', width: 140, align: 'center', templet: function (d) {
                    if (d.status == 0) {
                        return "已付款"
                    }
                    if (d.status == 1) {
                        return "未付款"
                    }
                }
            }
                , {
                field: 'arriveDate',
                title: '入住时间时间',
                width: '17%',
                align: 'center',
                templet: function (d) {
                    return timestampToTime(d.arriveDate)
                }
            }
                , {
                field: 'leaveDate',
                title: '退房时间',
                width: '17%',
                align: 'center',
                templet: function (d) {
                    return timestampToTime(d.leaveDate)
                }
            }]
        ]
        , limit: 10
        , page: true
    };
    /*取出session中存储的用户*/

    table.render(reserveTable);

    /* table.reload('bookOrderTable', {
         page: {
             curr: 1 //重新从第 1 页开始
         }, where: {
             userId: userId
         }
     });*/

    //监听行工具事件
    table.on('tool(bookOrderTable)', function (obj) {
        var data = obj.data;
        /*退款*/
        if (obj.event === 'refundMonery'){
            layer.confirm('确认要退款吗', function (index) {
              /*  $.ajax({
                    url: '/bookOrder/deleteBookOrder',
                    data: {
                        id: data.id,
                        roomTypeName: data.roomTypeName,
                        roomName: data.roomName
                    },
                    success: function (obj) {
                        layer.msg("删除成功", {
                            icon: 1,
                            time: 1000
                        }, function () {
                            window.location.href = "/bookOrder/bookOrderView";
                        })
                    }
                });*/
                layer.close(index);
            });
        }
    })


})


    /*时间格式化*/
    function timestampToTime(time) {
        var date = new Date(time);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        let strDate = Y + M + D;
        return strDate;
    }
