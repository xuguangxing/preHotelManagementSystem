package com.xu.controller.myReserve;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/12/17 0017 下午 1:56
 */
@Controller
@RequestMapping("/myReserve")
public class MyReserveController {

    /**
     * 跳转到我的预定界面
     * @return
     */
    @RequestMapping("/myReserve")
    public String myReserve(){
        return "myReserve/myReserve";
    }
}
