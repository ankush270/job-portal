import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register =async (req,res) =>{
    try {
        const { fullname, email,phoneNumber, password,role } = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({ 
                message:"All fields are required.",
                success:false });
        };
        const user =await User.findOne({email});
        if(user){
            return res.status(400).json({ 
                message: 'User already exists.',
                success:false });
        }
        const hashPassword =await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashPassword,
            role
        })
        return res.status(201).json({
            message: 'User registered successfully.',
            success: true
        });
}catch(err){
    console.log(err);
}
}

export const login = async (req,res) => {
    try{
        const {email,password,role}=req.body;
        if( !email || !password || !role){
            return res.status(400).json({ 
                message: 'Something is missing.',
                success:false });
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: 'Invalid email.',
                success:false });   
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: 'Invalid password.',
                success:false });
        }
        //check role is correct or note
        if(user.role!== role){
            return res.status(400).json({
                message: 'Invalid role.',
                success: false });
        }
        const tokenData={
            userId: user.id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });
       user ={
        _id:user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile:user.profile
       }
        return res.status(200).cookie("token", token,{maxAge:1*24*60*60*1000,httpsOnly:true,samesite:'strict'}).json({
        message: 'Login successful. welcome back ${user.fullname}',
            success: true,
       }) 
    }catch(error){
        console.log(error);
    }
}

export const logout= async (req, res) => {
    try{
      return res.status(200).cookie("token","",{maxAge:0}).json({
        message: 'Logged out successfully.',
        success: true,
      })
    }catch(error){
        console.log(error);
    }
}

export const updateProfile = async(req,res)=>{
    try{
        const file=req.file;
        const {fullname,phoneNumber,email,bio,skills}=req.body;
        if( !fullname || !phoneNumber || !email || !bio || !skills){
            return res.status(400).json({
                message: 'All fields are required.',
                success: false
            });
        }
        //cloudinary
        const skillsArray = skills.split(",");
        const userId=req.id;
        let user=await user.findOne(userId);
        if(!user){
            return res.status(400).json({
                message: 'User not found.',
                success: false
            });
        }
        user.fullname=fullname;
        user.phoneNumber=phoneNumber;
        user.email=email;
        user.profile.skills=skillsArray;
        user.profile.bio=bio;
//resume update karne ke liye

        await user.save();
        user ={
            _id:user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile:user.profile
           }
           return res.status(200).json({
            message: 'Profile updated successfully.',
            success: true,
            user
           });
    }catch(error){
        console.log(error);
    }
}