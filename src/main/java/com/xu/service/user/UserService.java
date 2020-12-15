package com.xu.service.user;

import com.xu.pojo.user.User;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/11/18 0018 下午 5:49
 */
public interface UserService {

    /**
     * 查询所有的用户信息及对应的角色信息
     * @return
     */
    public User findByUserName(String userName);



}
