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

    //监听发送邮箱按钮
    $("#yzmbt").click(function () {

        var email= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

        if (!email.test($("#userEmail").val())){
            layer.msg('请输入合法的邮箱',{
                icon: 2,
                time: 1000
            })
        }else {
            layer.msg('已发送验证码至邮箱', {
                icon: 1,
                time: 1000,
            })
            $.ajax({
                url: "http://localhost:9001/user/sendAuthCode",
                data: {email: $("#userEmail").val()},
                success: function (obj) {
                    vercode=obj;
                }
            })
        }
    })

    //重置密码
    form.on('submit(forget)', function (obj) {

        var field = obj.field;
        //监听身份证位数
        if ($("#idCard").val().length !== 18) {
            return layer.msg('身份证必须为18位', {
                icon: 2,
                time: 1000

            })
        }

        //监听密码
        if ($("#surePassword").val() != $("#passWord").val()) {
            return layer.msg("两次输入的密码不正确", {
                icon: 2,
                time: 1000
            })
        }
        if ( $("#vercode").val()==vercode){
            //查找身份证号
            $.ajax({
                url: "http://localhost:9001/user/queryIdCard"
                , data: {idCard: $("#idCard").val()}
                , success: function (res) {
                    if (res == true) {
                        //查找邮箱
                        $.ajax({
                            url: "http://localhost:9001/user/queryUserEmail",
                            data: {userEmail: $("#userEmail").val()},
                            success: function (res) {
                                if (res == true) {

                                    //判断身份证号和邮箱是否为同一个用户
                                    $.get({
                                        url: "http://localhost:9001/user/queryByIdCard",
                                        hrFields: {withCredentials: false},
                                        data: {idCard: $("#idCard").val()},
                                        success: function (res) {
                                            if (res.userEmail==$("#userEmail").val()) {
                                                //修改信息
                                                $.ajax({
                                                    url: "http://localhost:9001/user/updateUserPassWord",
                                                    data: {idCard: $("#idCard").val(),passWord: $("#passWord").val()},
                                                    success: function (obj) {
                                                        layer.msg('修改成功', {
                                                            icon: 1,
                                                            time: 1000
                                                        }, function () {
                                                            window.location.href = "/index/index";
                                                        })
                                                    },
                                                    error:function () {
                                                        layer.msg('修改失败', {
                                                            icon: 2,
                                                            time: 1000
                                                        })
                                                    }
                                                })

                                            } else {
                                                layer.msg('邮箱和身份证号不匹配，请重新输入，或者找管理员', {
                                                    icon: 2,
                                                    time: 2000
                                                })
                                            }
                                        }
                                    })
                                } else {
                                    layer.msg('该邮箱还没有注册', {
                                        icon: 2,
                                        time: 1000
                                    })
                                }
                            }
                        })

                    } else {
                        layer.msg('该身份证号还没有注册', {
                            icon: 2,
                            time: 1000
                        })
                    }

                }
            });
        }else{
            layer.msg('验证码输入错误',{
                icon: 2,
                time: 1000
            })
        }
        return false;
    });
})