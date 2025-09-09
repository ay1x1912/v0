import prisma from "@/db";
import { Router, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import {z} from "zod"
import  bcrypt from "bcrypt"
import { use } from "react";

export const authRouter=Router();

const SignUpSchema=z.object({
    email:z.email(),
    password:z.string().min(8)
})
authRouter.post('/signup', async(req:Request,res:Response)=>{

const {data,success}=SignUpSchema.safeParse(req.body);
if(!success){
    res.json({
        msg:"Invalid email or password"
    })
    return 
}
//check already exist 
const user=await prisma.user.findUnique({
    where:{
        email:data.email
    }
})
if(user){
     res.json({
        msg:"User already exist , pls signin "
    })
    return 
}
//hashPassword
const hashPassword=await bcrypt.hash(data.password,10);
//store user in db 
 const storedUser=await prisma.user.create({
    data:{
        email:data.email,
        passwrod:hashPassword
    }
 })
 

 res.json({
  
    msg:`${storedUser.email} sign up successfuly`
 })

})


authRouter.post("/signin", async(req:Request,res:Response)=>{
    const {data,success}=SignUpSchema.safeParse(req.body);
   if(!success){
    res.json({
        msg:"Invalid email or password"
    })
    return 
}
//check userExist
const user=await prisma.user.findUnique({
    where:{
        email:data.email
    }
})
if(!user){
    res.json({
        msg:"User does not exists , pls signup"
    })
    return 
}
const match= await bcrypt.compare(data.password,user.passwrod)
console.log(match);
if(!match){
    res.json({
        msg:"Password does not match please reenter password "
    })
    return 
}

 const token =jwt.sign(user.id,process.env.BETTER_AUTH_SECRET!);
 res.cookie("n8n_v0_token",token);
 res.json({
    token,
     msg:` sign in successfuly`
 })

})