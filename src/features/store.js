import { configureStore } from "@reduxjs/toolkit";
import callFormSlice from "./callFormSlice";

export default configureStore({
    reducer: {
        "callList": callFormSlice
    }
});