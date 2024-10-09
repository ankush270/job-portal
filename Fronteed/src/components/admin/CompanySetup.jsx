import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Store } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utilis/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetCompanyById from '@/hooks/useGetCompanyById'


const CompanySetup = () => {
    const params=useParams();
    useGetCompanyById(params.id);
    const [Input,setinput] =useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file:null
    })
    const [loading,setLoading] = useState(false);

    const changeEventHandler = (e)=>{
        setinput({...Input,[e.target.name]: e.target.value});
    }
    const changeFileHandler = (e)=>{
        const file=e.target.files?.[0]
        setinput({...Input, file });
    }
   
    const navigate=useNavigate();
    const submitHandler=async ()=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("name", Input.name);
        formData.append("description", Input.description);
       formData.append("website", Input.website);
       formData.append("location",Input.location);
       if(Input.file){
        formData.append("file",Input.file);
       }
       try{
        setLoading(true);
        const res=await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            withCredentials:true
        });
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/companies")
        }
       }catch(error){
        toast.error(error.response.data.message);
     console.log(error);
       }finally{
        setLoading(false);
       }

    }
   const {singleCompany}=useSelector(store=>store.company); 

    useEffect(()=>{
        setinput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

  return (
    <div >
      <Navbar/>
      <div className='max-w-xl max-auto my-10'>
        <form onSubmit={submitHandler}>
            <div className='flex items-center gap-5 p-8'>
            <Button onClick={()=>navigate("/admin/companies")} variant="outlinb" className="flex items-center gap-2 text-gray-500 font-semibold">
                <ArrowLeft/>
                <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
            </div >
            <div className='grid grid-cols-2 gap-4'>
                <div>
                <Label>Comapny Name</Label>
            <Input
            type="text"
            value={Input.name}
            onChange={changeEventHandler}
            name="name"
            />
                </div>
                <div>
                <Label>location</Label>
            <Input
            type="text"
            value={Input.location}
            onChange={changeEventHandler}
            name="location"
            />
                </div>
                <div>
                <Label>Description</Label>
                <Input
                value={Input.description}
                onChange={changeEventHandler}
                name="description"
                type="text"        
                />
                </div>
                <div>
                <Label>Website</Label>
                <Input
                type="text"
                value={Input.website}
                onChange={changeEventHandler}
                name="website"
                />
                </div>
                <div>
                <Label>Company Logo</Label>
                <Input type="file" 
                onChange={changeFileHandler }
                accept="image/*"
                 />
                </div>
            </div>
            {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
            
        </form>

      </div>
    </div>
  )
}

export default CompanySetup
