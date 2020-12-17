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
        loginMemberHtml += '<li data-id="index" class="layui-nav-item layui-hide-xs layui-this"> <a class="fly-case-active" data-type="toTopNav" href="/index/index">首页</a> </li>';
    } else {
        loginMemberHtml += '<li data-id="index" class="layui-nav-item layui-hide-xs"> <a class="fly-case-active" data-type="toTopNav" href="/index/index">首页</a> </li>';

    }

    if (typeof (navCodeData.navCode) != "undefined" && navCodeData.navCode == "room") {
        loginMemberHtml += '<li data-id="room" class="layui-nav-item layui-hide-xs layui-this"> <a class="fly-case-active" data-type="toTopNav" href="/lists/lists">房间</a> </li>';
    } else {
        loginMemberHtml += '<li data-id="room" class="layui-nav-item layui-hide-xs"> <a class="fly-case-active" data-type="toTopNav" href="/lists/lists">房间</a> </li>';
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
            loginMemberHtml += '<li data-id="login" class="layui-nav-item layui-hide-xs layui-this"> <a class="fly-case-active" data-type="toTopNav" href="/login/login">登入</a> </li>';
        } else {
            loginMemberHtml += '<li data-id="login" class="layui-nav-item layui-hide-xs "> <a class="fly-case-active" data-type="toTopNav" href="/login/login">登入</a> </li>';
        }

        if (typeof (navCodeData.navCode) != "undefined" && navCodeData.navCode == "register") {
            loginMemberHtml += '<li data-id="register" class="layui-nav-item layui-hide-xs layui-this"> <a class="fly-case-active" data-type="toTopNav" href="/register/register">注册<span class="layui-badge-dot"></span></a>';
            loginMemberHtml += '</li>';
        } else {
            loginMemberHtml += '<li data-id="register"  class="layui-nav-item layui-hide-xs "> <a class="fly-case-active" data-type="toTopNav" href="/register/register">注册<span class="layui-badge-dot"></span></a>';
            loginMemberHtml += '</li>';
        }


    }
    loginMemberHtml += '<span class="layui-nav-bar" style="left: 560px; top: 55px; width: 0px; opacity: 0;"></span>';
    $("#layui-nav-userinfo").html(loginMemberHtml);

})