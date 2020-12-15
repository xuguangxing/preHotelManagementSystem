package com.xu.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * TODD
 *
 * @Version 1.0
 * @date 2020/12/5 21:27
 */

public class ImageUtil {

    /**
     * 删除图片
     * @param file
     */
    public static void delteImage(String file) {
        File f = new File("C:\\Users\\xu\\Desktop\\image\\" + file);
        f.delete();
    }

    /**
     * 上传图片
     * @param file
     * @return
     */
    public static Map uploadImg(MultipartFile file) throws IOException {

        byte[] bytes = file.getBytes();
        String fileName;
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");//设置日期格式
        fileName = df.format(new Date()); // new Date()为获取当前系统时间
        fileName = fileName + String.valueOf((int) (Math.random() * 100)) + ".jpg";
        File destPath = new File("C:\\Users\\xu\\Desktop\\image\\" + fileName);
        //2.创建通道，先赋空值
        FileOutputStream fos = null;
        //3.创建通道时需要抛出异常
        try {
            fos = new FileOutputStream(destPath);
            try {
                fos.write(bytes);
            } catch (Exception e) {
                System.out.println("储存盘异常,请修理");
                throw new RuntimeException(e);
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } finally {

            //5.无论有无异常，需要关闭资源（分别抛出异常）
            try {
                fos.close();
            } catch (Exception e) {
                System.out.println("资源文件或目标文件关闭失败！");
                throw new RuntimeException(e);
            }
            Map<Object, Object> map = new HashMap<>();
            map.put("code", 0);
            map.put("msg", "");
            map.put("src", fileName);
            return map;

        }
    }
}
