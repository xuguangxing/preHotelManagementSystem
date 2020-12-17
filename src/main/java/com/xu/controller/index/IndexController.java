package com.xu.controller.index;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * TODD
 *
 * @Version 1.0
 * @date 2020/12/14 22:03
 */
@Controller
@RequestMapping("/index")
public class IndexController {


    /**
     * 跳转到首页
     * @return
     */
    @RequestMapping("/index")
    public String index(){
        return "index";
    }
}
