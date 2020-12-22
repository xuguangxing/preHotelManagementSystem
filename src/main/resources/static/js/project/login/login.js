layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'layer', 'form'], function () {

    var form = layui.form;
    var $ = layui.$;
    var layer = layui.layer;

    //提交
    form.on('submit(login)', function(obj){
        var userName= $("#userName").val();
        var passWord=$("#passWord").val();
        $.ajax({
            url: '/login/clientLogin',
            data: {userName:userName,passWord:passWord},
            success: function (obj) {
                if (obj=="成功"){
                    layer.msg(obj,{
                        icon: 1,
                        time: 1000
                    },function () {
                        window.location.href="/index/index";
                    })
                }else{
                    layer.msg(obj,{
                        icon: 2,
                        time: 1000
                    })
                }
            }
        })
    });

})