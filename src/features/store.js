import { configureStore } from "@reduxjs/toolkit";
import callFormSlice from "./callFormSlice";
import unitSlice from "./unitSlice";

export default configureStore({
    reducer: {
        "callList": callFormSlice,
        "units": unitSlice
    }
});