import { createSlice } from "@reduxjs/toolkit";
import { digitizeNumber } from "../utils/utilityFunctions";

const callList = createSlice({
    name: "callList",
    initialState: {
        next_incident_num: 1,
        calls: []
    },
    reducers: {
        createCall: (state, action) => {
            const currentDate = new Date();
            const generated_incident_number = String(currentDate.getFullYear()).slice(2) + digitizeNumber(state.next_incident_num, 4);
            state.next_incident_num = state.next_incident_num + 1;
            let output_object = {incident_number: generated_incident_number, date_created: currentDate.getTime(), assigned_units: []};
            Object.assign(output_object, action.payload);
            state.calls = [...state.calls, output_object];
        },
        editCall: (state, action) => {
            const target_index = state.calls.findIndex(({incident_number}) => incident_number === action.payload.incident_number);
            state.calls[target_index] = action.payload;
        }
    }
});

export const selectCalls = (state) => state.callList.calls;
export const selectSpecificCall = (state, target_incident_number) => state.callList.calls[target_incident_number];

export const {createCall, editCall} = callList.actions;

export default callList.reducer;