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
            url: "http://101.132.135.146:9001/room/queryRoomById",
            data: {id: roomId},
            hrFields: {withCredentials: false},
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
        $('#coverImg').attr("src", data.roomPhoto);
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
            index = layer.open({
                title: '预定房间'
                , type: 1
                , offset: 'auto'
                , area: ['30%', '35%']
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
        , min: 0
        , max: 6
        , showBottom: false
    });

    //退房时间选择
    laydate.render({
        elem: '#checkOutDate'
        , min: 1
        , max: 7
        , showBottom: false
    });


    //监听提交
    form.on('submit(addHotelFloor)', function (data) {
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
        var days = (Date.parse(checkOutDate) - Date.parse(checkInDate)) / (1 * 24 * 60 * 60 * 1000);
        var total_amount = days * roomMonery;


        //生成订单号
        var date = new Date();
        var time = "";
        time =date.getFullYear();    //获取完整的年份(4位,1970-????)
        let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; //获取月,如果小于10,前面补个0
        let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //获取日,如果小于10,前面补个0
        let strHours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取小时,如果小于10,前面补个0
        let strMinutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //获取分,如果小于10,前面补个0
        let strSeconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //获取秒,如果小于10,前面补个0
        //生成4位随机数
        var a = "";
        for (var i = 0; i < 4; i++) {
            a = a + Math.floor(Math.random() * 10) + "";
        }
        // 获取从1000到10000的随机整数 ，取0的概率极小。
        time = time +month+ strDate+strHours+strMinutes+strSeconds+a;
        //生成订单信息
        $.ajax({
            url: "http://101.132.135.146:9001/bookOrder/addBookOrder",
            data: {
                "orderNum": time,
                "realName": realName,
                "idCard": idCard,
                "userPhone": userPhone,
                "arriveDate": checkInDate,
                "leaveDate": checkOutDate,
                "roomTypeName": roomTypeName,
                "roomName": roomName,
                "sumMonery": total_amount
            },
            success: function (obj) {

            }
        })

        /* 跳转到支付界面*/
        location.href = "http://101.132.135.146:9001/pay/payView?out_trade_no=" + time + "&&subject=" + roomName + "房间   单价：" + roomMonery + "元一天&&body=共住" + days + "天&&total_amount=" + total_amount;
    });
    return false;
})