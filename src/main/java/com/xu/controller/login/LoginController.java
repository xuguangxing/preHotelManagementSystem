package com.xu.controller.login;

import com.xu.service.user.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/12/17 0017 上午 8:47
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;
    /**
     * 跳转到登录界面
     * @return
     */
    @RequestMapping("/login")
    public String index(){
        return "login/login";
    }

    /**
     * 旅客登录
     * @param userName
     * @param passWord
     * @return
     */
    @ResponseBody
    @RequestMapping("/clientLogin")
    public String  clientLogin(String userName,String passWord){
        /**
         * 获取当前的用户
         */
        Subject subject = SecurityUtils.getSubject();
        /**
         * 获取当前用户的账号和密码
         * 封装用户的登录数据
         */
        UsernamePasswordToken token = new UsernamePasswordToken(userName,passWord);
        try{
            subject.login(token); //执行登录的方法
            return "成功";
        }catch (UnknownAccountException e){  //用户名不存在
            return "用户名不存在";
        }catch (IncorrectCredentialsException e){  //密码错误
            return "密码错误";
        }
    }
}
