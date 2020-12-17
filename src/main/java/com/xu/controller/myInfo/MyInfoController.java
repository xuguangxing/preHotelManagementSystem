package com.xu.controller.myInfo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/12/17 0017 下午 1:50
 */
@Controller
@RequestMapping("/myInfo")
public class MyInfoController {

    /**
     * 跳转到个人信息界面
     * @return
     */
    @RequestMapping("/myInfo")
    public String myInfo(){
        return "myInfo/myInfo";
    }
}
