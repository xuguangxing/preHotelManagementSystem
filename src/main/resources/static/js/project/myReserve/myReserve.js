layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块

}).use(['index', 'user', 'table', 'layer', 'form' , 'upload', 'laydate', 'element'], function () {
    var table = layui.table;
    var form = layui.form;
    var $ = layui.$;
    var layer = layui.layer;
    var upload = layui.upload;
    var laydate = layui.laydate;
    var element = layui.element;
    var carousel = layui.carousel;
    var device = layui.device();


    //我的预定
    reserveTable = {
        elem: '#myReserve'
        , url: myHotelReserveListUrl
        , method: 'post'
        , cellMinWidth: 80
        , cols: [
            [{type: 'numbers', title: '序号',align:'center'}
                ,{title: '操作', minWidth: 120, templet: '#currentTableBar', align: "center"}
                , {field: 'id', title: 'ID',hide:true,  width: 80, unresize: true, sort: true,align:'center'}
                , {field: 'orderNumber', title: '订单号', minWidth: 260, align:'center'}
                , {field: 'roomId', title: '房间号', width: 80, templet: '#roomIdTpl',align:'center'}
                /*, {field: 'roomName', title: '房间名称', width: 120, templet: '#roomNameTpl',align:'center'}*/
                , {field: 'amountMoney', title: '总金额', width: 100, templet: '#amountMoneyTpl',align:'center'}
                , {field: 'status', title: '订单状态', width: 140,  sort: true, templet: '#status',align:'center'}
                , {
                field: 'checkinDate',
                title: '入住时间时间',
                width: '17%',
                align:'center',
                templet: '<span></span>'
            }
                , {
                field: 'checkoutDate',
                title: '退房时间',
                width: '17%',
                align:'center',
                templet: '<span></span>'
            }]
        ]
        , page: true
    };

    table.render(reserveTable);
    //监听表格按钮
    table.on('tool(reserveRecordList)', function (obj) {
        let data = obj.data;
        if (obj.event === 'unsubscribe') {//退订
            layer.confirm("你确定要退订该酒店房间么,将扣除50%费用哦？",{skin:'layui-layer-molv',btn:['是的,我确定','我再想想']},
                function(){
                    $.post({
                        url: unsubscribeUrl,
                        data: {id: data.id},
                        dataType: "json",
                        timeout:300000,
                        xhrFields:{withCredentials: true},
                        success: function (res) {
                            if(res.success){
                                layer.msg("退订成功", {time: 1000}, function () {
                                    table.reload('myReserve', table);
                                });
                            }else{
                                layer.msg(res.message);
                            }
                        },
                        error: function (res) {
                            layer.msg(res.message);
                        }
                    });
                }
            )
        }else  if(obj.event === 'change'){//换房
            layui.sessionData('changeRoomData', {
                key: 'changeRoom'
                ,value: data
            });

            layer.confirm("你确定要更换该酒店房间么,请交10元换房手续费，退房时少了请补差额，多了就退回给您！",{skin:'layui-layer-molv',btn:['是的,我确定','我再想想']},
                function(index){
                    layer.close(index);
                    let indexChange = layer.open({
                        title: '我要换房',
                        type: 2,
                        shade: 0.2,
                        anim: 4,
                        shadeClose: true,
                        skin:'layui-layer-molv',
                        area: ['60%', '80%'],
                        content: 'changeRoom.html',
                        success : function(layero, index){
                            setTimeout(function(){

                            },500);
                        }
                    });
                }
            )
        }else  if(obj.event === 'payment'){//继续付款
            layer.confirm("你确定要继续付款么",{skin:'layui-layer-molv',btn:['是的,我确定','我再想想']},
                function(index){
                    layer.close(index);

                    $.get({
                        url: getReserveByIdUrl,
                        data:{id:data.id},
                        dataType: "json",
                        timeout:300000,
                        xhrFields:{withCredentials: true},
                        success: function (res) {
                            let contentUlr = "recharge/wechatpay.html";
                            if(res.success){

                                layui.sessionData('payData', {
                                    key:'pay'
                                    ,value:res.data
                                });
                                //设置二维码到期时间
                                layui.sessionData('timeData', {
                                    key:'time'
                                    ,value:120
                                });
                                layer.open({
                                    type: 2
                                    ,id: 'LAY_pushcase'
                                    ,title: '马王天地收银台 收款方：学灯网或骨骨'
                                    ,area: ['700px', '570px']
                                    ,content: contentUlr
                                    ,success: function(layero, index){
                                    }
                                });
                                webSocketMsg(res.data.reserve.orderNumber);
                            }else{
                                layer.msg(res.message);
                            }
                        },
                        error: function () {

                        }
                    });


                }
            )
        }else  if(obj.event === "showStandardPrice"){//查看价格信息
            let msg = "预定天数："+data.reserveDays+"天,房间单价："+data.room.standardPrice+"元";
            if(data.remarks!=null){
                msg+= data.remarks;
            }
            layer.alert(msg, {
                icon: 1,
                skin:'layui-layer-molv'
            });

        }



    });

    function webSocketMsg(id){

        if ("WebSocket" in window)
        {
            //alert("您的浏览器支持 WebSocket!");

            // 打开一个 web socket
            let ws = new WebSocket(webSocketUrl+""+id+"");
            ws.onopen = function()
            {
                // Web Socket 已连接上，使用 send() 方法发送数据
                ws.send("发送数据");
            };

            ws.onmessage = function (evt)
            {
                let received_msg = JSON.parse(evt.data);

                /* parent.layer.closeAll();*/
                /* layer.alert(received_msg.msg, {icon: 1,offset: 'auto',time: 5000,anim: 2}, function (index) {
                     parent.layer.closeAll();
                 });*/

                layer.alert(received_msg.msg, function(index){
                    parent.layer.closeAll();
                });

            };

            ws.onclose = function()
            {
                // 关闭 websocket
                ws.close();
                //alert("连接已关闭...");
                parent.layer.closeAll();
            };

            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = function(){
                ws.onclose();
            }
        }

        else
        {
            // 浏览器不支持 WebSocket
            //alert("您的浏览器不支持 WebSocket!");
        }

    }
})