package com.contest.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class FileService {
    private static final String PATH_HEAD = "D:/headPortrait/";

    //private static final String PATH_HEAD = "/mnt/headPortrait/";

    public String savePhoto(InputStream fileInputStream) {
        String imageName = System.currentTimeMillis() + ".jpg";
        String newPath = PATH_HEAD + imageName;
        OutputStream fop = null;
        File file;
        try {

            file = new File(newPath);
            fop = new FileOutputStream(file);
            if (!file.exists()) {
                file.createNewFile();
            }
            int read = 0;
            byte[] bytes = new byte[1024];
            while ((read = fileInputStream.read(bytes)) != -1) {
                fop.write(bytes, 0, read);
            }
            fop.flush();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            try {
                if (fop != null) {
                    fop.close();
                }
                return imageName;
            }
            catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
    
    /**
	 * 查询雨点规则
	 */
	public String dotRule() {
		String newPath = PATH_HEAD + "dotrule.txt";
		try {
			BufferedReader in=new BufferedReader(new InputStreamReader(new FileInputStream(newPath),"UTF-8"));
			String line;
			String result="";
				while((line=in.readLine())!=null){
					result+=line;
				}
				return result;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		return "";
	}

	/**
	 * 修改羽点规则
	 */
	public void modifyDotRule(String dotRuleMessage) {
		 String newPath = PATH_HEAD +"dotrule.txt";
	     PrintWriter out;
		try {
			out = new PrintWriter(newPath);
			 out.print(dotRuleMessage);
		     out.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
