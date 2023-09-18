import { IUser } from "@/mongo/models/User"
import { useEffect, useState } from "react"

export const useGetUserDetails = () => {
    const [user, setUser] = useState<null|IUser>(null)

    useEffect(()=>{
        const getUserDetails = async () =>{
            const {data} = await fetch('/api/profile/getUser').then(res=>res.json())
            setUser(data)
        }
        getUserDetails()
    },[])

    return user
}