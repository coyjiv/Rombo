import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { updateProfile } from "@/app/slices/userSlice";
import { IUser } from "@/mongo/models/User"
import { UserProfile } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"

export const useGetUserDetails = () => {
    const profile = useAppSelector(state => state.user.profile)
    const dispatch = useAppDispatch()
    const session = useSession();

    useEffect(()=>{
        const getUserDetails = async () =>{
            const {data} = await fetch('/api/profile/getUser').then(res=>res.json())
            const new_profile = {
                avatar: data.avatar,
                phone: data.phone,
                nickname: data.nickname,
                bio: data.bio,
                firstName: data.firstName,
                lastName: data.lastName,
            }
            const old_profile = {
                avatar: profile.avatar,
                phone: profile.phone,
                nickname: profile.nickname,
                bio: profile.bio,
                firstName: profile.firstName,
                lastName: profile.lastName,
            }
            if(old_profile !== new_profile){
                dispatch(updateProfile(data))
            }
        }
        getUserDetails()
    }, [])

    return profile
}