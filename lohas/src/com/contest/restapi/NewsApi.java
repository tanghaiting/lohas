package com.contest.restapi;

import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.contest.service.NewsService;
import com.sun.jersey.api.spring.Autowire;

@Autowire
@Path("new")
public class NewsApi {

	@Autowired
	private NewsService newsService;

	/**
	 * 获取新闻内容
	 */
	@Path("news")
	@GET
	public List<Map<String, Object>> getNews() {
		return newsService.getNews();
	}
	/**
	 * 根据新闻id获取新闻信息
	 * @param id
	 * @return
	 */
	@Path("news/{id}")
	@GET
	public Map<String, Object> getNewsDetail(@PathParam(value="id")Integer id){
		return newsService.getNewsDetail(id);
	}
}
