import {createStore} from 'redux';

const reducer = (state, action) => {    
    if(action.type === "ADD_TO_TESTCASE_LIST") {      
        console.log("inside reducer: ", action.testCase);
        return {
            ...state, testcase:state.testcase.concat(action.testCase)            
        }
    }
    if (action.type === "REMOVE_FROM_TESTCASE_LIST")  {
        return {
            ...state, 
            testcase: state.testcase.filter(testCase => testCase.id !== action.testCase.id)
        };
    }
    
    return state;
};

export default createStore(reducer, { testcase: [] });