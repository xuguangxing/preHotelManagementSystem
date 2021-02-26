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
                    url: "http://101.132.135.146:9001/roomType/queryAllRoomType?page=" + page + "&limit=7",
                    /*xhrFields:{withCredentials: true},*/
                    success: function (res) {
                        if (res.count % 7 == 0) {
                            pageCount = res.count / 7;
                        } else {
                            pageCount = res.count / 7 + 1;
                        }
                        $.each(res.data, function (index, roomType) {
                            lis.push('<dd data-id="' + roomType.id + '"><a class="fly-case-active"  onclick=toRoomTypeListByLists(this) data-type="toRoomTypeList">' + roomType.roomTypeName + '</a></dd>\n');
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
            url: "http://101.132.135.146:9001/floor/queryAllFloorAndRoom?page=1&limit=10",
            success: function (res) {
                layer.close(loadIndex);
                let getIndexFloorHtml = '';

                //遍历data
                $.each(res.data, function (index, floor) {
                    if(floor.roomList.length<=0){

                    }else{
                        <!--循环开始 start-->
                        getIndexFloorHtml += '<div class="temp-hot">\n';
                        getIndexFloorHtml += '<div class="layui-container">\n';
                        getIndexFloorHtml += '<p class="temp-title-cn"><span ></span>酒店' + floor.floorName + '<span></span></p>\n';
                        getIndexFloorHtml += '<div class="layui-row layui-col-space20">\n';
                        $.each(floor.roomList, function (index, room) {
                            getIndexFloorHtml += '<div data-id="' + room.id + '" class="layui-col-xs6 layui-col-md3">\n';
                            getIndexFloorHtml += '<a class="template store-list-box fly-case-active" onclick=toRoomInfo(this) data-type="toRoomInfo">\n';
                            getIndexFloorHtml += '<img src="' + room.roomPhoto + '" class="store-list-cover">\n';
                            getIndexFloorHtml += '<h2 class="layui-elip">' + room.roomAlias + '</h2>\n';
                            getIndexFloorHtml += '<p class="price"> <span title="金额"> ￥' + room.roomPrice + ' </span> <span title="房号" style="color:  #fff;background: #0e88cc;padding: 3px;text-align: center;border: 1px solid #4cffb3;font-size: 13px;"> NO.' + room.roomName + ' </span></p>\n';
                            getIndexFloorHtml += '</a>\n';
                            getIndexFloorHtml += '</div>\n';
                        });
                        getIndexFloorHtml += '</div>\n';
                        getIndexFloorHtml += '</div>\n';
                        getIndexFloorHtml += '</div>\n';
                        <!--循环结束 end-->
                        getIndexFloorHtml += '\n';
                    }

                    /*	getIndexFloorHtml += '<dd data-id="'+roomType.id+'"><a class="fly-case-active"  href="JavaScript:void(0);" data-type="toRoomTypeList" target="_blank">' + roomType.typeName + '</a></dd>\n';*/
                });
                $('#getIndexFloor').html(getIndexFloorHtml);
                element.render();
            },
            error: function () {

            }
        });
    }

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
//图片轮播
    carousel.render({
        elem: '#LAY-store-banner'
        , width: '100%'
        , height: '460px'
        , interval: 5000
    });



    //数字前置补零
    layui.laytpl.digit = function (num, length, end) {
        var str = '';
        num = String(num);
        length = length || 2;
        for (var i = num.length; i < length; i++) {
            str += '0';
        }
        return num < Math.pow(10, length) ? str + (num | 0) : num;
    };

    //头像
    if (device.android || device.ios) {
        $('#LAY_header_avatar').on('click', function () {
            return false;
        })
    }

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
    window.location.href="/details/details";
}

/**
 * 点击房型跳转到房间列表界面
 */
function toRoomTypeListByLists(obj) {
    let a = $(obj).parent('dd');
    let roomTypeId = a.data('id');

    //将该id存入到session中
    layui.sessionData('roomTypeData', {
        key: 'roomTypeId'
        , value: roomTypeId
    });

    //清除本页房间列表，楼层和房型的session
    layui.sessionData('floorDataLists', {
        key: 'floorId'
        ,remove: true
    });
    layui.sessionData('roomTypeDataLists', {
        key: 'roomTypeId'
        ,remove: true
    });

    window.location.href="/lists/lists";
}





