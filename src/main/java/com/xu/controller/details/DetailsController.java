package com.xu.controller.details;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/12/17 0017 下午 2:43
 */
@Controller
@RequestMapping("/details")
public class DetailsController {

    /**
     * 跳转到房间详情界面
     * @return
     */
    @RequestMapping("/details")
    public String index(){
        return "details/details";
    }
}
