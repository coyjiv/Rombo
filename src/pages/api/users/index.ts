import connectDb from "@/mongo/driver";
import User from "@/mongo/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next"
import authOptions from "../auth/[...nextauth]"

export default async function handler( req:NextApiRequest, res: NextApiResponse,){
    await connectDb()

    const session = await getServerSession(req, res, authOptions)

    // if (!session) {
    //     return res.status(401).json({ error: "Not authorized" });
    // }

    if(req.method === "GET"){
        const searchString = req.query.searchString     
        if(!searchString) return res.status(400).json({error:"SearchString is missing"})
        const users = await User.find({fullName:{$regex:searchString, $options:"i", }})
        if(!users) return res.status(400).json({error:"Users not found"})
        return res.status(200).json({data:users})
    } else {
        res.status(405).json({error:"Method not allowed"})
    }
}