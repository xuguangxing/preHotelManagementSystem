package com.xu.mapper.user;

import com.xu.pojo.user.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/11/17 0017 下午 4:12
 */
@Mapper
@Repository
public interface UserMapper {

    /**
     * 查询所有的用户信息及对应的角色信息
     *
     * @return
     */
    public User findByUserName(@Param("userName") String userName);

}