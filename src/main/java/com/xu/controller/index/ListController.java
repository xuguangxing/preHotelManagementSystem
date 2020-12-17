package com.xu.controller.index;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/12/17 0017 下午 2:23
 */
@Controller
@RequestMapping("/lists")
public class ListController {

    /**
     * 跳转到房间列表界面
     * @return
     */
    @RequestMapping("/lists")
    public String index(){
        return "lists/lists";
    }
}
