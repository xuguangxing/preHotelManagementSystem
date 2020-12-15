package com.xu.controller;

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
public class Index {


    @RequestMapping("/index")
    public String index(){
        return "index";
    }
}
