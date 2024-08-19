const callList = createSlice({
    name: "callList",
    initialState: {
        address: "",
        callType: "",
        priority: 1,
        remarks: [],
        callerName: "",
        callerPhone: "",
        callerAddress: ""
    },
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setCallType: (state, action) => {
            state.callType = action.payload;
        },
        setPriority: (state, action) => {
            state.priority = action.payload;
        },
        addRemark: (state, action) => {
            state.remarks = [...state.remarks, action.payload];
        },
        setCallerName: (state, action) => {
            state.callerName = action.payload;
        },
        setCallerPhone: (state, action) => {
            state.callerPhone = action.payload;
        },
        setCallerAddress: (state, action) => {
            state.callerAddress = action.payload;
        },
    }
});

