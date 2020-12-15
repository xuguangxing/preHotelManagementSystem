package com.xu.service.user.impl;

import com.xu.mapper.user.UserMapper;
import com.xu.pojo.user.User;
import com.xu.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

 /**
 * TODO
 *
 * @author Administrator
 * @date 2020/11/19 0019 下午 2:08
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User findByUserName(String userName) {
        return userMapper.findByUserName(userName);
    }


}
