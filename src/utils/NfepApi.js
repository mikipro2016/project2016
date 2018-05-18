
const api = "http://av-rddev19.corp.avectra.com/tracker/api/";
// const api = "http://localhost:42489/api/";

 // Get bugs
export const getBugs = (active) =>
fetch(`${api}bugs?active=${active}`)
  .then(res => res.json());

//Get bug using bug tfs Id
export const getBug = (tfsId) => 
    fetch(`${api}bug?bugTfsId=${tfsId}`)
    .then(res => res.json());

//Get bug with tcs affected by it
export const getBugWithTCs = (active) => 
fetch(`${api}bugs/bugWithTestcases?active=${active}`)
  .then(res => res.json());

//Get number bugs by severity
export const getStatisticSeverity = (active) => 
fetch(`${api}bug/statistics/severity?active=${active}`)
  .then(res => res.json());

//Get number bugs by state
  export const getStatisticState = (active) => 
fetch(`${api}bug/statistics/state?active=${active}`)
  .then(res => res.json());

//Get number bugs by customer
export const getStatisticCustomer = (active) => 
fetch(`${api}bug/statistics/customer?active=${active}`)
  .then(res => res.json());

//Get number bugs by customer
export const getStatisticModule = (active) => 
fetch(`${api}bug/statistics/module?active=${active}`)
  .then(res => res.json());

// Get test plans
export const getTestPlans = () =>
  fetch(`${api}plans`)
    .then(res => res.json());

// Get test plans
export const getTestPlan = (planId) =>
fetch(`${api}plans/${planId}`)
  .then(res => res.json());

// Get test runs
export const getTestRuns = (planId) =>
fetch(`${api}plans/${planId}/runs`)
  .then(res => res.json());

// Get test runs
export const getTestRun = (planId, runId) =>
fetch(`${api}plans/${planId}/runs/${runId}`)
  .then(res => res.json());

// Post bug runs
export const postBug = (tfsId) =>
fetch(`${api}bug?tfsId=${tfsId}`)
  .then(res => {return res.status})

// Get Test Case
export const getTestCase = (testId) =>
fetch(`${api}testcase?name=${testId}`)
  .then(res => {return res.json()})




