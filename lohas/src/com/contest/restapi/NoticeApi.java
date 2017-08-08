package com.contest.restapi;

import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.contest.service.NoticeService;
import com.contest.service.imgPath;
import com.sun.jersey.api.spring.Autowire;

@Autowire
@Path("notice")
public class NoticeApi {
	@Autowired
	private NoticeService noticeService;
	/**
	 * 获取产品
	 */
	@Path("andorraPath")
	@GET
	public List<Map<String, Object>> andorraPath(){
		
		return noticeService.andorraPath();
	}
}
