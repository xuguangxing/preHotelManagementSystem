package com.xu.controller.login;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/12/17 0017 上午 8:47
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    /**
     * 跳转到登录界面
     * @return
     */
    @RequestMapping("/login")
    public String index(){
        return "login/login";
    }
}
