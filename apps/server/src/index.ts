import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, { type Request, type Response } from "express";
import { authRouter } from "./routers";
import prisma from "./db";
import { authMiddleware } from "./routers/middleware";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
  })
);




app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).send("OK")
});
app.get("/auth",authMiddleware, (req:Request,res:Response)=>{
  //@ts-ignore
  const id=req.id;
  console.log(id)
  res.send(id)
})



app.use('/v0/auth',authRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
