package com.xu.controller.forget;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/12/22 0022 上午 8:58
 */
@Controller
@RequestMapping("/forget")
public class ForgetController {

    @RequestMapping("/forget")
    public String forgetView(){
        return "forget/forget";
    }

}
