import { createSlice } from "@reduxjs/toolkit";
import { digitizeNumber } from "../utils/utilityFunctions";
import { blankCall } from "../utils/initialStates";

const callList = createSlice({
    name: "callList",
    initialState: {
        nextIncidentNumber: 1,
        calls: [],
        formState: "create",
        formUIHeight: "400px", //used to match the size of the form and the call list
        loadedCall: blankCall  //stores the call details to switch to, used to confirm / cancel callform clearing
            
            //initial blank state for the form
            // incidentNumber: "",
            // dateCreated: new Date().getTime(),
            // assignedUnits: [],
            // address: "",
            // callType: "ASSAULT",
            // priority: "1",
            // remarks: [],
            // callerName: "",
            // callerPhone: "",
            // callerAddress: ""
    },
    /*
        
    */
    reducers: {
        createCall: (state, action) => {
            const currentDate = new Date();
            const generatedIncidentNumber = String(currentDate.getFullYear()).slice(2) + digitizeNumber(state.nextIncidentNumber, 4);
            state.nextIncidentNumber = state.nextIncidentNumber + 1;
            let outputObject = {incidentNumber: generatedIncidentNumber, dateCreated: currentDate.getTime(), assignedUnits: []};
            Object.assign(outputObject, action.payload);
            state.calls = [...state.calls, outputObject];
            state.loadedCall = outputObject;
        },
        editCall: (state, action) => {
            const target_index = state.calls.findIndex(({incidentNumber}) => incidentNumber === action.payload.incidentNumber);
            Object.assign(state.calls[target_index], action.payload);
            state.loadedCall = state.calls[target_index];
            state.formState = "update";
        },
        loadCall: (state, action) => {
            state.loadedCall = action.payload;
        },
        setFormState: (state, action) => {
            state.formState = action.payload;
        },
        addRemark: (state, action) => {
            const target_index = state.calls.findIndex(({incidentNumber}) => incidentNumber === action.payload.incidentNumber);
            state.calls[target_index].remarks = [...state.calls[target_index].remarks, action.payload.remark];
        },
        setFormUIHeight: (state, action) => {
            state.formUIHeight = action.payload;
        }
    }
});

export const selectCalls = (state) => state.callList.calls;
export const selectLastCreatedCall = (state) => state.callList.lastCreatedCall;
export const selectLoadedCall = (state) => state.callList.loadedCall;
export const selectFormState = (state) => state.callList.formState;
export const selectFormUIHeight = (state) => state.callList.formUIHeight;

export const {createCall, editCall, loadCall, setFormState, addRemark, setFormUIHeight} = callList.actions;

export default callList.reducer;