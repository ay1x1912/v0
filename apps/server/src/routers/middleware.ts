import prisma from "@/db";
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"

export const authMiddleware= async(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.n8n_v0_token;
    const id=jwt.verify(token,process.env.BETTER_AUTH_SECRET!) as string;
    const user=await prisma.user.findUnique({
        where:{
            id
        }
    })
    if(!user){
        res.json({
            msg:"unAuthorized"
        })
        return
    }
//@ts-ignore
 req.id=user.id;
 next();
}