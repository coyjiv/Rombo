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

    if(req.method === "POST"){
        // @ts-ignore 
        const email = session?.user?.email        
        if(!email) return res.status(400).json({error:"Email is missing"})
  
        const user = await User.findOne({email})
        const potentialFriendEmail = req.body.email
        if(!potentialFriendEmail || !user) return res.status(400).json({error:"Email for potentialFriend is missing or user not found"})
  
        const potentialFriend = await User.findOne({ email:potentialFriendEmail })
  
      if (!potentialFriend) {
        return res.status(400).json({ error: "Potential friend not found" });
      }
  
      if (user.friends.includes(potentialFriend.email)) {
        return res
          .status(400)
          .json({ error: "You are already friends with this user" });
      }

      if (potentialFriend.potentialFriends.includes(user.email)) {
        user.potentialFriends = user.potentialFriends.filter(
          (email) => email !== potentialFriend.email
        );
        user.friends.push(potentialFriend.email);
  
        potentialFriend.potentialFriends = potentialFriend.potentialFriends.filter(
          (email) => email !== user.email
        );
        potentialFriend.friends.push(user.email as string);
      }
  
        user.potentialFriends = user.potentialFriends.filter(
            (email) => email !== potentialFriend.email
          );
          potentialFriend.potentialFriends = potentialFriend.potentialFriends.filter(
            (email) => email !== user.email
          );

        user.friends.push(potentialFriend.email);
        potentialFriend.friends.push(user.email as string);
    
        await user.save();
        await potentialFriend.save();
    
        return res.status(200).json({ data: user });
      } else {
        res.status(405).json({ error: "Method not allowed" });
      }
    }