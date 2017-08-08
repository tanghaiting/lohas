package com.contest.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;

import com.contest.bean.Path;

public class imgPath extends SqlSessionDaoSupport {
	//首页轮播
	public List<Map<String, Object>>imgPath(){
		return this.getSqlSession().selectList("mapper.pathMapper.getImgPath");
	}
	//产品图片
	public List<Map<String, Object>> productImg(){
		return this.getSqlSession().selectList("mapper.productMapper.getProducts");
	}
}
