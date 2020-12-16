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

    //获取首页房间分类列表
    getIndexRoomTypeList();

    function getIndexRoomTypeList() {
        flow.load({
            elem: '#getIndexRoomType' //流加载容器
            , scrollElem: '#getIndexRoomType' //滚动条所在元素，一般不用填，此处只是演示需要。
            , isAuto: true
            , done: function (page, next) { //执行下一页的回调
                var lis = [];
                var pageCount;
                //模拟数据插入
                $.get({
                    dataType: "json",
                    xhrFields: {withCredentials: false},
                    url: "http://localhost:9001/roomType/queryAllRoomRType?page=" + page + "&limit=7",
                    /*xhrFields:{withCredentials: true},*/
                    success: function (res) {
                        if (res.count % 7 == 0) {
                            pageCount = res.count / 7;
                        } else {
                            pageCount = res.count / 7 + 1;
                        }
                        $.each(res.data, function (index, roomType) {
                            lis.push('<dd data-id="' + roomType.id + '"><a class="fly-case-active"  href="JavaScript:void(0);" data-type="toRoomTypeList">' + roomType.roomTypeName + '</a></dd>\n');
                        });
                    },
                    error: function () {
                    }
                });
                setTimeout(function () {
                    //!* lis.push('<dt><a href="../hotel/lists.html" target="_blank">房间分类</a></dt>');*!/
                    //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                    //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                    next(lis.join(''), page < pageCount); //假设总页数为 10
                }, 500);
            }
        });


    }

    //获取首页楼层列表
    getAllHotelFloor();

    function getAllHotelFloor() {
        $.get({
            url: "http://localhost:9001/floor/queryAllFloorAndRoom?page=1&limit=10",
            success: function (res) {
                layer.close(loadIndex);
                let getIndexFloorHtml = '';

                    //遍历data
                    $.each(res.data, function (index, floor) {
                            <!--循环开始 start-->
                            getIndexFloorHtml += '<div class="temp-hot">\n';
                            getIndexFloorHtml += '<div class="layui-container">\n';
                            getIndexFloorHtml += '<p class="temp-title-cn"><span></span>酒店' + floor.floorName + '<span></span></p>\n';
                            getIndexFloorHtml += '<div class="layui-row layui-col-space20">\n';
                            $.each(floor.roomList, function (index, room) {
                                getIndexFloorHtml += '<div data-id="' + room.id + '" class="layui-col-xs6 layui-col-md3">\n';
                                getIndexFloorHtml += '<a class="template store-list-box fly-case-active" href="JavaScript:void(0);" data-type="toRoomInfo">\n';
                                getIndexFloorHtml += '<img src="/image/' + room.roomPhoto + '" class="store-list-cover">\n';
                                getIndexFloorHtml += '<h2 class="layui-elip">' + room.roomName + '</h2>\n';
                                getIndexFloorHtml += '<p class="price"> <span title="金额"> ￥' + room.roomName + ' </span> <span title="房号" style="color:  #fff;background: #0e88cc;padding: 3px;text-align: center;border: 1px solid #4cffb3;font-size: 13px;"> NO.' + room.roomName + ' </span></p>\n';
                                getIndexFloorHtml += '</a>\n';
                                getIndexFloorHtml += '</div>\n';
                            });
                            getIndexFloorHtml += '</div>\n';
                            getIndexFloorHtml += '</div>\n';
                            getIndexFloorHtml += '</div>\n';
                            <!--循环结束 end-->
                            getIndexFloorHtml += '\n';
                        /*	getIndexFloorHtml += '<dd data-id="'+roomType.id+'"><a class="fly-case-active"  href="JavaScript:void(0);" data-type="toRoomTypeList" target="_blank">' + roomType.typeName + '</a></dd>\n';*/
                    });
                $('#getIndexFloor').html(getIndexFloorHtml);
                element.render();
            },
            error: function () {

            }
        });
    }
