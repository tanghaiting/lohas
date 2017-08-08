package com.contest.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;

public class NoticeService extends SqlSessionDaoSupport {
	//产品信息
	public List<Map<String, Object>>andorraPath(){
		return this.getSqlSession().selectList("mapper.pathMapper.getNotic");
	}
}
