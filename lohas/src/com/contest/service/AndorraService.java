package com.contest.service;

import java.util.List;
import java.util.Map;
//获取首页广播
import org.mybatis.spring.support.SqlSessionDaoSupport;

public class AndorraService extends SqlSessionDaoSupport{
	public List<Map<String, Object>>andorra(){
		return this.getSqlSession().selectList("mapper.pathMapper.getAndorra");
	}
}
