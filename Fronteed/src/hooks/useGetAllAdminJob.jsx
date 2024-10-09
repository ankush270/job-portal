import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utilis/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJob = () => {
    const dispatch=useDispatch();
 useEffect(()=>{
    const fetchAllAdminJobs=async()=>{
        try {
           const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{
            withhCredentials:true
           });
           if(res.data.success){
            dispatch(setAllAdminJobs(res.data.jobs));
           }
        } catch (error) {
            console.error(error)
        }
    }
    fetchAllAdminJobs();
 },[])
}

export default useGetAllAdminJob
