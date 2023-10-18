import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]"
import { v2 as cloudinary } from 'cloudinary';
import User from "@/mongo/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    if (req.method === 'POST') {
              // @ts-ignore 
        const user = User.findOne({ email: session.user.email })
        user.updateOne({ avatar: req.body.avatar }).then((res) => console.log("res", res))
    }
    if (req.method === 'GET') {
        res.status(200).json({ message: 'ok' })
    }
    else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}