import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utilis/constant";
import axios from "axios";
import { setLoading, setUser } from "@/redux/authSlice";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setopen }) => {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setinput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const dispatch = useDispatch();

const changeEventHandler = (e) => {
    setinput({...input,[e.target.name]: e.target.value});
}

const submitHandler = async (e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("bio",input.bio);
    formData.append("skills",input.skills);
    if(input.file){
    formData.append("file",input.file);
 }
 try{
  setLoading(true);
    const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        },
    });
    if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
    }  
 }catch(e){
    console.log(e);
    toast.error(e.response.data.message);
   }finally{
    setLoading(false);
   }
   setopen(false);
  console.log(input);
}
const fileChangeHandler = (e)=>{
    const file=e.target.files?.[0];
    setinput({...input,file})
}

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInterOutside={() => setopen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input 
                value={input.fullname} 
                id="name" 
                 type='text'
                onChange={changeEventHandler}
                name="name"
                 className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input  type='email' onChange={changeEventHandler} value={input.email}  id="email" name="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  PhoneNumber
                </Label>
                <Input
                 onChange={changeEventHandler}
                value={input.phoneNumber}
                  id="phoneNumber"
                  name="phoneNumber"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input  onChange={changeEventHandler} value={input.bio}  id="bio" name="bio" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  skills
                </Label>
                <Input  onChange={changeEventHandler} value={input.skills}  id="skills" name="skills" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  type="file"
                  accept="application/pdf"
                  id="file"
                  onChange={fileChangeHandler}
                  name="file"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
