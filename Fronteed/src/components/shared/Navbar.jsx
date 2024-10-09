import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover.jsx";
import { LogOutIcon, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utilis/constant.js";
import { setUser } from "@/redux/authSlice.js";
import { toast } from "sonner";
const Navbar = () => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("Failed to logout");
      toast.error(error.response.data.message);
    }
  };
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">MITRA</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {
              user && user.role==='recruiter'?(
                <>
                 <li>
              <Link to="/admin/companies">Companies </Link>
            </li>
            <li>
              <Link to="/admin/jobs">Jobs</Link>
            </li>
                </>
              ):(
            <>
            <li>
              <Link to="/">Home </Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
            </>
              )
            }
          
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                {" "}
                <Button variant="outlined">Login</Button>
              </Link>
              <Link to="/signup">
                {" "}
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.name}</h4>
                      <p className="text-sm text-muted-foreground ">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {
                      user && user.role ==='student' && (
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                      ) 
                    }
                    

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOutIcon />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
