import { createSlice } from "@reduxjs/toolkit";
import { digitizeNumber } from "../utils/utilityFunctions";

const callList = createSlice({
    name: "callList",
    initialState: {
        nextIncidentNumber: 1,
        calls: []
    },
    reducers: {
        createCall: (state, action) => {
            const currentDate = new Date();
            const generatedIncidentNumber = String(currentDate.getFullYear()).slice(2) + digitizeNumber(state.nextIncidentNumber, 4);
            state.nextIncidentNumber = state.nextIncidentNumber + 1;
            let outputObject = {incidentNumber: generatedIncidentNumber, dateCreated: currentDate.getTime(), assignedUnits: []};
            Object.assign(outputObject, action.payload);
            state.calls = [...state.calls, outputObject];
        },
        editCall: (state, action) => {
            const target_index = state.calls.findIndex(({incidentNumber}) => incidentNumber === action.payload.incidentNumber);
            state.calls[target_index] = action.payload;
        }
    }
});

export const selectCalls = (state) => state.callList.calls;
export const selectSpecificCall = (state, target_incidentNumber) => state.callList.calls[target_incidentNumber];

export const {createCall, editCall} = callList.actions;

export default callList.reducer;