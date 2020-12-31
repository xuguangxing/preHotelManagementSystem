package com.xu.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @Author lxh
 * @Description 自定义webMVC配置类
 * @Date 2020/5/20
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /*registry.addResourceHandler("/image/**").addResourceLocations("C:/Users/Administrator/Desktop/image/");*/
        //和页面有关的静态目录都放在项目的static目录下
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
       //registry.addResourceHandler("/image/**").addResourceLocations("file:///C:/Users/xu/Desktop/preImage/");
        registry.addResourceHandler("/image/**").addResourceLocations("file:///C:/Users/Administrator/Desktop/image/");

    }
}


