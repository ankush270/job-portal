import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';

import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJob from '@/hooks/useGetAllAdminJob';
import { Input } from '../ui/input';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJob();
    const [input,setInput]=useState("");
 const dispatch = useDispatch();
    const navigate=useNavigate();
 useEffect(()=>{
dispatch(setSearchJobByText(input))
 },[input]);
    return (
    <div>
      <Navbar/>
      <div className=' max-w-6xl mx-auto my-10'>
       <div className='flex items-center justify-between my-5'>
       <Input
        className='w-fit'
        placeholder='Filter by company name & Jobs'
        onChange={(e)=>setInput(e.target.value)}
        />
        <Button onClick={()=>navigate("/admin/jobs/create")}>Post New Jobs</Button>
       </div>
      <AdminJobsTable/>
        
      </div>
    </div>
  )
}

export default AdminJobs
