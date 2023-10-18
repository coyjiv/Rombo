import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]"
import {v2 as cloudinary} from 'cloudinary';

export default async function handler (req:NextApiRequest, res:NextApiResponse) {

    // NOT ReADY YET
    const session = await getServerSession(req, res, authOptions)
    
    // if(!session) {
    //     res.status(401).json({message: 'Unauthorized'})
    //     return
    // }

    if(req.method === 'POST') {
        cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    // upload the blob file to cloudinary

    cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
    }
    if(req.method === 'GET') {
        res.status(200).json({message: 'ok'})
    }
    else {
        res.status(405).json({message: 'Method not allowed'})
    }
}