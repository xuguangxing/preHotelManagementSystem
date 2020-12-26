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
        ,type: 'datetime'
        ,min: 0
        ,max:6
    });

    //退房时间选择
    laydate.render({
        elem: '#checkOutDate'
        ,type: 'datetime'
        ,min: 0
        ,max:6
    });


    //监听提交
    $("#addHotelFloor").click({

    })
    form.on('submit(addHotelFloor)',function(data) {
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
        var userPhone = userData.user.userPhone;
        var roomTypeName = $("#roomTypeName").html();
        console.log(roomName);
        console.log(checkInDate);
        console.log(checkOutDate);
        console.log(realName);
        console.log(idCard);
        console.log(userPhone);
        console.log(roomTypeName);
       /* 跳转到支付界面*/
        location.href="http://localhost:9001/pay/payView";
      /*  $.ajax({
            url: "http://localhost:9001/pay/payView",
            data: "",
            success:function () {
                alert("支付")
            }
        })*/
    });
    return false;
})