import connectDb from "@/mongo/driver"
import User from "@/mongo/models/User"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import authOptions from "../auth/[...nextauth]"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDb()

    const session = await getServerSession(req, res, authOptions)
    console.log("session", session)
    if (!session) {
        return res.status(401).json({ error: "Not authorized" });
    }

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ error: "Data is missing" })

        const { old, newUser } = req.body

        const {email:oldEmail} = old

        console.log("old usah", old, "new usah", newUser);
        

        const userExists = await User.findOne({ email:oldEmail })


        if (userExists) {
            try {
                Object.assign(userExists, newUser);
                await userExists.save().then((res) => console.log("res", res));
                return res.status(201).json({ ...newUser });
            } catch (error) {
                return res.status(409).json({ error: "User could not be updated" });
            }
        } else {
            return res.status(409).json({ error: "User does not exists" });
        }
        


    } else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler