package com.contest.restapi;

import com.contest.service.imgPath;

import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.sun.jersey.api.spring.Autowire;

@Autowire
@Path("path")
public class PathApi {
	@Autowired
	private imgPath imgpath;
	/**
	 * 获取广播内容
	 */
	@Path("imgPath")
	@GET
	public List<Map<String, Object>> imgPath(){
		return imgpath.imgPath();
	}
	/**
	 * 获取产品图片信息
	 * @return
	 */
	@GET
	@Path("productImgs")
	public List<Map<String, Object>> productImg(){
		return imgpath.productImg();
	}
}
