import connectDb from "@/mongo/driver";
import User, { IUser } from "@/mongo/models/User";
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

  if (req.method === "GET") {
    // @ts-ignore
    const email = session?.user?.email;

    if (!email) {
      return res.status(400).json({ error: "Email is missing" });
    }

    try {
      const user = await User.findOne({ email }) as IUser;

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Получить только друзей пользователя
      const friends = await User.find({ email: { $in: user.friends } }) as IUser[];

      return res.status(200).json({ data: friends });
    } catch (error) {
      console.error("Error getting friends:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}