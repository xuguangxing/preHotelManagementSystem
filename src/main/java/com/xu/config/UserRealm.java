package com.xu.config;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/11/19 0019 上午 8:44
 */

import com.xu.pojo.authority.Authority;
import com.xu.pojo.role.Role;
import com.xu.pojo.user.User;
import com.xu.service.user.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 自定义的类
 */
public class UserRealm extends AuthorizingRealm {

    @Autowired
    private UserService userServer;

    /**
     * 授权
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        System.out.println("执行了==》授权");

        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();

        /**
         * 拿到当前登录的对象
         */
        Subject subject = SecurityUtils.getSubject();

        /**
         * AuthenticationInfo 方法中 user值,拿到user对象
         */
        User currentUser =(User) subject.getPrincipal();

        /**
         * 设置当前用户的权限
         * info.addStringPermission("权限名称")
         */
        for (Role role:currentUser.getRoles()){
            for (Authority authority:role.getAuthorities()){
                info.addStringPermission(authority.getAuthorityName());
            }
        }

        return info;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        System.out.println("执行了==》认证");

        /**
         * 登录名认证
         */
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;

        /**
         * 用户名，密码，从数据库中取
         */
        User user = userServer.findByUserName(usernamePasswordToken.getUsername());

        /**
         * 没有这个用户,抛出异常
         */
        if(user==null){
            return null;
        }

        /**
         * 将用户存在session中
         */
        Subject curentSubject = SecurityUtils.getSubject();
        Session session = curentSubject.getSession();
        session.setAttribute("loginUser",user);

        /**
         * 密码认证，shiro做 密码可以加密  Md5盐值加密
         */
        return new SimpleAuthenticationInfo(user,user.getPassWord(),"");
    }
}
