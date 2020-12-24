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
    var layedit = layui.layedit;

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
    }

    //获取所有房间类别
    getAllRoomTypeList();

    function getAllRoomTypeList() {
        $.get({
            url: "http://localhost:9001/roomType/queryAll",
            hrFields: {withCredentials: false},
            success: function (res) {
                let getAllRoomTypeHtml = '';
                if (roomTypeId == null) {
                    getAllRoomTypeHtml += '<li  class="active" data-id="0" > <a class="fly-case-active" onclick=getAllRoomType(this) data-type="toRoomTypeListByLists">全部</a> </li>';
                } else {
                    getAllRoomTypeHtml += '<li data-id="0" > <a class="fly-case-active" onclick=getAllRoomType(this) data-type="toRoomTypeListByLists">全部</a> </li>';

                }
                //遍历data
                $.each(res, function (index, roomType) {
                    if (roomTypeId == roomType.id) {
                        getAllRoomTypeHtml += '<li class="active"  data-id="' + roomType.id + '"> <a class="fly-case-active" onclick=getRoomType(this) data-type="toRoomTypeListByLists">' + roomType.roomTypeName + '</a> </li>\n';
                    } else {
                        getAllRoomTypeHtml += '<li data-id="' + roomType.id + '"> <a class="fly-case-active"  onclick=getRoomType(this) data-type="toRoomTypeListByLists">' + roomType.roomTypeName + '</a> </li>\n';
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

                getAllFloorHtml += '<li style="background: #F2F2F2" title="全部"> <a class="fly-case-active" onclick=getAllFloor(this) data-type="toFloorListByLists"> <img src="/image/all_bg.jpg">';
                if (floorId == null) {
                    getAllFloorHtml += '<i class="layui-icon layui-icon-ok"></i>';
                }
                getAllFloorHtml += '</a>';
                getAllFloorHtml += '</li>';


                //遍历
                $.each(res, function (index, floor) {

                    getAllFloorHtml += '<li data-id="' + floor.id + '" title="' + floor.floorName + '" class="bg' + (index + 1) + '">\n';
                    getAllFloorHtml += '<a class="fly-case-active"  onclick=getFloor(this) data-type="toFloorListByLists">\n';
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

    //用户评论
    layer.photos({
        photos: '#layer-photos-demo'
        , anim: 5
    });
    $(document).ready(function () {
        //alert($(".comment_list").find(".comment")[0] == undefined);
        if ($(".comment_list").find(".comment")[0] == undefined) {
            $(".comment_add_or_last").html("暂无人评论");
        }
        $(document).on('click', '.show_reply_list', function () {

            if ($(this).closest('.comment').find(".reply_list").css("display") != "none") {
                $(this).closest('.comment').find(".show_remain_reply").css("display", "none");
                $(this).html("查看回复");

            } else {
                $(this).closest('.comment').find(".show_remain_reply").css("display", "block");
                $(this).html("收起回复");

            }
            $(this).closest('.comment').find(".reply_list").toggle(500);
        });

        $(document).on('click', '.show_remain_reply', function () {
            $(this).html("已显示全部回复");
            //TODO发送数据
        });
        $(document).on('click', '.comment_add_or_last', function () {
            var getMoreComment = $(this);
            //TODO如果获取的数据为零
            getMoreComment.html("没有更多评论了");
        });

    });

    //加载评论列表
    $.ajax({
        url: "http://localhost:9001/comment/queryAllCommentAndReplay",
        data: {},
        success: function (data) {
            //加载评论列表
            let commentList = '';
            $.each(data,function (index,comment) {

                commentList +=' <div class="comment"><div class="imgdiv"><img class="imgcss" src="/image/'+comment.userNameImage+'"/></div>';
                commentList += '<div class="conmment_details"><div style="float:left;"> <span class="comment_name">'+comment.userName+' </span> <span>'+comment.commentTime+'</span></div>';
                commentList += '<div class="del"> <span class="show_reply_list">查看回复</span> <i class="icon layui-icon layui-icon-reply-fill" onclick=clickReplyComment(this)>点击回复&nbsp;&nbsp;&nbsp;&nbsp;</i>';

                //取出session中的用户，判断该评论是否是当前用发表的
                let userData = layui.sessionData('userSession');
                if(userData.user!= "undefined" && userData.user != null){
                    if (userData.user.id==comment.userId){
                        commentList +=' <a class="del_comment" data-id="1"> <i class="icon layui-icon" onclick=clickDeleteComment(this)>删除</i></a>';
                    }
                }

                commentList += '</div><div class="comment_content">'+comment.commentContent+' </div><br/><br/></div>'
                commentList +='<div class="reply_list">'
                $.each(comment.replayVoList,function (index,replay){
                    //循环
                    commentList +='<div class="reply"><div class="imgdiv"><img class="imgcss" src="/image/'+replay.userNameImage+'"/> </div>'
                    commentList += '<span class="reply_name">'+replay.userName+'&nbsp;&nbsp;</span>回复<span class="reply_name">&nbsp;&nbsp;'+comment.userName+'</span>：';
                    commentList +='<span class="reply_content">'+replay.repalyContent+'</span>'
                    commentList +='<a data-id="1" class="del_reply"><i class="icon layui-icon layui-icon-reply-fill">点击回复&nbsp;&nbsp;&nbsp;&nbsp;</i>'
                    commentList +='<i class="icon layui-icon "> 删除</i>';
                    commentList +='</a> </div> <hr/>';
                })
                /*回复列表结束*/
                commentList += '</div> <div class="show_remain_reply">查看剩下的回复</div> </div><hr/>';

            })
            commentList+='<div class="comment_add_or_last">点击加载更多评论 </div> <hr>';
            $("#comment_list").append(commentList);
        }
    })

});

/*跳转到房间详情界面*/
function toRoomInfo(obj) {
    let a = $(obj).parent('div');
    let dataId = a.data('id');
    //把房间Id保存到session
    layui.sessionData('roomInfoData', {
        key: 'roomId'
        , value: dataId
    });
    window.location.href = "/details/details";
}

/**
 * 获取所有的楼层信息
 */
function getAllFloor(obj) {
    $(obj).parent("li").siblings().children().html("")
    $(obj).append('<i class="layui-icon layui-icon-ok"></i>');
    //取出本页面的房型id
    let localRoomType = layui.sessionData('roomTypeDataLists');
    let localRoomTypeId = localRoomType.roomTypeId;
    //存入本页面的楼层id
    layui.sessionData('floorDataLists', {
        key: 'floorId'
        , value: null
    });
    if (typeof (localRoomTypeId) == "undefined") {
        localRoomTypeId = null;

        //获取其他页传过来的房间类别Id
        var roomTypeId;
        let localDate = layui.sessionData('roomTypeData');
        if (typeof (localDate.roomTypeId) != "undefined" && localDate.roomTypeId != null) {
            roomTypeId = localDate.roomTypeId;
            getRoomListByType(roomTypeId, null);
        }
    } else {
        getRoomListByType(localRoomTypeId, null);
    }
}

/**
 * 获取对应id的楼层信息
 */
function getFloor(obj) {

    $(obj).parent("li").siblings().children().html("")
    $(obj).append('<i class="layui-icon layui-icon-ok"></i>');

    //楼层id
    let a = $(obj).parent('li');
    let floorId = a.data('id');
    //存入本页面的楼层id
    layui.sessionData('floorDataLists', {
        key: 'floorId'
        , value: floorId
    });
    //取出本页面的房型id
    let localDate = layui.sessionData('roomTypeDataLists');
    let localRoomTypeId = localDate.roomTypeId;
    if (typeof (localRoomTypeId) == "undefined") {
        localRoomTypeId = null;
        //获取其他页传过来的房间类别Id
        var roomTypeId;
        let localDate = layui.sessionData('roomTypeData');
        if (typeof (localDate.roomTypeId) != "undefined" && localDate.roomTypeId != null) {
            roomTypeId = localDate.roomTypeId;
            getRoomListByType(roomTypeId, floorId);
        } else {
            getRoomListByType(localRoomTypeId, floorId);
        }

    } else {
        getRoomListByType(localRoomTypeId, floorId);
    }


}

/**
 * 获取本页所有的房型信息
 */
function getAllRoomType(obj) {


    $(obj).parent("li").siblings().removeClass("active");
    $(obj).parent("li").addClass("active");
    //取出本页面的楼层id
    let localDate = layui.sessionData('floorDataLists');
    let localFloorId = localDate.floorId;
    //存入本页面的房型id
    layui.sessionData('roomTypeDataLists', {
        key: 'roomTypeId'
        , value: null
    });
    if (typeof (localFloorId) == "undefined") {
        localFloorId = null;
        //获取其他页传过来的楼层Id
        let localFloorData = layui.sessionData('floorData');
        var floorId;
        if (typeof (localFloorData.floorId) != "undefined" && localFloorData.floorId != null) {
            floorId = localFloorData.floorId;
        }
        if (floorId != null) {
            getRoomListByType(null, floorId);
        } else {
            getRoomListByType(null, localFloorId);
        }
    } else {
        getRoomListByType(null, localFloorId);
    }


}

//获取本页对应id的房型信息
function getRoomType(obj) {


    $(obj).parent("li").siblings().removeClass("active");
    $(obj).parent("li").addClass("active");
    //房型id
    let a = $(obj).parent('li');
    let roomTypeId = a.data('id');
    //取出本页面的楼层id
    let localDate = layui.sessionData('floorDataLists');
    let localFloorId = localDate.floorId;

    //存入本页面的房型id
    layui.sessionData('roomTypeDataLists', {
        key: 'roomTypeId'
        , value: roomTypeId
    });

    if (typeof (localFloorId) == "undefined") {

        localFloorId = null;
        //获取其他页传过来的楼层Id
        let localFloorData = layui.sessionData('floorData');
        var floorId;
        if (typeof (localFloorData.floorId) != "undefined" && localFloorData.floorId != null) {
            floorId = localFloorData.floorId;
        }
        if (floorId != null) {
            getRoomListByType(roomTypeId, floorId);
        } else {
            getRoomListByType(roomTypeId, localFloorId);
        }
    } else {
        getRoomListByType(roomTypeId, localFloorId);
    }


}

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
            /*    element.render();*/
        },
        error: function () {

        }
    });
}

/*点击评论*/
function clickComments(obj) {

    //取出session中的用户信息
    let userData = layui.sessionData('userSession');
    if (userData.user== "undefined" || userData.user == null){
        layer.msg("请先登录",{
            icon:2,
            time: 1000
        },function () {
            window.location.href="/login/login";
        })

    }else{
        alert("点击评论");
    }
}

/*点击回复评论信息*/
function clickReplyComment(obj) {

    //取出session中的用户信息
    let userData = layui.sessionData('userSession');
    if (userData.user== "undefined" || userData.user == null){
        layer.msg("请先登录",{
            icon:2,
            time: 1000
        },function () {
            window.location.href="/login/login";
        })

    }else{

       alert("评论");

    }
}

function clickDeleteComment(obj) {
    alert("删除")
    layer.confirm('确定要删除吗',function () {
        layer.msg('已删除',{
            icon: 1,
            time: 1000
        })
    })
}






