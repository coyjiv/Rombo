import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import connectDb from "@/mongo/driver"
import User from "@/mongo/models/User"
import { IUser } from "@/mongo/models/User"
import mongoose from "mongoose"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDb()

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ error: "Data is missing" })

        const { fullName, email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(409).json({ error: "User Already exists" })
        }
        else {
            if (password.length < 6)
                return res.status(409).json({ error: "Password should be 6 characters long" })

            const hashedPassword = await hash(password, 12)

            const user = User.create({
                fullName,
                email,
                // senderId: new mongoose.Types.ObjectId().toString(),
                password: hashedPassword
            })

            return res.status(201).json({ message: "User created successfully" , user})
        }
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler