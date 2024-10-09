import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: [],
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applications = action.payload;
        },
    },
})
export const {setAllApplicants} = applicationSlice.actions;

export default applicationSlice.reducer;