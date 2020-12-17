package com.xu.controller.register;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/12/17 0017 上午 10:43
 */
@Controller
@RequestMapping("/register")
public class RegisterController {

    /**
     * 跳转到注册界面
     * @return
     */
    @RequestMapping("/register")
    public String index(){
        return "register/register";
    }
}
