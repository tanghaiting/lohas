package com.contest.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.contest.util.HtmlUtil;

public class NewsService extends SqlSessionDaoSupport{
	//公司动态
	public List<Map<String, Object>>getNews(){
		List<Map<String, Object>> list = this.getSqlSession().selectList("mapper.pathMapper.getNews");
		if(list != null && !list.isEmpty()){
			for(int i=0; i<list.size(); i++){
				String contentString = (String) list.get(i).get("content");
				if(contentString != null && HtmlUtil.delHTMLTag(contentString).length()>100){
					list.get(i).put("subContent", HtmlUtil.delHTMLTag(contentString).substring(0, 100)+"...");
				}else {
					list.get(i).put("subContent", HtmlUtil.delHTMLTag(contentString));
				}
			}
		}
		return list;
	}
	//详细信息
	public Map<String, Object> getNewsDetail(Integer id) {
		return this.getSqlSession().selectOne("mapper.pathMapper.getNewsDetail", id);
	}
	
}
