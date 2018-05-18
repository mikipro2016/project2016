
export const GET_TESTPLANS = 'GET_TESTPLANS';
export const GET_TESTPLAN_RUNS = 'GET_TESTPLAN_RUNS';

export function getTestPlansAction(testplans){
    console.log("ACTION TESTPLANs getTestPlansAction", testplans)
  return{
    type: GET_TESTPLANS,
    testplans
  }
}

export function getRunsAction(testRuns){
    console.log("ACTION TESTPLAN  getRunsAction", testRuns)
  return{
    type: GET_TESTPLAN_RUNS,
    testRuns
  }
}