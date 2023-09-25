import connectDb from "@/mongo/driver";
import User from "@/mongo/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next"
import authOptions from "../auth/[...nextauth]"

export default async function handler( req:NextApiRequest, res: NextApiResponse,){
    await connectDb()

    const session = await getServerSession(req, res, authOptions)


    if(req.method === "GET"){
        // @ts-ignore 
        const email = session?.user?.email        
        if(!email) return res.status(400).json({error:"Email is missing"})
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({error:"User not found"})
        return res.status(200).json({data:user})

    } else {
        res.status(405).json({error:"Method not allowed"})
    }
}