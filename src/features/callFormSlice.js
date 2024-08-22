const { digitizeNumber } = require("../utils/utilityFunctions");

const callList = createSlice({
    name: "callList",
    initialState: {
        next_incident_num: 1,
        calls: []
    },
    reducers: {
        createCall: (state, action) => {
            const currentDate = new Date();
            const generated_incident_number = String(currentDate.getFullYear()).slice(2) + digitizeNumber(next_incident_num, 4);
            state.next_incident_num++;
            let output_object = {incident_number: generated_incident_number};
            Object.assign(output_object, action.payload);
            state.calls[output_object];
        },
        editCall: (state, action)  => {
            state.calls[action.payload.incident_number] = action.payload;
        }
    }
});

export const selectCalls = (state) => state.callList.calls;
export const selectSpecificCall = (state, target_incident_number) => state.callList.calls[target_incident_number];

export default callList.reducer;