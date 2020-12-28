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
            title: '预定房间'
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
        ,min: 0
        ,max:6
        ,showBottom: false
    });

    //退房时间选择
    laydate.render({
        elem: '#checkOutDate'
        ,min: 1
        ,max: 7
        ,showBottom: false
    });


    //监听提交
    form.on('submit(addHotelFloor)',function(data) {
        var roomName = data.field.roomName;
        var checkInDate = data.field.checkInDate;
        var checkOutDate = data.field.checkOutDate;
        //取出session中存的客户信息
        let userData = layui.sessionData('userSession');
        var realName = userData.user.realName;
        var idCard = userData.user.idCard;
        var userPhone = userData.user.userPhone;
        var roomTypeName = $("#roomTypeName").html();
        var roomMonery = $("#roomPrice").html();

        //计算总共住了多少天
        var days=(Date.parse(checkOutDate)-Date.parse(checkInDate))/(1*24*60*60*1000);
       var total_amount = days*roomMonery;


        //生成订单号
        var myDate = new Date();
        var time="";
        time=time+myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        time=time+myDate.getMonth();       //获取当前月份(0-11,0代表1月)
        time=time+myDate.getDate();        //获取当前日(1-31)
        time=time+myDate.getHours();       //获取当前小时数(0-23)
        time=time+myDate.getMinutes();     //获取当前分钟数(0-59)

        time=time+myDate.getSeconds();     //获取当前秒数(0-59)
        var a = Math.ceil(Math.random()*9000)+1000;// 获取从1000到10000的随机整数 ，取0的概率极小。
        time = time+a;
        alert(a);
        //生成订单信息
         $.ajax({
             url: "http://localhost:9001/bookOrder/addBookOrder",
             data: {"orderNum": time,"realName": realName,"idCard": idCard,"userPhone":userPhone,"arriveDate": checkInDate,
             "leaveDate":checkOutDate,"roomTypeName":roomTypeName,"roomName": roomName,"sumMonery":total_amount},
             success: function (obj) {

             }
         })

        /* 跳转到支付界面*/
       //  location.href="http://localhost:9001/pay/payView?out_trade_no="+time+"&&subject="+roomName+"房间   单价："+roomMonery+"元一天&&body=共住"+days+"天&&total_amount="+total_amount;
    });
    return false;
})