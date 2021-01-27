package com.xu.config;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/11/19 0019 上午 8:42
 */
@Configuration
public class ShiroConfig {

    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("getDefaultWebSecurityManager") DefaultWebSecurityManager defaultWebSecurityManager){
        ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();

        /**
         * 设置安全管理器
         */
        bean.setSecurityManager(defaultWebSecurityManager);

        /**
         * 添加shrio的内置过滤器
         * anon :无需认证就可以访问
         * authc : 必须认证了才能访问
         * perms :拥有对某个资源的权限才能访问
         * role ： 拥有某个角色的权限才能访问
         */
        Map<String,String> fileterMap = new LinkedHashMap<>();

        bean.setFilterChainDefinitionMap(fileterMap);

        /**
         * 设置登录界面
         */
        bean.setLoginUrl("/login/login");

        /**
         * 未授权界面
         */
        bean.setUnauthorizedUrl("/noauth");

        return bean;
    }

    @Bean(name = "getDefaultWebSecurityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm") UserRealm userRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(userRealm);
        return securityManager;
    }

    /**
     * 创建 realm 对象，需要自定义
     * @return
     */
    @Bean(name = "userRealm")
    public UserRealm userRealm(){
        return new UserRealm();
    }

    /**
     * 整合shiro,ShiroDialect
     */
    public ShiroDialect getShiroDialect(){
        return new ShiroDialect();
    }


}
