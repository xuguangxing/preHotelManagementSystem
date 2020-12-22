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


    //提交
    form.on('submit(register)', function (obj) {
        var field = obj.field;

        //确认密码
        if (field.passWord !== field.repass) {
            return layer.msg('两次密码输入不一致');
        }
        //监听身份证位数
        if ($("#idCard").val().length !== 18) {
            return layer.msg('身份证必须为18位', {
                icon: 2,
                time: 1000

            })
        }
        //监听登录名
        if ($("#userName").val().length > 20) {
            return layer.msg('登录名必须为小于20位', {
                icon: 2,
                time: 1000

            })
        }
        //监听真实姓名
        if ($("#realName").val().length < 2 || $("#realName").val().length > 20) {
            return layer.msg('真实姓名必须为2到20位', {
                icon: 2,
                time: 1000
            })
        }

        //判断该身份证是否已被注册
        $.ajax({
            url: "http://localhost:9001/user/queryIdCard",
            data: {idCard: field.idCard},
            success: function (res) {
                if (res == true) {
                    layer.msg('该身份证已被注册', {
                        icon: 2,
                        time: 1000
                    })
                } else {
                    //判断该登录名是否被注册
                    $.get({
                        url: "http://localhost:9001/user/queryUserName",
                        hrFields: {withCredentials: false},
                        data: {userName: field.userName},
                        success: function (res) {
                            if (res == true) {
                                layer.msg('该登录名已被注册', {
                                    icon: 2,
                                    time: 1000
                                })
                            } else {

                                //判断该邮箱是否被注册
                                $.ajax({
                                    url: "http://localhost:9001/user/queryUserEmail",
                                    data: {userEmail: $("#userEmail").val()},
                                    success: function (res) {
                                        if (res == true) {
                                            layer.msg('该邮箱已被注册,请联系管理员', {
                                                icon: 2,
                                                time: 1000
                                            })
                                        } else {
                                            //请求接口
                                            $.get({
                                                url: "http://localhost:9001/user/clientRegister" //实际使用请改成服务端真实接口
                                                , hrFields: {withCredentials: false}
                                                , data: {field: JSON.stringify(field)},
                                                success: function (res) {
                                                    layer.msg('注册成功', {
                                                        offset: '15px',
                                                        icon: 1,
                                                        time: 1000
                                                    }, function () {
                                                        window.location.href = '/login/login'; //跳转到登入页
                                                    });
                                                }
                                            });
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
        return false;
    });


})