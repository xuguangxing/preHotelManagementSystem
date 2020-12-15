package com.xu.util;


import java.sql.Timestamp;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * TODO
 *
 * @author Administrator
 * @date 2020/12/9 0009 上午 10:23
 */
public class TimeUTil {

    /**
     * 时间格式化
     * @param date_str
     * @return
     */
    public static Date date(String date_str) {
        try {
            Calendar zcal = Calendar.getInstance();//日期类
            Timestamp timestampnow = new Timestamp(zcal.getTimeInMillis());//转换成正常的日期格式
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");//改为需要的东西
            ParsePosition pos = new ParsePosition(0);
            Date current = formatter.parse(date_str, pos);
            timestampnow = new Timestamp(current.getTime());
            return timestampnow;
        } catch (NullPointerException e) {
            return null;
        }
    }
}
