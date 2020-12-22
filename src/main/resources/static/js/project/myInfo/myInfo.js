layui.config({
    version: "1545301148662"
}).extend({
    'fly': '../hotel/layui/dist/lay/modules/fly/index'
}).use(["form"], function () {
    let form = layui.form,
        layer = layui.layer,
        $ = layui.$;
    //获取用户信息
    let userData = layui.sessionData('userSession');
    //给表单赋值
    console.log(userData.user);
    form.val("formMyInfo",userData.user);


    //监听更新提交会员信息
    form.on('submit(updateMember)', function (data) {
        $.ajax({
            type: "post",
            url: updateHotelMemberUrl,
            data: data.field,
            dataType: "json",//返回的
            success: function (res) {
                layer.msg(res.message);
                layui.sessionData('sessionMemberDate',{
                    key:'sessionMember'
                    ,value:res.data
                });

            },
            error: function (res) {
                console.log(res.msg);
            }
        });

    });

    //监听更新提交密码
    form.on('submit(updatePsw)', function (data) {

        $.ajax({
            type: "post",
            url: updatePswUrl,
            data: data.field,
            dataType: "json",//返回的
            success: function (data) {
                layer.msg(data.message);

            },
            error: function (msg) {
                console.log(msg);
            }
        });


    });

});