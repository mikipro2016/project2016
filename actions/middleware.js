// import { 
//     getTestPlansAction, 
//     getRunsAction
// } from './testPlans';

// // import { getTestRun } from 'utils/VstsApi'
// // import { getTestPlans, getTestRuns } from 'utils/NfepApi'

// import * as VstsApi from 'utils/VstsApi'
// import * as NfepApi from 'utils/NfepApi'

// export function getNfepTestPlans(){
//     return (dispatch) => {        
//         NfepApi
//             .getTestPlans()
//             .then((data) => {
//                 console.log("middleware getNfepTestPlans data", data)
//                 dispatch(getTestPlansAction(data)); 
//             })
//             .catch((error) => console.log(error));
//     }
// }

// export function getTestRuns(planId){
//     return (dispatch) => {
//         NfepApi
//             .getTestRunsNFEP(planId)
//             .then((nfepRuns) => {
//                 console.log("middleware getTestRuns data", planId)
//                 console.log("middleware getTestRuns nfepRuns", nfepRuns)
//                 dispatch(getRunsAction(nfepRuns));
//             })
//             .catch((error) => console.log(error));
//     }
// }

// export function getTestRuns(planId){
//     return (dispatch) => {

//         NfepApi.getTestRuns(planId)
//             .then((nfepRuns) => {
//                 console.log("middleware getTestRuns NFEP nfepRuns", nfepRuns)
//                 return nfepRuns.map((run => {
//                     VstsApi.getTestRun(run.vstsRuntId)                        
//                 }))              
//             })
//             .then((runs) => {
//                 console.log("middleware getTestRuns VSTS runs", runs)                
//                 dispatch(getRunsAction(runs));
//             })
//             .catch((error) => console.log(error));
//     }
// }