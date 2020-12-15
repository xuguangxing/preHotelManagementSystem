package com.xu.pojo.authority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TODO
 * 权限实体类
 * @author Administrator
 * @date 2020/11/17 0017 下午 4:02
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Authority {

    /**
     * 权限id
     */
    private Integer id;

    /**
     * 权限名称
     */
    private String authorityName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthorityName() {
        return authorityName;
    }

    public void setAuthorityName(String authorityName) {
        this.authorityName = authorityName;
    }

    @Override
    public String toString() {
        return "Authority{" +
                "id=" + id +
                ", authorityName='" + authorityName + '\'' +
                '}';
    }
}
