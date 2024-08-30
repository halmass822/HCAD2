import { createSlice } from "@reduxjs/toolkit";
import { digitizeNumber } from "../utils/utilityFunctions";

const callList = createSlice({
    name: "callList",
    initialState: {
        nextIncidentNumber: 1,
        calls: [],
        formState: "create",
        loadedCall: { //initial blank state for the form
            remarks: []
        } //stores the call details to switch to, used to confirm / cancel callform clearing
    },
    /*
        incidentNumber: ""
        dateCreated: Date()
        assignedUnits: []
        address: "",
        callType: "",
        priority: "",
        remarks: [],
        callerName: "",
        callerPhone: "",
        callerAddress: ""
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
        setFormState: (state, action) => {
            state.formState = action.payload
        },
        editCall: (state, action) => {
            const target_index = state.calls.findIndex(({incidentNumber}) => incidentNumber === action.payload.incidentNumber);
            Object.assign(state.calls[target_index], action.payload);
        },
        loadCall: (state, action) => {
            state.loadedCall = action.payload;
        }
    }
});

export const selectCalls = (state) => state.callList.calls;
export const selectSpecificCall = (state, action) => state.callList.calls.find((x) => x.incidentNumber === action.payload);
export const selectLastCreatedCall = (state) => state.callList.lastCreatedCall;
export const selectLoadedCall = (state) => state.callList.loadedCall;
export const selectFormState = (state) => state.callList.formState;

export const {createCall, editCall, loadCall, setFormState} = callList.actions;

export default callList.reducer;