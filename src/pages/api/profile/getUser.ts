import connectDb from "@/mongo/driver";
import User from "@/mongo/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next"
import authOptions from "../auth/[...nextauth]"

export default async function handler( req:NextApiRequest, res: NextApiResponse,){
    await connectDb()

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(401).json({ error: "Not authorized" });
    }

    if(req.method === "GET"){
        // @ts-ignore 
        const email = session?.user?.email        
        if(!email) return res.status(400).json({error:"Email is missing"})
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({error:"User not found"})
        console.log("user", user);
        
        return res.status(200).json({data:{
            email:user.email,
            firstName: user.fullName.split(" ")[0],
            lastName: user.fullName.split(" ")[1],
            nickname: user.nickname,
            bio: user.bio,
            phone: user.phone,
            avatar: user.avatar
        }})

    } else {
        res.status(405).json({error:"Method not allowed"})
    }
}