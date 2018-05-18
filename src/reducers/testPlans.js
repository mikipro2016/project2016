
import { 
    GET_TESTPLANS,
    GET_TESTPLAN_RUNS } from 'actions/testPlans';

export function testPlans(state = [], action){
    switch(action.type){
    case GET_TESTPLANS:
      return action.testplans;
      
    case GET_TESTPLAN_RUNS:
      return action.testRuns;
    
    default:
      return state;
  }
}