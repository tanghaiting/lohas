package com.contest.restapi;

import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.contest.service.AndorraService;
import com.contest.service.imgPath;
import com.sun.jersey.api.spring.Autowire;
@Autowire
@Path("andorra")
public class AndorraApi {
	@Autowired
	private AndorraService andorraService;
	/**
	 * 获取广播内容
	 */
	@Path("content")
	@GET
	public List<Map<String, Object>> andorra(){
		
		return andorraService.andorra();
	}
}
