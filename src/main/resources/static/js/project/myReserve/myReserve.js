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
    var device = layui.device()
    var laytpl = layui.laytpl;
    var util = layui.util;
    var flow = layui.flow;

    var userId = -1;  //代表没有登录
    let userData = layui.sessionData('userSession');
    if (userData.user != "undefined" && userData.user != null) {
        userId = userData.user.id;
    }

    //我的预定
    reserveTable = {
        id: "bookOrderTable"
        , height: 'full-410'
        , elem: '#bookOrderTable'
        , url: "http://localhost:9001/bookOrder/queryBookOrderByUserId?userId=" + userId
        , title: '预定订单信息表'
        , cellMinWidth: 80
        , cols: [
            [{type: 'numbers', title: '序号', align: 'center'}
                , {title: '操作', minWidth: 120, templet: '#barDemo', align: "center"}
                , {field: 'id', title: 'ID', hide: true, width: 80, unresize: true, sort: true, align: 'center'}
                , {field: 'orderNum', title: '订单号', width: 200, align: 'center'}
                , {field: 'roomName', title: '房间号', width: 80, templet: '#roomIdTpl', align: 'center'}
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
    table.render(reserveTable);

    var refundIndex;
    var index;

    //监听行工具事件
    table.on('tool(bookOrderTable)', function (obj) {
       var data = obj.data;
        console.log(data);
        /*退款*/
        if (obj.event === 'refundMonery') {
             index=layer.confirm('确定要退款吗',function () {
                 refundIndex = layer.open({
                    type: 1
                    , title: '<p style="color: #702fff;font-weight:bolder">退款</p>'
                    , offset: 'auto'
                    , area: ['560px', '450px']
                    , content: $('#refundMoneryView')
                    , shade: 0 //不显示遮罩
                });
            })
            $("#out_trade_no").val(data.orderNum);
            $("#total_amount").val(data.sumMonery);

        }
        if (obj.event === 'payMonery') {
            $.ajaxSetup({
                // 发送cookie
                xhrFields: {
                    withCredentials: false
                }
            });
            $.get({
                hrFields: {withCredentials: false},
                url: "http://localhost:9001/room/queryRoomById",
                data: {id: data.roomId},
                success: function (res) {
                    if (res.status == 0) {
                        //可预订
                        /* 跳转到支付界面*/
                        //计算总共住了多少天
                        var days = (Date.parse(data.leaveDate) - Date.parse(data.arriveDate)) / (1 * 24 * 60 * 60 * 1000);
                       location.href = "http://localhost:9001/pay/payView?out_trade_no=" + data.orderNum + "&&subject=" + data.roomName + "房间   单价：" + data.roomPrice + "元一天&&body=共住" + days + "天&&total_amount=" + data.sumMonery;
                    } else {
                        layer.msg("该房间已被使用", {
                            icon: 2,
                            time: 1000,
                        })
                    }
                }
            })
        }
    })

    //点击退款
    form.on("submit(btnEdit)",function (obj) {
        $.ajaxSetup({
            // 发送cookie
            xhrFields: {
                withCredentials: false
            }
        });
        $.ajax({
            url: "http://localhost:9001/pay/refundMonery",
            hrFields: {withCredentials: false},
            data: {out_trade_no:obj.field.out_trade_no,total_amount: obj.field.total_amount,refund_reason: obj.field.refund_reason},
            success: function (res) {

               if(res.alipay_trade_refund_response.code==10000){
                   layer.msg("退款成功",{
                       icon: 1,
                       time:1000
                   },function () {

                       //删除该订单信息
                       $.ajax({
                           url: "http://localhost:9001/bookOrder/deleteByOrderNum",
                           data: {orderNum:obj.field.out_trade_no},
                           success: function (res) {
                               if (res==true){

                               }else {
                                   layer.msg("退款失败",{
                                       icon: 2,
                                       time: 1000
                                   })
                               }
                           }
                       })
                       window.location.reload();
                   })
               }
            }
        })
        layer.close(index);
        layer.close(refundIndex);
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