/*function getAllHotelFloor() {
    $.ajax({
        url: "http://localhost:9001/floor/queryAllFloorAndRoom?page=1&limit=10",
        success: function (res) {
            layer.close(loadIndex);
            //遍历data
            var  getIndexFloorHtml ='';
            $.each(res.data, function (index, floor) {
                <!--循环开始 start-->
                console.log("============开始============================");

                getIndexFloorHtml += '<div class="temp-hot">\n';
                getIndexFloorHtml += '<div class="layui-container">\n';
                getIndexFloorHtml += '<p class="temp-title-cn"><span></span>酒店' + floor.floorName + '<span></span></p>\n';
                getIndexFloorHtml += '<div class="layui-row layui-col-space20 >\n';
                $.each(floor.roomList, function (index, room) {

                    var getRoomHtml='';
                    getRoomHtml += '<div data-id="'+room.id+ '" class="layui-col-xs6 layui-col-md3">\n';
                    getRoomHtml += '<a class="template store-list-box fly-case-active" href="JavaScript:void(0);" data-type="toRoomInfo">\n';
                    getRoomHtml += '<img src="/image/' + room.roomPhoto + '" class="store-list-cover">\n';
                    getRoomHtml += '<h2 class="layui-elip">' + room.roomName + '</h2>\n';
                    getRoomHtml += '<p class="price"> <span title="金额"> ￥' + room.roomName + ' </span> <span title="房号" style="color:  #fff;background: #0e88cc;padding: 3px;text-align: center;border: 1px solid #4cffb3;font-size: 13px;"> NO.' + room.roomName + ' </span></p>\n';
                    getRoomHtml += '</a>\n';
                    getRoomHtml += '</div>\n';
                    console.log(getRoomHtml);
                    getIndexFloorHtml +=getRoomHtml;
                })

                getIndexFloorHtml += '</div>\n';
                getIndexFloorHtml += '</div>\n';
                getIndexFloorHtml += '</div>\n';
                <!--循环结束 end-->
                getIndexFloorHtml += '\n';
               /!* getIndexFloorHtml += '<br/>';*!/
                $('#getIndexFloor').append(getIndexFloorHtml);
                console.log("============结束============================");
            })
            element.render();
        }, error: function () {
        }
    });

}*/


//阻止IE7以下访问
if (device.ie && device.ie < 10) {
    layer.alert('如果您非得使用 IE 浏览器访问Fly社区，那么请使用 IE10+');
}

$.ajaxSetup({
    // 发送cookie
    xhrFields: {
        withCredentials: true
    }
});


//加载搜索框
let searchRoomHtml = '';
searchRoomHtml += '<input type="text" placeholder="搜索你需要的房间" name="keywords" id="searchKeywords" autocomplete="off" value="">';
searchRoomHtml += '<button class="layui-btn layui-btn-shop" lay-submit="" lay-filter="searchHotelRoom">';
searchRoomHtml += '<i class="layui-icon layui-icon-search"></i>';
searchRoomHtml += '</button>';
$("#searchRoom").html(searchRoomHtml);


//判断会员是否登录
let loginMemberHtml = '';
let sessionMemberDate = layui.sessionData('sessionMemberDate');
//获取顶部菜单编码
let navCodeData = layui.sessionData('navCodeData');


if (typeof (navCodeData.navCode) == "undefined" || navCodeData.navCode == "index") {
    loginMemberHtml += '<li data-id="index" class="layui-nav-item layui-hide-xs layui-this"> <a class="fly-case-active" data-type="toTopNav" href="JavaScript:void(0);">首页</a> </li>';
} else {
    loginMemberHtml += '<li data-id="index" class="layui-nav-item layui-hide-xs"> <a class="fly-case-active" data-type="toTopNav" href="JavaScript:void(0);">首页</a> </li>';

}

if (typeof (navCodeData.navCode) != "undefined" && navCodeData.navCode == "room") {
    loginMemberHtml += '<li data-id="room" class="layui-nav-item layui-hide-xs layui-this"> <a class="fly-case-active" data-type="toTopNav" href="JavaScript:void(0);">房间</a> </li>';
} else {
    loginMemberHtml += '<li data-id="room" class="layui-nav-item layui-hide-xs"> <a class="fly-case-active" data-type="toTopNav" href="JavaScript:void(0);">房间</a> </li>';
}

