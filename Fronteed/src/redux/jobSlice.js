import { createSlice } from "@reduxjs/toolkit";
const jobSlice=createSlice({
    name:"job",
    initialState:{
      singleJob:null,
        allJobs:[],
        allAdminJobs:[],
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
    
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
    setSearchJobByText:(state,action)=>{
        state.searchJobByText=action.payload;
    },
    setAllAppliedJobs:(state,action)=>{
        state.allAppliedJobs=action.payload;
    },
    setSearchedQuery:(state,action)=>{
        state.searchedQuery=action.payload;
    }
    }
});
export const {setSearchedQuery,setAllAppliedJobs,setSearchJobByText,setAllJobs,setSingleJob,setAllAdminJobs}=jobSlice.actions;

export default jobSlice.reducer;