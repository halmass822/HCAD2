import { createSlice } from "@reduxjs/toolkit";
import { unitsDefault } from"../utils/initialStates";

const unitSlice = createSlice({
    name: "units",
    initialState: {
        units: unitsDefault,
        errorState: false,
        errorMessage: "",
    },
    reducers: {
        createUnit: (state, action) => {
            if(state.units.find( x => x.unit === action.payload.unit)) {
                state.errorState = true;
                state.errorMessage = "Unit already exists!"
            } else {
                const outputUnit = {
                    location: "",
                    status: "AV",
                    idle: new Date().getTime(),
                    incidentNumber: "",
                    incidentType: "",
                    };
                Object.assign(outputUnit, action.payload);
                state.units = [...state.units, outputUnit];
            }
        },
        editUnit: (state, action) => {
            targetUnitIndex = state.units.findIndex(x => x.unit === action.payload.unit);
            if(targetUnitIndex < 0) {
                state.errorState = true;
                state.errorMessage = "Unit not found!";
            } else {
                Object.assign(state.units[targetUnitIndex], action.payload);
            }
        }
    }
});

export const selectAllUnits = (state) => state.units.units;
export const selectUnitError = (state) => state.units.errorState;
export const selectUnitErrorMessage = (state) => state.units.errorMessage;

export const {createUnit, editUnit} = unitSlice.actions;

export default unitSlice.reducer;