if (typeof (sessionMemberDate.sessionMember) != "undefined" && sessionMemberDate.sessionMember != null) {
    loginMemberHtml += '<li data-id="myInfo" class="layui-nav-item fly-layui-user" id="FLY-notice">';
    loginMemberHtml += '<a class="fly-nav-avatar fly-case-active"data-type="toTopNav" href="JavaScript:void(0);" id="LAY_header_avatar">';
    loginMemberHtml += '<img src="../hotel/images/head.jpg">';
    loginMemberHtml += '<cite class="layui-hide-xs">欢迎您：' + sessionMemberDate.sessionMember.mNickname + '</cite>';
    loginMemberHtml += '</a>';
    loginMemberHtml += '</li>';
    loginMemberHtml += '<li class="layui-nav-item layui-hide-xs"> <a class="fly-case-active" data-type="exitSystem" href="JavaScript:void(0);">退出</a> </li>';
} else {
    if (typeof (navCodeData.navCode) != "undefined" && navCodeData.navCode == "login") {
        loginMemberHtml += '<li data-id="login" class="layui-nav-item layui-hide-xs layui-this"> <a class="fly-case-active" data-type="toTopNav" href="JavaScript:void(0);">登入</a> </li>';
    } else {
        loginMemberHtml += '<li data-id="login" class="layui-nav-item layui-hide-xs "> <a class="fly-case-active" data-type="toTopNav" href="JavaScript:void(0);">登入</a> </li>';
    }

    if (typeof (navCodeData.navCode) != "undefined" && navCodeData.navCode == "register") {
        loginMemberHtml += '<li data-id="register" class="layui-nav-item layui-hide-xs layui-this"> <a class="fly-case-active" data-type="toTopNav" href="JavaScript:void(0);">注册<span class="layui-badge-dot"></span></a>';
        loginMemberHtml += '</li>';
    } else {
        loginMemberHtml += '<li data-id="register" class="layui-nav-item layui-hide-xs "> <a class="fly-case-active" data-type="toTopNav" href="JavaScript:void(0);">注册<span class="layui-badge-dot"></span></a>';
        loginMemberHtml += '</li>';
    }


}
loginMemberHtml += '<span class="layui-nav-bar" style="left: 560px; top: 55px; width: 0px; opacity: 0;"></span>';
$("#layui-nav-userinfo").html(loginMemberHtml);


//监听提交搜索
form.on('submit(searchHotelRoom)', function (data) {

    let loadIndex = layer.load(2, {
        shade: [0.3, '#333']
    });

    $.post({
        url: searchUrl,
        data: data.field,
        dataType: "json",
        timeout: 300000,
        xhrFields: {withCredentials: true},
        success: function (res) {
            layer.close(loadIndex);
            if (res.success) {
                layui.sessionData('searchRoomListData', {
                    key: 'searchRoomList'
                    , value: res.data
                })
                window.location.href = "../hotel/search.html";
            } else {
                layer.msg(res.message);
            }
        },
        error: function () {

        }
    });

    return false;
});


laytpl.toDateString = function (d, format) {
    if (undefined === d || null == d || '' === d) {
        return "";
    }
    var date = new Date(d || new Date())
        , ymd = [
        this.digit(date.getFullYear(), 4)
        , this.digit(date.getMonth() + 1)
        , this.digit(date.getDate())
    ]
        , hms = [
        this.digit(date.getHours())
        , this.digit(date.getMinutes())
        , this.digit(date.getSeconds())
    ];

    format = format || 'yyyy-MM-dd HH:mm:ss';

    return format.replace(/yyyy/g, ymd[0])
        .replace(/MM/g, ymd[1])
        .replace(/dd/g, ymd[2])
        .replace(/HH/g, hms[0])
        .replace(/mm/g, hms[1])
        .replace(/ss/g, hms[2]);
};


//监听用户提交注册
form.on('submit(register)', function (data) {
    let loadIndex = layer.load(2, {
        shade: [0.3, '#333']
    });

    $.ajax({
        type: "post",
        url: registerUrl,
        data: data.field,
        dataType: "json",//返回的
        success: function (data) {
            layer.close(loadIndex);
            layer.msg(data.message, function () {
                parent.location.href = "../hotel/login.html";
            });
        },
        error: function (msg) {
            console.log(msg);
        }
    });


});

//监听用户提交登录
form.on('submit(login)', function (data) {
    let loadIndex = layer.load(2, {
        shade: [0.3, '#333']
    });
    $.post({
        url: loginUrl,
        data: data.field,
        dataType: "json",
        timeout: 300000,
        xhrFields: {withCredentials: true},
        success: function (res) {
            layer.close(loadIndex);
            if (res.success) {
                layui.sessionData('sessionMemberDate', {
                    key: 'sessionMember'
                    , value: res.data
                });
                layui.sessionData('navCodeData', {
                    key: 'navCode'
                    , remove: true
                });
                window.location.href = "../hotel/index.html";
            } else {
                layer.msg(res.message);
            }
        },
        error: function () {

        }
    });

});

//会员预定酒店
$('body').on('click', '.fly-memberReserveHotel', function () {
    let roomId = $("#id").val();
    console.info("roomId" + roomId);

    let index = layer.open({
        title: '会员预定房间',
        type: 2,
        shade: 0.2,
        shadeClose: true,
        area: ['50%', '60%'],
        content: 'memberReserveRoom.html'
    });
});


//图片轮播
carousel.render({
    elem: '#LAY-store-banner'
    , width: '100%'
    , height: '460px'
    , interval: 5000
});


})
;





