layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'user', 'table', 'layer', 'form', 'laytpl', 'util', 'upload', 'laydate', 'element', 'carousel', 'flow'], function () {
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

    /*let loadIndex = layer.load(0, {
        shade: [0.3, '#333']
    });*/


    //获取其他页传过来的房间id
    let localDate = layui.sessionData('roomInfoData');
    let roomId = localDate.roomId;
    console.info("房间Id："+roomId);
    if(roomId==null){
        return layer.msg("房间Id不存在");
    }else{
        getRoomById();
    }

    //根据房间ID获取房间数据
    function getRoomById(){
        $.get({
            url: getRoomInfoUrl,
            dataType: "json",
            data:{id:roomId},
            xhrFields:{withCredentials: false},
            success: function (res) {
                layer.close(loadIndex);
                if(res.success){
                    initRoom(res.data);
                }else{
                    layer.msg(res.message);
                }
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
            ,value: data
        });
        //房间Id
        $("#id").val(data.id);
        $("#roomName").html(data.roomName);
        $('title').html(data.roomName+'-酒店管理系统');
        $("#roomNumber").html(data.roomNumber);
        //床型
        $("#bedType").html(data.bedType);
        //宽带
        $("#broadband").html(data.broadband);
        //标准价
        $("#standardPrice").html(data.standardPrice);
        //会员价
        $("#memberPrice").html(data.memberPrice);
        //描述
        $("#roomContent").html(data.roomContent);
        //所属楼层
        $("#floorNumber").html(data.hotelFloor.floorName);
        //设置形象图
        $('#coverImg').attr("src", data.coverImg);


    }
})