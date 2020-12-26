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
    var device = layui.device()
    let loadIndex = layer.load(0, {
        shade: [0.3, '#333']
    });

    var payIndex; //收款码弹框下标
    let index;  //预定表单界面 下标
    var playViewIndex; //上传支付截图照片 下标

    //获取其他页传过来的房间id
    let localDate = layui.sessionData('roomInfoData');
    let roomId = localDate.roomId;
    if (roomId == null) {
        return layer.msg("房间Id不存在");
    } else {
        getRoomById();
    }

    //根据房间ID获取房间数据
    function getRoomById() {
        $.get({
            url: "http://localhost:9001/room/queryRoomById",
            data: {id: roomId},
            xhrFields: {withCredentials: false},
            success: function (res) {
                layer.close(loadIndex);
                initRoom(res);
            },
            error: function () {

            }
        });
    };

    //初始化房间详情内容
    function initRoom(data) {
        //把房间信息保存到sessionData
        layui.sessionData('reserveRoomData', {
            key: 'reserveRoom'
            , value: data
        });
        //房间Id
        $("#id").val(data.id);
        $("#roomAlias").html(data.roomAlias);
        //房型
        $("#roomTypeName").html(data.roomTypeName);
        //房间名称
        $("#roomName").html(data.roomName);
        //标准价
        $("#roomPrice").html(data.roomPrice);
        //所属楼层
        $("#floorName").html(data.floorName);
        //设置形象图
        $('#coverImg').attr("src", '/image/' + data.roomPhoto);
    }


    //预定酒店
    $('body').on('click', '#shopEvent', function () {

        let userData = layui.sessionData('userSession');
         if (typeof (userData.user) == "undefined" || userData.user == null) {
             layer.msg('请先登录', {
                 icon: 2,
                 time: 1000
             }, function () {
                 window.location.href = "/login/login";
             })
         } else {
        $("#bookRoomName").val($("#roomName").html())
             index= layer.open({
            title: '会员预定房间'
            , type: 1
            , offset: 'auto'
            , area: ['30%', '30%']
            , content: $('#orderView')
            , shade: 0 //不显示遮罩
        });
        }
    });

    //获取列表页传过来的角色数据reserveRoomData
    let room = layui.sessionData('reserveRoomData');


    //入住时间选择
    laydate.render({
        elem: '#checkInDate'
        ,type: 'datetime'
        ,min: 1
    });

    //退房时间选择
    laydate.render({
        elem: '#checkOutDate'
        ,type: 'datetime'
        ,min: 2
        ,max:7
    });

  /*  $.ajaxSetup({
        // 发送cookie
        xhrFields: {
            withCredentials: true
        }
    });
*/



    //监听提交
    form.on('submit(addHotelFloor)',function(data){

      /*  let loadIndex = layer.load(2, {
            shade: [0.3, '#333']
        });*/

       var roomName = data.field.roomName;
       var checkInDate = data.field.checkInDate;
       var checkOutDate = data.field.checkOutDate;
       //取出session中存的客户信息
        let userData = layui.sessionData('userSession');
        var realName = userData.user.realName;
        var idCard = userData.user.idCard;
        var userPhone =  userData.user.userPhone;
        var roomTypeName = $("#roomTypeName").html();
        console.log(roomName);
        console.log(checkInDate);
        console.log(checkOutDate);
        console.log(realName);
        console.log(idCard);
        console.log(userPhone);
        console.log(roomTypeName);

        payIndex=layer.open({
            type: 1
            , content: $('#moneryReceiveCode')
            ,height: 'full-110'
            , title: '<p style="font-weight:bolder">请扫码付款</p>'
            , offset: 'auto'
            , area: ['400px', '620px']
            , shade: 0
        });


        $("#btnEdit").click(function () {
            console.log(payIndex);
            layer.close(index);
            layer.close(payIndex);
            playViewIndex=layer.open({
                type: 1
                , content: $('#payView')
                ,height: 'full-110'
                , title: '<p style="font-weight:bolder">请上传支付截图照片 工作人员会尽快核实</p>'
                , offset: 'auto'
                , area: ['400px', '620px']
                , shade: 0
            })
        });


        //上传支付截图
        upload.render({
            elem: '#demo1'
            , url: 'http://localhost:9001/bookOrder/uploadImg'
            , xhrFields:{withCredentials: false}
            , accept: "images"
            , done: function (res) {
                layer.msg('上传成功');
                layui.$('#uploadDemoView').removeClass('layui-hide').find('img').attr('src', "/image/" + res.src);
              /*  $("#roomPhoto").val(res.src);*/
            }
        });

        $("#closePlayBut").click(function () {
            layer.close(playViewIndex);
        })



       /* $.post({
            url: memberReserveHotelUrl,
            data:data.field,
            dataType: "json",
            timeout:300000,
            xhrFields:{withCredentials: true},
            success: function (res) {
                layer.close(loadIndex);

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
        });*/

        return false;
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
    }

})