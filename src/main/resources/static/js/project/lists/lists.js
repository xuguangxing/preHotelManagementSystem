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

    let loadIndex = layer.load(0, {
        shade: [0.3, '#333']
    });

    let roomTypeId = null;
    let floorId = null;
    //获取其他页传过来的房间类别Id
    let localDate = layui.sessionData('roomTypeData');
    if (typeof (localDate.roomTypeId) != "undefined") {
        roomTypeId = localDate.roomTypeId;
    }

    //获取其他页传过来的楼层Id
    let localFloorData = layui.sessionData('floorData');
    if (typeof (localFloorData.floorId) != "undefined") {
        floorId = localFloorData.floorId;
        console.info("楼层floorId:" + floorId);
    }

    //获取所有房间类别
    getAllRoomTypeList();

    function getAllRoomTypeList() {
        $.get({
            url: "http://localhost:9001/roomType/queryAll",
            hrFields: {withCredentials: false},
            success: function (res) {
                let getAllRoomTypeHtml = '';
                if (roomTypeId == 0) {
                    getAllRoomTypeHtml += '<li  class="active" data-id="0" > <a class="fly-case-active" href="JavaScript:void(0);" data-type="toRoomTypeListByLists">全部</a> </li>';
                } else {
                    getAllRoomTypeHtml += '<li data-id="0" > <a class="fly-case-active" href="JavaScript:void(0);" data-type="toRoomTypeListByLists">全部</a> </li>';

                }
                //遍历data
                $.each(res, function (index, roomType) {
                    if (roomTypeId == roomType.id) {
                        getAllRoomTypeHtml += '<li class="active"  data-id="' + roomType.id + '"> <a class="fly-case-active"  href="JavaScript:void(0);" data-type="toRoomTypeListByLists">' + roomType.roomTypeName + '</a> </li>\n';
                    } else {
                        getAllRoomTypeHtml += '<li data-id="' + roomType.id + '"> <a class="fly-case-active"  href="JavaScript:void(0);" data-type="toRoomTypeListByLists">' + roomType.roomTypeName + '</a> </li>\n';
                    }
                });

                $('#getAllRoomType').html(getAllRoomTypeHtml);
                element.render();
            },
            error: function () {
            }
        });
    }

    //获取所有楼层
    getAllFloorList();

    function getAllFloorList() {
        $.get({
            url: "http://localhost:9001/floor/queryAllFloor2",
            dataType: "json",
            xhrFields: {withCredentials: false},
            success: function (res) {
                let getAllFloorHtml = '';

                getAllFloorHtml += '<li style="background: #F2F2F2" title="全部"> <a class="fly-case-active" href="JavaScript:void(0);" data-type="toFloorListByLists"> <img src="/image/all_bg.jpg">';
                if (floorId == 0) {
                    getAllFloorHtml += '<i class="layui-icon layui-icon-ok"></i>';
                }
                getAllFloorHtml += '</a>';
                getAllFloorHtml += '</li>';


                //遍历
                $.each(res, function (index, floor) {

                    getAllFloorHtml += '<li data-id="' + floor.id + '" title="' + floor.floorName + '" class="bg' + (index + 1) + '">\n';
                    getAllFloorHtml += '<a class="fly-case-active"  href="JavaScript:void(0);" data-type="toFloorListByLists">\n';
                    if (floorId == floor.id) {
                        getAllFloorHtml += '<i class="layui-icon layui-icon-ok"></i>';
                    }
                    getAllFloorHtml += '</a>\n';
                    getAllFloorHtml += '</li>\n';

                });
                $('#getAllFloor').html(getAllFloorHtml);
                element.render();
            },
            error: function () {

            }
        });
    }


    getRoomListByType(roomTypeId, floorId);

    //根据房间类别Id或者楼层Id获取房间列表
    function getRoomListByType(roomTypeId, floorId) {
        $.get({
            url: "http://localhost:9001/room/queryRoomByFloorOrRoomType",
            dataType: "json",
            data: {
                roomTypeId: roomTypeId,
                floorId: floorId
            },
            xhrFields: {withCredentials: false},
            success: function (res) {
                layer.close(loadIndex);
                let getRoomListHtml = '';
                $("#filtTotal").html(res.count);
                //遍历data
                $.each(res.roomVoList, function (index, room) {
                    getRoomListHtml += '<div data-id="' + room.id + '"  class="layui-col-xs12 layui-col-sm6 layui-col-md4 layui-col-lg3">\n';
                    getRoomListHtml += '<a class="template store-list-box fly-case-active" onclick=toRoomInfo(this) data-type="toRoomInfo">\n';
                    getRoomListHtml += '<img src="/image/' + room.roomPhoto + '" class="store-list-cover">\n';
                    getRoomListHtml += '<h2 class="layui-elip">' + room.roomAlias + '</h2>\n';
                    getRoomListHtml += '<div> <label class="layui-badge-rim store-list-pay"> ￥' + room.roomPrice + ' </label>\n';
                    getRoomListHtml += '<div class="store-list-colorbar">\n';
                    getRoomListHtml += '<span class="store-color-bar" style="border-color: #009688;color: #009688;border-width: 1px;border-style: solid;background-color: #fff;    text-align: center;">NO.' + room.roomName + '</span>\n';
                    getRoomListHtml += '<span class="store-color-bar" style="border-color: #5fb878;color: #5fb878;border-width: 1px;border-style: solid;background-color: #fff;    text-align: center;">' + room.roomTypeName + '</span>\n';
                    getRoomListHtml += '<span class="store-color-bar" style="border-color: #01aaed;color: #01aaed;border-width: 1px;border-style: solid;background-color: #fff;    text-align: center;">' + room.floorName + '</span>\n';
                    getRoomListHtml += '</div>\n';
                    getRoomListHtml += '</div>\n';
                    getRoomListHtml += '</a>\n';
                    getRoomListHtml += '</div>\n';
                });
                $('#roomList').html(getRoomListHtml);
                element.render();
            },
            error: function () {

            }
        });
    }

});

function toRoomInfo(obj) {
    let a = $(obj).parent('div');
    let dataId = a.data('id');
    //把房间Id保存到session
    layui.sessionData('roomInfoData', {
        key: 'roomId'
        , value: dataId
    });
    window.open("/details/details");
}

