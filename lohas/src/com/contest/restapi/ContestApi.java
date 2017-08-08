package com.contest.restapi;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.spring.Autowire;

@Autowire
@Path("contestservice")
public class ContestApi {
	 /**
     * 
     * <p>Description:打比赛</p>
     * @author:2460353722 void
     */
	@Path("do/contest")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
    public int doContest(){
        return 0;
    }
	 /**
     * 
     * <p>Description:确认比赛开始</p>
     * @author:2460353722 void
     */
    public void contestStart(int contestId){
        
    }
    
    /**
     * 
     * <p>Description:评分</p>
     * @author:2460353722 void
     */
    public void grade(int contsetId,int startNum,int endNum,List<String> gameNum,int ballNum){
        
    }
    
    /**
     * 查看排名规则
     */
    public void rankingRule(){
    	
    }
    
    /**
     * 修改排名规则
     * @param ruleMessage
     */
    public void udpateRankingRule(String ruleMessage){
    	
    }
    
    /**
     * 获取赛事列表
     * @param code
     */
    public void getContests(){
    	
    }
    
    /**
     * 获取赛事
     * @param contestId
     */
    public void getContest(int contestId){
    	
    }
}
