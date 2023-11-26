import connectDb from "@/mongo/driver";
import User from "@/mongo/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Not authorized" });
}


  if (req.method === "GET") {
      // @ts-ignore 
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return res.status(400).json({ error: "User email is missing" });
    }

    try {
      
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }


      const friends = await User.find({ email: { $in: user.friends } });

      return res.status(200).json({ data: friends });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}