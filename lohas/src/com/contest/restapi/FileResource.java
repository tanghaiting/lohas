package com.contest.restapi;

import java.io.InputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.contest.service.FileService;
import com.sun.jersey.api.spring.Autowire;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

@Autowire
@Path("fileservice")
public class FileResource {
    @Autowired
    private FileService fileService;
    

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public String uploadFile(@FormDataParam("file") InputStream fileInputStream,
            @FormDataParam("file") FormDataContentDisposition disposition) {
        if (fileInputStream != null) {
            String path = fileService.savePhoto(fileInputStream);
            return path;
        }
        return null;
    }
    
    

}
