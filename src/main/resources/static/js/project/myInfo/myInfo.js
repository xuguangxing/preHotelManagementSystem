layui.config({
    version: "1545301148662"
}).extend({
    'fly': '../hotel/layui/dist/lay/modules/fly/index'
}).use(["form","upload"], function () {
    let form = layui.form,
        layer = layui.layer,
        $ = layui.$,
        upload = layui.upload;
    var beforeUserNameImage;
    //获取用户信息
    let userData = layui.sessionData('userSession');
    //给表单赋值

    form.val("formMyInfo",userData.user);
    layui.$('#uploadDemoView').removeClass('layui-hide').find('img').attr('src', userData.user.userNameImage);

    beforeUserNameImage=$("#userNameImage").val();
    //监听更新提交客户信息
    form.on('submit(updateMember)', function (data) {
        console.log(data.field)
        $.ajax({
            type: "post",
            url: "http://101.132.135.146:9001/user/updateUser",
            data: {id:data.field.id, userName:data.field.userName, passWord:userData.user.passWord, idCard:data.field.idCard, userPhone:data.field.userPhone, realName:data.field.realName, userNameImage:data.field.userNameImage
                , userEmail:data.field.userEmail , remark:data.field.remark,beforeUserNameImage:beforeUserNameImage
            },
            success: function (res) {
                //通过登录名查找该用户
                $.ajax({
                    url: "http://101.132.135.146:9001/user/queryUserByUserName",
                    data: {userName: data.field.userName},
                    success: function (res) {
                        //将用户存入session中
                        layui.sessionData('userSession', {
                            key: 'user'
                            , value: res
                        });
                    }
                })
                layer.msg("修改成功",{
                    icon:1,
                    time: 1000
                },function () {
                    window.location.href="/myInfo/myInfo";
                })
            },
            error: function (res) {
            }
        });

    });



    //监听更新提交密码
    form.on('submit(updatePsw)', function (data) {

        if($("#passWord").val()!=$("#L_repass").val()){
           return  layer.msg("两次密码输入不一致",{
                icon: 2,
                time: 1000
            })
        }else{
            $.ajax({
                url: "http://101.132.135.146:9001/user/updateUserPassWord",
                data: {idCard: userData.user.idCard,passWord: $("#passWord").val()},
                success: function (res) {
                    //通过登录名查找该用户
                    $.ajax({
                        url: "http://101.132.135.146:9001/user/queryUserByUserName",
                        data: {userName: userData.user.userName},
                        success: function (res) {
                            //将用户存入session中
                            layui.sessionData('userSession', {
                                key: 'user'
                                , value: res
                            });
                        }
                    })
                    layer.msg("修改成功",{
                        icon:1,
                        time: 1000
                    },function () {
                        window.location.href="/myInfo/myInfo";
                    })
                },
                error: function (msg) {
                }
            });
        }
    });

    //用户登录头像
    upload.render({
        elem: '#demo1'
        , url: 'http://101.132.135.146:9001/image/uploadFile?groupName=group1'
        , accept: "images"
        , done: function (res) {
            layer.msg('上传成功');
            layui.$('#uploadDemoView').removeClass('layui-hide').find('img').attr('src', res.body);
            $("#userNameImage").val(res.body);
        }
    });

});