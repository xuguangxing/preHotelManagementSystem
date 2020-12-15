package com.xu.pojo.user;

import com.xu.pojo.role.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/11/17 0017 下午 4:02
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    /**
     * 主键
     */
    private Integer id;

    /**
     * 登入名
     */
    private String userName;

    /**
     * 登入密码
     */
    private String passWord;

    /**
     * 用户身份证
     */
    private String idCard;

    /**
     * 手机号
     */
    private String userPhone;

    /**
     * 用户真实名字
     */
    private String realName;

    /**
     * 用户登录头像
     */
    private String userNameImage;

    /**
     * 用户本人头像
     */
    private String userRealImage;

    /**
     * 用户邮箱
     */
    private String userEmail;

    /**
     * 用户身份证正面头像
     */
    private String idCardImagePositive;

    /**
     * 用户身份证反面头像
     */
    private String idCardImageNegative;

    /**
     * 用户地址
     */
    private String address;

    /**
     * 备注
     */
    private String remark;

    /**
     * 该用户对应的角色
     */
    private List<Role> roles ;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getUserNameImage() {
        return userNameImage;
    }

    public void setUserNameImage(String userNameImage) {
        this.userNameImage = userNameImage;
    }

    public String getUserRealImage() {
        return userRealImage;
    }

    public void setUserRealImage(String userRealImage) {
        this.userRealImage = userRealImage;
    }

    public String getIdCardImagePositive() {
        return idCardImagePositive;
    }

    public void setIdCardImagePositive(String idCardImagePositive) {
        this.idCardImagePositive = idCardImagePositive;
    }

    public String getIdCardImageNegative() {
        return idCardImageNegative;
    }

    public void setIdCardImageNegative(String idCardImageNegative) {
        this.idCardImageNegative = idCardImageNegative;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", passWord='" + passWord + '\'' +
                ", idCard='" + idCard + '\'' +
                ", userPhone='" + userPhone + '\'' +
                ", realName='" + realName + '\'' +
                ", userNameImage='" + userNameImage + '\'' +
                ", userRealImage='" + userRealImage + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", idCardImagePositive='" + idCardImagePositive + '\'' +
                ", idCardImageNegative='" + idCardImageNegative + '\'' +
                ", address='" + address + '\'' +
                ", roles=" + roles +
                '}';
    }
}

